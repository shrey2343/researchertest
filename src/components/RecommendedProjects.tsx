import { useEffect, useState } from 'react';
import { getRecommendedProjects } from '../services/matchingApi';
import { Sparkles, TrendingUp, Eye, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatProjectTitle, formatProjectDescription } from '../utils/textFormat';

interface Project {
  _id: string;
  title: string;
  description: string;
  budget: { min: number; max: number };
  skills: string[];
  status: string;
  matchScore: number;
  matchLevel: {
    level: string;
    label: string;
    color: string;
    badge: string;
  };
  postedBy: {
    fullname: string;
  };
  createdAt: string;
}

export default function RecommendedProjects({ 
  onNavigateToBrowse, 
  proposals, 
  onSubmitProposalClick, 
  onViewProjectDetails,
  formatDate,
  getTimeAgo,
  maskName 
}: { 
  onNavigateToBrowse?: () => void;
  proposals?: any[];
  onSubmitProposalClick?: (e: React.MouseEvent, project: any) => void;
  onViewProjectDetails?: (project: any) => void;
  formatDate?: (date: string) => string;
  getTimeAgo?: (date: string) => string;
  maskName?: (name: string) => string;
}) {
  const [recommended, setRecommended] = useState<Project[]>([]);
  const [others, setOthers] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedProjects();
  }, []);

  const fetchRecommendedProjects = async () => {
    try {
      console.log('Fetching recommended projects...');
      const response = await getRecommendedProjects();
      console.log('Response:', response);
      if (response.success) {
        console.log('Recommended:', response.recommended?.length || 0);
        console.log('Others:', response.others?.length || 0);
        setRecommended(response.recommended || []);
        setOthers(response.others || []);
      }
    } catch (error) {
      console.error('Failed to fetch recommended projects:', error);
      toast.error('Failed to load recommended projects');
    } finally {
      setLoading(false);
    }
  };

  const getMatchBadgeColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'fair':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const ProjectCard = ({ project }: { project: any }) => {
    const hasSubmittedProposal = proposals?.some(proposal => proposal.project._id === project._id);
    
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-xl shadow-lg p-4 sm:p-6 hover:bg-white hover:border-blue-400 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1 min-w-0 line-clamp-3 break-all overflow-hidden">{formatProjectTitle(project.title)}</h3>
              {project.matchScore >= 40 && (
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 flex-shrink-0 ${getMatchBadgeColor(
                    project.matchLevel.level
                  )}`}
                >
                  <TrendingUp size={14} />
                  {project.matchScore}% Match
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-xs sm:text-sm text-gray-600">Posted {getTimeAgo ? getTimeAgo(project.createdAt) : new Date(project.createdAt).toLocaleDateString()}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-blue-600 font-semibold">{project.bids?.length || 0} bids</span>
                <span className="text-xs sm:text-sm text-gray-600">by {maskName ? maskName(project.clientId?.fullname || 'Anonymous') : 'Anonymous'}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 break-all overflow-hidden">{formatProjectDescription(project.introduction || project.description)}</p>
            <div className="flex flex-wrap gap-2">
              {project.skills?.slice(0, 3).map((skill: string, idx: number) => (
                <span key={idx} className="bg-blue-50 text-blue-600 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border border-blue-200">
                  {skill}
                </span>
              ))}
              {project.skills?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{project.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right mt-3 lg:mt-0">
            <div className="text-xs sm:text-sm text-gray-500">Budget</div>
            <div className="text-base sm:text-xl font-bold text-blue-600">
              ₹{(project.budgetMin || project.budget?.min)?.toLocaleString()} - ₹{(project.budgetMax || project.budget?.max)?.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">Due: {formatDate ? formatDate(project.deadline) : new Date(project.deadline).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            onClick={() => onViewProjectDetails?.(project)}
            className="bg-white border-2 border-blue-400 text-blue-600 px-4 sm:px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Eye size={16} />
            View Details
          </button>
          {hasSubmittedProposal ? (
            <button 
              disabled
              className="bg-gray-500 text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold cursor-not-allowed inline-flex items-center justify-center gap-2 opacity-70 text-sm sm:text-base"
            >
              <CheckCircle size={16} />
              Submitted
            </button>
          ) : (
            <button 
              onClick={(e) => onSubmitProposalClick?.(e, project)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send size={16} />
              Submit Proposal
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Recommended Projects Section */}
      {recommended.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="text-cyan-600" size={20} />
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Recommended for You</h2>
              <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-semibold">
                {recommended.length}
              </span>
            </div>
            <div
              onClick={() => onNavigateToBrowse?.()}
              className="px-4 sm:px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-semibold text-xs sm:text-sm cursor-pointer w-full sm:w-auto transition-all active:scale-95 text-center select-none"
            >
              See All Projects
            </div>
          </div>
          <div className="space-y-4">
            {recommended.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <Sparkles className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-base sm:text-lg mb-4">No recommended projects at the moment</p>
          <div
            onClick={onNavigateToBrowse}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto cursor-pointer active:scale-95 text-center select-none"
          >
            Browse All Projects
          </div>
        </div>
      )}
    </div>
  );
}
