import React from 'react';
import turfService from '@/services/turfService';
import api from '@/services/api';
import MapComponent from '@/components/turf/MapComponent';
import { 
  ShieldCheck, CheckCircle, XCircle, Clock, MapPin, Loader2, 
  User as UserIcon, Users, CreditCard, Activity, Trash2, Edit 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [tab, setTab] = React.useState('approvals'); // 'approvals', 'users', 'stats'
  const [pendingTurfs, setPendingTurfs] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [stats, setStats] = React.useState({
    totalPlayers: 0, totalOwners: 0, totalBookings: 0, totalRevenue: 0
  });
  const [loading, setLoading] = React.useState(true);
  const [selectedTurf, setSelectedTurf] = React.useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [turfsRes, statsRes, usersRes] = await Promise.all([
        turfService.getTurfs({ status: 'pending' }),
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      
      setPendingTurfs(turfsRes.data);
      setStats(statsRes.data.data);
      setAllUsers(usersRes.data.data);
    } catch (error) {
      toast.error('Failed to load platform data');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      await turfService.approveTurf(id, status);
      toast.success(`Turf ${status} successfully`);
      setSelectedTurf(null);
      fetchData();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('User deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="flex items-center justify-center py-40"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Control Panel</h1>
          <p className="text-gray-500 font-medium mt-2">Oversee Dhaka's turf ecosystem.</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
          {['approvals', 'users', 'stats'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {tab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard icon={Users} label="Active Players" val={stats.totalPlayers} color="blue" />
          <StatCard icon={Briefcase} label="Verified Owners" val={stats.totalOwners} color="purple" />
          <StatCard icon={Activity} label="Total Bookings" val={stats.totalBookings} color="green" />
          <StatCard icon={CreditCard} label="Net Revenue" val={`৳${stats.totalRevenue}`} color="primary" isPrimary />
        </div>
      )}

      {tab === 'approvals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-10 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900">Pending Requests</h2>
              <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-black">{pendingTurfs.length} New</span>
            </div>
            <div className="divide-y divide-gray-50">
              {pendingTurfs.length > 0 ? pendingTurfs.map(turf => (
                <div 
                  key={turf._id} 
                  onClick={() => setSelectedTurf(turf)}
                  className={`p-10 flex flex-col md:flex-row items-center gap-10 hover:bg-gray-50 transition-colors group cursor-pointer ${selectedTurf?._id === turf._id ? 'bg-gray-50' : ''}`}
                >
                  <div className="w-40 h-28 rounded-[24px] overflow-hidden shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src={turf.images?.[0]} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-gray-900 leading-tight">{turf.name}</h3>
                      <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Pending</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-500 font-bold text-xs">
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {turf.address}</span>
                      <span className="flex items-center gap-2"><UserIcon size={14} className="text-primary" /> {turf.owner?.name || 'New Owner'}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-24 text-center">
                  <CheckCircle className="mx-auto text-green-200 mb-6" size={64} />
                  <h3 className="text-2xl font-black text-gray-900">Queue Clear!</h3>
                  <p className="text-gray-400 font-medium">All turfs have been reviewed.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedTurf ? (
              <div className="bg-white rounded-[48px] p-8 shadow-2xl border border-gray-100 sticky top-12 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="h-64 rounded-[32px] overflow-hidden border-4 border-gray-50 shadow-inner">
                  <MapComponent turfs={[selectedTurf]} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">{selectedTurf.name}</h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{selectedTurf.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-[10px] text-gray-400 font-black uppercase block">Price</span>
                    <span className="font-black text-gray-900">৳{selectedTurf.pricePerHour}/hr</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <span className="text-[10px] text-gray-400 font-black uppercase block">Type</span>
                    <span className="font-black text-gray-900">{selectedTurf.isIndoor ? 'Indoor' : 'Outdoor'}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleApproval(selectedTurf._id, 'approved')} 
                    className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black hover:bg-green-600 transition shadow-xl shadow-green-100 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} /> Approve
                  </button>
                  <button 
                    onClick={() => handleApproval(selectedTurf._id, 'rejected')} 
                    className="flex-1 bg-red-50 text-red-500 py-4 rounded-2xl font-black hover:bg-red-100 transition flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} /> Reject
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-[48px] p-12 text-center border-2 border-dashed border-gray-200 h-96 flex flex-col justify-center sticky top-12">
                <ShieldCheck className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Select a request to preview location</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-10 py-6">User</th>
                  <th className="px-10 py-6">Role</th>
                  <th className="px-10 py-6">Phone</th>
                  <th className="px-10 py-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-bold">
                {allUsers.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">{u.name[0]}</div>
                        <div>
                          <p className="text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'turfOwner' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {u.role === 'turfOwner' ? 'Owner' : 'Player'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-gray-500">{u.phone}</td>
                    <td className="px-10 py-8">
                      <button onClick={() => handleDeleteUser(u._id)} className="p-3 text-red-400 hover:bg-red-50 rounded-2xl transition"><Trash2 size={20} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, val, color, isPrimary }) => (
  <div className={`${isPrimary ? 'bg-primary text-white shadow-primary/30' : 'bg-white text-gray-900'} p-10 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col justify-between h-56`}>
    <div className={`${isPrimary ? 'bg-white/20 text-white' : `bg-${color}-50 text-${color}-500`} w-14 h-14 rounded-2xl flex items-center justify-center`}>
      <Icon size={24} />
    </div>
    <div>
      <span className={`${isPrimary ? 'text-primary-light' : 'text-gray-400'} text-[10px] font-black uppercase tracking-widest block mb-1`}>{label}</span>
      <span className="text-4xl font-black tracking-tighter">{val}</span>
    </div>
  </div>
);

const Briefcase = ({ size, className }) => <svg width={size} height={size} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><rect width="18" height="14" x="3" y="6" rx="3"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>;

export default AdminDashboard;