import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Trophy, Users, Star } from 'lucide-react';

const TurfCard = ({ turf }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={turf.images[0] || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800'} 
          alt={turf.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center">
          <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
          {turf.averageRating || 'New'}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex gap-2">
            {turf.sportTypes.map((sport) => (
              <span key={sport} className="bg-primary/90 backdrop-blur text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                {sport}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-primary transition">{turf.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span className="truncate">{turf.location?.area || turf.address}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <span className="text-sm text-gray-400 block mb-0.5">Price / Hour</span>
            <span className="text-lg font-extrabold text-gray-900">৳{turf.pricePerHour}</span>
          </div>
          <Link 
            to={`/turfs/${turf._id}`}
            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary transition shadow-lg shadow-gray-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
