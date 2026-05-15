import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { register, reset } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'user';

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    role: initialRole,
  });

  const { name, email, password, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full flex flex-col md:flex-row bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        {/* Left Side: Role Selector Info */}
        <div className="md:w-5/12 bg-primary p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-6">Join LedgerTurf</h2>
          <p className="text-primary-light mb-10 text-lg leading-relaxed">Choose your path and start your journey with the best turf community in Dhaka.</p>
          
          <div className="space-y-6">
            <div 
              onClick={() => setFormData(p => ({...p, role: 'user'}))}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer ${role === 'user' ? 'bg-white text-primary border-white' : 'border-white/20 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-8 h-8" />
                <div>
                  <h3 className="font-bold">I'm a Player</h3>
                  <p className={`text-xs ${role === 'user' ? 'text-primary/60' : 'text-primary-light'}`}>Book turfs and play with friends.</p>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFormData(p => ({...p, role: 'turfOwner'}))}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer ${role === 'turfOwner' ? 'bg-white text-primary border-white' : 'border-white/20 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8" />
                <div>
                  <h3 className="font-bold">I'm a Turf Owner</h3>
                  <p className={`text-xs ${role === 'turfOwner' ? 'text-primary/60' : 'text-primary-light'}`}>List and manage your facility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Enter your details to register as a {role === 'user' ? 'Player' : 'Turf Owner'}.</p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                    placeholder="John Doe"
                    value={name}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                    placeholder="john@example.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-primary transition shadow-xl shadow-gray-200 flex items-center justify-center group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
