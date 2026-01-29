// Importing the necessary modules 
import { useRouter } from "expo-router";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import styles from "../styles/homeStyles"; 
import { Camera, Cpu, Cloud, Activity } from 'lucide-react-native';


// Creating the index component 
const index = ({ navigation }) => {
    // Initialize the router hook 
    const router = useRouter(); 

    // Creating the features listing 
    const features = [
        { title: "Real-Time Analysis", desc: "Processes live camera feeds to interpret actions.", icon: <Camera color="#60a5fa" size={32} /> },
        { title: "Intelligent Overlay", desc: "Responsive UI with immediate feedback.", icon: <Activity color="#22d3ee" size={32} /> },
        { title: "CV Backbone", desc: "Utilizes OpenCV and TensorFlow (CNN).", icon: <Cpu color="#818cf8" size={32} /> },
        { title: "Scalable Backend", desc: "Python/Node.js cloud-native architecture.", icon: <Cloud color="#38bdf8" size={32} /> }
    ];

    // Creating a function to navigate the user to the register page 
    const goToRegisterPage = () => {
        // Navigate the user to the register page 
        router.push('/register'); 
    }

    // Creating a function to navigate the user to the login page 
    const goToLoginPage = () => {
        // Navigate the user to the login page 
        router.push('/login'); 
    }

    // Rendering the jsx 
    return(
        <SafeAreaView style={styles.container}>
            {/* Adding scroll view  */}
            <ScrollView showsVerticalScrollIndicator={true}>
                {/* Hero section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}> 
                        Real-Time <Text style={styles.accentText}> Visual Language </Text> Interpretation
                    </Text>
                    <Text style={styles.heroSubtitle}> 
                        High-performance system proessing live camera frames to identify human activities using Computer Vision and Deep Learning.
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={[styles.button, styles.primaryButton]}
                            onPress={goToRegisterPage}
                        >
                            <Text style={styles.buttonText}>Register Here</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, styles.secondaryButton]}
                            onPress={goToLoginPage}
                        >
                        <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Features Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Advanced Features</Text>
                    <View style={styles.underline} />
                        <View style={styles.featureGrid}>
                            {features.map((feature, i) => (
                                <View key={i} style={styles.featureCard}>
                                    <View style={styles.iconWrapper}>{feature.icon}</View>
                                        <Text style={styles.featureTitle}>{feature.title}</Text>
                                        <Text style={styles.featureDesc}>{feature.desc}</Text>
                                </View>
                            ))}
                    </View>
                </View>


                {/* TECH STACK (Simplified for Mobile) */}
                <View style={styles.techStackCard}>
                    <Text style={styles.techStackHeader}>Technical Stack</Text>
                    <View style={styles.techGrid}>
                        <View style={styles.techColumn}>
                            <Text style={styles.techCategory}>AI/ML</Text>
                            <Text style={styles.techItem}>Python / TF</Text>
                            <Text style={styles.techItem}>OpenCV</Text>
                        </View>
                        <View style={styles.techColumn}>
                            <Text style={styles.techCategory}>Backend</Text>
                            <Text style={styles.techItem}>Flask</Text>
                            <Text style={styles.techItem}>REST APIs</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

// Exporting the index component 
export default index; 