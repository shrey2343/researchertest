import { useState, useEffect } from 'react';
import { 
  X, TrendingUp, Calendar, Clock, MessageSquare, Upload,
  FileText, Award, Zap, BarChart3, Target, Edit3,
  Paperclip, CheckCircle2, Rocket, Flag, Trophy,
  ArrowRight, Circle, ChevronRight, FolderOpen,
  Briefcase, Sparkles, Send, Layers, CheckSquare,
  Activity, PieChart
} from 'lucide-react';
import { updateProjectProgress } from '../../../../services/api';
import toast from 'react-hot-toast';

interface UpdateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  currentProgress: number;
  projectTitle: string;
  clientName?: string;
  deadline?: string;
  onProgressUpdated: () => void;
}

// Simple file upload function
const uploadProgressAttachment = async (projectId: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);
  
  // Mock return for now
  return Promise.resolve(URL.createObjectURL(file));
};

// Theme colors based on progress
const getProgressColors = (progress: number) => {
  if (progress >= 80) return {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    icon: 'text-emerald-600',
    bar: 'bg-emerald-600',
    light: 'bg-emerald-100'
  };
  if (progress >= 50) return {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    bar: 'bg-blue-600',
    light: 'bg-blue-100'
  };
  if (progress >= 25) return {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    icon: 'text-indigo-600',
    bar: 'bg-indigo-600',
    light: 'bg-indigo-100'
  };
  return {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    bar: 'bg-purple-600',
    light: 'bg-purple-100'
  };
};

const PROGRESS_OPTIONS = [
  { value: 10, label: '10%', description: 'Project initiated', icon: Circle },
  { value: 20, label: '20%', description: 'Initial phase', icon: Circle },
  { value: 30, label: '30%', description: 'Research phase', icon: Circle },
  { value: 40, label: '40%', description: 'Development', icon: Circle },
  { value: 50, label: '50%', description: 'Midway point', icon: Circle },
  { value: 60, label: '60%', description: 'Review phase', icon: Circle },
  { value: 70, label: '70%', description: 'Refinement', icon: Circle },
  { value: 80, label: '80%', description: 'Final stages', icon: Circle },
  { value: 90, label: '90%', description: 'Completion near', icon: Circle },
  { value: 100, label: '100%', description: 'Project complete', icon: CheckCircle2 },
];

// Professional milestone categories
const MILESTONE_CATEGORIES = [
  {
    name: 'Research & Planning',
    icon: Target,
    milestones: [
      'Initial research documentation completed',
      'Literature review finalized',
      'Methodology approved',
      'Data collection framework established',
      'Project roadmap validated',
      'Stakeholder requirements gathered',
      'Technical specifications documented',
      'Risk assessment completed'
    ]
  },
  {
    name: 'Development & Execution',
    icon: Briefcase,
    milestones: [
      'First draft delivered for review',
      'Prototype development completed',
      'Data analysis executed',
      'Statistical models validated',
      'Algorithm implementation finished',
      'Experimental results documented',
      'Quality assurance protocols followed',
      'Technical implementation completed'
    ]
  },
  {
    name: 'Review & Optimization',
    icon: Layers,
    milestones: [
      'Peer review process completed',
      'Client feedback incorporated',
      'Quality standards verified',
      'Revisions implemented',
      'Performance metrics validated',
      'Optimization completed',
      'Documentation updated',
      'Compliance check passed'
    ]
  },
  {
    name: 'Delivery & Closure',
    icon: Send,
    milestones: [
      'All deliverables submitted',
      'Final report delivered',
      'Client presentation completed',
      'Project handoff executed',
      'Client sign-off received',
      'Project successfully closed',
      'Post-project evaluation conducted',
      'Knowledge transfer completed'
    ]
  }
];

// Flatten milestones
const ALL_MILESTONES = MILESTONE_CATEGORIES.flatMap(cat => cat.milestones);

// Professional progress messages
const getProgressMessage = (progress: number) => {
  if (progress === 100) return "Project completion - finalizing all deliverables";
  if (progress >= 75) return "Final phase - wrapping up remaining tasks";
  if (progress >= 50) return "Midway point - progress on track";
  if (progress >= 25) return "Initial phase completed - continuing execution";
  return "Project initiated - establishing foundation";
};

