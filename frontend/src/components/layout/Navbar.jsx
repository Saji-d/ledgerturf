import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '@/store/authSlice';
import { Menu, X, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Ledger<span className="text-gray-900">Turf</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/turfs" className="text-gray-600 hover:text-primary transition">Find Turfs</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user.role === 'superAdmin' ? '/dashboard/admin' : user.role === 'turfOwner' ? '/dashboard/owner' : '/dashboard/player'} 
                  className="flex items-center text-gray-600 hover:text-primary transition"
                >
                  <LayoutDashboard className="w-5 h-5 mr-1" />
                  Dashboard
                </Link>
                <button 
                  onClick={onLogout}
                  className="flex items-center text-gray-600 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary transition font-medium">Login</Link>
                <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition shadow-md">Join Now</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/turfs" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Find Turfs</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Dashboard</Link>
                <button onClick={onLogout} className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-50 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-primary font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
