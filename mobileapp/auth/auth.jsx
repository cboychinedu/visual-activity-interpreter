// Importing the necessary modules 
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store"; 

// Creating the auth component 
const Auth = () => {
    // Creating the states 
    const [token, setToken] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 

    // Creating a function to load the token 
    const loadToken = async () => {
    // Using try catch block 
    try {
        // Read the stored token 
        const storedToken = await SecureStore.getItemAsync('userToken'); 

        // Setting the token 
        setToken(storedToken); 
    }

    // Catching the error 
    catch (error) {
        // Logging the error 
        console.error("Failed to load the token", error); 
    }

    // Set the loading to false 
    setIsLoading(false); 

    }; 

    // Using the use effect hook 
    useEffect(() => {
        // Calling the function 
        loadToken(); 
    }, []); 

    // Token will be null if no token is found 
    return { token }; 
}

// Exporting the component 
export default Auth; 