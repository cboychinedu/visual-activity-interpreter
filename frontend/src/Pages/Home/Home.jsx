// Importing the necessary modules 
import { Fragment, useState } from "react"; 
import Navbar from "@components/Navbar";

// Building the Home component 
const Home = () => {
    // Rendering the jsx component
    return(
        <Fragment> 
            {/* Adding the navbar  */}
            <Navbar /> 

            
            <p> Home Component </p>
        </Fragment>
    )
}

// Exporting the Home component 
export default Home; 