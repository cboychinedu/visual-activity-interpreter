// Importing the necessary modules
import { Fragment } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { 
  BookOpen, 
  Terminal, 
  Layers, 
  Settings, 
  Code, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

// Creating the doc page component 
const DocsPage = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
        
        {/* HEADER */}
        <header className="py-16 border-b border-slate-800 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="text-blue-400" size={32} />
              <span className="text-blue-400 font-mono tracking-widest uppercase text-sm font-bold">Documentation</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Implementation</span> Guide
            </h1>
            <p className="mt-4 text-slate-400 max-w-2xl text-lg">
              Everything you need to know about the VAI pipeline, from frame ingestion to neural alignment.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* SIDE NAVIGATION */}
            <aside className="lg:w-1/4">
              <nav className="sticky top-24 space-y-1">
                {['Quick Start', 'Architecture', 'AI Pipeline', 'API Reference', 'Deployment'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:w-3/4 space-y-20">
              
              {/* QUICK START */}
              <section id="quick-start">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Terminal size={24} className="text-blue-400" /> Quick Start
                </h2>
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                  <p className="mb-4 text-slate-300">Initialize the environment and launch the local stream server:</p>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-blue-300 border border-slate-700">
                    <p># Clone the repository</p>
                    <p className="text-white">git clone https://github.com/vlm-project/vai-vision.git</p>
                    <p className="mt-2"># Install dependencies</p>
                    <p className="text-white">pip install -r requirements.txt && npm install</p>
                    <p className="mt-2"># Run the development server</p>
                    <p className="text-white">npm run dev</p>
                  </div>
                </div>
              </section>

              {/* ARCHITECTURE DETAIL */}
              <section id="architecture">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Layers size={24} className="text-indigo-400" /> System Architecture
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Our low-latency pipeline is designed for 30fps throughput. The system utilizes a decoupled architecture where the UI handles rendering while a Python-based backend manages heavy ML inference.
                </p>
                
                

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <h4 className="font-bold text-white mb-2">Frontend (React)</h4>
                    <p className="text-sm text-slate-400">Manages MediaDevices API for camera access and renders SVG-based overlays for detected activities.</p>
                  </div>
                  <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <h4 className="font-bold text-white mb-2">Inference (TensorFlow)</h4>
                    <p className="text-sm text-slate-400">Uses a CNN backbone for feature extraction and a Transformer head for semantic mapping.</p>
                  </div>
                </div>
              </section>

              {/* AI PIPELINE */}
              <section id="ai-pipeline">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings size={24} className="text-cyan-400" /> The AI Pipeline
                </h2>
                <div className="space-y-4">
                  {[
                    { step: "Data Normalization", detail: "Frames are resized to 224x224 and normalized using ImageNet mean/std values." },
                    { step: "Feature Extraction", detail: "A pre-trained MobileNetV3 extracts high-level spatial features from the stream." },
                    { step: "Temporal Pooling", detail: "Short-term temporal buffers ensure that motion is captured, not just static pixels." },
                    { step: "Semantic Decoding", detail: "The VLM maps features to the most probable linguistic description." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <CheckCircle2 className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <strong className="text-slate-200 block">{item.step}</strong>
                        <span className="text-slate-400 text-sm">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* API REFERENCE */}
              <section id="api-reference">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code size={24} className="text-purple-400" /> API Reference
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-sm">
                        <th className="py-4 px-2">Endpoint</th>
                        <th className="py-4 px-2">Method</th>
                        <th className="py-4 px-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-slate-900">
                        <td className="py-4 px-2 font-mono text-blue-300">/api/v1/predict</td>
                        <td className="py-4 px-2"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">POST</span></td>
                        <td className="py-4 px-2 text-slate-400">Submit base64 frame for real-time analysis.</td>
                      </tr>
                      <tr className="border-b border-slate-900">
                        <td className="py-4 px-2 font-mono text-blue-300">/api/v1/status</td>
                        <td className="py-4 px-2"><span className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-xs font-bold">GET</span></td>
                        <td className="py-4 px-2 text-slate-400">Returns health status of the ML worker nodes.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Need help with implementation?</h3>
                <p className="text-slate-400 mb-6">Join our developer community or check out the GitHub issues.</p>
                <button className="flex items-center gap-2 mx-auto bg-white text-slate-950 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-all">
                  Contact Support <ArrowRight size={18} />
                </button>
              </div>

            </main>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
};

// Exporting the docs page component 
export default DocsPage;