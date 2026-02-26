import { useEffect, useState } from 'react';
import { getAllProjects } from '../../../../services/projectApi';
import { getAdminStats } from '../../../../services/adminApi';
import { Briefcase, User, Eye, Trash2 } from 'lucide-react';
import ProjectDetailsModal from './ProjectDetailsModal';
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  clientId: any;
  assignedFreelancer: any;
  budgetMin: number;
  budgetMax: number;
  status: string;
  category: string;
  skills: string[];
  createdAt: string;
  bids: any[];
}

export default function AllProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    open: 0,
    inProgress: 0,
    completed: 0,
    totalBids: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, statsRes] = await Promise.all([
        getAllProjects(),
        getAdminStats()
      ]);
      
      if (projectsRes.success) {
        setProjects(projectsRes.projects);
      }
      
      if (statsRes.success) {
        const { openProjects, inProgressProjects, completedProjects } = statsRes.stats;
        const totalBids = projectsRes.projects?.reduce((sum: number, p: Project) => sum + (p.bids?.length || 0), 0) || 0;
        
        setStatusCounts({
          open: openProjects || 0,
          inProgress: inProgressProjects || 0,
          completed: completedProjects || 0,
          totalBids
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; border: string }> = {
      open: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      completed: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
    };

    const style = config[status] || config.open;
    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/project/admin/delete/${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project deleted successfully');
        fetchData(); // Refresh the list
      } else {
        toast.error(data.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Delete project error:', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Projects</h2>
          <p className="text-sm text-gray-600">Manage and monitor all platform projects</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm flex-1"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No projects found</p>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-3">
            {filteredProjects.map(project => (
              <div key={project._id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{project.title}</h3>
                    <p className="text-xs text-gray-500">{project.category}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-gray-500">Client:</span>
                    <p className="font-medium text-gray-900 truncate">{project.clientId?.fullname || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-semibold text-cyan-600">₹{project.budgetMin.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Bids:</span>
                    <p className="font-medium text-purple-600">{project.bids?.length || 0}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Posted:</span>
                    <p className="font-medium text-gray-700">{formatDate(project.createdAt)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleViewProject(project)}
                  className="w-full px-3 py-1.5 bg-cyan-100 text-cyan-600 border border-cyan-300 rounded-lg text-xs font-medium hover:bg-cyan-200 transition-colors mb-2"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDeleteProject(project._id)}
                  className="w-full px-3 py-1.5 bg-red-100 text-red-600 border border-red-300 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="space-y-2">
              {filteredProjects.map(project => (
                <div key={project._id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Project Info - 4 cols */}
                    <div className="col-span-4">
                      <div className="flex items-start gap-2">
                        <Briefcase className="text-cyan-600 mt-0.5 flex-shrink-0" size={16} />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{project.title}</h3>
                          <p className="text-xs text-gray-500 truncate">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Client - 2 cols */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={12} className="text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-900 truncate">{project.clientId?.fullname || 'Unknown'}</span>
                      </div>
                    </div>
                    
                    {/* Budget - 2 cols */}
                    <div className="col-span-2">
                      <div className="text-sm font-semibold text-cyan-600">
                        ₹{project.budgetMin.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Bids - 1 col */}
                    <div className="col-span-1 text-center">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                        {project.bids?.length || 0}
                      </span>
                    </div>
                    
                    {/* Status - 1 col */}
                    <div className="col-span-1">
                      {getStatusBadge(project.status)}
                    </div>
                    
                    {/* Actions - 2 cols */}
                    <div className="col-span-2 flex gap-1">
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="flex-1 px-2 py-1 bg-cyan-100 text-cyan-600 border border-cyan-300 rounded text-xs font-medium hover:bg-cyan-200 transition-colors"
                      >
                        <Eye size={14} className="mx-auto" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project._id)}
                        className="flex-1 px-2 py-1 bg-red-100 text-red-600 border border-red-300 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={14} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats - Show real data from backend */}
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-green-100/50 border border-green-200/50 rounded-lg p-2">
              <div className="text-xs text-green-600">Open</div>
              <div className="text-lg font-bold text-green-800">{statusCounts.open}</div>
            </div>
            <div className="bg-blue-100/50 border border-blue-200/50 rounded-lg p-2">
              <div className="text-xs text-blue-600">In Progress</div>
              <div className="text-lg font-bold text-blue-800">{statusCounts.inProgress}</div>
            </div>
            <div className="bg-purple-100/50 border border-purple-200/50 rounded-lg p-2">
              <div className="text-xs text-purple-600">Completed</div>
              <div className="text-lg font-bold text-purple-800">{statusCounts.completed}</div>
            </div>
            <div className="bg-amber-100/50 border border-amber-200/50 rounded-lg p-2">
              <div className="text-xs text-amber-600">Total Bids</div>
              <div className="text-lg font-bold text-amber-800">{statusCounts.totalBids}</div>
            </div>
          </div>
        </>
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
