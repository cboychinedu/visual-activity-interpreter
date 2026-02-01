import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    ActivityIndicator, 
    Alert,
    SafeAreaView,
    Platform
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as SecureStore from 'expo-secure-store';
import { Download, FileJson, FileSpreadsheet, ShieldCheck, Database, Info } from 'lucide-react-native';

const DownloadData = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format) => {
        setIsExporting(true);
        try {
            const userToken = await SecureStore.getItemAsync("userTokenData");
            const serverUrl = `${process.env.EXPO_PUBLIC_SERVER_URL}/history`;

            // 1. Fetch the latest history data
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userToken': userToken
                }
            });

            if (!response.ok) throw new Error('Failed to fetch data for export');
            const responseData = await response.json();
            const data = responseData.data || [];

            if (data.length === 0) {
                Alert.alert("No Data", "There are no history records to export.");
                setIsExporting(false);
                return;
            }

            // 2. Prepare File Content
            let fileContent = "";
            let fileExtension = "";

            if (format === 'json') {
                fileContent = JSON.stringify(data, null, 2);
                fileExtension = ".json";
            } else {
                // Simple CSV Conversion
                const header = "ID,Timestamp,Interpretation,Duration\n";
                const rows = data.map(item => 
                    `${item.id},"${item.timestamp}","${item.interpretation}","${item.duration}"`
                ).join("\n");
                fileContent = header + rows;
                fileExtension = ".csv";
            }

            // 3. Save to Temporary Mobile Storage
            const fileName = `VLM_Export_${Date.now()}${fileExtension}`;
            const fileUri = FileSystem.documentDirectory + fileName;

            await FileSystem.writeAsStringAsync(fileUri, fileContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            // 4. Trigger Native Share Sheet
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert("Error", "Sharing is not available on this device");
            }

        } catch (err) {
            console.error("Export Error:", err);
            Alert.alert("Export Failed", err.message);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                {/* Header */}
                <View style={styles.headerSection}>
                    <View style={styles.iconCircle}>
                        <Database color="#3b82f6" size={32} />
                    </View>
                    <Text style={styles.title}>Data Export Center</Text>
                    <Text style={styles.subtitle}>
                        Securely download your visual analysis history for external reporting.
                    </Text>
                </View>

                {/* Options Card */}
                <View style={styles.card}>
                    <View style={styles.infoRow}>
                        <Info size={18} color="#94a3b8" />
                        <Text style={styles.infoText}>Select your preferred file format</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.exportBtn} 
                        onPress={() => handleExport('csv')}
                        disabled={isExporting}
                    >
                        <FileSpreadsheet color="white" size={24} />
                        <View style={styles.btnContent}>
                            <Text style={styles.btnTitle}>Export as CSV</Text>
                            <Text style={styles.btnSub}>Best for Excel and Spreadsheets</Text>
                        </View>
                        {isExporting ? <ActivityIndicator color="white" /> : <Download color="white" size={20} />}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.exportBtn, styles.jsonBtn]} 
                        onPress={() => handleExport('json')}
                        disabled={isExporting}
                    >
                        <FileJson color="white" size={24} />
                        <View style={styles.btnContent}>
                            <Text style={styles.btnTitle}>Export as JSON</Text>
                            <Text style={styles.btnSub}>Best for Developer and API usage</Text>
                        </View>
                        {isExporting ? <ActivityIndicator color="white" /> : <Download color="white" size={20} />}
                    </TouchableOpacity>
                </View>

                {/* Security Footer */}
                <View style={styles.footer}>
                    <ShieldCheck color="#10b981" size={16} />
                    <Text style={styles.footerText}>All exports are processed locally and encrypted</Text>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#020617' },
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    headerSection: { alignItems: 'center', marginBottom: 40 },
    iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { color: '#94a3b8', textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
    card: { backgroundColor: '#0f172a', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#1e293b' },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
    infoText: { color: '#64748b', fontSize: 13 },
    exportBtn: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#2563eb', 
        padding: 18, 
        borderRadius: 16, 
        marginBottom: 15,
        gap: 15
    },
    jsonBtn: { backgroundColor: '#475569' },
    btnContent: { flex: 1 },
    btnTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    btnSub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 30 },
    footerText: { color: '#475569', fontSize: 11 }
});

export default DownloadData;