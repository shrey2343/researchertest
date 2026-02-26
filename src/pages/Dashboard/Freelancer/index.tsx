import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, DollarSign, TrendingUp, Search, Send, X, Eye, MessageCircle } from 'lucide-react';
import FreelancerSidebar from './components/FreelancerSidebar';
import { getAllProjects, submitBid, getMyProposals, getMyActiveProjects, getMyCompletedProjects, getFreelancerStats } from '../../../services/api';
import { getCurrentUser } from '../../../services/authApi';
import { getBankAccount } from '../../../services/authApi';
import FreelancerProjectDetails from './components/FreelancerProjectDetails';
import ProfilePage from './components/ProfilePage';
import RecommendedProjects from '../../../components/RecommendedProjects';
import toast from 'react-hot-toast';
import { formatProjectTitle, formatProjectDescription } from '../../../utils/textFormat';

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileSubTab, setProfileSubTab] = useState('basic');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [completedProjects, setCompletedProjects] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingProposals: 0,
    completedProjects: 0,
    totalEarned: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });
  const [userProfile, setUserProfile] = useState<any>(null);
  const [bankAccount, setBankAccount] = useState<any>(null);

  useEffect(() => {
    fetchAllData();
    fetchUserProfile();
    fetchBankAccount();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchProjects(),
        fetchProposals(),
        fetchActiveProjects(),
        fetchCompletedProjects(),
        fetchStats(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await getMyProposals();
      if (response.success) {
        setProposals(response.proposals);
      }
    } catch (error: any) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const fetchActiveProjects = async () => {
    try {
      const response = await getMyActiveProjects();
      if (response.success) {
        setActiveProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch active projects:', error);
    }
  };

  const fetchCompletedProjects = async () => {
    try {
      const response = await getMyCompletedProjects();
      if (response.success) {
        setCompletedProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch completed projects:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getFreelancerStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUserProfile(response.user);
      }
    } catch (error: any) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const fetchBankAccount = async () => {
    try {
      const response = await getBankAccount();
      if (response.success) {
        setBankAccount(response.bankAccount);
      }
    } catch (error: any) {
      console.error('Failed to fetch bank account:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  const getInitials = (name: string) => {
    if (!name) return 'AN';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const maskName = (fullname: string): string => {
    if (!fullname) return 'Anonymous';
    const names = fullname.trim().split(' ');
    return names.map(name => name.length === 0 ? '' : name.charAt(0).toUpperCase() + '***').join(' ');
  };

  const handleSubmitProposalClick = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowProposalModal(true);
  };

  const handleViewProjectDetails = (project: any, proposal?: any) => {
    setSelectedProject(project);
    setSelectedProposal(proposal || null);
    setShowProjectDetails(true);
  };

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
    setSelectedProposal(null);
  };

  const handleSubmitProposal = async () => {
    if (!proposalData.proposedFees || !proposalData.timeline || !proposalData.coverLetter) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    setSubmittingProposal(true);
    try {
      const response = await submitBid(selectedProject._id, {
        amount: parseFloat(proposalData.proposedFees),
        proposal: `Timeline: ${proposalData.timeline} days\n\n${proposalData.coverLetter}`
      });

      if (response.success) {
        toast.success('Proposal submitted successfully! Client will be notified.');
        setShowProposalModal(false);
        setProposalData({ proposedFees: '', timeline: '', coverLetter: '' });
        setSelectedProject(null);
        fetchAllData();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmittingProposal(false);
    }
  };

  const statsDisplay = [
    { label: 'Active Projects', value: stats.activeProjects.toString(), icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Pending Proposals', value: stats.pendingProposals.toString(), icon: Clock, color: 'bg-yellow-500' },
    { label: 'Completed Projects', value: stats.completedProjects.toString(), icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Earned', value: `$${stats.totalEarned.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500' }
  ];

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {statsDisplay.map((stat, idx) => (
              <div key={idx} className="group bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 hover:bg-white/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-white" size={16} />
                  </div>
                  <TrendingUp className="text-green-500 hidden sm:block group-hover:scale-110 transition-transform duration-300" size={20} />
                </div>
                <div className="text-lg sm:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:bg-white/90 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activeProjects.slice(0, 3).map((project) => (
                <div key={project._id} className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 break-all overflow-hidden group-hover:text-blue-600 transition-colors duration-300">{formatProjectTitle(project.title)}</h4>
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Progress: {project.progress}%</span>
                  </div>
                  <button
                    onClick={() => handleViewProjectDetails(project)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'active') {
      return (
        <div className="space-y-4">
          {activeProjects.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-2xl border border-blue-200 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <p className="text-gray-700 text-lg font-medium">No active projects yet</p>
              <p className="text-gray-500 text-sm mt-2">Start browsing projects to get your first assignment!</p>
            </div>
          ) : (
            activeProjects.map((project) => (
              <div key={project._id} className="group bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg p-6 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 break-all overflow-hidden group-hover:text-blue-600 transition-colors duration-300">{formatProjectTitle(project.title)}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Client: {maskName(project.clientId?.fullname || 'Anonymous')}</span>
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200 transition-colors duration-300">IN PROGRESS</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">{project.introduction}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Progress</div>
                    <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">{project.progress}%</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleViewProjectDetails(project)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-lg"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                    <MessageCircle size={16} />
                    Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === 'proposals') {
      return (
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-2xl">
              <p className="text-gray-600 text-lg">No pending proposals yet</p>
            </div>
          ) : (
            proposals.map((proposal) => (
              <div key={proposal._id} className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg p-6 hover:bg-white hover:border-blue-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 break-all overflow-hidden">{formatProjectTitle(proposal.project.title)}</h3>
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-sm text-gray-600">Submitted {formatDate(proposal.submittedAt)}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          proposal.status === 'accepted' || proposal.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {proposal.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Your Bid</div>
                    <div className="text-2xl font-bold text-blue-600">${proposal.amount}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleViewProjectDetails(proposal.project, proposal)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
                >
                  <Eye size={16} />
                  View Project
                </button>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === 'completed') {
      return (
        <div className="space-y-4">
          {completedProjects.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-2xl">
              <p className="text-gray-600 text-lg">No completed projects yet</p>
            </div>
          ) : (
            completedProjects.map((project) => (
              <div key={project._id} className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg p-6 hover:bg-white hover:border-blue-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 break-all overflow-hidden">{formatProjectTitle(project.title)}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-600">Completed {formatDate(project.completedAt)}</span>
                      {project.paymentReleased && (
                        <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <DollarSign size={14} />
                          PAYMENT RELEASED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Earned</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${project.bids?.find((b: any) => b.status === 'accepted')?.amount || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activeTab === 'available') {
      const filteredProjects = projects.filter(proj => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          proj.title?.toLowerCase().includes(query) ||
          proj.introduction?.toLowerCase().includes(query) ||
          proj.skills?.some((skill: string) => skill.toLowerCase().includes(query))
        );
      });

      return (
        <div className="space-y-6">
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="pl-10 pr-4 py-3 bg-white/90 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-gray-900 placeholder-gray-500 cursor-text relative z-0"
            />
          </div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 bg-white/80 rounded-2xl">
                <p className="text-gray-600 text-lg">No projects found</p>
              </div>
            ) : (
              filteredProjects.map((project) => {
                const hasSubmittedProposal = proposals.some(proposal => proposal.project._id === project._id);
                
                return (
                  <div key={project._id} className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg p-6 hover:bg-white hover:border-blue-400 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 break-all overflow-hidden">{formatProjectTitle(project.title)}</h3>
                        <div className="flex flex-col gap-2 mb-3">
                          <span className="text-sm text-gray-600">Posted {getTimeAgo(project.createdAt)}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-blue-600 font-semibold">{project.bids?.length || 0} bids</span>
                            <span className="text-sm text-gray-600">by {maskName(project.clientId?.fullname || 'Anonymous')}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 break-all overflow-hidden">{formatProjectDescription(project.introduction)}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills?.slice(0, 3).map((skill: string, idx: number) => (
                            <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium border border-blue-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="text-xl font-bold text-blue-600">${project.budgetMin} - ${project.budgetMax}</div>
                        <div className="text-sm text-gray-500 mt-1">Due: {formatDate(project.deadline)}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleViewProjectDetails(project)}
                        className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all inline-flex items-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                      {hasSubmittedProposal ? (
                        <button 
                          disabled
                          className="bg-gray-500 text-white px-6 py-2.5 rounded-xl font-semibold cursor-not-allowed inline-flex items-center gap-2 opacity-70"
                        >
                          <CheckCircle size={16} />
                          Submitted
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => handleSubmitProposalClick(e, project)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2"
                        >
                          <Send size={16} />
                          Submit Proposal
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
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

    if (activeTab === 'recommended') {
      return (
        <RecommendedProjects 
          onNavigateToBrowse={() => setActiveTab('available')}
          proposals={proposals}
          onSubmitProposalClick={handleSubmitProposalClick}
          onViewProjectDetails={handleViewProjectDetails}
          formatDate={formatDate}
          getTimeAgo={getTimeAgo}
          maskName={maskName}
        />
      );
    }

    return null;
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
      <FreelancerSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 lg:ml-72 relative z-10 overflow-x-auto text-[#4B5563]">
        <div className="max-w-full mx-auto">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8 pl-[52px] lg:pl-0">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'recommended' && 'Recommended Projects'}
            {activeTab === 'available' && 'Browse Projects'}
            {activeTab === 'proposals' && 'My Proposals'}
            {activeTab === 'active' && 'Active Projects'}
            {activeTab === 'completed' && 'Completed Projects'}
            {activeTab === 'profile' && 'My Profile'}
          </h1>
          {renderContent()}
        </div>
      </main>

      {showProposalModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowProposalModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-lg sm:text-2xl font-bold text-[#1F1F1F]">Submit Your Proposal</h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 break-all overflow-hidden">Project: {selectedProject.title}</p>
              </div>
              <button onClick={() => setShowProposalModal(false)} className="text-gray-500 hover:text-gray-700 flex-shrink-0">
                <X size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                      Proposed Fees (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={proposalData.proposedFees}
                        onChange={(e) => setProposalData({ ...proposalData, proposedFees: e.target.value })}
                        placeholder="950"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                      Delivery Timeline (Days) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={proposalData.timeline}
                      onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                      placeholder="14"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={proposalData.coverLetter}
                    onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                    placeholder="Explain why you're the best fit for this project..."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmitProposal}
                  disabled={submittingProposal}
                  className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingProposal ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Proposal
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjectDetails && selectedProject && (
        <FreelancerProjectDetails
          project={selectedProject}
          proposal={selectedProposal}
          onClose={handleCloseProjectDetails}
          onProjectUpdate={fetchAllData}
        />
      )}

      {showProfilePopup && (
        <ProfileViewPopup onClose={() => setShowProfilePopup(false)} />
      )}
    </div>
  );
}
