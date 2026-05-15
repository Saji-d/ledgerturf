import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import turfService from '@/services/turfService';
import bookingService from '@/services/bookingService';
import { toast } from 'react-hot-toast';
import { MapPin, Info, Calendar, Clock, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentModal from '@/components/booking/PaymentModal';

const TurfDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [turf, setTurf] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [unavailableSlots, setUnavailableSlots] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [bookingLoading, setBookingLoading] = React.useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);

  // ... (rest of methods)

  const handleBookingClick = () => {
    if (!user) {
      toast.error('Please login to book a turf');
      return navigate('/login', { state: { from: { pathname: `/turfs/${id}` } } });
    }

    if (!selectedSlot) return toast.error('Please select a time slot');
    
    setIsPaymentOpen(true);
  };

  const onPaymentConfirm = async () => {
    setIsPaymentOpen(false);
    setBookingLoading(true);
    try {
      const startTime = selectedSlot;
      const [h, m] = startTime.split(':').map(Number);
      const endTime = `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      
      const res = await bookingService.createBooking({
        turf: id,
        date: selectedDate.toISOString().split('T')[0],
        startTime,
        endTime
      });

      if (res.success) {
        toast.success('Booking Successful! ✅');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-40">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-primary mb-8 font-bold transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details & Images */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video relative">
                <img 
                  src={turf.images[0] || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200'} 
                  alt={turf.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  {turf.sportTypes.map(s => (
                    <span key={s} className="bg-primary/90 backdrop-blur text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">{s}</span>
                  ))}
                  <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${turf.isIndoor ? 'bg-secondary text-white' : 'bg-orange-500 text-white'}`}>
                    {turf.isIndoor ? 'Indoor' : 'Outdoor'}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{turf.name}</h1>
                <div className="flex items-center text-gray-500 mb-8 pb-8 border-b border-gray-50">
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  <span className="text-lg font-medium">{turf.address}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-primary" /> About this turf
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {turf.description}
                </p>

                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</span>
                    <span className="font-bold text-gray-800">Available</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Clock className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Hours</span>
                    <span className="font-bold text-gray-800">06:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Star className="w-6 h-6 text-yellow-500 mb-2" />
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Rating</span>
                    <span className="font-bold text-gray-800">{turf.averageRating || 'New'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 sticky top-28">
              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Price / Hour</span>
                <span className="text-3xl font-extrabold text-gray-900">৳{turf.pricePerHour}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" /> Select Date
                  </label>
                  <DatePicker 
                    selected={selectedDate} 
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 cursor-pointer transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" /> Available Slots (1 Hour)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map(slot => {
                      const isBooked = unavailableSlots.includes(slot);
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          disabled={isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-3 rounded-xl text-sm font-bold transition border-2 ${
                            isBooked 
                              ? 'bg-gray-100 text-gray-300 border-transparent cursor-not-allowed' 
                              : isSelected 
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                : 'bg-white text-gray-600 border-gray-50 hover:border-primary/50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">৳{turf.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-500 font-medium">Service Fee</span>
                    <span className="text-gray-900 font-bold">৳0</span>
                  </div>
                  <div className="flex justify-between mb-8 pb-4 border-b border-gray-50">
                    <span className="text-gray-900 font-extrabold text-lg">Total</span>
                    <span className="text-primary font-extrabold text-2xl">৳{turf.pricePerHour}</span>
                  </div>

                  <button 
                    disabled={bookingLoading}
                    onClick={handleBookingClick}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-extrabold text-lg hover:bg-primary-dark transition shadow-xl shadow-primary/30 flex items-center justify-center disabled:opacity-50"
                  >
                    {bookingLoading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">Secure Payment Simulation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onConfirm={onPaymentConfirm} 
        amount={turf.pricePerHour} 
      />
    </div>
  );
};

export default TurfDetails;
