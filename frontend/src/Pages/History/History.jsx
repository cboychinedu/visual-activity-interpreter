// Importing the necessary modules 
import Cookies from "js-cookie"; 
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { 
    Clock, 
    Trash2, 
    Download, 
    Filter, 
    Calendar,
    FileText,
    ExternalLink,
    Loader2 
} from 'lucide-react';
import { 
    Fragment, 
    useState, 
    useEffect 
} from 'react';

// Creating the history component 
const History = () => {
    // Setting the history data state 
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    // Getting the user token value from the cookie storage 
    const userToken = Cookies.get("userTokenData"); 

    // Creating a function to fetch the history data from the backend 
    const fetchHistory = async () => {
        // Using try catch block to perform the fetch request 
        try {
            // Loading bar 
            setIsLoading(true);

            // Setting the server url 
            const serverUrl = `${import.meta.env.VITE_SERVER_URL}/history`;

            // Making the fetch request to the server 
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'userToken': userToken
                }
            });

            // if the response was an error, throw an error message 
            if (!response.ok) {
                throw new Error('Failed to fetch history data');
            }

            // On success, save the response into a data array
            const responseData = await response.json();
            
            // Display the history data by saving it into the state variable 
            setHistoryData(Array.isArray(responseData.data) ? responseData.data : []);
            // setHistoryData(data); 
        } 
        // On errors generated, catch the error and log it to the console. 
        catch (err) {
            // Showing the error message 
            setError(err.message);

            // Logging the error message to the console 
            console.error("Error fetching history:", err);
        } 
        // finally remove the loading bar 
        finally {
            // Removing the loaded bar 
            setIsLoading(false);
        }
    };

    // Creating a function for deleting the history data 
    const deleteEntry = (id) => {
        setHistoryData(prev => prev.filter(item => item.id !== id));
    };

    // On component mount, fetch the history data 
    useEffect(() => {       
        // Fetch the history data 
        fetchHistory();
    }, []);


    // Rendering the jsx component 
    return (
        <Fragment>
            <Navbar />
            
            <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 lg:p-8">
                <div className="max-w-6xl mx-auto pt-10">
                    
                    {/* Header */}
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

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Sessions</p>
                            <h3 className="text-3xl font-bold text-white mt-1">{historyData.length}</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Status</p>
                            <h3 className="text-lg font-bold text-blue-400 mt-1">{isLoading ? "Syncing..." : "Up to date"}</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Average Accuracy</p>
                            <h3 className="text-3xl font-bold text-cyan-400 mt-1">94.8%</h3>
                        </div>
                    </div>

                    {/* History Table */}
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
                                    {!isLoading && historyData.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-mono text-sm text-white">{item.id || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    {/* 4. FIXED: Added optional chaining for safer string splitting */}
                                                    <span className="text-sm text-slate-200">{item.timestamp?.split(",")[1]}</span>
                                                    <span className="text-xs text-slate-500">{item.timestamp?.split(",")[0]}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-cyan-400 font-medium">{item.interpretation}</span>
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
                        
                        {/* Loading State UI */}
                        {isLoading && (
                            <div className="p-20 text-center">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
                                <p className="text-slate-500">Loading your history...</p>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && historyData.length === 0 && (
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