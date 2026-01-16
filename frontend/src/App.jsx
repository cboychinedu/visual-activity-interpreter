// Importing the necessary modules 
import { Component, Fragment } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importing the pages 
import Home from "./Pages/Home/Home"; 
import Login from "./Pages/Login/Login"; 
import Register from "./Pages/Register/Register"; 

// Creating the App component 
class App extends Component {

  // Rendering the component 
  render() {
    // Returning the jsx component 
    return (
      <Fragment> 
        <BrowserRouter> 
          <Routes>
            {/* Adding the routes */}
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login /> } /> 
            <Route path="/register" element={<Register /> } /> 
          </Routes>
        </BrowserRouter>
      </Fragment>
    )
  }
}

// Exporting the component 
export default App; 