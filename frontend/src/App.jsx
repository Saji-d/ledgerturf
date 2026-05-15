import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import TurfListing from '@/pages/turf/TurfListing';
import TurfDetails from '@/pages/turf/TurfDetails';
import UserDashboard from '@/pages/dashboard/UserDashboard';

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
            <Route path="/turfs" element={<TurfListing />} />
            <Route path="/turfs/:id" element={<TurfDetails />} />

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'turfOwner', 'superAdmin']} />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Turf Owner Routes (Placeholder for now) */}
            <Route element={<ProtectedRoute allowedRoles={['turfOwner', 'superAdmin']} />}>
              <Route path="/owner/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Admin Routes (Placeholder for now) */}
            <Route element={<ProtectedRoute allowedRoles={['superAdmin']} />}>
              <Route path="/admin/dashboard" element={<UserDashboard />} />
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
