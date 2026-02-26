import { useState, useEffect } from 'react';
import { 
  X, Calendar, FileText, Download, Eye, 
  TrendingUp, CheckCircle2, BarChart3, Target,
  ArrowRight, User, Activity, Award, Clock
} from 'lucide-react';
import { getProgressUpdates } from '../../../../services/api';
import toast from 'react-hot-toast';

interface ProgressUpdate {
  _id: string;
  projectId: string;
  freelancerId: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
  previousProgress: number;
  newProgress: number;
  milestone?: string;
  note?: string;
  attachments?: {
    filename: string;
    url: string;
    size: number;
  }[];
  estimatedCompletion?: string;
  notifyClient: boolean;
  clientViewed: boolean;
  clientViewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProgressDetailsModalProps {
  project: any;
  onClose: () => void;
}

const getProgressColors = (progress: number) => {
  if (progress >= 80) return {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    icon: 'text-emerald-600',
    bar: 'bg-emerald-600'
  };
  if (progress >= 50) return {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    bar: 'bg-blue-600'
  };
  if (progress >= 25) return {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    icon: 'text-indigo-600',
    bar: 'bg-indigo-600'
  };
  return {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    bar: 'bg-purple-600'
  };
};

const ProgressDetailsModal = ({ project, onClose }: ProgressDetailsModalProps) => {
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [selectedUpdate, setSelectedUpdate] = useState<ProgressUpdate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressUpdates = async () => {
      if (!project._id) return;
      
      try {
        setLoading(true);
        const response = await getProgressUpdates(project._id);
        setProgressUpdates(response.progressUpdates || []);
      } catch (error: any) {
        // Since backend endpoint doesn't exist yet, create a mock progress update
        // based on current project progress to show the UI structure
        if (project.progress > 0) {
          const mockUpdate = {
            _id: 'mock-1',
            projectId: project._id,
            freelancerId: {
              _id: project.assignedFreelancer?._id || 'unknown',
              fullname: project.assignedFreelancer?.fullname || 'Freelancer',
              email: project.assignedFreelancer?.email || 'unknown@email.com'
            },
            previousProgress: 0,
            newProgress: project.progress,
            milestone: 'Current project status',
            note: 'Progress tracking will show detailed updates once the researcher submits progress reports.',
            attachments: [],
            estimatedCompletion: project.deadline,
            notifyClient: true,
            clientViewed: false,
            createdAt: project.updatedAt || project.createdAt,
            updatedAt: project.updatedAt || project.createdAt
          };
          setProgressUpdates([mockUpdate]);
        } else {
          setProgressUpdates([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgressUpdates();
  }, [project._id, project.progress, project.assignedFreelancer, project.deadline, project.updatedAt, project.createdAt]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentColors = getProgressColors(project.progress);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold mb-2">Progress Details</h2>
              <p className="text-blue-100 truncate">{project.title}</p>
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
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Current Progress Overview */}
              <div className={`p-6 ${currentColors.bg} rounded-xl border ${currentColors.border} mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${currentColors.bg} rounded-lg border ${currentColors.border}`}>
                      <BarChart3 className={`w-5 h-5 ${currentColors.icon}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${currentColors.text}`}>Current Progress</h3>
                      <p className="text-sm text-gray-600">Overall completion status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${currentColors.text}`}>{project.progress}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full ${currentColors.bar} rounded-full transition-all duration-500`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{project.assignedFreelancer?.fullname || 'Freelancer'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    <span>{progressUpdates.length} updates</span>
                  </div>
                </div>
              </div>

              {/* Progress Updates History */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Progress History</h3>
                </div>

                {progressUpdates.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No progress updates yet</p>
                    <div className="text-left max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">What you'll see here:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Progress percentage changes</li>
                        <li>• Milestone achievements</li>
                        <li>• Work notes and updates</li>
                        <li>• File attachments</li>
                        <li>• Estimated completion dates</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {progressUpdates.map((update, index) => {
                      const updateColors = getProgressColors(update.newProgress);
                      const isCompleted = update.newProgress === 100;
                      
                      return (
                        <div
                          key={update._id}
                          className="relative border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedUpdate(update)}
                        >
                          {/* Timeline connector */}
                          {index < progressUpdates.length - 1 && (
                            <div className="absolute left-8 top-20 w-0.5 h-8 bg-gray-200"></div>
                          )}
                          
                          <div className="flex items-start gap-4">
                            <div className={`p-3 ${updateColors.bg} rounded-lg border ${updateColors.border} flex-shrink-0`}>
                              {isCompleted ? (
                                <CheckCircle2 className={`w-6 h-6 ${updateColors.icon}`} />
                              ) : (
                                <TrendingUp className={`w-6 h-6 ${updateColors.icon}`} />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span className={`text-lg font-bold ${updateColors.text}`}>
                                    {update.previousProgress}% → {update.newProgress}%
                                  </span>
                                  <ArrowRight className={`w-5 h-5 ${updateColors.icon}`} />
                                  {isCompleted && (
                                    <Award className="w-5 h-5 text-yellow-500" />
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {formatDate(update.createdAt)}
                                </span>
                              </div>
                              
                              {update.milestone && (
                                <div className="flex items-center gap-2 mb-3">
                                  <Target className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm font-medium text-gray-700">{update.milestone}</span>
                                </div>
                              )}
                              
                              {update.note && (
                                <div className="mb-3">
                                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm break-words whitespace-pre-wrap">
                                    {update.note}
                                  </p>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                {update.attachments && update.attachments.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <FileText className="w-4 h-4" />
                                    <span>{update.attachments.length} files</span>
                                  </div>
                                )}
                                {update.estimatedCompletion && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Est: {new Date(update.estimatedCompletion).toLocaleDateString()}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>Click for details</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Detailed Update Modal */}
        {selectedUpdate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${getProgressColors(selectedUpdate.newProgress).bg} rounded-lg`}>
                      <TrendingUp className={`w-5 h-5 ${getProgressColors(selectedUpdate.newProgress).icon}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Update Details</h3>
                      <p className="text-sm text-gray-500">{formatDate(selectedUpdate.createdAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUpdate(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Progress Change */}
                <div className={`p-4 ${getProgressColors(selectedUpdate.newProgress).bg} rounded-lg border ${getProgressColors(selectedUpdate.newProgress).border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Progress Update</span>
                    <span className={`text-lg font-bold ${getProgressColors(selectedUpdate.newProgress).text}`}>
                      {selectedUpdate.previousProgress}% → {selectedUpdate.newProgress}%
                    </span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColors(selectedUpdate.newProgress).bar} rounded-full transition-all`}
                      style={{ width: `${selectedUpdate.newProgress}%` }}
                    />
                  </div>
                </div>

                {/* Milestone */}
                {selectedUpdate.milestone && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Milestone Achieved</h4>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedUpdate.milestone}</span>
                    </div>
                  </div>
                )}

                {/* Progress Note */}
                {selectedUpdate.note && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Progress Note</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">{selectedUpdate.note}</p>
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {selectedUpdate.attachments && selectedUpdate.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedUpdate.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{attachment.filename}</span>
                            <span className="text-xs text-gray-500">({(attachment.size / 1024).toFixed(0)} KB)</span>
                          </div>
                          <a 
                            href={attachment.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Download className="w-4 h-4 text-gray-500" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Completion */}
                {selectedUpdate.estimatedCompletion && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Estimated Completion</h4>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {new Date(selectedUpdate.estimatedCompletion).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}

                {/* Freelancer Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Updated By</h4>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{selectedUpdate.freelancerId.fullname}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDetailsModal;