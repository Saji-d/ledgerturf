import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
            alt="Football pitch" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Your Game, <span className="text-primary">Your Time.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Book the finest football and cricket turfs across Dhaka. Real-time availability, instant booking, and the best facilities for your squad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/turfs" 
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition flex items-center justify-center shadow-lg"
              >
                Book a Turf <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/register?role=turfOwner" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition text-center"
              >
                List Your Turf
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to get your team on the field.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Search className="w-10 h-10 text-primary" />, 
                title: "Find a Turf", 
                desc: "Search by area or sport type. View nearby turfs on our interactive map." 
              },
              { 
                icon: <Calendar className="w-10 h-10 text-secondary" />, 
                title: "Select Slot", 
                desc: "Pick your preferred date and time. Real-time slot management prevents double bookings." 
              },
              { 
                icon: <CheckCircle className="w-10 h-10 text-green-500" />, 
                title: "Instant Booking", 
                desc: "Secure your spot instantly. Receive confirmation and details via your dashboard." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-10 rounded-3xl text-center hover:shadow-xl transition duration-300 group">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Explore by Area</h2>
              <p className="text-gray-600 mt-2">Find the closest action in your neighborhood.</p>
            </div>
            <Link to="/turfs" className="text-primary font-semibold flex items-center hover:underline">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Uttara', 'Mirpur', 'Banani', 'Gulshan', 'Dhanmondi', 'Khilkhet', 'Badda', 'Purbachal'].map((area) => (
              <Link 
                key={area} 
                to={`/turfs?area=${area}`}
                className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200"
              >
                <MapPin className="w-6 h-6 text-gray-400 mx-auto mb-3" />
                <span className="font-bold text-gray-800">{area}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg p-12 rounded-[40px] border border-white/20 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-white mb-4">Ready to kick off?</h2>
              <p className="text-primary-light text-xl">Join the thousands of players booking on LedgerTurf.</p>
            </div>
            <Link 
              to="/register" 
              className="bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
