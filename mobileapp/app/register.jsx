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
  // Setting the router hook 
  const router = useRouter();

  // Form State
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Validating the fullname 
    if (fullname === "") {      
      // Displaying the alert message 
      Alert.alert("Fullname is missing!");
      return; 

    }

    // Validation of the email 
    else if (email === "" || !email.includes("@")) {
      // Displaying the alert message 
      Alert.alert("Please enter a valid email address!"); 
      return; 

    }

    // Validating the password 
    else if (password === "") {
      // Displaying the alert message 
      Alert.alert("Please enter a valid password"); 
      return; 

    }

    // Validating the confirm password 
    else if (confirmPassword === "") {
      // Displaying the alert message 
      Alert.alert("Confirm password is missing!"); 
      return; 

    }

    // Checking if the password match 
    else if (confirmPassword !== password) {
      // Displaying the alert message 
      Alert.alert("Passwords do not match!"); 
      return; 

    }

    // Else if all the fileds are filled 
    else {
      // Create a json object to have all the user registration data 
      const userData = JSON.stringify({
         fullname: fullname, 
         email: email, 
         password: password 
      }); 

      // Setting the backend server url 
      const serverUrl = `${process.env.SERVER_URL}/register`; 

      console.log(serverUrl); 

      // Using try catch block to send a request to the backend server 
      try {
        // Sending the data to the server 
        fetch(serverUrl, {
            method: "POST", 
            headers: { "Content-Type": "application/json"}, 
            body: userData
        })
        // Handling the response from the server 
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the successful register response 
          if (responseData.status === "success") {
            // Show a dialog box 
            Alert.alert("User registered!"); 

            // Redirect the user to the login page 
            router.replace("/login"); 

          }
          // Else if the response was an error or info 
          else {
            // Show the dialog box 
            Alert.alert(responseData.message); 

          }
        })
        // Catching the error 
        .catch((error) => {
          // Log the error 
          console.error(error); 

          // Show the error message 
          Alert.alert(error.message); 
        })
      }

      // Catch the error if the data was not sent 
      catch (error) {
        // Log the error 
        console.log(error); 

        // Display the error message 
        Alert.alert(error); 
      }
    }

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>

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
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}> Confirm Password </Text>
              <View style={styles.inputContainer}>
                 <Lock color="#64748b" size={20} style={styles.icon} />
                 <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#64748b"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                onPress={() => router.replace('/login')}
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