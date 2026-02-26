import { useEffect, useState } from 'react';
import { getPlatformActivity } from '../../../../services/adminApi';

export default function PlatformActivityCard() {
  const [activity, setActivity] = useState({
    newProjectsToday: 0,
    completedProjectsWeek: 0,
    platformCommission: 0,
    activeFreelancers: 0,
    activeClients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await getPlatformActivity();
      if (response.success) {
        setActivity(response.activity);
      }
    } catch (error) {
      console.error('Failed to fetch platform activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Activity</h3>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-20 bg-gray-200 rounded-xl"></div>
            <div className="h-20 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <span className="text-gray-600">New Projects (Today)</span>
          <span className="font-bold text-cyan-600 text-xl">{activity.newProjectsToday}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <span className="text-gray-600">Completed Projects (Week)</span>
          <span className="font-bold text-cyan-600 text-xl">{activity.completedProjectsWeek}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <span className="text-gray-600">Platform Commission (Month)</span>
          <span className="font-bold text-cyan-600 text-xl">₹{activity.platformCommission.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-100 border border-blue-300 rounded-xl hover:bg-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-blue-600">{activity.activeFreelancers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Active Freelancers</div>
          </div>
          <div className="text-center p-4 bg-green-100 border border-green-300 rounded-xl hover:bg-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-2xl font-bold text-green-600">{activity.activeClients.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Active Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
