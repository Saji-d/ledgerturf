import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '@/store/authSlice';
import turfService from '@/services/turfService';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User as UserIcon, Phone, MapPin, Briefcase, Clock, DollarSign, Loader2, ArrowRight, Image as ImageIcon } from 'lucide-react';

const RegisterOwner = () => {
  const [formData, setFormData] = React.useState({
    name: '', email: '', phone: '', password: '', role: 'turfOwner',
    turfName: '', turfAddress: '', area: 'Uttara', sportTypes: 'Football',
    openingTime: '06:00', closingTime: '23:00', pricePerHour: '', description: ''
  });

  const [images, setImages] = React.useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard/owner');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Register the Owner
      const authData = { 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        password: formData.password, 
        role: 'turfOwner' 
      };
      
      const res = await dispatch(register(authData)).unwrap();

      if (res.token) {
        // 2. Create their Turf
        const turfData = new FormData();
        turfData.append('name', formData.turfName);
        turfData.append('address', formData.turfAddress);
        turfData.append('area', formData.area);
        turfData.append('sportTypes', formData.sportTypes);
        turfData.append('pricePerHour', formData.pricePerHour);
        turfData.append('description', formData.description);
        turfData.append('openingTime', formData.openingTime);
        turfData.append('closingTime', formData.closingTime);
        turfData.append('coordinates', JSON.stringify([90.4125, 23.8103]));
        
        images.forEach(img => turfData.append('images', img));

        await turfService.createTurf(turfData);
        toast.success('Owner account and Turf created! Waiting for approval.');
        navigate('/dashboard/owner');
      }
    } catch (err) {
      toast.error(err || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-primary p-12 text-white">
          <h2 className="text-3xl font-black mb-6">List Your Turf</h2>
          <p className="opacity-80 mb-8">Join the premier turf network in Dhaka and start earning.</p>
          <ul className="space-y-4 text-sm font-bold">
            <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Reach thousands of players</li>
            <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Automated slot management</li>
            <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Daily revenue analytics</li>
          </ul>
        </div>
        
        <form className="md:w-2/3 p-12 space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Owner Info</h3>
              <input name="name" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Full Name" />
              <input name="email" type="email" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Email" />
              <input name="phone" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Phone" />
              <input name="password" type="password" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Password" />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Turf Info</h3>
              <input name="turfName" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Turf Name" />
              <input name="turfAddress" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Turf Address" />
              <div className="grid grid-cols-2 gap-4">
                <select name="area" onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50">
                  {['Uttara', 'Mirpur', 'Banani', 'Gulshan', 'Dhanmondi'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select name="sportTypes" onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50">
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="openingTime" type="time" onChange={onChange} value={formData.openingTime} className="w-full p-4 rounded-2xl bg-gray-50" />
                <input name="closingTime" type="time" onChange={onChange} value={formData.closingTime} className="w-full p-4 rounded-2xl bg-gray-50" />
              </div>
              <input name="pricePerHour" type="number" required onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50" placeholder="Price Per Hour" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Additional Details</h3>
            <textarea name="description" onChange={onChange} className="w-full p-4 rounded-2xl bg-gray-50 h-32" placeholder="Tell players about your turf..."></textarea>
            <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-primary transition shadow-xl flex items-center justify-center">
            {isLoading ? <Loader2 className="animate-spin" /> : <>Register & List Turf <ArrowRight className="ml-2 w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckCircle = ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;

export default RegisterOwner;
