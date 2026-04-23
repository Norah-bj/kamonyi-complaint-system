import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Calendar,
  Tag,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function TrackComplaint() {
  const [trackingId, setTrackingId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId) return;
    setLoading(true);
    setError('');
    setComplaint(null);
    try {
      const res = await axios.get(`/api/complaints/track/${trackingId}`);
      setComplaint(res.data);
    } catch (err) {
      setError('No complaint found with this tracking ID.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-orange-500 bg-orange-50 border-orange-100';
      case 'In Progress': return 'text-blue-500 bg-blue-50 border-blue-100';
      case 'Resolved': return 'text-green-500 bg-green-50 border-green-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <ShieldCheck className="w-6 h-6 text-kamonyiBlue" />
          </motion.div>
          <h1 className="text-3xl font-outfit font-black text-slate-900 mb-2 tracking-tight">Track Case Status</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Secure District Database</p>
        </div>

        <motion.form 
          onSubmit={handleTrack}
          className="bg-slate-50/50 backdrop-blur-md p-2 rounded-[1.5rem] border border-slate-100 flex items-center space-x-2 mb-12 shadow-inner"
        >
          <div className="flex-grow relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-kamonyiBlue transition-colors" />
            <input 
              type="text" 
              className="w-full bg-transparent border-none pl-12 pr-4 py-4 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
              placeholder="Enter Reference ID (e.g. KAM-XXXX)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-kamonyiBlue text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>Search Case</span>}
          </button>
        </motion.form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-xl text-center text-xs font-bold border border-red-100 mb-6 flex items-center justify-center space-x-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}

          {complaint && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Cool Result Card - Inspired by Neumorphic/Premium Style */}
              <div className="card-premium p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">Reference ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-outfit font-black text-slate-900 tracking-tight">{complaint.trackingId}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                  <span className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(complaint.status)}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{complaint.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Logged On</div>
                      <div className="text-xs font-bold text-slate-700">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <Tag className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Category</div>
                      <div className="text-xs font-bold text-slate-700">{complaint.category}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Card - Inspired by Dark Glow/Glass Style */}
              <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-kamonyiBlue/20 to-indigo-500/20 overflow-hidden">
                <div className="card-dark-glow min-h-[160px] !p-8">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">
                      <Activity className="w-4 h-4" />
                      <span>Official Resolution</span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">
                      {complaint.response || "Your case is currently undergoing administrative review at the District level. Detailed feedback will appear here shortly."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
