import React from 'react';
import { useSearchParams } from 'react-router-dom';
import turfService from '@/services/turfService';
import TurfCard from '@/components/turf/TurfCard';
import { Search, SlidersHorizontal, Map as MapIcon, Loader2, X } from 'lucide-react';

const TurfListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [turfs, setTurfs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(false);

  const fetchTurfs = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries([...searchParams]);
      const res = await turfService.getTurfs(params);
      setTurfs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTurfs();
  }, [searchParams]);

  const updateFilters = (name, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header / Search Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by area (e.g. Uttara, Mirpur)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition"
                onChange={(e) => updateFilters('area', e.target.value)}
                value={searchParams.get('area') || ''}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20">
                <MapIcon className="w-5 h-5" />
                Map
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in slide-in-from-top duration-300">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Sport Type</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary transition"
                  onChange={(e) => updateFilters('sportTypes', e.target.value)}
                  value={searchParams.get('sportTypes') || ''}
                >
                  <option value="">All Sports</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Facility</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary transition"
                  onChange={(e) => updateFilters('isIndoor', e.target.value)}
                  value={searchParams.get('isIndoor') || ''}
                >
                  <option value="">Any</option>
                  <option value="true">Indoor</option>
                  <option value="false">Outdoor</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={clearFilters}
                  className="text-sm font-bold text-red-500 hover:underline flex items-center mb-3"
                >
                  <X className="w-4 h-4 mr-1" /> Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {loading ? 'Searching...' : `${turfs.length} Turfs Found`}
          </h2>
          <div className="hidden sm:block">
            <select className="bg-transparent text-sm font-bold text-gray-500 focus:outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Finding the best pitches for you...</p>
          </div>
        ) : turfs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {turfs.map((turf) => (
              <TurfCard key={turf._id} turf={turf} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No turfs found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any turfs matching your filters. Try adjusting your search area or sport type.</p>
            <button 
              onClick={clearFilters}
              className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TurfListing;
