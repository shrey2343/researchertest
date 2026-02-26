import { useState, useEffect } from 'react';
import { DollarSign, User, Briefcase, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getAdminProjects } from '../../../../services/projectApi';
import toast from 'react-hot-toast';
import PaymentReleaseModal from '../../../../components/shared/PaymentReleaseModal';

interface AdminProject {
  _id: string;
  projectId: any;
  clientId: any;
  freelancerId: any;
  clientName: string;
  freelancerName: string;
  projectTitle: string;
  bidAmount: number;
  escrowAmount: number;
  platformCommission: number;
  paymentStatus: string;
  projectStatus: string;
  clientApproval: {
    approved: boolean;
    approvedAt?: Date;
  };
  emailNotifications: {
    proposalAcceptedSent: boolean;
    paymentReleaseSent: boolean;
  };
  createdAt: string;
}

export default function AdminProjectsTable() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);
  const [showReleaseModal, setShowReleaseModal] = useState(false);

  useEffect(() => {
    fetchAdminProjects();
  }, []);

  const fetchAdminProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching admin projects...');
      const response = await getAdminProjects();
      console.log('Admin projects response:', response);
      if (response.success) {
        setProjects(response.adminProjects || []);
      } else {
        console.error('Failed to fetch:', response);
        setError('No admin projects found');
      }
    } catch (error: any) {
      console.error('Error fetching admin projects:', error);
      setError(error.message || 'Failed to fetch admin projects');
      toast.error(error.message || 'Failed to fetch admin projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseClick = (project: AdminProject) => {
    setSelectedProject(project);
    setShowReleaseModal(true);
  };

  const handleReleaseSuccess = () => {
    fetchAdminProjects();
    setShowReleaseModal(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    if (filterStatus === 'all') return true;
    return project.paymentStatus === filterStatus;
  });

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string; icon: any }> = {
      released: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: CheckCircle
      },
      pending: {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        icon: Clock
      },
      escrow_deposited: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: Clock
      },
      refunded: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: AlertCircle
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${config.bg} ${config.text} border ${config.border} flex items-center gap-1.5 w-fit backdrop-blur-sm`}
      >
        <Icon size={14} />
        {status.replace(/_/g, ' ').toUpperCase()}
      </span>
    );
  };


  const getProjectStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; border: string; icon?: any }> = {
      'in-progress': {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-300',
        icon: Clock
      },
      completed: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        icon: CheckCircle
      },
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        icon: CheckCircle
      },
      disputed: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        icon: AlertCircle
      }
    };

    const config =
      statusConfig[status] || {
        bg: 'bg-gray-500/20',
        text: 'text-gray-300',
        border: 'border-gray-400/30'
      };

    const Icon = config.icon;

    return (
      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${config.bg} ${config.text} border ${config.border} flex items-center gap-1.5 w-fit backdrop-blur-sm`}>
        {Icon && <Icon size={14} />}
        {status.replace(/[-_]/g, ' ').toUpperCase()}
      </span>
    );
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchAdminProjects}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">


      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Payment Management
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage escrow payments and project completions
          </p>

        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-xl
focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base w-full sm:w-auto"
        >
          <option value="all">All Status</option>

          <option value="pending" className="bg-gray-800 text-white">Pending</option>
          <option value="escrow_deposited" className="bg-gray-800 text-white">Escrow Deposited</option>
          <option value="released" className="bg-gray-800 text-white">Released</option>
          <option value="refunded" className="bg-gray-800 text-white">Refunded</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No admin projects found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {filteredProjects.map((project) => (
              <div key={project._id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Briefcase className="text-cyan-600 mt-1" size={16} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {project.projectTitle}
                      </h3>
                      <div className="text-xs text-gray-600">
                        {project.clientName} → {project.freelancerName}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.projectStatus === 'completed' ? 'bg-green-100 text-green-600' :
                    project.projectStatus === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {project.projectStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Amount</div>
                    <div className="font-semibold text-gray-900">₹{project.bidAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Payment Status</div>
                    <div className={`text-xs font-medium ${
                      project.paymentStatus === 'released' ? 'text-green-600' :
                      project.paymentStatus === 'escrow_deposited' ? 'text-blue-600' :
                      'text-amber-600'
                    }`}>
                      {project.paymentStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {project.clientApproval.approved && project.paymentStatus !== 'released' && (
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setShowReleaseModal(true);
                        }}
                        className="px-3 py-1 bg-green-100 text-green-600 border border-green-300 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                      >
                        Release
                      </button>
                    )}
                    <button className="px-3 py-1 bg-cyan-100 text-cyan-600 border border-cyan-300 rounded-lg text-xs font-medium hover:bg-cyan-200 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[800px] px-4 sm:px-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Project</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-gray-900 text-xs sm:text-sm border-b border-gray-200">Client</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Freelancer</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Amount</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Payment Status</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Status</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Created</th>
                    <th className="text-left py-3 sm:py-4 px-2 sm:px-4 font-semibold text-[#0F172A] text-xs sm:text-sm border-b border-[#E5E7EB]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200">

                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-start gap-3">
                          <Briefcase className="text-cyan-600 mt-1" size={16} />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                              {project.projectTitle}
                            </div>
                            <div className="text-xs text-[#4B5563] sm:hidden">
                              {project.clientName} → {project.freelancerName}
                            </div>
                            <div className="text-xs text-[#6B7280]">
                              {project.emailNotifications.proposalAcceptedSent && <span className="mr-2">✓ Email</span>}
                              {project.clientApproval.approved && <span>✓ Approved</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 sm:py-4 px-2 sm:px-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          {project.clientId?.profilePhoto ? (
                            <img
                              src={project.clientId.profilePhoto}
                              alt={project.clientName}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <User size={12} className="sm:w-4 sm:h-4 text-blue-400" />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 text-sm truncate">
                            {project.clientName}
                          </span>

                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {project.freelancerId?.profilePhoto ? (
                            <img
                              src={project.freelancerId.profilePhoto}
                              alt={project.freelancerName}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                              <User size={12} className="sm:w-4 sm:h-4 text-green-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">
                              {project.freelancerName}
                            </div>

                            {project.freelancerId?.bankAccount?.accountNumber && (
                              <div className="text-xs text-gray-500 font-mono truncate">
                                Bank: {project.freelancerId.bankAccount.accountNumber}
                              </div>
                            )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div>
                        <div className="font-bold text-cyan-600 flex items-center gap-1 text-sm sm:text-base">
                          <span className="text-base sm:text-lg font-semibold">₹</span>
                          {project.bidAmount.toLocaleString('en-IN')}
                        </div>

                        <div className="text-xs text-gray-600">

                          Escrow: ₹{project.escrowAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 hidden sm:block">
                          Fee: ₹{project.platformCommission.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 hidden lg:table-cell">
                      {getPaymentStatusBadge(project.paymentStatus)}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="space-y-1">
                        {getProjectStatusBadge(project.projectStatus)}
                        <div className="lg:hidden">
                          {getPaymentStatusBadge(project.paymentStatus)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 hidden xl:table-cell">
                      <div className="flex items-center gap-2 text-gray-600">

                        <Calendar size={14} />
                        <span className="text-sm">{formatDate(project.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      {project.clientApproval.approved && project.paymentStatus !== 'released' ? (
                        <button
                          onClick={() => handleReleaseClick(project)}
                          className="px-2 sm:px-4 py-1.5 sm:py-2
                          bg-blue-600 text-white
                          border border-blue-600
                          rounded-lg hover:bg-blue-700
                          transition-colors font-medium text-xs sm:text-sm
                          flex items-center gap-1 sm:gap-2"

                        >
                          <DollarSign size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Release Payment</span>
                          <span className="sm:hidden">Release</span>
                        </button>
                      ) : project.paymentStatus === 'released' ? (
                        <span className="text-green-400 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                          <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Released</span>
                          <span className="sm:hidden">✓</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs sm:text-sm">
                          <span className="hidden sm:inline">Pending Approval</span>
                          <span className="sm:hidden">Pending</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {/* Summary Stats */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Projects */}
        <div className="bg-blue-100/50 backdrop-blur-sm border border-blue-200/50 rounded-xl p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-blue-600 mb-1">Total Projects</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-800">{projects.length}</div>
        </div>

        {/* Total Escrow */}
        <div className="bg-green-100/50 backdrop-blur-sm border border-green-200/50 rounded-xl p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-green-600 mb-1">Total Escrow</div>
          <div className="text-xl sm:text-2xl font-bold text-green-800">
            ₹{projects.reduce((sum, p) => sum + p.escrowAmount, 0).toLocaleString()}
          </div>
        </div>

        {/* Platform Fees */}
        <div className="bg-purple-100/50 backdrop-blur-sm border border-purple-200/50 rounded-xl p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-purple-600 mb-1">Platform Fees</div>
          <div className="text-xl sm:text-2xl font-bold text-purple-800">
            ₹{projects.reduce((sum, p) => sum + p.platformCommission, 0).toLocaleString()}
          </div>
        </div>

        {/* Pending Release */}
        <div className="bg-amber-100/50 backdrop-blur-sm border border-amber-200/50 rounded-xl p-3 sm:p-4">
          <div className="text-xs sm:text-sm text-amber-600 mb-1">Pending Release</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-800">
            {projects.filter(p => p.clientApproval.approved && p.paymentStatus !== 'released').length}
          </div>
        </div>
      </div>


      {/* Payment Release Modal */}
      {selectedProject && selectedProject.freelancerId && (
        <PaymentReleaseModal
          isOpen={showReleaseModal}
          onClose={() => {
            setShowReleaseModal(false);
            setSelectedProject(null);
          }}
          adminProjectId={selectedProject._id}
          freelancer={{
            _id: selectedProject.freelancerId._id,
            fullname: selectedProject.freelancerName,
            email: selectedProject.freelancerId.email,
            bankAccount: selectedProject.freelancerId.bankAccount || {},
          }}
          projectTitle={selectedProject.projectTitle}
          amount={selectedProject.bidAmount}
          onSuccess={handleReleaseSuccess}
        />
      )}

    </div>
  );
}
