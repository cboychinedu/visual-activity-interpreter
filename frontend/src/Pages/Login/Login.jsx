// Importing the necessary modules 
import Cookies from 'js-cookie';
import { Fragment, useState } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AlertComponent from '@components/Alert';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

// Creating the login component 
const Login = () => {
    // Setting the state for the alert
    const [displayAlert, setDisplayAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(null); 
    const [alertSeverity, setAlertSeverity] = useState(null); 

    // Setting the state for the input form 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    // Function to handle the login request
    const handleLogin = async (event) => {
        // Preventing default submission 
        event.preventDefault();

        // Basic Validation
        if (email === "" || !email.includes("@")) {
            setAlertSeverity("error");
            setDisplayAlert(true);
            setAlertMessage("Please enter a valid email address!");
            return;
        }

        // Checking the password 
        else if (password === "") {
            setAlertSeverity("error");
            setDisplayAlert(true);
            setAlertMessage("Password is required!");
            return;
        }

        // Else if all the forms were filed 
        else {
            // Creating the user's login data as a json object  
            const loginData = JSON.stringify({ email, password }); 
            
            // Setting the backend server url 
            const serverUrl = `${import.meta.env.VITE_SERVER_URL}/login`;

            // Using try catch block to send a request to the backend server 
            try {
                // Make the post request to the login server route 
                const response = await fetch(serverUrl, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: loginData, 
                }); 

                // if there was no response from the server 
                if (!response.ok) {
                    // Handle the server side errors 
                    const errorData = await response.json(); 
                    throw new Error(errorData.message || "Login failed"); 
                }

                // Else if the server returned a result 
                const responseData = await response.json(); 

                // If the user password was correct, execute this block of code 
                if (responseData.status === "success") {
                    // Saving the token value 
                    Cookies.set('userTokenData', responseData.token, { expires: 1 });

                    // Displaying the success message 
                    setAlertSeverity("success"); 
                    setDisplayAlert(true);
                    setAlertMessage(responseData.message); 

                    // Wait for 3 seconds and navigate the user to the dashboard page 
                    setInterval(() => {
                        // Remove the error message 
                        setAlertSeverity(null); 
                        setDisplayAlert(false); 
                        setAlertMessage(null); 

                        // Navigate the user to the dashboard page 
                        window.location.href = "/dashboard";  
                    }, 3000)
                }

                // Else if the response data was not a success 
                else {
                    // Displaying the error message 
                    setAlertSeverity("error"); 
                    setDisplayAlert(true); 
                    setAlertMessage(responseData.message); 
                }

            }

            // Catch the error 
            catch (error) {
                // Log the error to the screen 
                console.error("Error during fetch: ", error.message); 

                // Display the error message
                setAlertSeverity("error"); 
                setDisplayAlert(true); 
                setAlertMessage("Error connecting to the server!");
            }
        }
    }

    // Rendering the login jsx file 
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar />

            {/* Addding alert */}
            {displayAlert && (
                <div> 
                    <AlertComponent severity={alertSeverity} message={alertMessage}/> 
                </div>
            )}
            
            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
                
                {/* Background Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
                            <LogIn className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                    <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
                        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Back</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Log in to access your vision stream dashboard
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                    <div className="bg-slate-900/50 backdrop-blur-xl py-8 px-4 shadow-2xl border border-slate-800 sm:rounded-2xl sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="name@company.com"
                                        onFocus={() => setDisplayAlert(false)}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                                        placeholder="••••••••"
                                        onFocus={() => setDisplayAlert(false)}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleLogin}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all group"
                                >
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-900 text-slate-500">New to VAI?</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    to="/register"
                                    className="w-full flex justify-center py-3 px-4 border border-slate-700 rounded-xl shadow-sm text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-800 transition-colors"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    );
};

// Exporting the login component 
export default Login;