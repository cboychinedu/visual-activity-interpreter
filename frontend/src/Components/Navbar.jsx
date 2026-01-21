// Importing the necessary modules 
import { useState } from 'react';

// Building the Navbar component
const Navbar = () => {
    // Setting the state
    const [isOpen, setIsOpen] = useState(false);

    // Rendering the Navbar component 
    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <a className="flex items-center" href="/">
                <span className="text-blue-500 font-bold text-xl tracking-wider">VAI</span>
                <span className="text-white ml-2 font-medium hidden md:block">Visual Activity Interpreter</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                <a href="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 transition-colors">About</a>
                <a href="/login" className="text-gray-300 hover:text-blue-400 px-3 py-2 transition-colors">Login</a>
                <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                    Register
                </a>
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
                </svg>
                </button>
            </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="md:hidden bg-slate-900 px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/about" className="text-gray-300 block px-3 py-2">About</a>
            <a href="/login" className="text-gray-300 block px-3 py-2">Login</a>
            <a href="/register" className="text-blue-400 block px-3 py-2 font-bold">Register</a>
            </div>
        )}
        </nav>
    );
};

// Exporting the Navbar component
export default Navbar;