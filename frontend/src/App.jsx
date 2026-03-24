// Importing the necessary modules 
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importing the pages 
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import History from "./Pages/History/History";
import NotFound from "./Pages/Notfound/Notfound";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DocsPage from "./Pages/DocsPage/DocsPage";

// Creating the App component 
class App extends Component {
  render() {
    // Getting the user cookie 
    const userCookie = Cookies.get("userTokenData");
    let isLoggedIn = false;

    // Checking if the user's cookie is present 
    if (userCookie) {
      try {
        const decodedToken = jwtDecode(userCookie);
        isLoggedIn = decodedToken?.isLoggedIn || false;
      } catch (error) {
        isLoggedIn = false;
      }
    }

    // Rendering the component 
    return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<DocsPage />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/history"
            element={
              isLoggedIn ? <History /> : <Navigate to="/login" replace />
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

// Exporting the component 
export default App;