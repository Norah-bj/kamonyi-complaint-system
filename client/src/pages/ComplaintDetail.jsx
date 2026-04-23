import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiUser, FiMapPin, FiFileText, FiClock, FiCheckSquare } from 'react-icons/fi';

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
        alert('Error fetching complaint details/Not found');
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
      alert('Update successful!');
    } catch (err) {
      alert('Fail to update');
    }
    setSaving(false);
  };

  if (!complaint) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <Link to="/admin" className="inline-flex items-center text-gray-500 hover:text-kamonyiBlue mb-6 group">
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Detalles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-shadow bg-white rounded-3xl p-8">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Complaint ID</p>
                <h1 className="text-2xl font-mono font-bold text-kamonyiBlue">{complaint.trackingId}</h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                <p className="font-semibold text-slate-800">{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold flex items-center mb-3"><FiCheckSquare className="mr-2 text-kamonyiBlue"/> Category</h2>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-100">{complaint.category}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold flex items-center mb-3"><FiFileText className="mr-2 text-kamonyiBlue"/> Description</h2>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap text-gray-700 leading-relaxed">
                {complaint.description}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-red-700 mb-3">Complaint Against</h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-red-500">Name/Institution</p>
                  <p className="font-semibold text-red-900">{complaint.against?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-red-500">Contact</p>
                  <p className="font-semibold text-red-900">{complaint.against?.contact || 'N/A'}</p>
                </div>
              </div>
            </div>

            {complaint.previousActions && complaint.previousActions.institutions && (
              <div className="mb-6">
                <h2 className="text-lg font-bold flex items-center mb-3"><FiClock className="mr-2 text-kamonyiBlue"/> Previous Actions</h2>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="font-semibold text-gray-800 mb-2">Institutions contacted:</p>
                  <p className="text-gray-700 mb-4">{complaint.previousActions.institutions}</p>
                  <p className="font-semibold text-gray-800 mb-2">Result/Action taken:</p>
                  <p className="text-gray-700">{complaint.previousActions.whatTheyDid}</p>
                </div>
              </div>
            )}
            
            {complaint.attachments && complaint.attachments.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3">Attachments</h2>
                <div className="flex flex-wrap gap-4">
                  {complaint.attachments.map((file, i) => (
                    <a key={i} href={`http://localhost:5000/${file.path}`} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                      <FiFileText className="mr-2" />
                      <span className="text-sm font-medium">{file.filename || `Attachment ${i+1}`}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info & Actions */}
        <div className="space-y-6">
          <div className="card-shadow bg-white rounded-3xl p-6">
            <h2 className="text-lg font-bold flex items-center border-b pb-3 mb-4"><FiUser className="mr-2 text-kamonyiBlue"/> Details: Citizen</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
                <p className="font-medium text-gray-900">{complaint.citizen?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Phone / Email</p>
                <p className="font-medium text-gray-900">{complaint.citizen?.phone} <br/> {complaint.citizen?.email}</p>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Gender</p>
                  <p className="font-medium text-gray-900">{complaint.citizen?.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Marital</p>
                  <p className="font-medium text-gray-900">{complaint.citizen?.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-shadow bg-white rounded-3xl p-6">
            <h2 className="text-lg font-bold flex items-center border-b pb-3 mb-4"><FiMapPin className="mr-2 text-kamonyiBlue"/> Details: Address</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Sector (Umurenge)</p>
                <p className="font-medium text-gray-900">{complaint.citizen?.address?.umurenge}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Cell (Akagari)</p>
                <p className="font-medium text-gray-900">{complaint.citizen?.address?.akagari}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Village (Umudugudu)</p>
                <p className="font-medium text-gray-900">{complaint.citizen?.address?.umudugudu}</p>
              </div>
            </div>
          </div>

          <div className="card-shadow bg-blue-50 border border-blue-100 rounded-3xl p-6">
            <h2 className="text-lg font-bold text-kamonyiBlue border-b border-blue-200 pb-3 mb-4">Official Action</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Update Status</label>
                <select className="input-field bg-white" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Official Response</label>
                <textarea rows="4" className="input-field bg-white resize-y" placeholder="Type official response/resolution..." value={response} onChange={(e) => setResponse(e.target.value)}></textarea>
                <p className="text-xs text-gray-500 mt-2">This response will be visible to the citizen tracking this ID.</p>
              </div>
              <button onClick={handleUpdate} disabled={saving} className="btn-primary w-full shadow-sm hover:shadow-md">
                {saving ? 'Saving...' : 'Save Updates'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
