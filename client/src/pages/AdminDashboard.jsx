import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiClock, FiCheckCircle, FiActivity } from 'react-icons/fi';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
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
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Dashboard</h1>
          <p className="text-slate-500">Overview of all district complaints</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { title: 'Total', value: stats.total, icon: <FiActivity />, color: 'bg-indigo-50 text-indigo-600' },
          { title: 'Pending', value: stats.pending, icon: <FiClock />, color: 'bg-yellow-50 text-yellow-600' },
          { title: 'In Progress', value: stats.inProgress, icon: <FiUsers />, color: 'bg-blue-50 text-blue-600' },
          { title: 'Resolved', value: stats.resolved, icon: <FiCheckCircle />, color: 'bg-green-50 text-green-600' }
        ].map((stat, idx) => (
          <div key={idx} className="card-shadow bg-white rounded-2xl p-6 flex flex-col justify-center items-start">
            <div className={`p-3 rounded-xl mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 font-medium">{stat.title}</p>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="card-shadow bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Tracking ID</th>
                <th className="p-4 font-semibold">Citizen</th>
                <th className="p-4 font-semibold">Sector</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-gray-500">No complaints found.</td></tr>
              ) : complaints.map((complaint) => (
                <tr key={complaint._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-medium text-kamonyiBlue">{complaint.trackingId}</td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800">{complaint.citizen?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{complaint.citizen?.phone}</p>
                  </td>
                  <td className="p-4 text-gray-700">{complaint.citizen?.address?.umurenge}</td>
                  <td className="p-4 text-gray-700">{complaint.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 ext-sm">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/complaints/${complaint._id}`} className="text-kamonyiBlue hover:text-blue-900 font-medium text-sm border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                      View full
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
