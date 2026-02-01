// Importing the necessary modules 
import styles from '../../styles/historyStyles';
import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator, 
    Alert,
    SafeAreaView,
    RefreshControl,
    Modal,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
// Icons
import { 
    Clock, 
    Trash2, 
    Download, 
    Filter, 
    Calendar,
    X,
    Maximize2
} from 'lucide-react-native';



const History = () => {
    // Standard Data State
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    // Modal State for Fullscreen View
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch history from backend
    const fetchHistory = async () => {
        try {
            const userToken = await SecureStore.getItemAsync("userToken");
            const serverUrl = `${process.env.SERVER_URL}/history`;

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
        } catch (err) {
            console.error("Fetch Error:", err);
            Alert.alert("Sync Error", "Could not retrieve history logs.");
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    // Delete a specific entry
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
                            const userToken = await SecureStore.getItemAsync("userToken");
                            const serverUrl = `${process.env.SERVER_URL}/history/delete-history`;
                            
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

    // Lifecycle
    useEffect(() => {
        fetchHistory();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchHistory();
    }, []);

    // Open Fullscreen Modal
    const handleImagePress = (uri) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.timestampContainer}>
                    <Text style={styles.dateText}>{item.timestamp?.split(",")[0]}</Text>
                    <Text style={styles.timeText}>{item.timestamp?.split(",")[1]}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.deleteBtn}>
                    <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
                {/* Clickable Image Thumbnail */}
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() => handleImagePress(item.imagedata)}
                    style={styles.imageContainer}
                >
                    <Image 
                        source={{ uri: item.imagedata }} 
                        style={styles.historyImage} 
                    />
                    <View style={styles.zoomOverlay}>
                        <Maximize2 size={14} color="white" />
                    </View>
                </TouchableOpacity>

                <View style={styles.details}>
                    <Text style={styles.label}>INTERPRETATION</Text>
                    <Text style={styles.interpretationText}>{item.interpretation}</Text>
                    
                    <View style={styles.metaRow}>
                        <View>
                            <Text style={styles.label}>DURATION</Text>
                            <Text style={styles.metaValue}>{item.duration || '0.4s'}</Text>
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            
            {/* --- FULLSCREEN MODAL --- */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity 
                        style={styles.closeModalBtn} 
                        onPress={() => setModalVisible(false)}
                    >
                        <X color="white" size={32} />
                    </TouchableOpacity>
                    
                    <Image 
                        source={{ uri: selectedImage }} 
                        style={styles.fullImage}
                        resizeMode="contain"
                    />
                </View>
            </Modal>

            <View style={styles.container}>
                {/* Page Header */}
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
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
                        }
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



export default History;