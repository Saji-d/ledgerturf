import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login, reset } from '@/store/authSlice';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'superAdmin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'turfOwner') {
        navigate('/dashboard/owner');
      } else {
        navigate('/dashboard/player');
      }
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to book your favorite turf
          </p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="name@example.com"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                Don't have an account?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
