import { X, Calendar, DollarSign, User, FileText, Target, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import SuggestedFreelancers from '../../../../components/SuggestedFreelancers';
import ProgressDetailsModal from './ProgressDetailsModal';
import { formatProjectTitle, formatProjectDescription } from '../../../../utils/textFormat';

interface ProjectDetailsProps {
  project: any;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'bids' | 'suggested'>('details');
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const maskName = (fullname: string): string => {
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '*'.repeat(3);
    }).join(' ');
  };

  const getAcceptedBid = () => {
    if (!project.bids || project.bids.length === 0) return null;
    return project.bids.find((bid: any) => bid.status === 'accepted');
  };

  const acceptedBid = getAcceptedBid();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden my-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] text-white p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 break-words">{formatProjectTitle(project.title)}</h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-140px)]">
          {/* Tabs */}
          <div className="border-b border-gray-200 px-4 sm:px-6 pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-2 font-semibold transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-[#2D6CDF] text-[#2D6CDF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Project Details
              </button>
              <button
                onClick={() => setActiveTab('bids')}
                className={`pb-3 px-2 font-semibold transition-colors border-b-2 ${
                  activeTab === 'bids'
                    ? 'border-[#2D6CDF] text-[#2D6CDF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bids ({project.bids?.length || 0})
              </button>
              {project.status === 'open' && (
                <button
                  onClick={() => setActiveTab('suggested')}
                  className={`pb-3 px-2 font-semibold transition-colors border-b-2 ${
                    activeTab === 'suggested'
                      ? 'border-[#2D6CDF] text-[#2D6CDF]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  💡 Suggested Freelancers
                </button>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <>
                {/* Key Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">
                          {acceptedBid ? 'Fixed Budget' : 'Budget Range'}
                        </div>
                        <div className="font-bold text-blue-700 text-lg">
                          {acceptedBid 
                            ? `$${acceptedBid.amount.toLocaleString()}`
                            : `$${project.budgetMin} - $${project.budgetMax}`
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Deadline</div>
                        <div className="font-bold text-purple-700">
                          {formatDate(project.deadline)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {project.assignedFreelancer && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Researcher</div>
                          <div className="font-bold text-green-700">
                            {maskName(project.assignedFreelancer.fullname)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {project.status === 'in-progress' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="text-yellow-600" size={20} />
                        <span className="font-semibold text-yellow-800">Project Progress</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowProgressDetails(true)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Progress Details
                        </button>
                        <span className="text-lg font-bold text-yellow-600">{project.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
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
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-line break-all overflow-hidden">
                    {formatProjectDescription(project.introduction)}
                  </p>
                </div>

                {/* Detailed Requirements */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="text-[#2D6CDF]" size={20} />
                    <h3 className="text-lg font-bold text-[#1F1F1F]">Detailed Requirements</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {project.detailedRequirements}
                  </p>
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
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {project.deliverables}
                  </p>
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

                {/* Accepted Bid Details */}
                {acceptedBid && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-green-800 mb-4">Accepted Proposal</h3>
                    <div className="bg-white rounded-lg p-4">
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-1">Budget</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${acceptedBid.amount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">Proposal</div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {acceptedBid.proposal}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Bids Tab */}
            {activeTab === 'bids' && (
              <div>
                {project.bids && project.bids.length > 0 ? (
                  <div className="space-y-4">
                    {project.bids.map((bid: any, index: number) => (
                      <div
                        key={index}
                        className={`border rounded-xl p-4 ${
                          bid.status === 'accepted'
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {maskName(bid.freelancer?.fullname || 'Unknown')}
                            </div>
                            <div className="text-sm text-gray-600">
                              Bid Amount: <span className="font-bold text-[#2D6CDF]">${bid.amount?.toLocaleString()}</span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              bid.status === 'accepted'
                                ? 'bg-green-100 text-green-700'
                                : bid.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {bid.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{bid.proposal}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No bids received yet
                  </div>
                )}
              </div>
            )}

            {/* Suggested Freelancers Tab */}
            {activeTab === 'suggested' && project.status === 'open' && (
              <SuggestedFreelancers projectId={project._id} />
            )}
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
      
      {/* Progress Details Modal */}
      {showProgressDetails && (
        <ProgressDetailsModal
          project={project}
          onClose={() => setShowProgressDetails(false)}
        />
      )}
    </div>
  );
}
