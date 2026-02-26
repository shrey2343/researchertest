import { useEffect, useState } from 'react';
import { getAllVerifications, approveVerification, rejectVerification } from '../../../../services/verificationApi';
import { CheckCircle, XCircle, Eye, FileText, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface Document {
  documentType: string;
  documentUrl: string;
  documentName: string;
}

interface Verification {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
  verificationType: string;
  documents: Document[];
  status: string;
  submittedAt: string;
  adminReview?: {
    comments: string;
    reviewedAt: string;
  };
}

export default function VerificationWorkflow() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchVerifications();
  }, [statusFilter]);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const response = await getAllVerifications(statusFilter);
      if (response.success) {
        setVerifications(response.verifications);
      }
    } catch (error) {
      console.error('Failed to fetch verifications:', error);
      toast.error('Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (verificationId: string) => {
    if (!confirm('Are you sure you want to approve this verification?')) return;
    
    try {
      setActionLoading(true);
      const response = await approveVerification(verificationId);
      if (response.success) {
        toast.success('Verification approved successfully');
        fetchVerifications();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to approve:', error);
      toast.error('Failed to approve verification');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (verificationId: string) => {
    if (!rejectReason.trim()) {
      toast.error('Please provide rejection reason');
      return;
    }

    try {
      setActionLoading(true);
      const response = await rejectVerification(verificationId, rejectReason);
      if (response.success) {
        toast.success('Verification rejected');
        fetchVerifications();
        setShowModal(false);
        setRejectReason('');
      }
    } catch (error) {
      console.error('Failed to reject:', error);
      toast.error('Failed to reject verification');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string; border: string }> = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
      approved: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
    };
    const style = config[status] || config.pending;
    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${style.bg} ${style.text} border ${style.border}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Verification Requests</h3>
          <p className="text-sm text-gray-600">Review and approve user verifications</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="">All</option>
        </select>
      </div>

      {verifications.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No {statusFilter} verifications found</p>
      ) : (
        <div className="space-y-3">
          {verifications.map(verification => (
            <div key={verification._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {verification.userId.profilePhoto ? (
                      <img src={verification.userId.profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{verification.userId.fullname}</h4>
                      {getStatusBadge(verification.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{verification.userId.email}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {verification.verificationType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(verification.submittedAt)}
                      </span>
                      <span>{verification.documents.length} documents</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedVerification(verification);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-cyan-100 text-cyan-600 border border-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-200 transition-colors flex items-center gap-1"
                  >
                    <Eye size={16} />
                    Review
                  </button>
                  {verification.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(verification._id)}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-green-100 text-green-600 border border-green-300 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Verification Details</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setRejectReason('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedVerification.userId.profilePhoto ? (
                      <img src={selectedVerification.userId.profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedVerification.userId.fullname}</h4>
                    <p className="text-sm text-gray-600">{selectedVerification.userId.email}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Verification Type</label>
                  <p className="text-gray-900 capitalize">{selectedVerification.verificationType}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedVerification.status)}</div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Documents ({selectedVerification.documents.length})</label>
                  <div className="space-y-2">
                    {selectedVerification.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{doc.documentType}</p>
                          <p className="text-sm text-gray-600">{doc.documentName}</p>
                        </div>
                        <a
                          href={doc.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium hover:bg-blue-200"
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedVerification.adminReview && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-sm font-semibold text-gray-700">Admin Comments</label>
                    <p className="text-gray-900 mt-1">{selectedVerification.adminReview.comments}</p>
                    <p className="text-xs text-gray-500 mt-1">Reviewed on {formatDate(selectedVerification.adminReview.reviewedAt)}</p>
                  </div>
                )}

                {selectedVerification.status === 'pending' && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Rejection Reason (if rejecting)</label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Provide reason for rejection..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {selectedVerification.status === 'pending' && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleApprove(selectedVerification._id)}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedVerification._id)}
                    disabled={actionLoading || !rejectReason.trim()}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
