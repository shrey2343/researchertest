import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../../../services/adminApi';
import UserDetailsModal from './UserDetailsModal';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  joined: string;
  status: string;
  profilePhoto?: string;
}

interface UserManagementTableProps {
  onUserDeleted?: () => void;
}

export default function UserManagementTable({ onUserDeleted }: UserManagementTableProps = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleSuspendUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}? This will delete all their projects and related data. This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteUser(userId);
      if (response.success) {
        toast.success('User and all related data deleted successfully');
        // Remove user from local state
        setUsers(users.filter(user => user._id !== userId));
        // Trigger stats refresh
        if (onUserDeleted) {
          onUserDeleted();
        }
      } else {
        toast.error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Roles</option>
            <option value="client">Clients</option>
            <option value="freelancer">Freelancers</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-64"
        />
      </div>
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No users found</p>
      ) : (
        <div className="space-y-2">
          {filteredUsers.map(user => (
            <div key={user._id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* User - 4 cols */}
                <div className="col-span-12 sm:col-span-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-lg flex-shrink-0">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-gray-900 text-sm block truncate">{user.name}</span>
                      <span className="text-xs text-gray-600 block truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
                
                {/* Role - 2 cols */}
                <div className="col-span-4 sm:col-span-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 border border-blue-300 rounded text-xs font-semibold capitalize">
                    {user.role}
                  </span>
                </div>
                
                {/* Status - 2 cols */}
                <div className="col-span-4 sm:col-span-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                    user.status === 'active' ? 'bg-green-100 text-green-600 border-green-300' : 'bg-yellow-100 text-yellow-600 border-yellow-300'
                  }`}>
                    {user.status}
                  </span>
                </div>
                
                {/* Joined - 2 cols */}
                <div className="col-span-4 sm:col-span-2 text-xs text-gray-600">
                  {formatDate(user.joined)}
                </div>
                
                {/* Actions - 2 cols */}
                <div className="col-span-12 sm:col-span-2 flex gap-2">
                  <button 
                    onClick={() => handleViewUser(user._id)}
                    className="flex-1 text-cyan-600 font-semibold hover:text-cyan-700 text-xs px-2 py-1 bg-cyan-50 rounded"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleSuspendUser(user._id, user.name)}
                    className="flex-1 text-red-600 font-semibold hover:text-red-700 text-xs px-2 py-1 bg-red-50 rounded"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Details Modal */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUserId(null);
          }}
        />
      )}
    </div>
  );
}
