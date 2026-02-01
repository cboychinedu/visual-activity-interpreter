// Importing the necessary modules 
import styles from "../../styles/historyStyles"; 
import { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator, 
    Alert,
    SafeAreaView,
    RefreshControl
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { 
    Clock, 
    Trash2, 
    Download, 
    Filter, 
    Calendar,
    ExternalLink,
    RefreshCcw 
} from 'lucide-react-native';

// Creating the history component 
const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        try {
            const userToken = await SecureStore.getItemAsync("userTokenData");
            const serverUrl = `${process.env.EXPO_PUBLIC_SERVER_URL}/history`;

            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userToken': userToken
                }
            });

            if (!response.ok) throw new Error('Failed to fetch history');

            const responseData = await response.json();
            setHistoryData(Array.isArray(responseData.data) ? responseData.data : []);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Fetch Error:", err);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    const deleteEntry = (id) => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to remove this record?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            const userToken = await SecureStore.getItemAsync("userTokenData");
                            const serverUrl = `${process.env.EXPO_PUBLIC_SERVER_URL}/history/delete-history`;
                            
                            const response = await fetch(serverUrl, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "userToken": userToken
                                },
                                body: JSON.stringify({ id })
                            });

                            const data = await response.json();
                            if (data.status === "success") {
                                setHistoryData(prev => prev.filter(item => item.id !== id));
                            }
                        } catch (err) {
                            console.error("Delete Error:", err);
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        // fetchHistory();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchHistory();
    }, []);

    const renderHistoryItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.timestampContainer}>
                    <Text style={styles.dateText}>{item.timestamp?.split(",")[0]}</Text>
                    <Text style={styles.timeText}>{item.timestamp?.split(",")[1]}</Text>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <ExternalLink size={18} color="#94a3b8" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.iconBtn}>
                        <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Image 
                    source={{ uri: item.imagedata }} 
                    style={styles.historyImage} 
                    resizeMode="cover"
                />
                <View style={styles.details}>
                    <Text style={styles.label}>INTERPRETATION</Text>
                    <Text style={styles.interpretationText}>{item.interpretation}</Text>
                    
                    <View style={styles.metaRow}>
                        <View>
                            <Text style={styles.label}>DURATION</Text>
                            <Text style={styles.metaValue}>{item.duration}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>ACCURACY</Text>
                            <Text style={[styles.metaValue, {color: '#22d3ee'}]}>94.8%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    // Rendering the history component 
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Custom Header */}
                <View style={styles.pageHeader}>
                    <View style={styles.titleWrapper}>
                        <Clock color="#3b82f6" size={24} />
                        <Text style={styles.headerTitle}>Analysis History</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerBtn}><Filter size={18} color="white" /></TouchableOpacity>
                        <TouchableOpacity style={[styles.headerBtn, styles.exportBtn]}><Download size={18} color="white" /></TouchableOpacity>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>SESSIONS</Text>
                        <Text style={styles.statValue}>{historyData.length}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>STATUS</Text>
                        <Text style={styles.statStatus}>{isLoading ? "Syncing" : "Active"}</Text>
                    </View>
                </View>

                {isLoading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text style={styles.loadingText}>Syncing logs...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={historyData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderHistoryItem}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />}
                        contentContainerStyle={styles.listPadding}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Calendar color="#475569" size={48} />
                                <Text style={styles.emptyTitle}>No history found</Text>
                                <Text style={styles.emptySub}>New sessions will appear here.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

// Exporting the history component 
export default History;