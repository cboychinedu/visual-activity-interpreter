// Importing the necessary modules 
import { Stack } from 'expo-router'; 
import Auth from "../auth/auth"; 

// Creating the root layout 
const RootLayout = () => {
    // Getting the token value 
    const { token } = Auth(); 

    // if the token is present 
    if (token) {
        // Render the dashboard page 
        return (
            <Stack       
                screenOptions={{
                    headerStyle: { backgroundColor: '#1d4aac' },
                    headerTintColor: '#ffffff', 
                    headerTitleStyle: { color: '#ffffff' }, 
                    headerShown: true, 
                }}
            >
                <Stack.Screen
                    name="(dashboard)"
                    options={{
                        headerShown: false, 
                        title: "Dashboard"
                    }}
                /> 
            </Stack>
        )
    }
    // if the token is not present, render the normal pages 
    else {
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
                <Stack.Screen name="index" options={{ title: "Welcome", headerTitle: "Welcome" }} />
                <Stack.Screen name="login" options={{ title: "Login", headerTitle: "Login" }} /> 
                <Stack.Screen name="register" options={{ title: "Register", headerTitle: "Register" }} /> 
            </Stack>
        );
    }
}

// Exporting the root layout component 
export default RootLayout;