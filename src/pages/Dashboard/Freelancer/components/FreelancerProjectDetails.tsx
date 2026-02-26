import { useState } from 'react';
import { X, Calendar, DollarSign, User, FileText, Target, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import UpdateProgressModal from './UpdateProgressModal';
import { formatProjectTitle, formatProjectDescription } from '../../../../utils/textFormat';

interface FreelancerProjectDetailsProps {
  project: any;
  proposal?: any;
  onClose: () => void;
  onProjectUpdate?: () => void;
}

export default function FreelancerProjectDetails({ project, proposal, onClose, onProjectUpdate }: FreelancerProjectDetailsProps) {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const maskName = (fullname: string): string => {
    if (!fullname) return 'Anonymous';
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '***';
    }).join(' ');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] text-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 break-all overflow-hidden line-clamp-3">{formatProjectTitle(project.title)}</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {project.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'open' ? 'bg-blue-500/80' :
                  project.status === 'in-progress' ? 'bg-yellow-500/80' :
                  project.status === 'completed' ? 'bg-green-500/80' : 'bg-gray-500/80'
                }`}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg flex-shrink-0 self-start sm:self-center"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          {/* Key Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-white" size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-600">Budget Range</div>
                  <div className="font-bold text-blue-700 text-sm sm:text-lg truncate">
                    ${project.budgetMin} - ${project.budgetMax}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar className="text-white" size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-600">Deadline</div>
                  <div className="font-bold text-purple-700 text-sm sm:text-base truncate">
                    {formatDate(project.deadline)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <User className="text-white" size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-600">Client</div>
                  <div className="font-bold text-green-700 text-sm sm:text-base truncate">
                    {maskName(project.clientId?.fullname || 'Anonymous')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Proposal Section */}
          {proposal && (
            <div className={`rounded-xl p-6 mb-6 ${
              proposal.status === 'accepted' ? 'bg-green-50 border-2 border-green-300' :
              proposal.status === 'pending' ? 'bg-yellow-50 border-2 border-yellow-300' :
              'bg-red-50 border-2 border-red-300'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#1F1F1F]">Your Proposal</h3>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  proposal.status === 'accepted' ? 'bg-green-200 text-green-800' :
                  proposal.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {proposal.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <div className="text-sm text-gray-600 mb-1">Your Bid Amount</div>
                  <div className="text-xl sm:text-2xl font-bold text-[#2D6CDF]">
                    ${proposal.amount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <div className="text-sm text-gray-600 mb-1">Submitted On</div>
                  <div className="text-base sm:text-lg font-semibold text-[#1F1F1F]">
                    {formatDate(proposal.submittedAt)}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Your Proposal</div>
                <div className="text-gray-700 leading-relaxed break-all overflow-hidden">
                  <p className="line-clamp-4">{proposal.proposal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar for In-Progress Projects */}
          {project.status === 'in-progress' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="text-yellow-600" size={18} />
                  <span className="font-semibold text-yellow-800 text-sm sm:text-base">Project Progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-yellow-600">{project.progress || 0}%</span>
                  <button
                    onClick={() => setShowProgressModal(true)}
                    className="px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold"
                  >
                    <TrendingUp size={14} />
                    <span className="hidden sm:inline">Update Progress</span>
                    <span className="sm:hidden">Update</span>
                  </button>
                </div>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2 sm:h-3">
                <div
                  className="bg-yellow-500 h-2 sm:h-3 rounded-full transition-all"
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Introduction */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-[#2D6CDF]" size={20} />
              <h3 className="text-lg font-bold text-[#1F1F1F]">Introduction</h3>
            </div>
            <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg break-all overflow-hidden">
              <p className="line-clamp-6">{formatProjectDescription(project.introduction)}</p>
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="text-[#2D6CDF]" size={20} />
              <h3 className="text-lg font-bold text-[#1F1F1F]">Detailed Requirements</h3>
            </div>
            <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg break-all overflow-hidden">
              <p className="line-clamp-6">{project.detailedRequirements}</p>
            </div>
          </div>

          {/* Skills Required */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#1F1F1F] mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills && project.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-[#2D6CDF]/10 text-[#2D6CDF] rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="text-[#2D6CDF]" size={20} />
              <h3 className="text-lg font-bold text-[#1F1F1F]">Deliverables</h3>
            </div>
            <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg break-all overflow-hidden">
              <p className="line-clamp-4">{project.deliverables}</p>
            </div>
          </div>

          {/* Files */}
          {project.files && project.files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-3">Attached Files</h3>
              <div className="space-y-2">
                {project.files.map((file: any, index: number) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FileText className="text-[#2D6CDF]" size={20} />
                    <span className="text-gray-700 hover:text-[#2D6CDF]">{file.filename}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Project Stats */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold text-[#1F1F1F] mb-3">Project Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Bids</div>
                <div className="font-semibold text-[#1F1F1F]">
                  {project.bids?.length || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Posted On</div>
                <div className="font-semibold text-[#1F1F1F] text-sm">
                  {formatDate(project.createdAt)}
                </div>
              </div>
              {project.completedAt && (
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="text-sm text-gray-600 mb-1">Completed On</div>
                  <div className="font-semibold text-[#1F1F1F] text-sm">
                    {formatDate(project.completedAt)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Close
          </button>
        </div>
      </div>

      {/* Update Progress Modal */}
      {showProgressModal && (
        <UpdateProgressModal
          isOpen={showProgressModal}
          onClose={() => setShowProgressModal(false)}
          projectId={project._id}
          currentProgress={project.progress || 0}
          projectTitle={project.title}
          onProgressUpdated={() => {
            setShowProgressModal(false);
            onClose(); // Close the parent project details modal as well
            if (onProjectUpdate) {
              onProjectUpdate();
            }
          }}
        />
      )}
    </div>
  );
}
