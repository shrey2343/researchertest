import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, MessageSquare, Send, X, Beaker, Brain, Database, Dna, FileText, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Lightbulb, BookOpen, Briefcase, TrendingUp, Sparkles, Zap, Star, Heart, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getProjectById, submitBid, getAllProjects, acceptBid } from '../../services/api';
import Footer from '../../components/layout/Footer';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import RecommendedProjects from '../../components/RecommendedProjects';

export default function BiddingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [acceptingBid, setAcceptingBid] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [proposalData, setProposalData] = useState({
    proposedFees: '',
    timeline: '',
    coverLetter: ''
  });

  useEffect(() => {
    // Wait for auth to load before making decisions
    if (authLoading) return;
    
    if (id) {
      fetchProject();
    } else {
      fetchAllProjects();
    }
  }, [id, authLoading, isAuthenticated]);

  const fetchProject = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login', { state: { from: `/bidding/${id}` } });
      setLoading(false);
      return;
    }
    
    try {
      const response = await getProjectById(id!);
      if (response.success) {
        setProject(response.project);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      const response = await getAllProjects({ status: 'open' });
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error: any) {
      console.error('Failed to fetch projects:', error);
      toast.error(error.message || 'Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login first to submit a proposal');
      navigate('/login', { state: { from: `/bidding/${id || ''}` } });
      return;
    }

    if (user?.role !== 'freelancer') {
      toast.error('Only freelancers can submit proposals');
      return;
    }

    setShowProposalModal(true);
  };

  const handleAcceptProposal = async (bidId: string) => {
    if (!window.confirm('Are you sure you want to accept this proposal? All other proposals will be rejected.')) {
      return;
    }

    setAcceptingBid(bidId);
    try {
      const response = await acceptBid(id!, bidId);
      if (response.success) {
        toast.success(response.message || 'Proposal accepted successfully! Notification sent to freelancer.');
        fetchProject(); // Refresh project data
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to accept proposal');
    } finally {
      setAcceptingBid(null);
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

  const filteredProjects = projects.filter(proj => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      proj.title?.toLowerCase().includes(query) ||
      proj.introduction?.toLowerCase().includes(query) ||
      proj.skills?.some((skill: string) => skill.toLowerCase().includes(query))
    );
  });

  const getInitials = (name: string) => {
    if (!name) return 'AN';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const maskName = (fullname: string): string => {
    if (!fullname) return 'Anonymous';
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '***';
    }).join(' ');
  };

  const handleViewProject = (projectId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login', { state: { from: `/bidding/${projectId}` } });
      return;
    }
    navigate(`/bidding/${projectId}`);
  };

  const handleSubmitProposal = async () => {
    if (!proposalData.proposedFees || !proposalData.timeline || !proposalData.coverLetter) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmittingProposal(true);
    try {
      const response = await submitBid(id!, {
        amount: parseFloat(proposalData.proposedFees),
        proposal: `Timeline: ${proposalData.timeline} days\n\n${proposalData.coverLetter}`
      });

      if (response.success) {
        toast.success('Proposal submitted successfully! Client will be notified.');
        setShowProposalModal(false);
        setProposalData({ proposedFees: '', timeline: '', coverLetter: '' });
        fetchProject();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit proposal');
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
        />
      </div>
    );
  }

  // Floating icons configuration - 24 icons covering the entire page
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: FileText, color: 'text-indigo-400', size: 26, opacity: 0.19 },
    { Icon: FlaskConical, color: 'text-cyan-400', size: 30, opacity: 0.17 },
    { Icon: Atom, color: 'text-orange-400', size: 32, opacity: 0.16 },
    { Icon: Rocket, color: 'text-red-400', size: 28, opacity: 0.18 },
    { Icon: Target, color: 'text-yellow-400', size: 30, opacity: 0.15 },
    { Icon: Award, color: 'text-emerald-400', size: 26, opacity: 0.19 },
    { Icon: GraduationCap, color: 'text-violet-400', size: 32, opacity: 0.17 },
    { Icon: Globe, color: 'text-teal-400', size: 28, opacity: 0.16 },
    { Icon: Microscope, color: 'text-blue-500', size: 30, opacity: 0.17 },
    { Icon: Code, color: 'text-purple-500', size: 28, opacity: 0.18 },
    { Icon: Lightbulb, color: 'text-yellow-500', size: 32, opacity: 0.15 },
    { Icon: BookOpen, color: 'text-blue-600', size: 30, opacity: 0.18 },
    { Icon: Briefcase, color: 'text-gray-400', size: 28, opacity: 0.16 },
    { Icon: TrendingUp, color: 'text-green-500', size: 32, opacity: 0.17 },
    { Icon: Sparkles, color: 'text-pink-500', size: 26, opacity: 0.19 },
    { Icon: Zap, color: 'text-yellow-600', size: 30, opacity: 0.15 },
    { Icon: Star, color: 'text-amber-400', size: 28, opacity: 0.18 },
    { Icon: Heart, color: 'text-rose-400', size: 26, opacity: 0.16 },
    { Icon: Eye, color: 'text-indigo-500', size: 30, opacity: 0.17 },
    { Icon: Search, color: 'text-slate-400', size: 28, opacity: 0.18 }
  ];

  // Show project list if no ID
  if (!id) {
    // Show recommended projects for freelancers
    if (user?.role === 'freelancer') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-8 pt-20">
          {/* Floating Icons Background */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {floatingIcons.map((item, i) => {
              const IconComponent = item.Icon;
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              
              return (
                <motion.div
                  key={i}
                  className={`absolute ${item.color}`}
                  style={{
                    opacity: item.opacity,
                    left: `${startX}%`,
                    top: `${startY}%`,
                  }}
                  animate={{
                    x: [
                      0,
                      (Math.random() - 0.5) * 400,
                      (Math.random() - 0.5) * 400,
                      0
                    ],
                    y: [
                      0,
                      (Math.random() - 0.5) * 400,
                      (Math.random() - 0.5) * 400,
                      0
                    ],
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 25 + Math.random() * 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                >
                  <IconComponent size={item.size} strokeWidth={1.5} />
                </motion.div>
              );
            })}
          </div>

          {/* Animated Background Gradient */}
          <motion.div
            className="fixed inset-0 z-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <RecommendedProjects />
          </div>
          <Footer />
        </div>
      );
    }

    // Original project list for non-freelancers
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-8 pt-20">
        {/* Floating Icons Background - Fixed positioning covering entire page */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {floatingIcons.map((item, i) => {
            const IconComponent = item.Icon;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            return (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                style={{
                  opacity: item.opacity,
                  left: `${startX}%`,
                  top: `${startY}%`,
                }}
                animate={{
                  x: [
                    0,
                    (Math.random() - 0.5) * 400,
                    (Math.random() - 0.5) * 400,
                    0
                  ],
                  y: [
                    0,
                    (Math.random() - 0.5) * 400,
                    (Math.random() - 0.5) * 400,
                    0
                  ],
                  rotate: [0, 180, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 25 + Math.random() * 15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                <IconComponent size={item.size} strokeWidth={1.5} />
              </motion.div>
            );
          })}
        </div>

        {/* Animated Background Gradient */}
        <motion.div
          className="fixed inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 backdrop-blur-md border-2 border-blue-200 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase size={24} className="text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Find Projects</h1>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, description, or skills..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base shadow-sm transition-all"
              />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Active Projects', value: filteredProjects.length, icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
                { label: 'Total Bids', value: filteredProjects.reduce((acc, p) => acc + (p.bids?.length || 0), 0), icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
                { label: 'Avg Budget', value: `$${Math.round(filteredProjects.reduce((acc, p) => acc + ((p.budgetMin + p.budgetMax) / 2), 0) / (filteredProjects.length || 1))}`, icon: Award, color: 'from-green-500 to-emerald-500' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl shadow-xl p-12 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg font-semibold">No projects found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search query</p>
              </motion.div>
            ) : (
              filteredProjects.map((proj, index) => (
                <motion.div
                  key={proj._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl shadow-xl p-4 sm:p-6 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => handleViewProject(proj._id)}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3">
                    <div className="flex-1 w-full sm:w-auto min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors break-words line-clamp-2">{proj.title}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-xs sm:text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Eye size={14} />
                          Posted {getTimeAgo(proj.createdAt)}
                        </span>
                        <span className="text-blue-600 font-semibold flex items-center gap-1">
                          <TrendingUp size={14} />
                          {proj.bids?.length || 0} bids
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-600">by</span>
                          <div className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-md">
                            {getInitials(proj.clientId?.fullname || 'Anonymous')}
                          </div>
                          <span className="text-gray-700 font-medium truncate max-w-[120px] sm:max-w-none">
                            {maskName(proj.clientId?.fullname || 'Anonymous')}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{proj.introduction}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {proj.skills?.slice(0, 5).map((skill: string, idx: number) => (
                          <span key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border border-blue-200">
                            {skill}
                          </span>
                        ))}
                        {proj.skills?.length > 5 && (
                          <span className="bg-gray-50 text-gray-600 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border border-gray-200">
                            +{proj.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto sm:ml-4 flex-shrink-0">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">Budget</div>
                      <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">${proj.budgetMin} - ${proj.budgetMax}</div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">Due: {formatDate(proj.deadline)}</div>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => { e.stopPropagation(); handleViewProject(proj._id); }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center shadow-lg hover:shadow-xl"
                  >
                    <Eye size={18} />
                    View Project
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-8 pt-20">
      {/* Floating Icons Background - Fixed positioning covering entire page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const IconComponent = item.Icon;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{
                opacity: item.opacity,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                x: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                y: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <IconComponent size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={24} className="text-blue-600" />
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent break-words">{project.title}</h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                    <span>Posted by <span className="font-semibold text-blue-600">{maskName(project.clientId?.fullname || 'Anonymous')}</span></span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {getTimeAgo(project.createdAt)}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1">
                      <TrendingUp size={14} />
                      {project.bids?.length || 0} bids
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 pb-6 border-b-2 border-gray-200">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                >
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <Award size={14} />
                    Budget
                  </div>
                  <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">${project.budgetMin} - ${project.budgetMax}</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
                >
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <Target size={14} />
                    Deadline
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-900">{formatDate(project.deadline)}</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
                >
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Status</div>
                  <span className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold border border-green-300">
                    {project.status === 'open' ? '✓ Open for Bids' : project.status}
                  </span>
                </motion.div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3">Project Introduction</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{project.introduction}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3">Detailed Requirements</h3>
                <pre className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-wrap font-sans bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200 overflow-x-auto">
                  {project.detailedRequirements}
                </pre>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProposalClick}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {isAuthenticated ? 'Submit Your Proposal' : 'Login to Submit Proposal'}
              </motion.button>
            </motion.div>

            {showProposalModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowProposalModal(false)}>
                <div className="bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] border border-white/20 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-gradient-to-r from-[#0A0E27] to-[#1a1f3a] border-b border-white/20 px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Submit Your Proposal</h2>
                    <button onClick={() => setShowProposalModal(false)} className="text-gray-400 hover:text-white">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Proposed Fees (USD) <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          value={proposalData.proposedFees}
                          onChange={(e) => setProposalData({ ...proposalData, proposedFees: e.target.value })}
                          placeholder="950"
                          className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">You'll receive 90% after platform commission</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-2">
                        Delivery Timeline (Days) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        value={proposalData.timeline}
                        onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                        placeholder="14"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">
                      Cover Letter <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={proposalData.coverLetter}
                      onChange={(e) => setProposalData({ ...proposalData, coverLetter: e.target.value })}
                      placeholder="Explain why you're the best fit for this project. Include:
- Your relevant experience
- Similar projects you've completed
- Your approach to this specific project
- Any questions you have for the client"
                      rows={8}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Your Fee:</span>
                        <span className="font-semibold text-white">${proposalData.proposedFees || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Platform Commission (10%):</span>
                        <span className="font-semibold text-red-400">-${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.1).toFixed(2) : '0'}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/20">
                        <span className="font-bold text-white">You'll Receive:</span>
                        <span className="font-bold text-green-400">${proposalData.proposedFees ? (parseFloat(proposalData.proposedFees) * 0.9).toFixed(2) : '0'}</span>
                      </div>
                    </div>
                  </div>

                      <button
                        onClick={handleSubmitProposal}
                        disabled={submittingProposal}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Proposals ({project.bids?.length || 0})
              </h2>

              <div className="space-y-6">
                {project.bids && project.bids.length > 0 ? (
                  project.bids.map((bid: any) => (
                    <div key={bid._id} className="border border-white/20 rounded-xl p-6 hover:border-cyan-400 transition-all bg-white/5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                            {bid.freelancerId?.fullname?.substring(0, 2).toUpperCase() || 'FR'}
                          </div>
                          <div>
                            <div className="font-bold text-xl text-white mb-1">{bid.freelancerId?.fullname || 'Researcher'}</div>
                            <div className="text-sm text-gray-300 mb-2">{bid.freelancerId?.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-400">${bid.amount}</div>
                          <div className="text-xs text-gray-400 mt-1">{getTimeAgo(bid.createdAt)}</div>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">{bid.proposal}</p>

                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                          <MessageSquare size={18} />
                          Message
                        </button>
                        {user?._id === project.clientId?._id && bid.status === 'pending' && (
                          <button 
                            onClick={() => handleAcceptProposal(bid._id)}
                            disabled={acceptingBid === bid._id}
                            className="flex-1 border-2 border-cyan-400 text-cyan-400 py-2.5 rounded-xl font-semibold hover:bg-cyan-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {acceptingBid === bid._id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400"></div>
                                Accepting...
                              </>
                            ) : (
                              'Accept Proposal'
                            )}
                          </button>
                        )}
                        {bid.status === 'accepted' && (
                          <div className="flex-1 bg-green-500/20 text-green-400 py-2.5 rounded-xl font-semibold text-center border border-green-500/30">
                            ✓ Accepted
                          </div>
                        )}
                        {bid.status === 'rejected' && (
                          <div className="flex-1 bg-gray-500/20 text-gray-400 py-2.5 rounded-xl font-semibold text-center border border-gray-500/30">
                            Rejected
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-300 text-lg">No proposals yet</p>
                    <p className="text-gray-400 text-sm mt-2">Be the first to submit a proposal!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl shadow-2xl p-6 sticky top-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-900 text-lg">About the Client</h3>
              </div>
              <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {project.clientId?.fullname?.substring(0, 2).toUpperCase() || 'CL'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{maskName(project.clientId?.fullname || 'Client')}</div>
                  <div className="text-sm text-gray-600">Member since 2024</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Briefcase size={14} />
                    Projects Posted
                  </span>
                  <span className="font-semibold text-gray-900">15</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Award size={14} />
                    Total Spent
                  </span>
                  <span className="font-semibold text-gray-900">$12,450</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Star size={14} />
                    Average Rating
                  </span>
                  <span className="font-semibold text-gray-900">4.8 ⭐</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                  Payment Method
                </div>
                <div className="text-sm text-gray-700 font-medium">Secure Escrow Payment</div>
                <div className="text-xs text-gray-600 mt-2">Funds held safely until project completion</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}