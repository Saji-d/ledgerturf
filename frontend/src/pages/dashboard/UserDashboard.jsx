import React from 'react';
import bookingService from '@/services/bookingService';
import { useSelector } from 'react-redux';
import { Calendar, Clock, MapPin, Tag, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingService.getBookings();
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingService.cancelBooking(id);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (error) {
      toast.error('Could not cancel booking');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your upcoming games and booking history.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-2">Total Bookings</span>
            <span className="text-4xl font-black text-gray-900">{bookings.length}</span>
          </div>
          <div className="bg-primary p-8 rounded-[40px] shadow-lg shadow-primary/20 text-white">
            <span className="text-primary-light text-xs font-bold uppercase tracking-widest block mb-2">Upcoming</span>
            <span className="text-4xl font-black">{bookings.filter(b => b.status === 'confirmed').length}</span>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-2">Spent</span>
            <span className="text-4xl font-black text-gray-900">৳{bookings.reduce((acc, b) => acc + (b.status !== 'cancelled' ? b.totalPrice : 0), 0)}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>
        
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-6 sm:p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="bg-gray-50 p-4 rounded-3xl">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.turf?.name || 'Deleted Turf'}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary" /> {booking.turf?.location?.area || 'N/A'}</span>
                      <span className="flex items-center font-bold text-gray-900"><Clock className="w-4 h-4 mr-1 text-primary" /> {new Date(booking.date).toLocaleDateString()} @ {booking.startTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Status</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-right mr-4">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Price</span>
                    <span className="font-bold text-gray-900">৳{booking.totalPrice}</span>
                  </div>
                  {booking.status === 'confirmed' && (
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-8">Ready to play? Find a turf and book your first slot.</p>
            <Link to="/turfs" className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-dark transition">Browse Turfs</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
