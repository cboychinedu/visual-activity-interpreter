// Importing the necessary modules
import { Fragment } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Cpu, Eye, Zap, Shield, Database, Network } from 'lucide-react';

// Creating the about component 
const About = () => {
  return (
    <Fragment>
        {/* Adding the navbar */}
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
        
        {/* HERO SECTION - THE CORE CONCEPT */}
        <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Bridging Vision and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Understanding</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
              VAI leverages state-of-the-art Visual Language Models (VLM) to transform raw pixel data from your webcam into meaningful, actionable semantic descriptions in real-time.
            </p>
          </div>
        </section>

        {/* TECHNICAL WORKFLOW SECTION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
                <p className="text-slate-400 mb-6">
                  Unlike traditional Computer Vision that only detects objects (like "chair" or "person"), our system utilizes a **Visual Language Model** pipeline to understand context and activity.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Eye className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Frame Capture</h4>
                      <p className="text-slate-400 text-sm">We capture live video at 30fps from your local hardware, ensuring a high-fidelity data stream.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                      <Cpu className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">VLM Inference</h4>
                      <p className="text-slate-400 text-sm">The frames are processed by a neural network that aligns visual features with linguistic tokens, allowing the AI to "read" the scene.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Real-Time Interpretation</h4>
                      <p className="text-slate-400 text-sm">The result is a low-latency natural language description of what the camera sees.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagram Placeholder */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <h3 className="text-white font-mono text-sm mb-6 uppercase tracking-widest text-blue-400">System Architecture</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">Webcam Input (Raw Frames)</div>
                  <div className="flex justify-center text-blue-500">↓</div>
                  <div className="p-4 bg-blue-600/20 rounded-xl border border-blue-500/50 text-center font-bold text-blue-100">Preprocessing & Normalization</div>
                  <div className="flex justify-center text-blue-500">↓</div>
                  <div className="p-4 bg-indigo-600 rounded-xl border border-indigo-500 text-center font-bold">VLM (CNN + Transformer)</div>
                  <div className="flex justify-center text-blue-500">↓</div>
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-center">Real-Time UI Interpretation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        {/* WHY CHOOSE OUR SYSTEM */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-16">The Technology Stack</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-800/50 border border-slate-800 rounded-2xl">
                <Database className="text-blue-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Scalable Processing</h3>
                <p className="text-slate-400 text-sm">We use optimized TensorFlow and Keras models to ensure that the heavy lifting of deep learning doesn't lag your browser.</p>
              </div>
              <div className="p-8 bg-slate-800/50 border border-slate-800 rounded-2xl">
                <Network className="text-cyan-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Neural Alignment</h3>
                <p className="text-slate-400 text-sm">Our Visual Language Model maps visual patterns directly to a multi-dimensional semantic space for accurate descriptions.</p>
              </div>
              <div className="p-8 bg-slate-800/50 border border-slate-800 rounded-2xl">
                <Shield className="text-indigo-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Privacy First</h3>
                <p className="text-slate-400 text-sm">Frames are processed securely, ensuring your stream data is used only for real-time inference and never stored without permission.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Ready to experience the future of vision?</h2>
                <button 
                    onClick={() => window.location.href = '/register'}
                    className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                    Create Free Account
                </button>
            </div>
        </section>

      </div>
      <Footer />
    </Fragment>
  );
};

// Exporting the about component
export default About;