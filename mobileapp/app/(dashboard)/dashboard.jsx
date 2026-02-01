// Importing the necessary modules 
import styles from '../../styles/dashboardStyles';
import { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Dimensions
} from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import io from 'socket.io-client';
import { Play, Square, Activity, ShieldCheck, Zap, Terminal, RefreshCw } from 'lucide-react-native'; // Added RefreshCw

// Getting the width of the mobile device 
const { width } = Dimensions.get('window');

// Getting the server url 
const serverUrl = process.env.SERVER_URL;

// Connecting to the server using web sockets  
const socket = io(serverUrl);

// Creating the dashboard component 
const Dashboard = () => {
    // Setting the state 
    const [fullname, setFullname] = useState("User");
    const [permission, requestPermission] = useCameraPermissions();

    // Setting the state for system interpretation 
    const [facing, setFacing] = useState('back'); 
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [interpretation, setInterpretation] = useState("System standby. Awaiting input...");
    
    // Using ref to get the camera object, and interval 
    const cameraRef = useRef(null);
    const isAnalyzingRef = useRef(false);
    const intervalRef = useRef(null);

    // Using use effect to run the program on when the component mounts 
    useEffect(() => {
        loadUser();
        setupSocket();
        return () => cleanup();
    }, []);

    // Creating a function for loading the user's name 
    const loadUser = async () => {
        // Get the token data 
        const token = await SecureStore.getItemAsync("userToken");

        // if the token is present, execute the block of code below 
        if (token) {
            // Using try catch block to decode the token
            try {
                // Decode the token data, and set it as the fullname 
                const decoded = jwtDecode(token);
                setFullname(decoded.fullname);
            } catch (e) {
                // On error, log the error to the console 
                console.log("Token error", e);
            }
        }
    };

    // Creating a function for getting the inference result 
    const setupSocket = () => {
        // Listen for the result, and save the result into the interpretation state 
        socket.on('inferenceResult', (data) => {
            if (!isAnalyzingRef.current) return;

            // Save the analyzed result 
            setInterpretation(data.text);
        });
    };

    // Clean up the state 
    const cleanup = () => {
        socket.off('inferenceResult');
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // Creating a function to toggle the front and back camera 
    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    // Creating a function for toggling the analysis 
    const toggleAnalysis = async () => {
        // if isAnalyzing is true, execute the block of code below
        if (isAnalyzing) {
            // Stop the analysis
            stopAnalysis();
        } else {
            // Else, start the analysis 
            await startAnalysis();
        }
    };

    // Creating a function for starting the analysis 
    const startAnalysis = async () => {
        // Ensure permission is granted or then request permission 
        if (!permission || !permission.granted) {
            // Request permission 
            const res = await requestPermission();
            if (!res.granted) return;
        }

        // Setting the analyzing state to true 
        setIsAnalyzing(true);
        isAnalyzingRef.current = true;
        setInterpretation("Engine active. Processing live feed...");

        // Capture and send the frames at an interval of 4seconds 
        intervalRef.current = setInterval(captureAndSendFrame, 4000);
    };

    // Creating a function for stopping the analysis 
    const stopAnalysis = () => {
        // Set is analyzing to false 
        setIsAnalyzing(false);

        // set is analyzing current as false 
        isAnalyzingRef.current = false;

        // Clear the interval, and set the interpretation as "Analysis stopped" 
        if (intervalRef.current) clearInterval(intervalRef.current);
        setInterpretation("Analysis stopped.");
    };

    // Creating a function for capturing and sending the frames to the ML server 
    const captureAndSendFrame = async () => {
        // if the cameraRef.current, and isAnalyzingRef.current is true, 
        // execute the block of code below 
        if (cameraRef.current && isAnalyzingRef.current) {
            // Take the photo, with no shutter sound, with a quality of 0.5, with base64 encoding 
            // and save it into the photo variable 
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                shutterSound: false,
                skipProcessing: true,
                quality: 0.5,
            });

            // Get the user's token value from the session storage, and send it along 
            // side with the photo taken as a socket object 
            const token = await SecureStore.getItemAsync("userToken");
            socket.emit('videoFrame', `data:image/jpeg;base64,${photo.base64}`, token);
        }
    };


    // Rendering the jsx component 
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <View style={styles.titleRow}>
                            <Activity color="#3b82f6" size={24} />
                            <Text style={styles.titleText}>Live Console</Text>
                        </View>
                        <Text style={styles.subtitle}>Welcome {fullname}</Text>
                    </View>
                    <View style={[styles.badge, { borderColor: isAnalyzing ? '#22c55e' : '#475569' }]}>
                        <View style={[styles.dot, { backgroundColor: isAnalyzing ? '#22c55e' : '#475569' }]} />
                        <Text style={styles.badgeText}>{isAnalyzing ? 'ACTIVE' : 'IDLE'}</Text>
                    </View>
                </View>

                {/* Camera Feed Area */}
                <View style={styles.cameraWrapper}>
                    <View style={styles.cameraHeader}>
                        <Text style={styles.cameraTitle}>SOURCE: {facing.toUpperCase()} CAMERA</Text>
                        
                        {/* --- CAMERA FLIP BUTTON --- */}
                        {!isAnalyzing && (
                            <TouchableOpacity onPress={toggleCameraFacing} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RefreshCw size={14} color="#60a5fa" style={{ marginRight: 5 }} />
                                <Text style={{ color: '#60a5fa', fontSize: 10, fontWeight: 'bold' }}>FLIP</Text>
                            </TouchableOpacity>
                        )}
                        {isAnalyzing && <Zap size={16} color="#facc15" />}
                    </View>
                    
                    <View style={styles.cameraContainer}>
                        {isAnalyzing ? (
                            <CameraView 
                                style={styles.camera} 
                                ref={cameraRef}
                                facing={facing} // <--- DYNAMIC FACING
                            />
                        ) : (
                            <View style={styles.placeholder}>
                                <View style={{ marginBottom: 15 }}>
                                     {/* Previewing chosen camera icon logic */}
                                    <Activity color="#475569" size={48} />
                                </View>
                                <Text style={styles.placeholderText}>Camera Ready: {facing}</Text>
                                <Text style={styles.placeholderText}>Click Start to Initialize</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Controls */}
                <TouchableOpacity 
                    style={[styles.btn, isAnalyzing ? styles.btnStop : styles.btnStart]} 
                    onPress={toggleAnalysis}
                >
                    {isAnalyzing ? <Square color="white" size={20} fill="white" /> : <Play color="white" size={20} fill="white" />}
                    <Text style={styles.btnText}>{isAnalyzing ? "Stop Analysis" : "Start Analysis"}</Text>
                </TouchableOpacity>

                {/* Interpretation Log */}
                <View style={styles.logContainer}>
                    <View style={styles.logHeader}>
                        <Terminal color="#3b82f6" size={18} />
                        <Text style={styles.logHeaderText}>AI INTERPRETATION LOG</Text>
                    </View>
                    <View style={styles.logBody}>
                        <Text style={styles.logStep}>&gt; Camera Source: {facing}</Text>
                        <Text style={styles.logStep}>&gt; Connection established...</Text>
                        <View style={styles.resultBox}>
                            <Text style={styles.resultText}>{interpretation}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

// Exporting the dashbaord component 
export default Dashboard;