// Importing the necessary modules 
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { Pressable, Text, Alert } from "react-native";

// Creating the logout button component 
const LogoutButton = () => {
    // Setting the router instance 
    const router = useRouter(); 

    // Creating a function to handle the logout instance 
    const handleLogout = async () => {
        // Using try and catch block 
        try {
            // Clear the token 
            await SecureStore.deleteItemAsync("userToken"); 

            // Navigate the user to the login page 
            router.replace("/login"); 

        }

        // Catch the error 
        catch (error) {
            // Log the error 
            console.log("Logout failed: ", error); 

            // Display the error message 
            Alert.alert(error); 
        }
    }; 

    // Rendering the jsx button 
    return (
        <Pressable onPress={handleLogout} style={{ marginRight: 15, padding: 5 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> 
                Logout 
            </Text>
        </Pressable>
    ); 
}; 

// Exporting the logout button 
export default LogoutButton; 