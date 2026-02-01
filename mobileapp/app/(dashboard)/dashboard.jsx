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

const { width } = Dimensions.get('window');
const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL; 
const socket = io(serverUrl);

const Dashboard = () => {
    // Auth Logic
    const [fullname, setFullname] = useState("User");
    const [permission, requestPermission] = useCameraPermissions();

    // --- NEW STATE FOR CAMERA FACING ---
    const [facing, setFacing] = useState('back'); // Default to back camera
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [interpretation, setInterpretation] = useState("System standby. Awaiting input...");
    
    const cameraRef = useRef(null);
    const isAnalyzingRef = useRef(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        loadUser();
        setupSocket();
        return () => cleanup();
    }, []);

    // ... (loadUser, setupSocket, cleanup functions remain the same)

    const loadUser = async () => {
        const token = await SecureStore.getItemAsync("userTokenData");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setFullname(decoded.fullname);
            } catch (e) {
                console.error("Token error", e);
            }
        }
    };

    const setupSocket = () => {
        socket.on('inferenceResult', (data) => {
            if (!isAnalyzingRef.current) return;
            setInterpretation(data.text);
        });
    };

    const cleanup = () => {
        socket.off('inferenceResult');
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // --- NEW TOGGLE FUNCTION ---
    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const toggleAnalysis = async () => {
        if (isAnalyzing) {
            stopAnalysis();
        } else {
            await startAnalysis();
        }
    };

    const startAnalysis = async () => {
        if (!permission || !permission.granted) {
            const res = await requestPermission();
            if (!res.granted) return;
        }

        setIsAnalyzing(true);
        isAnalyzingRef.current = true;
        setInterpretation("Engine active. Processing live feed...");
        intervalRef.current = setInterval(captureAndSendFrame, 4000);
    };

    const stopAnalysis = () => {
        setIsAnalyzing(false);
        isAnalyzingRef.current = false;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setInterpretation("Analysis stopped.");
    };

    const captureAndSendFrame = async () => {
        if (cameraRef.current && isAnalyzingRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                shutterSound: false,
                skipProcessing: true,
                quality: 0.5,
            });
            const token = await SecureStore.getItemAsync("userTokenData");
            socket.emit('videoFrame', `data:image/jpeg;base64,${photo.base64}`, token);
        }
    };

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

export default Dashboard;