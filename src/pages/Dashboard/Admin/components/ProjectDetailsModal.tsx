import { X, User, Calendar, DollarSign, Briefcase, FileText, Tag } from 'lucide-react';

interface ProjectDetailsModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!isOpen || !project) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: 'bg-green-100 text-green-700 border-green-300',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
      completed: 'bg-purple-100 text-purple-700 border-purple-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status] || colors.open;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Status */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusColor(project.status)}`}>
                {project.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Posted on {formatDate(project.createdAt)}</span>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <User size={20} className="text-blue-600" />
              <h4 className="font-semibold text-gray-900">Client Information</h4>
            </div>
            <div className="ml-8">
              <p className="text-gray-900 font-medium">{project.clientId?.fullname || 'Unknown'}</p>
              <p className="text-sm text-gray-600">{project.clientId?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Freelancer Info */}
          {project.assignedFreelancer && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <User size={20} className="text-green-600" />
                <h4 className="font-semibold text-gray-900">Assigned Freelancer</h4>
              </div>
              <div className="ml-8">
                <p className="text-gray-900 font-medium">{project.assignedFreelancer.fullname}</p>
                <p className="text-sm text-gray-600">{project.assignedFreelancer.email}</p>
              </div>
            </div>
          )}

          {/* Budget */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={20} className="text-purple-600" />
              <h4 className="font-semibold text-gray-900">Budget</h4>
            </div>
            <div className="ml-8">
              <p className="text-2xl font-bold text-purple-600">
                ₹{project.budgetMin?.toLocaleString()} - ₹{project.budgetMax?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Category & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase size={20} className="text-cyan-600" />
                <h4 className="font-semibold text-gray-900">Category</h4>
              </div>
              <p className="ml-8 text-gray-900">{project.category || 'General'}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Tag size={20} className="text-amber-600" />
                <h4 className="font-semibold text-gray-900">Total Bids</h4>
              </div>
              <p className="ml-8 text-2xl font-bold text-amber-600">{project.bids?.length || 0}</p>
            </div>
          </div>

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FileText size={20} className="text-gray-600" />
              <h4 className="font-semibold text-gray-900">Project Description</h4>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {project.introduction || project.detailedRequirements || 'No description provided'}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          {project.deliverables && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-700">{project.deliverables}</p>
              </div>
            </div>
          )}

          {/* Deadline */}
          {project.deadline && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-red-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Deadline</h4>
                  <p className="text-gray-700">{formatDate(project.deadline)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bids List */}
          {project.bids && project.bids.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Bids ({project.bids.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {project.bids.map((bid: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Freelancer #{idx + 1}</p>
                        <p className="text-sm text-gray-600">{bid.proposal?.substring(0, 100)}...</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-cyan-600">₹{bid.amount?.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          bid.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          bid.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {bid.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
