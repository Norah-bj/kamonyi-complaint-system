import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Users,
  CheckCircle2,
  Sparkles,
  MousePointer2,
  FileCheck2,
  Database
} from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-inter selection:bg-blue-50 selection:text-kamonyiBlue overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 -z-20" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-10 animate-glow" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <motion.div 
          className="max-w-6xl mx-auto flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-slate-200 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Official District Portal</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-outfit font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Tanga Ikibazo. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-kamonyiBlue to-indigo-600">Turakumva.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            A modern, transparent platform for citizens of Kamonyi to voice their 
            concerns. We bridge the gap between you and the administration with speed.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20"
          >
            <Link to="/submit" className="group px-8 py-3.5 bg-kamonyiBlue text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-600 transition-all flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Submit Complaint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/track" className="px-8 py-3.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Track Status</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Cool Cards Section - Inspired by the User's Shared Images */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Dashboard Inspired (Image 1) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-dark-glow min-h-[320px] flex flex-col justify-between group"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-outfit font-black text-white mb-2">Citizen Insights</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Analyze public sentiment and common concerns across all sectors in real-time.
              </p>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-white/5 flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-slate-500 uppercase">Growth</div>
                <div className="text-2xl font-outfit font-black text-white">+24%</div>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />)}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Glassmorphism Inspired (Image 3) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative min-h-[320px] rounded-[2.5rem] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-kamonyiBlue -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
            
            <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 p-8 flex flex-col justify-between">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-xl border border-white/30 animate-float">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-outfit font-black text-white mb-2">Smart Routing</h3>
                <p className="text-blue-50/70 text-xs font-medium leading-relaxed">
                  Automated case distribution ensuring the right department handles your case instantly.
                </p>
              </div>
              
              <div className="flex items-center space-x-3 text-white">
                <div className="text-sm font-black uppercase tracking-widest underline decoration-2 underline-offset-8">Learn More</div>
                <MousePointer2 className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Neumorphic/Clean Inspired (Image 2) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-neumorphic min-h-[320px] p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                <FileCheck2 className="w-6 h-6 text-kamonyiBlue" />
              </div>
              <h3 className="text-xl font-outfit font-black text-slate-800 mb-2">98% Success</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                Record-breaking resolution rates through streamlined administrative workflows.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                Verified System
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Second Visual Section - Tilted/Pinned Style (Image 5) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest">Architecture</div>
            <h2 className="text-4xl font-outfit font-black text-slate-900 tracking-tight leading-tight">
              A Pinned Framework <br />for Performance.
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Every detail of the Kamonyi Complaint System is optimized for the citizen experience, 
              ensuring accessibility and transparency at every layer.
            </p>
            <div className="pt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-slate-700">Instant Sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-bold text-slate-700">AES-256 Auth</span>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ rotate: -5 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="card-pinned mt-12"
            >
              <div className="text-[10px] font-black text-kamonyiBlue uppercase mb-2">Local Gov</div>
              <div className="text-lg font-outfit font-black text-slate-800 mb-2">Umurenge</div>
              <p className="text-[10px] text-slate-400 font-medium">Direct connection to sector administration.</p>
            </motion.div>
            
            <motion.div 
              initial={{ rotate: 3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="card-pinned"
            >
              <div className="text-[10px] font-black text-indigo-500 uppercase mb-2">Resolution</div>
              <div className="text-lg font-outfit font-black text-slate-800 mb-2">Direct Feedback</div>
              <p className="text-[10px] text-slate-400 font-medium">Talk directly to the officials handling your case.</p>
            </motion.div>

            <motion.div 
              initial={{ rotate: -2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="card-pinned md:-mt-8"
            >
              <Database className="w-6 h-6 text-slate-300 mb-4" />
              <div className="text-lg font-outfit font-black text-slate-800 mb-2">Secure Logs</div>
              <p className="text-[10px] text-slate-400 font-medium">Audit trails for every administrative action.</p>
            </motion.div>

            <motion.div 
              initial={{ rotate: 6 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="card-pinned mt-4"
            >
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-outfit font-black text-slate-800">Fast Track</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center">
        <p className="text-slate-300 font-bold uppercase tracking-widest text-[9px]">
          © 2024 Administration of Kamonyi District. Digital Excellence Center.
        </p>
      </footer>
    </div>
  );
}
