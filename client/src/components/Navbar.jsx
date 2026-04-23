import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-kamonyiBlue rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="font-poppins font-semibold text-xl text-slate-800">
                Kamonyi District
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isAdmin ? (
              <>
                <Link to="/track" className="text-gray-600 hover:text-kamonyiBlue font-medium px-3 py-2 rounded-md transition-colors">
                  Track Complaint
                </Link>
                <Link to="/submit" className="bg-kamonyiBlue text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-blue-900 transition-all active:scale-95">
                  Submit Complaint
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-kamonyiBlue font-medium px-3 py-2 rounded-md transition-colors">
                  Dashboard
                </Link>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href='/'; }} className="text-red-500 hover:bg-red-50 font-medium px-3 py-2 rounded-md transition-colors">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
