import React from 'react';
import turfService from '@/services/turfService';
import bookingService from '@/services/bookingService';
import { useSelector } from 'react-redux';
import { LayoutGrid, Plus, Clock, Users, DollarSign, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const OwnerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [turfs, setTurfs] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
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

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Owner Dashboard</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage your turfs and monitor reservations.</p>
          </div>
          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center hover:bg-primary-dark transition shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5 mr-2" /> Add New Turf
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <LayoutGrid className="text-blue-500 w-6 h-6" />
            </div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">Total Turfs</span>
            <span className="text-3xl font-black text-gray-900">{turfs.length}</span>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="bg-green-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Users className="text-green-500 w-6 h-6" />
            </div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">Total Bookings</span>
            <span className="text-3xl font-black text-gray-900">{bookings.length}</span>
          </div>
          <div className="bg-primary p-8 rounded-[40px] shadow-lg shadow-primary/20 text-white">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <DollarSign className="text-white w-6 h-6" />
            </div>
            <span className="text-primary-light text-xs font-bold uppercase tracking-widest block mb-1">Total Revenue</span>
            <span className="text-3xl font-black">৳{totalRevenue}</span>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">Pending Approval</span>
            <span className="text-3xl font-black text-gray-900">{turfs.filter(t => t.status === 'pending').length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Bookings */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Bookings</h2>
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-3xl transition border border-transparent hover:border-gray-100">
                    <div>
                      <h4 className="font-bold text-gray-900">{booking.user?.name}</h4>
                      <p className="text-xs text-gray-500">{booking.turf?.name} • {booking.startTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 block">৳{booking.totalPrice}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${booking.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <AlertCircle className="w-10 h-10 mx-auto mb-4 opacity-20" />
                <p>No bookings received yet.</p>
              </div>
            )}
          </div>

          {/* My Turfs */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">My Turfs</h2>
            <div className="space-y-6">
              {turfs.map(turf => (
                <div key={turf._id} className="flex items-center gap-6 p-4 bg-gray-50 rounded-3xl">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={turf.images[0]} alt={turf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{turf.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{turf.location?.area}</p>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        turf.status === 'approved' ? 'bg-green-100 text-green-600' : 
                        turf.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {turf.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
