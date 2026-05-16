import React from 'react';
import turfService from '@/services/turfService';
import bookingService from '@/services/bookingService';
import { useSelector } from 'react-redux';
import { 
  LayoutGrid, Plus, Clock, Users, DollarSign, Loader2, 
  CheckCircle, XCircle, AlertCircle, Edit, Trash2, Camera, MapPin, Calendar
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatTime } from '@/utils/formatters';

const OwnerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [turfs, setTurfs] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState('turfs'); // 'turfs', 'bookings', 'analytics'

  const fetchData = async () => {
    setLoading(true);
    try {
      const [turfsRes, bookingsRes] = await Promise.all([
        turfService.getTurfs({ owner: user.id }),
        bookingService.getBookings()
      ]);
      setTurfs(turfsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, b) => acc + b.totalPrice, 0);

  if (loading) return <div className="flex items-center justify-center py-40"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Business Hub</h1>
          <p className="text-gray-500 font-medium mt-2">Manage your facilities and track growth.</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
          {['turfs', 'bookings', 'analytics'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {tab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard icon={DollarSign} label="Net Earnings" val={`৳${totalRevenue}`} color="primary" isPrimary />
          <StatCard icon={Users} label="Total Players" val={bookings.length} color="blue" />
          <StatCard icon={CheckCircle} label="Active Listings" val={turfs.filter(t => t.status === 'approved').length} color="green" />
        </div>
      )}

      {tab === 'turfs' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900">Your Facilities</h2>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary transition shadow-xl shadow-gray-100 flex items-center gap-2">
              <Plus size={18} /> New Listing
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {turfs.map(turf => (
              <div key={turf._id} className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group">
                <div className="h-48 relative">
                  <img src={turf.images?.[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${
                      turf.status === 'approved' ? 'bg-green-500 text-white' : 
                      turf.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-gray-900'
                    }`}>
                      {turf.status}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{turf.name}</h3>
                  <p className="text-gray-400 text-sm font-bold mb-6 flex items-center gap-2">
                    <MapPin size={14} className="text-primary" /> {turf.location?.area || turf.address}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <span className="text-[10px] text-gray-400 font-black uppercase block mb-1">Price</span>
                      <span className="font-black text-gray-900 text-lg">৳{turf.pricePerHour}/hr</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <span className="text-[10px] text-gray-400 font-black uppercase block mb-1">Hours</span>
                      <span className="font-black text-gray-900 text-xs">{formatTime(turf.openingTime)} - {formatTime(turf.closingTime)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-gray-50 text-gray-900 py-3 rounded-xl font-black text-xs hover:bg-gray-100 transition flex items-center justify-center gap-2"><Edit size={14} /> Edit</button>
                    <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'bookings' && (
        <div className="bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-2xl font-black text-gray-900">Recent Reservations</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {bookings.length > 0 ? bookings.map(b => (
              <div key={b._id} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><Users size={24} /></div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg">{b.user?.name}</h4>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{b.turf?.name} • {new Date(b.date).toLocaleDateString()} @ {formatTime(b.startTime)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-gray-900 block mb-1">৳{b.totalPrice}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="p-24 text-center">
                <Calendar className="mx-auto text-gray-200 mb-6" size={64} />
                <h3 className="text-2xl font-black text-gray-900">No bookings yet</h3>
                <p className="text-gray-400 font-medium">Your schedule is currently empty.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, val, color, isPrimary }) => (
  <div className={`${isPrimary ? 'bg-primary text-white shadow-primary/30' : 'bg-white text-gray-900'} p-10 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col justify-between h-56`}>
    <div className={`${isPrimary ? 'bg-white/20 text-white' : `bg-${color}-50 text-${color}-500`} w-14 h-14 rounded-2xl flex items-center justify-center`}>
      <Icon size={24} />
    </div>
    <div>
      <span className={`${isPrimary ? 'text-primary-light' : 'text-gray-400'} text-[10px] font-black uppercase tracking-widest block mb-1`}>{label}</span>
      <span className="text-4xl font-black tracking-tighter">{val}</span>
    </div>
  </div>
);

export default OwnerDashboard;
