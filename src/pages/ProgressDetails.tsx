import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, FileText, Download, Eye, 
  TrendingUp, CheckCircle2, BarChart3, Target,
  ArrowRight, User, Activity, PieChart, Award, 
  Sparkles, X, ArrowLeft
} from 'lucide-react';
import { getProgressUpdates, getProjectById } from '../services/api';
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

const ProgressDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [project, setProject] = useState<any>(null);
  const [selectedUpdate, setSelectedUpdate] = useState<ProgressUpdate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        const [progressResponse, projectResponse] = await Promise.all([
          getProgressUpdates(projectId),
          getProjectById(projectId)
        ]);
        
        setProgressUpdates(progressResponse.progressUpdates || []);
        setProject(projectResponse.project);
      } catch (error: any) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load progress details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentColors = project ? getProgressColors(project.progress) : getProgressColors(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.close()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Progress Details</h1>
              <p className="text-gray-600">{project.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Current Progress Overview */}
        <div className={`p-6 ${currentColors.bg} rounded-xl border ${currentColors.border}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${currentColors.bg} rounded-lg border ${currentColors.border}`}>
                <PieChart className={`w-5 h-5 ${currentColors.icon}`} />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${currentColors.text}`}>Current Progress</h3>
                <p className="text-sm text-gray-600">{project.title}</p>
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
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Complete Progress History</h3>
          </div>

          {progressUpdates.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No progress updates yet</p>
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
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                              {update.note}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          {update.attachments && update.attachments.length > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{update.attachments.length} files attached</span>
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
                            <span>Click for full details</span>
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
                      <h3 className="text-lg font-semibold text-gray-900">Progress Update Details</h3>
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
                      <p className="text-sm text-gray-700">{selectedUpdate.note}</p>
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

export default ProgressDetails;