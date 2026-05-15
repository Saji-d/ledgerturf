import React from 'react';
import turfService from '@/services/turfService';
import { ShieldCheck, CheckCircle, XCircle, Clock, MapPin, Loader2, User as UserIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingTurfs, setPendingTurfs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPending = async () => {
    try {
      // Special query for admin to see all pending
      const res = await turfService.getTurfs({ status: 'pending' });
      setPendingTurfs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPending();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await turfService.approveTurf(id, status);
      toast.success(`Turf ${status === 'approved' ? 'Approved' : 'Rejected'} Successfully`);
      fetchPending();
    } catch (error) {
      toast.error('Action failed');
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
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-primary p-2 rounded-xl">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Control Panel</h1>
          </div>
          <p className="text-gray-500 text-lg">Review and manage turf registration requests.</p>
        </header>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Pending Approvals ({pendingTurfs.length})</h2>
          </div>
          
          <div className="divide-y divide-gray-50">
            {pendingTurfs.length > 0 ? (
              pendingTurfs.map(turf => (
                <div key={turf._id} className="p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-gray-50 transition">
                  <div className="w-48 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-md">
                    <img src={turf.images[0] || 'https://via.placeholder.com/300x200'} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900">{turf.name}</h3>
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Pending</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm font-medium">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-primary" /> {turf.address}</span>
                      <span className="flex items-center"><UserIcon className="w-4 h-4 mr-1 text-primary" /> Owner: {turf.owner?.name || 'Loading...'}</span>
                      <span className="flex items-center font-bold text-gray-900"><Clock className="w-4 h-4 mr-1 text-primary" /> ৳{turf.pricePerHour}/hr</span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">{turf.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleApproval(turf._id, 'approved')}
                      className="bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition shadow-lg shadow-green-200"
                      title="Approve"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleApproval(turf._id, 'rejected')}
                      className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-100 transition"
                      title="Reject"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Queue is clear!</h3>
                <p className="text-gray-500">There are no pending turfs waiting for review.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
