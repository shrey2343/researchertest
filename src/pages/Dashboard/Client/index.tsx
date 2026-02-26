import { useState, useEffect } from 'react';
import { FolderOpen, Clock, CheckCircle, MessageSquare, DollarSign, Search, Edit2, Trash2, BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClientSidebar from './components/ClientSidebar';
import BidsList from './components/BidsList';
import ProjectDetails from './components/ProjectDetails';
import ProgressDetailsModal from './components/ProgressDetailsModal';
import ProjectCompletionPopup from '../../../components/shared/ProjectCompletionPopup';
import PaymentPopup from './components/PaymentPopup';
import ProfilePage from './components/ProfilePage';
import ProgressSummary from './components/ProgressSummary';
import { getMyProjects, getProjectStats, deleteProject } from '../../../services/api';
import { approveProjectCompletion } from '../../../services/projectApi';
import toast from 'react-hot-toast';
import { formatProjectTitle } from '../../../utils/textFormat';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBidsList, setShowBidsList] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isPaymentMinimized, setIsPaymentMinimized] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [completedProject, setCompletedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    activeProjects: 0,
    inProgressProjects: 0,
    completedProjects: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchStats();

    const interval = setInterval(() => {
      fetchProjects();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const completedProject = projects.find(
      (p) => p.status === 'completed' && p.progress === 100 && !p.clientApproved
    );
    if (completedProject) {
      setCompletedProject(completedProject);
      setShowCompletionPopup(true);
    }

    const confirmedProject = projects.find(
      (p) => p.status === 'open' && p.bids?.some((bid: any) => bid.status === 'confirmed' || bid.confirmationStatus === 'confirmed')
    );
    if (confirmedProject && !paymentData) {
      const confirmedBid = confirmedProject.bids.find((bid: any) => bid.status === 'confirmed' || bid.confirmationStatus === 'confirmed');
      if (confirmedBid) {
        setPaymentData({
          projectId: confirmedProject._id,
          bidId: confirmedBid._id,
          projectTitle: confirmedProject.title,
          freelancerName: confirmedBid.freelancerId?.fullname || 'Unknown',
          amount: confirmedBid.amount,
        });
        setShowPaymentPopup(true);
      }
    }

    if (paymentData && projects.find(p => p._id === paymentData.projectId && p.status === 'in-progress')) {
      setShowPaymentPopup(false);
      setPaymentData(null);
    }
  }, [projects, paymentData]);

  const fetchProjects = async () => {
    try {
      const response = await getMyProjects();
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getProjectStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleViewBids = (project: any) => {
    setSelectedProject(project);
    setShowBidsList(true);
  };

  const handleBidAccepted = () => {
    fetchProjects();
    fetchStats();
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleViewProgress = (project: any) => {
    setSelectedProject(project);
    setShowProgressDetails(true);
  };

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteProject(projectId);
      if (response.success) {
        toast.success('Project deleted successfully!');
        fetchProjects();
        fetchStats();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete project');
    }
  };

  const handleApproveCompletion = async () => {
    if (!completedProject) return;
    try {
      const response = await approveProjectCompletion(completedProject._id);
      if (response.success) {
        toast.success('Project approved! Admin has been notified.');
        setShowCompletionPopup(false);
        navigate('/freelancer-account-details', {
          state: {
            freelancerAccount: response.freelancerAccount,
            freelancerName: completedProject.assignedFreelancer?.fullname,
            projectTitle: completedProject.title,
            bidAmount: getAcceptedBidAmount(completedProject),
          },
        });
        fetchProjects();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve project');
    }
  };

  const maskName = (fullname: string): string => {
    const names = fullname.trim().split(' ');
    return names.map(name => name.length === 0 ? '' : name.charAt(0).toUpperCase() + '***').join(' ');
  };

  const getAcceptedBidAmount = (project: any): number | null => {
    if (!project.bids || project.bids.length === 0) return null;
    const acceptedBid = project.bids.find((bid: any) => bid.status === 'accepted');
    return acceptedBid ? acceptedBid.amount : null;
  };

  const statsDisplay = [
    { label: 'Active Projects', value: stats.activeProjects.toString(), icon: FolderOpen, color: 'bg-blue-500' },
    { label: 'In Progress', value: stats.inProgressProjects.toString(), icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed', value: stats.completedProjects.toString(), icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' }
  ];

  const filteredProjects = projects.filter(p => {
    let matchesTab = true;
    if (activeTab === 'active') matchesTab = p.status === 'open' || p.status === 'in-progress';
    if (activeTab === 'completed') matchesTab = p.status === 'completed';
    if (activeTab === 'overview') matchesTab = true;

    const matchesSearch = searchQuery === '' ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.introduction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills?.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {statsDisplay.map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 hover:bg-white/90 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                    <stat.icon className="text-white" size={16} />
                  </div>
                </div>
                <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h3>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 break-words">{formatProjectTitle(project.title)}</h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(project.status)} inline-block mt-1`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      {project.status === 'open' && (
                        <>
                          <button className="p-2 text-blue-600 bg-white/90 backdrop-blur-sm border border-blue-200 hover:border-blue-400 hover:bg-blue-50/90 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                  <Edit2 size={18} />
                                </button>
                          <button 
                            onClick={() => handleDeleteProject(project._id, project.title)}
                            className="p-2 text-red-600 bg-white/90 backdrop-blur-sm border border-red-200 hover:border-red-400 hover:bg-red-50/90 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                          >
                                <Trash2 size={18} />
                                </button>
                        </>
                      )}
                      {project.status === 'open' && project.bids && project.bids.length > 0 && (
                        <button
                          onClick={() => handleViewBids(project)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          {project.bids.length} Bids
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(project)}
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <ProgressSummary 
              projects={projects} 
              onViewProgress={handleViewProgress} 
            />
          </div>
        </div>
      );
    }

    if (activeTab === 'profile') {
      return <ProfilePage />;
    }

    if (activeTab === 'messages') {
      navigate('/messaging');
      return null;
    }

    return (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/90 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-gray-900 placeholder-gray-500"
          />
        </div>

        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-2xl">
              <p className="text-gray-600 text-lg">No projects found</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div key={project._id} className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-all shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-3 break-words flex-1">{formatProjectTitle(project.title)}</h3>
                          {project.status === 'open' && (
                            <div className="flex gap-2">
                              <button className="p-2 text-blue-600 bg-white/90 backdrop-blur-sm border border-blue-200 hover:border-blue-400 hover:bg-blue-50/90 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(project._id, project.title)}
                                className="p-2 text-red-600 bg-white/90 backdrop-blur-sm border border-red-200 hover:border-red-400 hover:bg-red-50/90 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-600">{project.category}</span>
                          {project.completedAt && (
                            <span className="text-sm text-gray-500">Completed: {formatDate(project.completedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">
                          {getAcceptedBidAmount(project) ? 'Fixed Budget' : 'Budget Range'}
                        </div>
                        <div className="font-bold text-blue-600">
                          {getAcceptedBidAmount(project)
                            ? `$${getAcceptedBidAmount(project)?.toLocaleString()}`
                            : `$${project.budgetMin} - ${project.budgetMax}`
                          }
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Deadline</div>
                        <div className="font-semibold text-gray-900">{formatDate(project.deadline)}</div>
                      </div>
                      {project.status === 'open' && project.bids && (
                        <div>
                          <div className="text-xs text-gray-500">Bids Received</div>
                          <div className="font-semibold text-gray-900">{project.bids.length}</div>
                        </div>
                      )}
                      {project.assignedFreelancer && (
                        <div>
                          <div className="text-xs text-gray-500">Researcher</div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{maskName(project.assignedFreelancer.fullname)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {project.status === 'in-progress' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-semibold text-blue-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                    {project.status === 'open' && project.bids && (
                      <>
                        <button
                          onClick={() => handleViewBids(project)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap"
                        >
                          View {project.bids.length} Bids
                        </button>
                        <button
                          onClick={() => handleViewDetails(project)}
                          className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </>
                    )}
                    {project.status === 'in-progress' && (
                      <>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2">
                          <MessageSquare size={18} />
                          Chat
                        </button>
                        <button
                          onClick={() => handleViewProgress(project)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2"
                        >
                          <BarChart3 size={18} />
                          Progress
                        </button>
                        <button
                          onClick={() => handleViewDetails(project)}
                          className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all"
                        >
                          View Details
                        </button>
                      </>
                    )}
                    {project.status === 'completed' && (
                      <button
                        onClick={() => handleViewDetails(project)}
                        className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6CDF]"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row pt-20"
      style={{
        background: `
          radial-gradient(circle at top right, rgba(10,102,194,0.06), transparent 40%),
          linear-gradient(180deg, #F3F8FF 0%, #EEF4FF 100%)
        `
      }}
    >
      <ClientSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 lg:ml-72 relative z-10 overflow-x-hidden text-[#4B5563]">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] pl-[52px] lg:pl-0">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'active' && 'Active Projects'}
              {activeTab === 'completed' && 'Completed Projects'}
              {activeTab === 'spending' && 'Billing Details'}
              {activeTab === 'profile' && 'My Profile'}
            </h1>
            {activeTab === 'overview' && (
              <button
                onClick={() => navigate('/postprojectpage')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                <span className="hidden sm:inline">Post a Project</span>
                <span className="sm:hidden">Post</span>
              </button>
            )}
          </div>
          {renderContent()}
        </div>
      </main>

      {showBidsList && selectedProject && (
        <BidsList
          projectId={selectedProject._id}
          projectTitle={selectedProject.title}
          onClose={() => {
            setShowBidsList(false);
            setSelectedProject(null);
          }}
          onBidAccepted={handleBidAccepted}
        />
      )}

      {showProjectDetails && selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => {
            setShowProjectDetails(false);
            setSelectedProject(null);
            fetchProjects();
            fetchStats();
          }}
        />
      )}

      {showProgressDetails && selectedProject && (
        <ProgressDetailsModal
          project={selectedProject}
          onClose={() => {
            setShowProgressDetails(false);
            setSelectedProject(null);
          }}
        />
      )}

      {showCompletionPopup && completedProject && (
        <ProjectCompletionPopup
          projectTitle={completedProject.title}
          freelancerName={completedProject.assignedFreelancer?.fullname || 'Unknown'}
          onApprove={handleApproveCompletion}
          onClose={() => setShowCompletionPopup(false)}
        />
      )}

      {showPaymentPopup && paymentData && (
        <PaymentPopup
          projectId={paymentData.projectId}
          bidId={paymentData.bidId}
          projectTitle={paymentData.projectTitle}
          freelancerName={paymentData.freelancerName}
          amount={paymentData.amount}
          isMinimized={isPaymentMinimized}
          onToggleMinimize={() => setIsPaymentMinimized(!isPaymentMinimized)}
          onMinimize={() => setIsPaymentMinimized(true)}
        />
      )}
    </div>
  );
}
