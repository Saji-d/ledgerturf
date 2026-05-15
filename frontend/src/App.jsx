import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '@/components/layout/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

// ... rest of imports

const DashboardRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'superAdmin') return <Navigate to="/dashboard/admin" />;
  if (user.role === 'turfOwner') return <Navigate to="/dashboard/owner" />;
  return <Navigate to="/dashboard/player" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/player" element={<RegisterPlayer />} />
            <Route path="/register/owner" element={<RegisterOwner />} />
            <Route path="/turfs" element={<TurfListing />} />
            <Route path="/turfs/:id" element={<TurfDetails />} />

            {/* Role-Specific Protected Routes */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            <Route element={<ProtectedRoute allowedRoles={['player', 'user', 'turfOwner', 'superAdmin']} />}>
              <Route path="/dashboard/player" element={<UserDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['turfOwner', 'superAdmin']} />}>
              <Route path="/dashboard/owner" element={<OwnerDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['superAdmin']} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-4">LedgerTurf - Dhaka's Premier Booking Platform</p>
            <p className="text-gray-600 text-sm">© 2026 All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