const UpdateProgressModal = ({
  isOpen,
  onClose,
  projectId,
  currentProgress,
  projectTitle,
  clientName,
  deadline,
  onProgressUpdated,
}: UpdateProgressModalProps) => {
  const [selectedProgress, setSelectedProgress] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progressNote, setProgressNote] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [notifyClient, setNotifyClient] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProgress(null);
      setProgressNote('');
      setSelectedMilestone('');
      setAttachments([]);
      setEstimatedCompletion('');
      setNotifyClient(true);
      setActiveCategory(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getDaysRemaining = () => {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return days;
  };

  const handleUpdate = async () => {
    if (selectedProgress === null) {
      toast.error('Please select a progress percentage');
      return;
    }

    // Ensure progress is a valid number between 0 and 100
    const progressValue = Number(selectedProgress);
    if (isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
      toast.error('Progress must be a number between 0 and 100');
      return;
    }

    if (progressValue <= currentProgress && progressValue !== 100) {
      toast.error('Progress must be greater than current progress');
      return;
    }

    setIsUpdating(true);
    try {
      // Update progress with detailed data
      await updateProjectProgress(projectId, {
        progress: progressValue,
        milestone: selectedMilestone || undefined,
        note: progressNote || undefined,
        estimatedCompletion: estimatedCompletion || undefined,
        notifyClient,
      });
      
      // Success message
      const colors = getProgressColors(progressValue);
      if (progressValue === 100) {
        toast.success(
          <div className="flex items-start gap-3">
            <div className="p-1 bg-emerald-100 rounded-full">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Project Completed</p>
              <p className="text-sm text-gray-600">All deliverables have been finalized</p>
            </div>
          </div>,
          { duration: 5000 }
        );
      } else {
        toast.success(
          <div className="flex items-start gap-3">
            <div className={`p-1 ${colors.light} rounded-full`}>
              <TrendingUp className={`w-5 h-5 ${colors.icon}`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Progress Updated</p>
              <p className="text-sm text-gray-600">Now at {progressValue}% completion</p>
            </div>
          </div>
        );
      }
      
      onProgressUpdated();
      onClose();
    } catch (error: any) {
      console.error('Progress update error:', error);
      toast.error(error.message || 'Failed to update progress');
    } finally {
      setIsUpdating(false);
    }
  };

  const daysRemaining = getDaysRemaining();
  const ProgressIcon = selectedProgress === 100 ? CheckCircle2 : TrendingUp;
  const targetColors = selectedProgress ? getProgressColors(selectedProgress) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Update Progress</h2>
                <p className="text-sm text-gray-500">{projectTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Project Info Bar */}
          <div className="flex gap-4 mt-3 text-sm">
            {clientName && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{clientName}</span>
              </div>
            )}
            {daysRemaining !== null && daysRemaining > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{daysRemaining} days remaining</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Overview - Combined Bar Chart */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-700">Progress Update</h3>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              {/* Combined Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Project Progress</span>
                  <span className="text-sm text-gray-600">
                    {selectedProgress ? `${currentProgress}% → ${selectedProgress}%` : `${currentProgress}%`}
                  </span>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  {/* Current Progress */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${currentProgress}%` }}
                  />
                  {/* Target Progress Overlay */}
                  {selectedProgress && selectedProgress > currentProgress && (
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500 opacity-70"
                      style={{ width: `${selectedProgress}%` }}
                    />
                  )}
                </div>
                {selectedProgress && selectedProgress > currentProgress && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-emerald-700">Target Progress</span>
                    <span className="text-sm text-emerald-600 font-semibold">+{selectedProgress - currentProgress}% increase</span>
                  </div>
                )}
              </div>
              
              {/* Progress Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/60 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentProgress}%</div>
                  <div className="text-xs text-gray-600">Current</div>
                </div>
                {selectedProgress && (
                  <div className="text-center p-3 bg-white/60 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">{selectedProgress}%</div>
                    <div className="text-xs text-gray-600">Target</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Progress Level
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {PROGRESS_OPTIONS.map((option) => {
                const isDisabled = option.value <= currentProgress && option.value !== 100;
                const isSelected = selectedProgress === option.value;
                const colors = getProgressColors(option.value);
                const Icon = option.icon;

                return (
                  <button
                    key={option.value}
                    onClick={() => !isDisabled && setSelectedProgress(option.value)}
                    disabled={isDisabled}
                    className={`
                      relative p-3 rounded-lg border transition-all
                      ${isSelected
                        ? `${colors.border} ${colors.bg} border-2`
                        : isDisabled
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center">
                      <Icon className={`w-5 h-5 mb-1 ${
                        isSelected ? colors.icon : 'text-gray-500'
                      }`} />
                      <span className={`text-base font-medium ${
                        isSelected ? colors.text : 'text-gray-900'
                      }`}>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 text-center mt-1">
                        {option.description}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle2 className={`w-4 h-4 ${colors.icon}`} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Message */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{getProgressMessage(currentProgress)}</span>
            </div>
          </div>

          {/* Milestone Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Milestone Achievement
              <span className="text-xs text-gray-400 ml-2 font-normal">(optional)</span>
            </label>
            
            {/* Category Tabs */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {MILESTONE_CATEGORIES.map((category, idx) => {
                const Icon = category.icon;
                const isActive = activeCategory === idx;
                const colors = getProgressColors(isActive ? 60 : 0);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all
                      ${isActive
                        ? `${colors.bg} ${colors.border} border ${colors.text}`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? colors.icon : 'text-gray-500'}`} />
                    {category.name}
                  </button>
                );
              })}
            </div>

            <select
              value={selectedMilestone}
              onChange={(e) => setSelectedMilestone(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Select a milestone</option>
              {MILESTONE_CATEGORIES[activeCategory].milestones.map((milestone, index) => (
                <option key={index} value={milestone}>{milestone}</option>
              ))}
            </select>
          </div>

          {/* Progress Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress Note
              <span className="text-xs text-gray-400 ml-2 font-normal">(optional)</span>
            </label>
            <textarea
              value={progressNote}
              onChange={(e) => setProgressNote(e.target.value)}
              placeholder="Describe the work completed and any notable achievements..."
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
              <span className="text-xs text-gray-400 ml-2 font-normal">(optional)</span>
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png,.zip"
              />
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Click to upload files</span>
              </div>
            </label>

            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Estimated Completion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Completion Date
              <span className="text-xs text-gray-400 ml-2 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={estimatedCompletion}
              onChange={(e) => setEstimatedCompletion(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Client Notification */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notify Client</p>
                <p className="text-xs text-gray-500">Send an email with update details</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifyClient}
                onChange={(e) => setNotifyClient(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>

          {/* Summary Message */}
          {selectedProgress !== null && (
            <div className={`p-4 rounded-lg border ${
              selectedProgress === 100 
                ? 'bg-emerald-50 border-emerald-200' 
                : targetColors?.bg || 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                {selectedProgress === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                ) : (
                  <BarChart3 className={`w-5 h-5 ${targetColors?.icon || 'text-blue-600'} mt-0.5`} />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    selectedProgress === 100 ? 'text-emerald-800' : targetColors?.text || 'text-blue-800'
                  }`}>
                    {selectedProgress === 100 
                      ? 'Project Completion' 
                      : 'Progress Update Summary'
                    }
                  </p>
                  <p className={`text-sm mt-1 ${
                    selectedProgress === 100 ? 'text-emerald-700' : targetColors?.text || 'text-blue-700'
                  }`}>
                    Progress will be updated from {currentProgress}% to {selectedProgress}%
                    {progressNote && ` with notes`}
                    {selectedMilestone && ` and milestone "${selectedMilestone}"`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isUpdating || selectedProgress === null}
            className={`px-5 py-2 text-white text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
              selectedProgress === 100 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : targetColors?.bar?.replace('bg-', 'bg-') || 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUpdating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <ProgressIcon className="w-4 h-4" />
                <span>{selectedProgress === 100 ? 'Complete Project' : `Update to ${selectedProgress}%`}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProgressModal;