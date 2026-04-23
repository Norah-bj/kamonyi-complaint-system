import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, LogOut, ArrowRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="fixed w-full top-4 z-50 px-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-premium px-6 py-3 flex justify-between items-center pointer-events-auto"
      >
        <div className="flex items-center">
          <Link to="/" className="group flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-8 h-8 bg-gradient-to-tr from-kamonyiBlue to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200"
            >
              <ShieldCheck className="text-white w-4 h-4" />
            </motion.div>
            <span className="font-outfit font-black text-lg text-slate-900 tracking-tighter">
              Kamonyi<span className="text-kamonyiBlue">District</span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[10px] font-black text-slate-400 hover:text-kamonyiBlue transition-colors uppercase tracking-[0.2em]">About</Link>
            <Link to="/track" className="text-[10px] font-black text-slate-400 hover:text-kamonyiBlue transition-colors uppercase tracking-[0.2em]">Track</Link>
          </div>

          <div className="flex items-center space-x-3">
            {!isAdmin ? (
              <Link to="/submit" className="group relative bg-kamonyiBlue text-white px-5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95 flex items-center space-x-2">
                <span>File a Case</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/admin" className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-white transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }} 
                  className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-white transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            <button className="md:hidden p-2 bg-slate-50 text-slate-600 rounded-lg">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
