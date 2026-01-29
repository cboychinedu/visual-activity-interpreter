import React, { useState } from 'react';
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
// You'll need to install: npx expo install expo-secure-store
// import * as SecureStore from 'expo-secure-store';
// import { useNavigation } from '@react-navigation/native';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react-native';
import styles from '../styles/loginStyles';
import { useRouter } from "expo-router";


// Creating the login component 
const Login = () => {
    //
    const router = useRouter(); 

  // State
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Handle Login Button pressed!"); 

    // // Basic Validation
    // if (email === "" || !email.includes("@")) {
    //   showAlert("error", "Please enter a valid email address!");
    //   return;
    // }
    // if (password === "") {
    //   showAlert("error", "Password is required!");
    //   return;
    // }

    // const loginData = JSON.stringify({ email, password });
    // // In Native, use your full API URL (don't forget to handle Android localhost as 10.0.2.2)
    // const serverUrl = "https://your-api-url.com/login";

    // try {
    //   const response = await fetch(serverUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: loginData,
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "Login failed");
    //   }

    //   const responseData = await response.json();

    //   if (responseData.status === "success") {
    //     // Persist token securely on the device
    //     await SecureStore.setItemAsync('userTokenData', responseData.token);

    //     showAlert("success", responseData.message);

    //     // Redirect after 2 seconds
    //     setTimeout(() => {
    //       setDisplayAlert(false);
    //       // Navigate to your main app screen
    //       navigation.replace("Dashboard"); 
    //     }, 2000);
    //   } else {
    //     showAlert("error", responseData.message);
    //   }
    // } catch (error) {
    //   console.error("Fetch Error: ", error.message);
    //   showAlert("error", "Error connecting to the server!");
    // }
  };

  const showAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setDisplayAlert(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {displayAlert && Alert.alert(displayAlert)}

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
                onFocus={() => setDisplayAlert(false)}
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
                onFocus={() => setDisplayAlert(false)}
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
              onPress={() => router.push('/register')}
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