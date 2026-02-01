// Importing the necessary modules 
import LogoutButton from "../../components/logout"; 
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// Creating the dashboard layout 
const DashboardLayout = () => {
    // Rendering the dashboard layout 
    return(
        // Rendering the jsx component 
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: "white", 
                paddingTop: 10, 
            }, 
            headerStyle: {
                backgroundColor: '#1d4aac', 
                elevation: 0, 
                shadowOpacity: 0
            }, 
            headerTintColor: "white", 
        }} >

            {/* Adding the screen */}
            <Tabs.Screen 
                name="dashboard"
                options={{
                    title: "Dashboard", 
                    tabBarIcon: ({focused}) => (
                        <Ionicons
                            size={24}
                            name={focused ? "accessibility" : "accessibility-outline"}
                            color={focused ? "blue" : "black"}
                        /> 
                    ), 
                    headerRight: () => <LogoutButton />,
                    headerTitle: "Dashboard"
                   
                }} 
            /> 
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={ focused ? "time" : "time-outline" }
                            color={ focused ? "blue" : "#667486ff" }
                        />
                    ),
                    headerTitle: "History Analysis",
                }}
            />
            <Tabs.Screen
                name="downloadData"
                options={{
                    title: "Download Data",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            size={24}
                            name={ focused ? "time" : "time-outline" }
                            color={ focused ? "blue" : "#667486ff" }
                        />
                    ),
                    headerTitle: "Download data",
                }}
            />
        </Tabs>
    )

}

// Exporting the dashboard layout 
export default DashboardLayout; 