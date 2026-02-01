// Importing the necessary modules 
import { Stack } from 'expo-router'; 
import Auth from "../auth/auth"; 
import { ActivityIndicator, View } from 'react-native';

// Creating the root layout 
const RootLayout = () => {
    const { token, isLoading } = Auth(); 

    // Show the loading screen
    if (isLoading) {
        // Display the loader 
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1d4aac" />
            </View>
        );
    }

    // Rendering the pages 
    return (
        <Stack       
            screenOptions={{
                headerStyle: { backgroundColor: '#1d4aac' },
                headerTintColor: '#ffffff', 
                headerTitleStyle: { color: '#ffffff' }, 
                headerShown: true, 
            }}
        >
            {token ? (
                // AUTHENTICATED STACK
                // Only the dashboard is defined here. Login/Register don't exist in this state.
                <Stack.Screen
                    name="(dashboard)"
                    options={{
                        headerShown: false, 
                        title: "Dashboard"
                    }}
                /> 
            ) : (
                // UNAUTHENTICATED STACK
                // Only Login/Register are defined here.
                <>
                    <Stack.Screen name="index" options={{ title: "Welcome", headerTitle: "Welcome" }} />
                    <Stack.Screen name="login" options={{ title: "Login", headerTitle: "Login" }} /> 
                    <Stack.Screen name="register" options={{ title: "Register", headerTitle: "Register" }} /> 
                </>
            )}
        </Stack>
    );
}

// Exporting the root layout component 
export default RootLayout;