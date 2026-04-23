import { Link } from 'react-router-dom';
import { FiFileText, FiSearch, FiShield } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-kamonyiLightBlue text-kamonyiBlue px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <FiShield className="w-4 h-4" />
            <span>Kamonyi District Official Portal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Tanga Ikibazo Cyawe.<br />
            <span className="text-kamonyiBlue">Turakumva.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Submit your complaints seamlessly. We are committed to listening and acting on your concerns to build a better Kamonyi District.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/submit" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center space-x-2 group">
              <FiFileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Submit Complaint</span>
            </Link>
            
            <Link to="/track" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center space-x-2 group">
              <FiSearch className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Track Status</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Easy Submission', desc: 'A simple 5-step process to detail your issue.', icon: '📝' },
              { title: 'Transparent Tracking', desc: 'Follow your complaint status in real-time.', icon: '🔍' },
              { title: 'Quick Resolution', desc: 'Direct routing to relevant district officials.', icon: '⚡' }
            ].map((feature, i) => (
              <div key={i} className="card-shadow p-8 text-center rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
