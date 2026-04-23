import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Access denied. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50/30 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden relative z-10"
      >
        <div className="bg-kamonyiBlue p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl" />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20"
          >
            <ShieldCheck className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-xl font-outfit font-black text-white mb-1 tracking-tight">Admin Portal</h2>
          <p className="text-[9px] text-white/60 font-black uppercase tracking-widest">District Management</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-500 p-3 rounded-lg text-center text-[10px] font-bold border border-red-100 flex items-center justify-center space-x-2"
            >
              <AlertCircle className="w-3 h-3" />
              <span>{error}</span>
            </motion.div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-kamonyiBlue transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-100 focus:border-kamonyiBlue transition-all font-medium"
                  placeholder="admin@kamonyi.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-kamonyiBlue transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-100 focus:border-kamonyiBlue transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-kamonyiBlue text-white py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-100 hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Login</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
