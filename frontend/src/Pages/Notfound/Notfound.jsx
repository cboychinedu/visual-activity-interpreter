// Importing the necessary modules 
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Search, Home, AlertTriangle } from 'lucide-react';

// Creating the component for Not found 
const NotFound = () => {
  return (
    <Fragment>
      {/* Adding the Navbar */}
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex items-center justify-center relative overflow-hidden">
        
        {/* Background Decorative Glows - Matching your Home page style */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-md w-full px-6 py-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl z-10 text-center">
          
          {/* Visual "Error" Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border border-slate-700 mb-8 relative">
            <Search className="w-10 h-10 text-blue-400" />
            <div className="absolute -top-1 -right-1">
               <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                </span>
              </span>
            </div>
          </div>

          <h1 className="text-8xl font-black text-white tracking-tighter mb-2">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            Subject Not Found
          </h2>

          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            The visual interpreter could not locate the coordinates for this page. It may have been moved or redacted from our system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-slate-700 rounded-xl font-bold hover:bg-slate-800 transition-all text-slate-300"
            >
              Go Back
            </button>
          </div>
          
          {/* System Status Hint */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              VAI System Status: Operational
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

// Exporting the Not found component 
export default NotFound;