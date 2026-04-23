import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  FileText, 
  History, 
  ShieldCheck, 
  Paperclip, 
  Send,
  AlertCircle,
  Calendar,
  Activity,
  Info,
  ChevronRight
} from 'lucide-react';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/admin/login');
        
        const res = await axios.get(`/api/complaints/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaint(res.data);
        setStatus(res.data.status);
        setResponse(res.data.response || '');
      } catch (err) {
        navigate('/admin');
      }
    };
    fetchDetail();
  }, [id, navigate]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/complaints/${id}/status`, 
        { status, response },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setComplaint(prev => ({ ...prev, status, response }));
    } catch (err) {
      alert('Failed to update.');
    }
    setSaving(false);
  };

  if (!complaint) return <div className="flex items-center justify-center min-h-screen"><div className="w-6 h-6 border-2 border-kamonyiBlue border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-slate-50/10 font-inter relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20 -z-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link 
          to="/admin" 
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-kamonyiBlue font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          <span className="uppercase tracking-widest text-[9px]">Back to System Dashboard</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Case Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden relative">
              <div className="px-10 py-8 border-b border-slate-50 bg-slate-900 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">Tracking Reference</div>
                    <h1 className="text-xl font-outfit font-black text-white">{complaint.trackingId}</h1>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Submission Date</div>
                  <div className="text-xs font-bold text-white">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="p-10 space-y-12">
                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-kamonyiBlue uppercase tracking-widest">
                    <div className="w-1.5 h-4 bg-kamonyiBlue rounded-full" />
                    <span>Case Description</span>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{complaint.description}</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-red-400 uppercase tracking-widest">
                    <div className="w-1.5 h-4 bg-red-400 rounded-full" />
                    <span>Reported Entity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="card-premium !p-6 bg-red-50/30 border-red-100">
                      <div className="text-[9px] font-black text-red-300 uppercase mb-1">Name/Department</div>
                      <div className="text-sm font-bold text-red-900">{complaint.against?.name || 'N/A'}</div>
                    </div>
                    <div className="card-premium !p-6 bg-red-50/30 border-red-100">
                      <div className="text-[9px] font-black text-red-300 uppercase mb-1">Contact Reference</div>
                      <div className="text-sm font-bold text-red-900">{complaint.against?.contact || 'N/A'}</div>
                    </div>
                  </div>
                </section>

                {complaint.attachments?.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="w-1.5 h-4 bg-slate-400 rounded-full" />
                      <span>Evidentiary Files</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {complaint.attachments.map((file, i) => (
                        <a key={i} href={`http://localhost:5000/${file.path}`} target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-kamonyiBlue hover:shadow-lg transition-all text-xs font-bold text-slate-600 group">
                          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-kamonyiBlue group-hover:text-white transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span>{file.filename || `Evidence ${i+1}`}</span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Pinned Card for Citizen Details */}
            <div className="card-pinned !p-8">
              <div className="flex items-center space-x-2 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
                <User className="w-3 h-3 text-kamonyiBlue" />
                <span>Complainant Identity</span>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-[8px] font-black text-slate-300 uppercase mb-1">Full Legal Name</div>
                  <div className="text-base font-outfit font-black text-slate-900">{complaint.citizen?.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[8px] font-black text-slate-300 uppercase mb-1">Location</div>
                    <div className="text-xs font-bold text-slate-700">{complaint.citizen?.address?.umurenge}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-slate-300 uppercase mb-1">Contact</div>
                    <div className="text-xs font-bold text-slate-700">{complaint.citizen?.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Glow Card for Official Action */}
            <div className="card-dark-glow !p-8 min-h-[400px] flex flex-col shadow-2xl shadow-blue-900/20">
              <div className="relative z-10 flex items-center space-x-2 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8">
                <Activity className="w-4 h-4" />
                <span>Executive Resolution</span>
              </div>
              
              <div className="relative z-10 space-y-6 flex-grow">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/30 uppercase ml-1">Update Case Status</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/30 transition-all" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending" className="text-slate-900">Pending Review</option>
                    <option value="In Progress" className="text-slate-900">Actively Processing</option>
                    <option value="Resolved" className="text-slate-900">Mark as Resolved</option>
                  </select>
                </div>

                <div className="space-y-2 flex-grow">
                  <label className="text-[9px] font-black text-white/30 uppercase ml-1">Official Findings/Response</label>
                  <textarea 
                    rows="6" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs text-white placeholder:text-white/20 outline-none resize-none font-medium leading-relaxed focus:ring-2 focus:ring-blue-500/30 transition-all" 
                    placeholder="Type official findings or resolution details..." 
                    value={response} 
                    onChange={(e) => setResponse(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleUpdate} 
                  disabled={saving} 
                  className="w-full bg-kamonyiBlue text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Resolution</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center space-x-2 text-[9px] text-white/20 font-bold uppercase py-2">
                  <Info className="w-3 h-3" />
                  <span>Visible to Complainant</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
