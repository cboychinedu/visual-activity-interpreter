// Importing the necessary modules 
import { Fragment, useState } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AlertComponent from '@components/Alert';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

// Creating the login component 
const Login = () => {
    // Initializing the navigate hook 
    const navigate = useNavigate();

    // Setting the state for the alert
    const [displayAlert, setDisplayAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(null); 
    const [alertSeverity, setAlertSeverity] = useState(null); 

    // Setting the state for the input form 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    // Function to handle the login request
    const handleLogin = async (event) => {
        event.preventDefault();

        // Basic Validation
        if (email === "" || !email.includes("@")) {
            setAlertSeverity("error");
            setDisplayAlert(true);
            setAlertMessage("Please enter a valid email address!");
            return;
        }

        if (password === "") {
            setAlertSeverity("error");
            setDisplayAlert(true);
            setAlertMessage("Password is required!");
            return;
        }

        const loginData = JSON.stringify({ email, password });
        const serverUrl = `${import.meta.env.VITE_SERVER_URL}/login`;

        // try {
        //     const response = await fetch(serverUrl, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: loginData,
        //     });

        //     const responseData = await response.json();

        //     if (!response.ok) {
        //         throw new Error(responseData.message || "Login failed");
        //     }

        //     if (responseData.status === "success") {
        //         setAlertSeverity("success");
        //         setDisplayAlert(true);
        //         setAlertMessage("Login successful! Redirecting...");

        //         // Store token if your backend sends one (e.g., JWT)
        //         if(responseData.token) {
        //             localStorage.setItem("userToken", responseData.token);
        //         }

        //         // Redirect to dashboard or home after 2 seconds
        //         setTimeout(() => {
        //             navigate("/");
        //         }, 2000);
        //     } else {
        //         setAlertSeverity("error");
        //         setDisplayAlert(true);
        //         setAlertMessage(responseData.message);
        //     }

        // } catch (error) {
        //     console.error("Error during login:", error.message);
        //     setAlertSeverity("error");
        //     setDisplayAlert(true);
        //     setAlertMessage(error.message || "Error connecting to the server!");
        // }
    };

    return (
        <Fragment>
            <Navbar />

            {/* Alert Display */}
            {displayAlert && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"> 
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

export default Login;