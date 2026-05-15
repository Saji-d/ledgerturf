import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User as UserIcon, Phone, Loader2, ArrowRight } from 'lucide-react';

const RegisterPlayer = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'player',
  });

  const { name, email, phone, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard/player');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900">Player Registration</h2>
          <p className="mt-2 text-gray-500">Join Dhaka's biggest turf community.</p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input name="name" type="text" required value={name} onChange={onChange} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary" placeholder="Full Name" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input name="email" type="email" required value={email} onChange={onChange} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary" placeholder="Email Address" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input name="phone" type="text" required value={phone} onChange={onChange} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary" placeholder="Phone Number" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input name="password" type="password" required value={password} onChange={onChange} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary" placeholder="Password (min. 6 chars)" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-primary transition shadow-xl flex items-center justify-center">
            {isLoading ? <Loader2 className="animate-spin" /> : <>Register as Player <ArrowRight className="ml-2 w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPlayer;
