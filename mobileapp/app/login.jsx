// Importing the necessary modules 
import { useState } from 'react';
import { useRouter } from 'expo-router'; 
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Mail, Lock, ArrowRight, LogIn, CheckCircle2 } from 'lucide-react-native';
import styles from '../styles/loginStyles';

// Creating the login component 
const Login = () => {
    // Setting the router object 
    const router = useRouter(); 

  // Setting the state 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI Logic State
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  // Creating a function for showing the alert box 
  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    
    // If it's success, we wait 5 seconds then navigate
    if (type === "success") {
      setTimeout(() => {
        setToast({ visible: false, message: "", type: "success" });
        // router.replace("/dashboard");
      }, 5000);
    } else {
      // If it's an error, just hide it after 3 seconds
      setTimeout(() => setToast({ visible: false, message: "", type: "error" }), 3000);
    }
  };

  const handleLogin = async () => {
    // Checking if the email fiels are empty 
    if (email.trim() === "" || !email.includes("@")) {
      // Displaying the alert message 
      Alert.alert("Please enter a valid email address!"); 
      return; 

    }

    // Else if the password field was empty 
    else if (password === "") {
        // Displaying the error message 
        Alert.alert("Please enter a valid password!"); 
        return; 
    }

    // If the whole form was filled, execute the block of code below 
    else {
      // Create a json object to have all the user login credentials 
      const userData = JSON.stringify({
        email: email, 
        password: password 
      }); 

      // Defining the server url 
      const serverUrl = `${process.env.SERVER_URL}/login`; 

      // Using try catch block to handle the server connections 
      try {
        // Use async/await to send the data to the server 
        const response = await fetch(serverUrl, {
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }, 
          body: userData, 
          mode: 'cors',
          cache: 'no-cache'
        }); 

        // Getting the response data 
        const responseData = await response.json(); 

        // Handle the successfull login response 
        if (responseData.status === "success") {
          // Save the user token 
          await SecureStore.setItemAsync("userToken", responseData.token); 

          // Display the success message  
          showToast("Success! Welcome back!", "success");

        }

        // Else if the user password or email is incorrect execute this 
        // block of code below 
        else {
          // Show the error dialog box 
          showToast(responseData.message, "error"); 

          // Pausing the session 
          return; 
        }
      }

      // Catch the error 
      catch (error) {
        // Display the error message 
        console.error("Login Error: ", error); 
        Alert.alert("Network Error", "Could not connect to the server, check your connection.")
      }
    }

  };

  // Rendering the jsx component 
  return (
    <SafeAreaView style={styles.container}>
      {toast.visible && (
        <View style={[
          styles.toastContainer, 
          toast.type === "success" ? styles.successToast : styles.errorToast
        ]}>
          {toast.type === "success" && <CheckCircle2 color="#fff" size={20} style={{marginRight: 8}} />}
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Icon Header */}
          <View style={styles.headerContainer}>
            <View style={styles.iconCircle}>
              <LogIn color="#60a5fa" size={32} />
            </View>
            <Text style={styles.title}>
              Welcome <Text style={styles.accentText}>Back</Text>
            </Text>
            <Text style={styles.subtitle}>Log in to access your vision stream dashboard</Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {/* Email Input */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Mail color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="name@company.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Input */}
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Lock color="#64748b" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}> Login </Text>
              <ArrowRight color="#fff" size={18} />
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>New to VAI?</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => router.replace('/register')}
            >
              <Text style={styles.registerButtonText}> Register Here </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


// Exporting the login component 
export default Login;