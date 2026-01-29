// Importing the necessary modules 
import { useState } from 'react';
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
import { useRouter } from "expo-router";
import { User, Mail, Lock, ArrowRight } from 'lucide-react-native';
import styles from '../styles/registerStyles';


// Creating the register component 
const Register = () => {
  const router = useRouter();

  // Alert State
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);

  // Form State
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // // Validation Logic (remains largely the same)
    // if (fullname === "") {
    //   showAlert("error", "Fullname is missing!");
    //   return;
    // }
    // if (email === "" || !email.includes("@")) {
    //   showAlert("error", "Please enter a valid email address!");
    //   return;
    // }
    // if (password === "" || password !== confirmPassword) {
    //   showAlert("error", password === "" ? "Enter a password!" : "Passwords do not match!");
    //   return;
    // }

    // const userData = JSON.stringify({ fullname, email, password });
    
    // // Replace with your actual Env config for Native
    // const serverUrl = "https://your-api.com/register"; 

    // try {
    //   const response = await fetch(serverUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: userData,
    //   });

    //   const responseData = await response.json();

    //   if (responseData.status === "success") {
    //     showAlert("success", responseData.message);
    //     setTimeout(() => navigation.navigate("Login"), 3000);
    //   } else {
    //     showAlert("error", responseData.message || "Registration failed");
    //   }
    // } catch (error) {
    //   showAlert("error", "Error connecting to the server!");
    // }
  };

  const showAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setDisplayAlert(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Alert Area */}
          {displayAlert && Alert.alert("Fullname is missing!")}

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Create your <Text style={styles.brandText}>VAI Account</Text>
            </Text>
            <Text style={styles.subtitle}>Join the next generation of visual interpretation</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            
            {/* Input Group: Full Name */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <User color="#64748b" size={20} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#64748b"
                  value={fullname}
                  onChangeText={setFullname}
                  onFocus={() => setDisplayAlert(false)}
                />
              </View>
            </View>

            {/* Input Group: Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Mail color="#64748b" size={20} style={styles.icon} />
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
            </View>

            {/* Input Group: Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Lock color="#64748b" size={20} style={styles.icon} />
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
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
              <Text style={styles.submitBtnText}>Get Started</Text>
              <ArrowRight color="#fff" size={18} />
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Already have an account?</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity 
              style={styles.loginSecondaryBtn} 
                onPress={() => router.push('/login')}
            >
              <Text style={styles.loginSecondaryText}>Log in</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Exporting the register component 
export default Register;