import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getRecentUsers } from '../../../../services/adminApi';

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

export default function RecentUsersCard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentUsers();
  }, []);

  const fetchRecentUsers = async () => {
    try {
      const response = await getRecentUsers();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error('Failed to fetch recent users:', error);
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

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Users</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Users</h3>
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No users found</p>
        ) : (
          users.slice(0, 5).map(user => (
            <div key={user._id} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 p-2 rounded-lg gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
              <div className="text-left sm:text-right sm:ml-4">
                <div className="text-xs text-gray-500 mb-1">{formatDate(user.joined)}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-cyan-600 capitalize">{user.role}</span>
                  {user.verified && <CheckCircle className="text-green-500" size={14} />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
