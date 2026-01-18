// Importing the necessary modules 
import { Fragment } from "react"; 

  // Getting the current year 
  const currentYear = new Date().getFullYear();

// Building the Footer component 
const Footer = () => {
    // Rendering the Footer component 
    return(
        <Fragment> 
            {/* FOOTER */}
            <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>© {currentYear} Visual Activity Interpreter. Built with React and Tailwind CSS.</p>
            </footer>
        </Fragment>
    )
}

// Exporting the Footer 
export default Footer; 





