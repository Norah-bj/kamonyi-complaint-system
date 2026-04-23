import { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiCheck, FiClock, FiActivity } from 'react-icons/fi';

export default function TrackComplaint() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.get(`/api/complaints/track/${trackingId}`);
      setResult(res.data);
    } catch (err) {
      setError('Complaint not found. Please check your tracking ID.');
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const statusIndex = result ? ['Pending', 'In Progress', 'Resolved'].indexOf(result.status) : 0;

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <div className="card-shadow bg-white rounded-3xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <FiSearch className="w-8 h-8 text-kamonyiBlue" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Track Complaint Status</h1>
          <p className="text-slate-500">Enter your Kamonyi tracking ID to see real-time updates.</p>
        </div>

        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="KAM-2026-0001" 
            className="input-field flex-grow text-center sm:text-left font-mono font-bold text-lg tracking-wider uppercase"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
          />
          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center min-w-[140px]">
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4 bg-red-50 py-2 rounded-lg">{error}</p>}
      </div>

      {result && (
        <div className="card-shadow bg-white rounded-3xl p-8 animate-fade-in shadow-xl shadow-blue-900/5">
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tracking ID</p>
              <h2 className="text-2xl font-mono font-bold text-kamonyiBlue">{result.trackingId}</h2>
            </div>
            <div className={`px-4 py-2 rounded-full border font-semibold text-sm ${getStatusColor(result.status)}`}>
              {result.status}
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="font-semibold text-gray-800 mb-6">Status Timeline</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 md:ml-4 space-y-8">
              
              <div className="relative pl-8">
                <div className={`absolute -left-[11px] p-1 rounded-full ${statusIndex >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <FiCheck className="w-3 h-3" />
                </div>
                <h4 className={`font-medium ${statusIndex >= 0 ? 'text-gray-900' : 'text-gray-400'}`}>Submitted</h4>
                <p className="text-sm text-gray-500">{new Date(result.createdAt).toLocaleDateString()} - Kamonyi System</p>
              </div>

              <div className="relative pl-8">
                <div className={`absolute -left-[11px] p-1 rounded-full ${statusIndex >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <FiActivity className="w-3 h-3" />
                </div>
                <h4 className={`font-medium ${statusIndex >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Under Review</h4>
                {statusIndex >= 1 && <p className="text-sm text-gray-500">Being reviewed by Sector Officials</p>}
              </div>

              <div className="relative pl-8">
                <div className={`absolute -left-[11px] p-1 rounded-full ${statusIndex >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <FiCheck className="w-3 h-3" />
                </div>
                <h4 className={`font-medium ${statusIndex >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Resolved</h4>
              </div>

            </div>
          </div>

          {result.response && (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiClock className="w-16 h-16 text-kamonyiBlue" />
              </div>
              <h3 className="font-bold text-kamonyiBlue mb-2">Official Response:</h3>
              <p className="text-gray-700 leading-relaxed relative z-10 whitespace-pre-line">{result.response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
