import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  Search, 
  Filter,
  MapPin,
  Tag,
  BarChart3,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/admin/login');
        
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(res.data);
      } catch (err) {
        navigate('/admin/login');
      }
    };
    fetchComplaints();
  }, [navigate]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending': return 'bg-orange-50 text-orange-500 border-orange-100';
      case 'In Progress': return 'bg-blue-50 text-blue-500 border-blue-100';
      case 'Resolved': return 'bg-green-50 text-green-500 border-green-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const filteredComplaints = complaints.filter(c => 
    c.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.citizen?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-slate-50/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-kamonyiBlue uppercase tracking-[0.3em] mb-2">
              <TrendingUp className="w-3 h-3" />
              <span>Real-time Analytics</span>
            </div>
            <h1 className="text-3xl font-outfit font-black text-slate-900 tracking-tight">Executive Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-3 text-xs outline-none focus:ring-4 focus:ring-blue-100 focus:border-kamonyiBlue transition-all w-64 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-50 shadow-sm transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid - Inspired by Dashboard/Dark Metrics (Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: 'Total Influx', value: stats.total, icon: <BarChart3 className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600', trend: '+12.5%' },
            { title: 'Pending Action', value: stats.pending, icon: <Clock className="w-5 h-5" />, color: 'from-orange-400 to-red-500', trend: '-2.4%' },
            { title: 'Active Flow', value: stats.inProgress, icon: <Activity className="w-5 h-5" />, color: 'from-sky-400 to-blue-500', trend: '+5.1%' },
            { title: 'Success Rate', value: stats.resolved, icon: <CheckCircle2 className="w-5 h-5" />, color: 'from-emerald-400 to-green-600', trend: '98%' }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="card-dark-glow min-h-[160px] !p-6 flex flex-col justify-between group"
            >
              <div className="relative z-10 flex justify-between items-start">
                <div className={`w-10 h-10 bg-gradient-to-tr ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20`}>
                  {stat.icon}
                </div>
                <div className="text-[10px] font-black text-green-400">{stat.trend}</div>
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.title}</div>
                <div className="text-3xl font-outfit font-black text-white">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table - Inspired by Premium Minimalist Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Filings</h3>
            <div className="text-[10px] font-bold text-slate-400">Showing {filteredComplaints.length} records</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Tracking Reference</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Identity</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocation</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="font-outfit font-black text-xs text-kamonyiBlue mb-0.5">{complaint.trackingId}</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-800 text-sm mb-0.5">{complaint.citizen?.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{complaint.citizen?.phone}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-1 mb-0.5">
                        <MapPin className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-600">{complaint.citizen?.address?.umurenge}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] font-bold text-slate-600">{complaint.category}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(complaint.status)}`}>
                        <div className="w-1 h-1 rounded-full bg-current" />
                        <span>{complaint.status}</span>
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Link 
                        to={`/admin/complaints/${complaint._id}`} 
                        className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-[10px] hover:bg-kamonyiBlue hover:text-white transition-all shadow-sm"
                      >
                        <span>Analyze</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
