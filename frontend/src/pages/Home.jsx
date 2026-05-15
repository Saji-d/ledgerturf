import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/turfs?area=${searchQuery}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[750px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
            alt="Football pitch" 
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
              Your Game, <br /><span className="text-primary">Your Time.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium max-w-xl">
              Book the finest football and cricket turfs across Dhaka. Real-time availability, instant booking, and premium facilities.
            </p>

            <form onSubmit={handleSearch} className="mt-12 bg-white p-2 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl border border-gray-100">
              <div className="flex-1 flex items-center px-6">
                <Search className="text-gray-400 w-6 h-6 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search by area (e.g. Uttara, Banani)..." 
                  className="w-full py-4 text-gray-900 font-bold outline-none placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="bg-primary text-white px-10 py-4 rounded-[24px] font-black text-lg hover:bg-primary-dark transition shadow-lg shadow-primary/20"
              >
                Find Turf
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-8 mt-12">
              <Link 
                to="/turfs" 
                className="text-white font-black text-lg flex items-center group bg-white/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition"
              >
                Browse All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                to="/register/owner" 
                className="text-primary font-black text-lg flex items-center hover:underline"
              >
                List Your Turf & Earn
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Areas Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">Explore by Area</h2>
              <p className="text-gray-500 mt-4 text-lg font-medium">Find the closest action in your neighborhood.</p>
            </div>
            <Link to="/turfs" className="bg-white px-8 py-4 rounded-2xl text-primary font-black flex items-center shadow-sm hover:shadow-md transition">
              View All Areas <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Uttara', 'Mirpur', 'Banani', 'Gulshan', 'Dhanmondi', 'Bashundhara', 'Badda', 'Khilkhet'].map((area, idx) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/turfs?area=${area}`}
                  className="bg-white p-10 rounded-[40px] text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 block group"
                >
                  <div className="bg-gray-50 w-20 h-20 rounded-[24px] flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:rotate-12 transition-all duration-500">
                    <MapPin className="w-10 h-10 text-gray-400 group-hover:text-white transition" />
                  </div>
                  <span className="font-black text-2xl text-gray-800">{area}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Why Choose LedgerTurf?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">We've built the most reliable platform for Dhaka's athletes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Search className="w-10 h-10 text-primary" />, 
                title: "Smart Discovery", 
                desc: "Find turfs using our GeoJSON map search or area-based filters with real photos." 
              },
              { 
                icon: <Calendar className="w-10 h-10 text-secondary" />, 
                title: "Live Booking", 
                desc: "No more phone calls. Select your slot and book instantly with live availability." 
              },
              { 
                icon: <CheckCircle className="w-10 h-10 text-green-500" />, 
                title: "Verified Facilities", 
                desc: "Every turf is vetted by our team to ensure premium grass and amenities." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-12 rounded-[48px] hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-gray-100">
                <div className="inline-flex items-center justify-center p-6 bg-white rounded-3xl shadow-sm mb-8 group-hover:scale-110 transition duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-2xl p-16 md:p-24 rounded-[64px] border border-white/20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left max-w-lg">
              <h2 className="text-5xl font-black text-white mb-6 leading-tight">Ready to kick off?</h2>
              <p className="text-primary-light text-2xl font-medium">Join Dhaka's biggest turf community and book your game today.</p>
            </div>
            <Link 
              to="/register/player" 
              className="bg-white text-primary px-12 py-6 rounded-[32px] font-black text-2xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
