import React from 'react';
import { useSearchParams } from 'react-router-dom';
import turfService from '@/services/turfService';
import TurfCard from '@/components/turf/TurfCard';
import Skeleton from '@/components/common/Skeleton';
import MapComponent from '@/components/turf/MapComponent';
import { Search, SlidersHorizontal, Map as MapIcon, Loader2, X } from 'lucide-react';

const TurfListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [turfs, setTurfs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(false);
  const [viewMode, setViewMode] = React.useState('list');

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
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by area (e.g. Uttara, Mirpur)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
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
              <button 
                onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20"
              >
                {viewMode === 'list' ? <><MapIcon className="w-5 h-5 mr-2" /> Show Map</> : <><SlidersHorizontal className="w-5 h-5 mr-2" /> Show List</>}
              </button>
            </div>
          </div>

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
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Date</label>
                <input 
                  type="date" 
                  className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary transition"
                  onChange={(e) => updateFilters('date', e.target.value)}
                  value={searchParams.get('date') || ''}
                />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Time</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary transition"
                    onChange={(e) => {
                      updateFilters('startTime', e.target.value);
                      const [h, m] = e.target.value.split(':').map(Number);
                      updateFilters('endTime', `${String(h + 1).padStart(2, '0')}:00`);
                    }}
                    value={searchParams.get('startTime') || ''}
                  >
                    <option value="">Any Time</option>
                    {["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <button onClick={clearFilters} className="text-sm font-bold text-red-500 hover:underline flex items-center mb-3">
                  <X className="w-4 h-4 mr-1" /> Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-full">
        {viewMode === 'map' ? (
          <div className="h-[calc(100vh-160px)] w-full">
            <MapComponent turfs={turfs} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {loading ? 'Searching...' : `${turfs.length} Turfs Found`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-[40px] p-4 space-y-4 shadow-sm border border-gray-50">
                    <Skeleton className="h-64 w-full rounded-[30px]" />
                    <div className="p-4 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between items-center pt-4">
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-10 w-1/3 rounded-xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : turfs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {turfs.map((turf) => (
                  <TurfCard key={turf._id} turf={turf} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No turfs found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search area.</p>
                <button onClick={clearFilters} className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition">Reset Filters</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TurfListing;
