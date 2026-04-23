import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLock, FiUser, FiShield } from 'react-icons/fi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full card-shadow bg-white rounded-3xl overflow-hidden">
        <div className="bg-kamonyiBlue p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FiShield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-blue-100/80 text-sm">Kamonyi District Management</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center text-sm mb-6 border border-red-100">{error}</div>}
          
          <div className="space-y-5 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="input-field pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-kamonyiBlue"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                required
                className="input-field pl-11 bg-gray-50 border-transparent focus:bg-white focus:border-kamonyiBlue"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full py-3">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}
