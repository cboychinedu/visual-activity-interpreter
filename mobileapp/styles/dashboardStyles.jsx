// Importing the necessary modules 
import { StyleSheet, Platform  } from "react-native";

// Creating the styles 
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#020617' },
    content: { padding: 20, paddingTop: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    titleText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    subtitle: { color: '#94a3b8', marginTop: 4 },
    badge: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 6 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    dot: { width: 6, height: 6, borderRadius: 3 },
    cameraWrapper: { backgroundColor: '#0f172a', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#1e293b', marginBottom: 20 },
    cameraHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#1e293b' },
    cameraTitle: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' },
    cameraContainer: { width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
    camera: { flex: 1, width: '100%' },
    placeholder: { alignItems: 'center' },
    placeholderText: { color: '#475569', marginTop: 10 },
    btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 15, gap: 10, marginBottom: 20 },
    btnStart: { backgroundColor: '#2563eb' },
    btnStop: { backgroundColor: '#dc2626' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    logContainer: { backgroundColor: '#0f172a', borderRadius: 20, borderSize: 1, borderColor: '#1e293b', overflow: 'hidden' },
    logHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 15, backgroundColor: '#1e293b' },
    logHeaderText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    logBody: { padding: 15 },
    logStep: { color: '#3b82f6', opacity: 0.7, fontSize: 12, marginBottom: 10 },
    resultBox: { backgroundColor: '#020617', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#1e293b' },
    resultText: { color: '#67e8f9', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', lineHeight: 20 }
});

// Exporting the styles 
export default styles; 