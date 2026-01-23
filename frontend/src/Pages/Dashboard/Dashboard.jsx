// Importing the necessary modules 
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { jwtDecode } from "jwt-decode";
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Fragment, useState, useRef, useEffect } from 'react';
import { Play, Square, Activity, ShieldCheck, Zap, Terminal } from 'lucide-react';

// Connect to your Flask server
const serverUrl = `${import.meta.env.VITE_SERVER_URL}`; 
const socket = io(serverUrl);

// Creating the dashboard component 
const Dashboard = () => {
    // Auth & Cookie Logic
    const userCookie = Cookies.get("userTokenData"); 
    let fullname;  
    let email

    // if the user cookie exists, execute the block of code 
    // below 
    if (userCookie) {
        // Using try catch block to decode the jwt token
        try {
            // Decoding the token, and setting the fullname to the 
            // global variable "fullname"
            let decodedToken = jwtDecode(userCookie); 
            fullname = decodedToken.fullname; 
        } 
        // On error decoding the token, log the error to the console. 
        catch (e) {
            // Logging the error 
            console.error("Token decode error:", e);
        }
    }

    // State Management
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [interpretation, setInterpretation] = useState("System standby. Awaiting input...");
    
    // REFS: Crucial for fixing the "stale closure" bug
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);
    
    // This ref tracks the status for the socket listener without causing re-renders
    const isAnalyzingRef = useRef(false);

    // Sync the ref whenever the state changes
    useEffect(() => {
        // Setting the ref analyzing as isAnalyzing
        isAnalyzingRef.current = isAnalyzing;
    }, [isAnalyzing]);

    // Socket Event Listeners
    useEffect(() => {
        // On socket connection 
        socket.on('connect', () => {
            // Log the status to the console
            console.log("Socket Connected! ID:", socket.id);
        });

        // On socket disconnection
        socket.on('disconnect', () => {
            // Log the status to the console 
            console.log("Socket Disconnected");
        });

        // Listen for VLM predicted results
        socket.on('inferenceResult', (data) => {
            // BUG FIX: Use the Ref here instead of state
            if (!isAnalyzingRef.current) {
                // Log the status to the console and stop the process 
                console.log("Analysis inactive. Ignoring incoming result.");
                return; 
            }

            // if the data status is error 
            if (data.status === "error") {
                // Destroy the token and log out the user
                // Remove the user token 
                Cookies.remove("userTokenData"); 

                // Wait for 2 seconds and redirect the user to the home page 
                setInterval(() => {
                    // Navigating the user to the home page 
                    window.location.href = "/";  
                }, 2000);

            }

            // if the isAnalyzing is true, show the predicted results. 
            setInterpretation(data.text);
        });

        // Cleanup on unmount
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('inferenceResult');

            // Clear the interval
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Function for starting the video and analysis
    const startVideo = async () => {
        // Using try catch block to get the video frames 
        try {
            // Getting the video frames 
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            // if the videoRef current value is true, execute the block of code below 
            if (videoRef.current) {
                // Set the video ref as the stream 
                videoRef.current.srcObject = stream;
            }
            
            // Update states
            setIsAnalyzing(true);
            setInterpretation("Engine active. Processing live feed...");

            // Start the frame capture loop (every 2 seconds)
            intervalRef.current = setInterval(() => {
                // Send the video frame to the server for analysis 
                sendFrame();
            }, 4000);

        } 
        // On error generated, log the error to the console, and display it 
        // to the user 
        catch (err) {
            // Logging the error, and displaying the error to the user. 
            console.error("Error accessing webcam:", err);
            setInterpretation("Error: Could not access camera.");
        }
    };

    // Function for stopping the video and analysis
    const stopVideo = () => {
        // Stop the camera tracks
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        // Stop the frame sending interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Update states
        setIsAnalyzing(false);
        setInterpretation("Analysis stopped.");
    };

    // Captures current video frame and sends to server
    const sendFrame = () => {
        // Setting the video and canvas objects 
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // Only send if the analysis is still active and video is ready
        if (isAnalyzingRef.current && video && canvas && video.readyState === 4) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Compress and Emit
            const imageData = canvas.toDataURL('image/jpeg', 0.6);
            socket.emit('videoFrame', imageData, userCookie);
        }
    };

    // Rendering the jsx component 
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 lg:p-8">
                <div className="max-w-6xl mx-auto pt-10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Activity className="text-blue-500" />
                                Live Analysis Console
                            </h1>
                            <p className="text-slate-400 mt-2">Welcome {fullname} to your visual live interpretation.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-xs font-mono">
                                <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                                {isAnalyzing ? 'ENGINE ACTIVE' : 'ENGINE IDLE'}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT: Camera Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                
                                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Camera_Source_01</span>
                                        <Zap className={`w-4 h-4 ${isAnalyzing ? 'text-yellow-400' : 'text-slate-600'}`} />
                                    </div>
                                    
                                    <div className="aspect-video bg-black flex items-center justify-center relative">
                                        <canvas ref={canvasRef} className="hidden" />
                                        
                                        <video 
                                            ref={videoRef} 
                                            autoPlay 
                                            playsInline 
                                            className={`w-full h-full object-cover ${!isAnalyzing ? 'hidden' : 'block'}`}
                                        />

                                        {!isAnalyzing && (
                                            <div className="text-center absolute">
                                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                                    <Play className="text-slate-500 ml-1" />
                                                </div>
                                                <p className="text-slate-500 font-medium">Click "Start Analysis" to initialize feed</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button 
                                        onClick={isAnalyzing ? stopVideo : startVideo}
                                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                                            isAnalyzing 
                                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20' 
                                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
                                        }`}
                                    >
                                        {isAnalyzing ? <><Square className="w-4 h-4 fill-current" /> Stop Analysis</> : <><Play className="w-4 h-4 fill-current" /> Start Analysis</>}
                                    </button>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span className="text-xs font-medium">Encrypted Link</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: VLM Display */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl">
                                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-bold text-white tracking-wide uppercase">AI Interpretation Log</span>
                                </div>
                                
                                <div className="p-6 flex-grow font-mono text-sm space-y-4 overflow-y-auto max-h-[500px]">
                                    <div className="text-blue-500/70">&gt; Connection established...</div>
                                    <div className="text-blue-500/70">&gt; VLM Core v1.0.4 loaded...</div>
                                    
                                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-cyan-300 leading-relaxed shadow-inner min-h-[100px]">
                                        {interpretation}
                                    </div>
                                    
                                    {isAnalyzing && (
                                        <div className="flex items-center gap-2 text-[10px] text-slate-600 animate-pulse uppercase tracking-tighter">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            Streaming metadata...
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 bg-slate-800/20 border-t border-slate-700">
                                    <p className="text-[10px] text-slate-500 text-center uppercase">Real-Time Vision Pipeline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Adding the footer */}
            <Footer />
        </Fragment>
    );
};

// Exporting the dashboard 
export default Dashboard;