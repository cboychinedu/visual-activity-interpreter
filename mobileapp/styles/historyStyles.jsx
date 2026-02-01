// Importing the necessary modules 
import { StyleSheet, Dimensions } from "react-native";

// Getting the width and height 
const { width, height } = Dimensions.get('window');

// Creating the styles component 
const styles = StyleSheet.create({
    imageContainer: { position: 'relative' },
    zoomOverlay: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 4,
        borderRadius: 6
    },

    // Modal Styles preserved from top (no duplicates found below)
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeModalBtn: {
        position: 'absolute',
        top: 60,
        right: 25,
        zIndex: 10,
        padding: 10
    },
    fullImage: {
        width: width,
        height: height * 0.8
    },

    // Bottom versions (Duplicates from top removed, these were kept)
    safeArea: { flex: 1, backgroundColor: '#020617' },
    container: { flex: 1, paddingHorizontal: 16 },
    pageHeader: { marginTop: 20, marginBottom: 20 },
    titleWrapper: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
    headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    headerActions: { flexDirection: 'row', gap: 10 },
    headerBtn: { backgroundColor: '#1e293b', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#334155' },
    exportBtn: { backgroundColor: '#2563eb' },
    statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    statBox: { flex: 1, backgroundColor: '#0f172a', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#1e293b' },
    statLabel: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
    statValue: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
    statStatus: { color: '#3b82f6', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
    listPadding: { paddingBottom: 40 },
    card: { backgroundColor: '#0f172a', borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#1e293b' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    dateText: { color: '#94a3b8', fontSize: 12 },
    timeText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
    actionButtons: { flexDirection: 'row', gap: 10 },
    cardBody: { flexDirection: 'row', gap: 12 },
    historyImage: { width: 100, height: 100, borderRadius: 12, backgroundColor: '#020617' },
    details: { flex: 1, justifyContent: 'space-between' },
    label: { color: '#64748b', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
    interpretationText: { color: '#22d3ee', fontSize: 13, fontWeight: '600', marginVertical: 4 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    metaValue: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#94a3b8', marginTop: 10 },
    emptyContainer: { alignItems: 'center', marginTop: 100 },
    emptyTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 15 },
    emptySub: { color: '#64748b', marginTop: 5 }
});

// Exporting the styles component 
export default styles;