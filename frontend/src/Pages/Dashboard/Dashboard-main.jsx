// Importing the necessary modules 
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import React, { Fragment, useState, useRef } from 'react';
import { Play, Square, Activity, ShieldCheck, Zap, Terminal } from 'lucide-react';

// Creating the dashboard component 
const Dashboard = () => {
    // Getting the user's cookie 
    const userCookie = Cookies.get("userTokenData"); 
    let fullname; 

    // Checking if the user cookie is present 
    if (userCookie) {
        // Decode the user's cookie and get the user name 
        let decodedToken = jwtDecode(userCookie); 
        fullname = decodedToken.fullname; 
    }

    // Setting the state 
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [interpretation, setInterpretation] = useState("System standby. Awaiting input...");
    const videoRef = useRef(null);

    // Mock function to simulate ML analysis start/stop
    const toggleAnalysis = () => {
        setIsAnalyzing(!isAnalyzing);
        if (!isAnalyzing) {
            setInterpretation("Analyzing frames... [Person detected: Walking at 1.2m/s]");
        } else {
            setInterpretation("Analysis paused.");
        }
    };

    // Rendering the component 
    return (
        <Fragment>
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 lg:p-8">
                <div className="max-w-6xl mx-auto pt-10">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Activity className="text-blue-500" />
                                Live Analysis Console
                            </h1>
                            <p className="text-slate-400 mt-2">Welcome {fullname} to your visual live intepretation. </p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-xs font-mono">
                                <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                                {isAnalyzing ? 'ENGINE ACTIVE' : 'ENGINE IDLE'}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* LEFT: Camera Feed Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="relative group">
                                {/* Decorative Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                
                                {/* Video Container */}
                                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
                                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Camera_Source_01</span>
                                        <Zap className={`w-4 h-4 ${isAnalyzing ? 'text-yellow-400' : 'text-slate-600'}`} />
                                    </div>
                                    
                                    {/* Camera Placeholder / Video Element */}
                                    <div className="aspect-video bg-black flex items-center justify-center relative">
                                        {!isAnalyzing ? (
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                                    <Play className="text-slate-500 ml-1" />
                                                </div>
                                                <p className="text-slate-500 font-medium">Click "Start Analysis" to initialize feed</p>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
                                                 <img 
                                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                                                    alt="AI Analysis Overlay"
                                                    className="w-full h-full object-cover opacity-60"
                                                />
                                                {/* Mock AI Overlays */}
                                                <div className="absolute top-10 left-10 border-2 border-cyan-400 w-32 h-48 rounded flex flex-col justify-end p-2">
                                                    <span className="bg-cyan-400 text-black text-[10px] font-bold px-1 w-fit">PERSON 98%</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Controls Card */}
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button 
                                        onClick={toggleAnalysis}
                                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                                            isAnalyzing 
                                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20' 
                                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
                                        }`}
                                    >
                                        {isAnalyzing ? <><Square className="w-4 h-4 fill-current" /> Stop Analysis</> : <><Play className="w-4 h-4 fill-current" /> Start Analysis</>}
                                    </button>
                                    <div className="hidden md:block">
                                        <p className="text-sm font-semibold text-white">Capture Rate</p>
                                        <p className="text-xs text-slate-500">30 Frames Per Second</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 cursor-pointer hover:bg-slate-700">
                                        <ShieldCheck className="w-5 h-5 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: VLM Interpretation Display */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl">
                                <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-bold text-white tracking-wide">VLM INTERPRETATION</span>
                                </div>
                                
                                <div className="p-6 flex-grow font-mono text-sm space-y-4 overflow-y-auto max-h-[400px]">
                                    <div className="text-blue-400">
                                        &gt; Initializing VAI Core...
                                    </div>
                                    <div className="text-slate-500 text-xs">
                                        [TIMESTAMP: {new Date().toLocaleTimeString()}]
                                    </div>
                                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-cyan-300 leading-relaxed shadow-inner">
                                        {interpretation}
                                    </div>
                                    {isAnalyzing && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] text-slate-500">
                                                <span>INFERENCE_LATENCY</span>
                                                <span>14ms</span>
                                            </div>
                                            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full w-2/3 animate-pulse"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-4 bg-slate-800/30 border-t border-slate-700">
                                    <button className="w-full py-2 text-xs font-bold text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                                        EXPORT LOGS (.JSON)
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    );
};

// Exporting the dashbaord component 
export default Dashboard;