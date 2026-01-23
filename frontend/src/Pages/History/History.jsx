// Importing the necessary modules 
import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { 
    Clock, 
    ChevronRight, 
    Trash2, 
    Download, 
    Filter, 
    Calendar,
    FileText,
    ExternalLink
} from 'lucide-react';

// Creating the history component 
const History = () => {
    // Mock data representing previous analysis sessions
    const [historyData, setHistoryData] = useState([
        {
            id: "VAI-8829",
            date: "2026-01-23",
            time: "14:20",
            duration: "05:12",
            frames: 156,
            topResult: "High activity: Person running",
            status: "Completed"
        },
        {
            id: "VAI-8828",
            date: "2026-01-23",
            time: "10:05",
            duration: "12:45",
            frames: 382,
            topResult: "Low activity: Stationary subject",
            status: "Completed"
        },
        {
            id: "VAI-8710",
            date: "2026-01-22",
            time: "18:45",
            duration: "02:10",
            frames: 65,
            topResult: "Detected: Hand gestures (sign language)",
            status: "Flagged"
        }
    ]);

    const deleteEntry = (id) => {
        setHistoryData(historyData.filter(item => item.id !== id));
    };

    return (
        <Fragment>
            <Navbar />
            
            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 lg:p-8">
                <div className="max-w-6xl mx-auto pt-10">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                                <Clock className="text-blue-500" />
                                Analysis History
                            </h1>
                            <p className="text-slate-400 mt-2">Review and export previous VLM interpretation logs.</p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm hover:bg-slate-800 transition-colors">
                                <Filter className="w-4 h-4" /> Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500 transition-all">
                                <Download className="w-4 h-4" /> Export All
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Sessions</p>
                            <h3 className="text-3xl font-bold text-white mt-1">128</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Frames Processed</p>
                            <h3 className="text-3xl font-bold text-blue-400 mt-1">14.2k</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Average Accuracy</p>
                            <h3 className="text-3xl font-bold text-cyan-400 mt-1">94.8%</h3>
                        </div>
                    </div>

                    {/* History Table/List */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800/50 border-b border-slate-700">
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase">Session ID</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase">Timestamp</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase">Top Interpretation</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase">Duration</th>
                                        <th className="p-4 text-xs font-bold text-slate-400 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {historyData.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-mono text-sm text-white">{item.id}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-slate-200">{item.date}</span>
                                                    <span className="text-xs text-slate-500">{item.time}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-cyan-400 font-medium">{item.topResult}</span>
                                                <p className="text-[10px] text-slate-500 mt-1">{item.frames} frames analyzed</p>
                                            </td>
                                            <td className="p-4 text-sm text-slate-400">
                                                {item.duration}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteEntry(item.id)}
                                                        className="p-2 hover:bg-red-900/20 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Empty State */}
                        {historyData.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="inline-flex p-4 bg-slate-800 rounded-full mb-4">
                                    <Calendar className="w-8 h-8 text-slate-600" />
                                </div>
                                <h4 className="text-white font-bold">No history found</h4>
                                <p className="text-slate-500 text-sm">New analysis sessions will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment>
    );
};

// Exporting the history component 
export default History;