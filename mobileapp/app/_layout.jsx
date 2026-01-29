// Importing the necessary modules 
import { Stack } from 'expo-router'; 

// Creating the root layout 
const RootLayout = () => {
    // Rendering the jsx component 
    return(
        <Stack       
            screenOptions={{
            // Set the background color of the header bar to black
            headerStyle: {
                backgroundColor: '#1d4aac', 
            },
            headerTintColor: '#ffffff', 
            headerTitleStyle: {
                color: '#ffffff',
            }
        }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="register" options={{ title: "Register" }} /> 
            <Stack.Screen name="login" options={{ title: "Login" }} /> 
        </Stack>
    )
}

// Exporting the root layout 
export default RootLayout; 