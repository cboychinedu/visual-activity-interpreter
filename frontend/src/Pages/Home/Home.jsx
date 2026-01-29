// Importing the necessary modules
import { Fragment } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Camera, Cpu, Cloud, Activity, CheckCircle } from 'lucide-react';

// Creating the home page component 
const Home = () => {
  return (
    <Fragment> 
      {/* Adding the Navbar */}
        <Navbar /> 

        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 z-10">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Visual Language</span> Interpretation
                </h1>
                <p className="mt-6 text-xl text-slate-400 max-w-xl">
                High-performance system processing live camera frames to identify human activities using Computer Vision and Deep Learning.
                </p>
                <div className="mt-10 flex gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all">Launch Vision Stream</button>
                <button className="px-8 py-3 border border-slate-700 rounded-full font-bold hover:bg-slate-800 transition-all">Read Documentation</button>
                </div>
            </div>
            
            {/* Placeholder for images/image.jpg mentioned in README */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
                <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>
                <div className="relative border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-slate-800 p-2 flex gap-2 border-b border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                    <iframe 
                        className="aspect-video bg-slate-900 flex items-center justify-center" 
                        src="https://www.youtube.com/embed/hMo6ytoXhZo" 
                        title="VLM Project" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="about" className="py-20 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white">Advanced Features</h2>
                <div className="h-1 w-20 bg-blue-500 mx-auto mt-4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                { title: "Real-Time Analysis", desc: "Processes live camera feeds to interpret actions.", icon: <Camera className="text-blue-400" /> },
                { title: "Intelligent Overlay", desc: "Responsive UI with immediate feedback.", icon: <Activity className="text-cyan-400" /> },
                { title: "CV Backbone", desc: "Utilizes OpenCV and TensorFlow (CNN).", icon: <Cpu className="text-indigo-400" /> },
                { title: "Scalable Backend", desc: "Python/Node.js cloud-native architecture.", icon: <Cloud className="text-sky-400" /> }
                ].map((feature, i) => (
                <div key={i} className="p-6 bg-slate-800/40 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-colors">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* TECH STACK SECTION */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 border border-slate-700">
                <h2 className="text-2xl font-bold mb-8">Technical Stack</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <h4 className="text-blue-400 font-semibold mb-2">AI/ML</h4>
                    <ul className="text-slate-400 space-y-1 text-sm">
                    <li>Python / TensorFlow</li>
                    <li>Keras / OpenCV</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Frontend</h4>
                    <ul className="text-slate-400 space-y-1 text-sm">
                    <li>React.js</li>
                    <li>Real-time Visualization</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Backend</h4>
                    <ul className="text-slate-400 space-y-1 text-sm">
                    <li>Flask</li>
                    <li>RESTful APIs</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-blue-400 font-semibold mb-2">DevOps</h4>
                    <ul className="text-slate-400 space-y-1 text-sm">
                    <li>AWS / Digital Ocean</li>
                    <li>GitHub Actions</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* ARCHITECTURE SECTION */}
        <section className="py-20 bg-[#1c27398f]">
            <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Low-Latency Pipeline</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                <div className="text-3xl font-bold mb-2 text-blue-200">01</div>
                <h4 className="font-bold text-white mb-2">Data Ingestion</h4>
                <p className="text-blue-100 text-sm">High-volume frame capture and pre-processing.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                <div className="text-3xl font-bold mb-2 text-blue-200">02</div>
                <h4 className="font-bold text-white mb-2">Model Inference</h4>
                <p className="text-blue-100 text-sm">Deep Learning Vision models extract key features.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                <div className="text-3xl font-bold mb-2 text-blue-200">03</div>
                <h4 className="font-bold text-white mb-2">Visualization</h4>
                <p className="text-blue-100 text-sm">React renders interpretation layers in real-time.</p>
                </div>
            </div>
            </div>
        </section>
        {/* Adding the footer */}
        <Footer /> 
        </div>
    </Fragment>
  );
};

// Exporting the home page 
export default Home;