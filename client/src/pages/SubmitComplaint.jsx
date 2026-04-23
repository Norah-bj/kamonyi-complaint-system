import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  FileText, 
  History, 
  Paperclip,
  Send,
  AlertCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';

const SECTORS = ['Gacurabwenge', 'Karama', 'Kayenzi', 'Ngamba', 'Nyamiyaga', 'Nyarubaka', 'Rugalika', 'Rukoma', 'Runda'];

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);

  const [formData, setFormData] = useState({
    citizen: { name: '', gender: 'Gabo', maritalStatus: 'Ingaragu', reason: 'Self', phone: '', email: '', address: { umudugudu: '', akagari: '', umurenge: 'Gacurabwenge' } },
    against: { name: '', contact: '' },
    category: 'Land/Property',
    description: '',
    previousActions: { institutions: '', whatTheyDid: '' },
  });
  
  const [attachments, setAttachments] = useState([]);

  const updateCitizen = (field, value) => {
    setFormData({ ...formData, citizen: { ...formData.citizen, [field]: value } });
  };
  
  const updateAddress = (field, value) => {
    setFormData({ ...formData, citizen: { ...formData.citizen, address: { ...formData.citizen.address, [field]: value } } });
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...e.target.files]);
  };

  const submitComplaint = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('citizen', JSON.stringify(formData.citizen));
      data.append('against', JSON.stringify(formData.against));
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('previousActions', JSON.stringify(formData.previousActions));
      
      attachments.forEach(file => {
        data.append('attachments', file);
      });

      const res = await axios.post('/api/complaints', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccessId(res.data.trackingId);
    } catch (err) {
      alert('Error submitting complaint. Please try again.');
    }
    setLoading(false);
  };

  const stepIcons = [
    <User className="w-4 h-4" />,
    <MapPin className="w-4 h-4" />,
    <FileText className="w-4 h-4" />,
    <History className="w-4 h-4" />,
    <Paperclip className="w-4 h-4" />
  ];

  if (successId) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -mr-64 -mt-64" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="card-pinned max-w-md w-full !p-10 text-center"
        >
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FileCheck2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-outfit font-black text-slate-900 mb-2 tracking-tight">Case Recorded</h2>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium">
            Your formal complaint has been securely transmitted to the District administration.
          </p>
          
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-2xl mb-8 group transition-all hover:bg-white hover:border-kamonyiBlue hover:shadow-lg">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tracking Reference</div>
            <div className="text-3xl font-outfit font-black text-kamonyiBlue tracking-wider">{successId}</div>
          </div>

          <button 
            onClick={() => navigate('/track')} 
            className="w-full bg-kamonyiBlue text-white py-4 rounded-xl font-black text-xs shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>Track Status</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 -z-10" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm mb-4">
            <Sparkles className="w-3 h-3 text-kamonyiBlue" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Formal Submission Portal</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-outfit font-black text-slate-900 mb-2 tracking-tight"
          >
            Submit Complaint
          </motion.h1>
        </div>

        <div className="card-premium overflow-hidden border-none shadow-2xl">
          {/* Progress Header */}
          <div className="px-8 py-6 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {stepIcons.map((icon, i) => (
                <React.Fragment key={i}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    step > i + 1 ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 
                    step === i + 1 ? 'bg-kamonyiBlue text-white shadow-lg shadow-blue-500/20' : 
                    'bg-white/10 text-white/30 border border-white/5'
                  }`}>
                    {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : icon}
                  </div>
                  {i < 4 && <div className={`w-4 md:w-8 h-[1px] ${step > i + 1 ? 'bg-green-500' : 'bg-white/10'}`} />}
                </React.Fragment>
              ))}
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Phase {step}/5</span>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-h-[350px]"
              >
                {/* Steps Content - Redesigned inputs for Premium feel */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-kamonyiBlue rounded-full" />
                      <h2 className="text-xl font-outfit font-black text-slate-800 tracking-tight">Citizen Identity</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Legal Full Name</label>
                        <input type="text" className="input-field" value={formData.citizen.name} onChange={e => updateCitizen('name', e.target.value)} placeholder="Amazina yombi nk'uko ari ku ndangamuntu" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Gender</label>
                        <select className="input-field appearance-none" value={formData.citizen.gender} onChange={e => updateCitizen('gender', e.target.value)}>
                          <option value="Gabo">Gabo (Male)</option>
                          <option value="Gore">Gore (Female)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Active Phone</label>
                        <input type="tel" className="input-field" value={formData.citizen.phone} onChange={e => updateCitizen('phone', e.target.value)} placeholder="078..." />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                      <h2 className="text-xl font-outfit font-black text-slate-800 tracking-tight">Origin Address</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Sector (Umurenge)</label>
                        <select className="input-field appearance-none" value={formData.citizen.address.umurenge} onChange={e => updateAddress('umurenge', e.target.value)}>
                          {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Cell (Akagari)</label>
                        <input type="text" className="input-field" value={formData.citizen.address.akagari} onChange={e => updateAddress('akagari', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Village (Umudugudu)</label>
                        <input type="text" className="input-field" value={formData.citizen.address.umudugudu} onChange={e => updateAddress('umudugudu', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                      <h2 className="text-xl font-outfit font-black text-slate-800 tracking-tight">Case Specification</h2>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Legal Category</label>
                        <select className="input-field appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option value="Land/Property">Land / Property</option>
                          <option value="Administration">Local Administration</option>
                          <option value="Security">Security</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Detailed Narrative</label>
                        <textarea rows="6" className="input-field resize-none leading-relaxed" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Vuga muri make ikibazo cyawe mu buryo bwumvikana..."></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-slate-800 rounded-full" />
                      <h2 className="text-xl font-outfit font-black text-slate-800 tracking-tight">Previous Recourse</h2>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Institutions Engaged</label>
                        <input type="text" className="input-field" value={formData.previousActions.institutions} onChange={e => setFormData({...formData, previousActions: {...formData.previousActions, institutions: e.target.value}})} placeholder="e.g. RIB, Police, Local Council..." />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Action Summary</label>
                        <textarea rows="5" className="input-field resize-none leading-relaxed" value={formData.previousActions.whatTheyDid} onChange={e => setFormData({...formData, previousActions: {...formData.previousActions, whatTheyDid: e.target.value}})} placeholder="What was the result of your previous report?"></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                      <h2 className="text-xl font-outfit font-black text-slate-800 tracking-tight">Final Submission</h2>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2rem] p-12 text-center hover:border-kamonyiBlue hover:bg-white transition-all cursor-pointer">
                        <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
                        <UploadCloud className="w-10 h-10 text-kamonyiBlue mx-auto mb-4" />
                        <h3 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-widest">Evidence Upload</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PDF, PNG, JPG (MAX 5MB per file)</p>
                      </div>
                    </div>
                    {attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((file, i) => (
                          <div key={i} className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-slate-600 border border-slate-100 shadow-sm flex items-center space-x-2">
                            <Paperclip className="w-3 h-3 text-kamonyiBlue" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Footer */}
          <div className="px-10 py-8 bg-slate-50 flex justify-between items-center border-t border-slate-100">
            <button onClick={handlePrev} disabled={step === 1} className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-all ${step === 1 ? 'text-slate-300' : 'text-slate-500 hover:text-kamonyiBlue'}`}>
              <ChevronLeft className="w-4 h-4" /> <span>Previous</span>
            </button>

            {step < 5 ? (
              <button onClick={handleNext} className="bg-kamonyiBlue text-white px-10 py-4 rounded-xl font-black text-xs shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2">
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={submitComplaint} disabled={loading} className="bg-kamonyiBlue text-white px-12 py-4 rounded-xl font-black text-xs shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Transmit Complaint</span><Send className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
