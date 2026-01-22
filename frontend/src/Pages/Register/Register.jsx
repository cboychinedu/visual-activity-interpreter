// Importing the necessary modules 
import { Fragment, useState } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AlertComponent from '@components/Alert';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

// Creating the register component 
const Register = () => {
    // Initializing the navigate hook 
    const navigate = useNavigate();

    // Setting the state for the alert
    const [displayAlert, setDisplayAlert] = useState(false); 
    const [alertMessage, setAlertMessage] = useState(null); 
    const [alertSeverity, setAlertSeverity] = useState(null); 

    // Setting the state for the input form 
    const [fullname, setFullname] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 

    // Creating a function for handling the user register 
    const handleRegister = async (event) => {
        // Prevent default submissing 
        event.preventDefault(); 

        // Checking the input form for fullname 
        if (fullname === "") {
            // Execute this block of code if the fullname is missing 
            setAlertSeverity("error"); 
            setDisplayAlert(true); 
            setAlertMessage("Fullname is missing!"); 
            return; 
        }

        // Checking the input form for email 
        else if (email === "" || !email.includes("@")) {
            // Execute the block of code below 
            setAlertSeverity("error"); 
            setDisplayAlert(true); 
            setAlertMessage("Please enter a valid email address!"); 
            return; 
        }

        // Checking the password 
        else if (password === "") {
            // Execute the block of code below 
            setAlertSeverity("error"); 
            setDisplayAlert(true); 
            setAlertMessage("Please enter a valid password!"); 
            return; 
        }

        // Checking confirm password 
        else if (confirmPassword === "") {
            // Execute the block of code below 
             setAlertSeverity("error");
            setDisplayAlert(true); 
            setAlertMessage("Please retype your password to confirm it!");  
            return; 
        }

        // Checking both passwords 
        else if (password !== confirmPassword) {
            // Execute the block of code below 
            setAlertSeverity("error"); 
            setDisplayAlert(true); 
            setAlertMessage("Passwords not correct!"); 
            return; 
        }

        else {
            // Creating the json object for the register data 
            const userData = JSON.stringify({
                fullname, 
                email, 
                password, 
            }); 

            // Setting the backend server url 
            const serverUrl = `${import.meta.env.VITE_SERVER_URL}/register`; 

            // Using try catch block to send a request to the backend server 
            try {
                // Make the request to the register route 
                const response = await fetch(serverUrl, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: userData, 
                }); 

                // If there was no response from the server 
                if (!response.ok) {
                    // Handle server side errors 
                    const errorData = await response.json(); 
                    throw new Error(errorData.message || "Registration failed"); 
                }

                // Else if the server returned a result 
                const responseData = await response.json(); 

                // If the user was registered, execute this block of code 
                if (responseData.status === "error") {
                    // Display the error message 
                    setAlertSeverity("error"); 
                    setDisplayAlert(true); 
                    setAlertMessage(responseData.message); 

                    // Wait for 5 seconds and remove the message 
                    setInterval(() => {
                        // Remove the error message 
                        setAlertSeverity(null); 
                        setDisplayAlert(false); 
                        setAlertMessage(null); 
                    }, 5000); 
                }

                // Else if the response data was an info, execute the block 
                // of code below  
                else if (responseData.status === "info") {
                    // Display the status message 
                    setAlertSeverity("info"); 
                    setDisplayAlert(true); 
                    setAlertMessage(responseData.message); 
                    console.log(responseData); 

                }

                // Else if the data was successful 
                else {
                    // Display the status message 
                    setAlertSeverity("success"); 
                    setDisplayAlert(true); 
                    setAlertMessage(responseData.message); 

                    // Wait for 5 seconds and redirect the user to the login page 
                    setInterval(() => {
                        // Redirect the user to the login page 
                        navigate("/login"); 
                    }, 5000)
                }
            }

            // Catch the errror 
            catch (error) {
                // Log the error to the screen 
                console.error("Error during fetch", error.message); 

                // Display the error message 
                setAlertSeverity("error"); 
                setDisplayAlert(true); 
                setAlertMessage("Error connecting to the server!"); 
            }   
        }
    }

  // Rendering the component 
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
      
      {/* Adding the main div */}
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
          <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">VAI Account</span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Join the next generation of visual interpretation
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
          <div className="bg-slate-900/50 backdrop-blur-xl py-8 px-4 shadow-2xl border border-slate-800 sm:rounded-2xl sm:px-10">
            <form className="space-y-6">
              
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="John Doe"
                    onClick={() => setDisplayAlert(false)}
                    onChange={(event) => {setFullname(event.target.value)}}
                  />
                </div>
              </div>

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
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="name@company.com"
                    onClick={() => setDisplayAlert(false)}
                    onChange={(event) => {setEmail(event.target.value)}}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                    onClick={() => setDisplayAlert(false)}
                    onChange={(event) => {setPassword(event.target.value)}}
                  />
                </div>
              </div>

            {/* Confirm password password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-800/50 placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                    onClick={() => setDisplayAlert(false)}
                    onChange={(event) => {setConfirmPassword(event.target.value)}}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all group"
                  onClick={handleRegister}
                >
                  Get Started
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
                  <span className="px-2 bg-slate-900 text-slate-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-slate-700 rounded-xl shadow-sm text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-800 transition-colors"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

// Exporting the register page 
export default Register;