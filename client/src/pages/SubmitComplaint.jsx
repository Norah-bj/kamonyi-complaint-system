import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUploadCloud, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

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
      console.error(err);
      alert('Error submitting complaint. Please try again.');
    }
    setLoading(false);
  };

  if (successId) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 card-shadow text-center">
        <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Complaint Submitted!</h2>
        <p className="text-lg text-slate-600 mb-6">Your tracking ID is below. Keep it safe to track your complaint status.</p>
        <div className="bg-kamonyiLightBlue p-4 rounded-xl inline-block mb-8">
          <span className="text-2xl font-mono font-bold text-kamonyiBlue">{successId}</span>
        </div>
        <button onClick={() => navigate('/track')} className="btn-primary w-full">Track Status Now</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-8 mb-20 bg-white card-shadow rounded-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-kamonyiBlue mb-2">Submit Complaint</h1>
        <p className="text-slate-500 mb-6">Step {step} of 5</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8">
          <div className="bg-kamonyiBlue h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="space-y-6 min-h-[300px]">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" className="input-field" value={formData.citizen.name} onChange={e => updateCitizen('name', e.target.value)} placeholder="Amazina yombi" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select className="input-field" value={formData.citizen.gender} onChange={e => updateCitizen('gender', e.target.value)}>
                    <option value="Gabo">Gabo (Male)</option>
                    <option value="Gore">Gore (Female)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status *</label>
                  <select className="input-field" value={formData.citizen.maritalStatus} onChange={e => updateCitizen('maritalStatus', e.target.value)}>
                    <option value="Ingaragu">Ingaragu (Single)</option>
                    <option value="Uubatse">Uubatse (Married)</option>
                    <option value="Uwamuze">Uwamuze (Widowed)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" className="input-field" value={formData.citizen.phone} onChange={e => updateCitizen('phone', e.target.value)} placeholder="078..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Submitting</label>
                  <select className="input-field" value={formData.citizen.reason} onChange={e => updateCitizen('reason', e.target.value)}>
                    <option value="Self">Ikibazo cyanjye bwite</option>
                    <option value="Family">Umuryango</option>
                    <option value="Organization">Ikigo/Itsinda</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Address */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Your Address (Kamonyi District)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector (Umurenge) *</label>
                <select className="input-field" value={formData.citizen.address.umurenge} onChange={e => updateAddress('umurenge', e.target.value)}>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cell (Akagari) *</label>
                <input type="text" className="input-field" value={formData.citizen.address.akagari} onChange={e => updateAddress('akagari', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Village (Umudugudu) *</label>
                <input type="text" className="input-field" value={formData.citizen.address.umudugudu} onChange={e => updateAddress('umudugudu', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Complaint */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Land/Property">Land / Property</option>
                  <option value="Administration">Local Administration</option>
                  <option value="Security">Security</option>
                  <option value="SocialServices">Social Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl mb-4">
                <h3 className="text-sm font-bold text-red-800 mb-2">Complaint Against:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name/Institution</label>
                    <input type="text" className="input-field py-2" value={formData.against.name} onChange={e => setFormData({...formData, against: {...formData.against, name: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Contact (Optional)</label>
                    <input type="text" className="input-field py-2" value={formData.against.contact} onChange={e => setFormData({...formData, against: {...formData.against, contact: e.target.value}})} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description of the issue (Ibisobanuro) *</label>
                <textarea rows="4" className="input-field resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Vuga muri make ikibazo cyawe..."></textarea>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Previous Actions */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Previous Actions</h2>
            <p className="text-sm text-gray-500 mb-4">Have you reported this issue elsewhere before?</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institutions Contacted (e.g. Umudugudu leader, Police)</label>
                <input type="text" className="input-field" value={formData.previousActions.institutions} onChange={e => setFormData({...formData, previousActions: {...formData.previousActions, institutions: e.target.value}})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What action was taken?</label>
                <textarea rows="3" className="input-field resize-none" value={formData.previousActions.whatTheyDid} onChange={e => setFormData({...formData, previousActions: {...formData.previousActions, whatTheyDid: e.target.value}})}></textarea>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Attachments & Submit */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Attachments & Review</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-kamonyiBlue transition-colors mb-6 cursor-pointer relative">
              <input type="file" multiple className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
              <FiUploadCloud className="w-12 h-12 text-kamonyiBlue mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Drag & Drop or Click to Upload</h3>
              <p className="text-sm text-gray-500 mt-1">PDF, Images (Max 5MB)</p>
            </div>

            {attachments.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="text-sm font-semibold mb-2">Attached Files:</h4>
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {attachments.map((file, i) => <li key={i}>{file.name}</li>)}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-kamonyiBlue mb-2">Summary</h3>
              <p className="text-sm text-gray-700"><strong>Name:</strong> {formData.citizen.name || 'Not provided'}</p>
              <p className="text-sm text-gray-700"><strong>Category:</strong> {formData.category}</p>
              <p className="text-sm text-gray-700"><strong>Sector:</strong> {formData.citizen.address.umurenge}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between border-t pt-6">
        <button 
          onClick={handlePrev} 
          disabled={step === 1} 
          className={`btn-secondary flex items-center space-x-2 ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FiArrowLeft /> <span>Back</span>
        </button>

        {step < 5 ? (
          <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
            <span>Next</span> <FiArrowRight />
          </button>
        ) : (
          <button onClick={submitComplaint} disabled={loading} className="btn-primary bg-green-600 hover:bg-green-700 shadow-md hover:shadow-green-500/20 px-8 text-lg flex items-center space-x-2">
            {loading ? <span>Loading...</span> : <span>Submit Complaint</span>}
          </button>
        )}
      </div>
    </div>
  );
}
