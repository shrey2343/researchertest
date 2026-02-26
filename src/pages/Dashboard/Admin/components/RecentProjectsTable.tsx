import { useEffect, useState } from 'react';
import { getRecentProjects } from '../../../../services/adminApi';

interface Project {
  _id: string;
  title: string;
  client: string;
  freelancer: string | null;
  amount: number;
  status: string;
  date: string;
}

export default function RecentProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  const fetchRecentProjects = async () => {
    try {
      const response = await getRecentProjects();
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error) {
      console.error('Failed to fetch recent projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h3>
      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No projects found</p>
      ) : (
        <div className="overflow-x-auto scrollbar-smooth">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-gray-200">
              <tr className="text-left">
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Project</th>
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Client</th>
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Freelancer</th>
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Amount</th>
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Status</th>
                <th className="pb-3 font-semibold text-gray-600 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 font-medium text-gray-900">{project.title}</td>
                  <td className="py-4 text-gray-600">{project.client}</td>
                  <td className="py-4 text-gray-600">{project.freelancer || '-'}</td>
                  <td className="py-4 font-semibold text-cyan-600">₹{project.amount.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      project.status === 'completed' ? 'bg-green-100 text-green-600 border border-green-300' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-600 border border-blue-300' :
                      'bg-yellow-100 text-yellow-600 border border-yellow-300'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600">{formatDate(project.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
