// Importing the necessary modules 
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Component, Fragment } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importing the pages 
import Home from "./Pages/Home/Home"; 
import Login from "./Pages/Login/Login"; 
import About from './Pages/About/About';
import NotFound from './Pages/Notfound/Notfound';
import Register from "./Pages/Register/Register"; 
import Dashboard from './Pages/Dashboard/Dashboard';

// Creating the App component 
class App extends Component {
  // Rendering the component 
  render() {
    // Getting the user cookie 
    const userCookie = Cookies.get('userTokenData');
    let isLoggedIn

    // Checking if the user's cookie is present 
    if (userCookie) {
      // Decoding the user's cookie 
      let decodedToken = jwtDecode(userCookie); 
      isLoggedIn = decodedToken.isLoggedIn; 
    }

    // if the user token is not present, execute the block 
    // of code below 
    else {
      // Setting the login as false 
      isLoggedIn = false; 
    }

    // Returning the jsx component 
    return (
      <Fragment> 
        <BrowserRouter> 
          <Routes>
            {/* Adding the routes */}
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} /> 
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login /> } 
            /> 
            <Route 
              path="/register" 
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register /> } 
            /> 
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </Fragment>
    )
  }
}

// Exporting the component 
export default App; 