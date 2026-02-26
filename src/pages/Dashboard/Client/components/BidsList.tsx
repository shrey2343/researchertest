import { useState, useEffect } from 'react';
import { X, User, DollarSign, Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProjectById, acceptBid, rejectBid } from '../../../../services/api';
import toast from 'react-hot-toast';

interface Bid {
  _id: string;
  freelancerId: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
  amount: number;
  proposal: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'declined';
  confirmationStatus?: 'pending' | 'confirmed' | 'declined';
}

interface BidsListProps {
  projectId: string;
  projectTitle: string;
  onClose: () => void;
  onBidAccepted: () => void;
}

export default function BidsList({ projectId, projectTitle, onClose, onBidAccepted }: BidsListProps) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingBidId, setAcceptingBidId] = useState<string | null>(null);
  const [rejectingBidId, setRejectingBidId] = useState<string | null>(null);

  useEffect(() => {
    fetchBids();
  }, [projectId]);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await getProjectById(projectId);
      if (response.success && response.project) {
        setBids(response.project.bids || []);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch bids');
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleAcceptBid = async (bidId: string) => {
    if (!confirm('Are you sure you want to accept this bid? This will start the project immediately.')) {
      return;
    }

    try {
      setAcceptingBidId(bidId);
      const response = await acceptBid(projectId, bidId);
      if (response.success) {
        toast.success('Bid accepted! Project has started successfully.');
        onBidAccepted();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to accept bid');
    } finally {
      setAcceptingBidId(null);
    }
  };

  const handleRejectBid = async (bidId: string) => {
    if (!confirm('Are you sure you want to reject this bid?')) {
      return;
    }

    try {
      setRejectingBidId(bidId);
      const response = await rejectBid(projectId, bidId);
      if (response.success) {
        toast.success('Bid rejected successfully!');
        fetchBids(); // Refresh the bids list
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject bid');
    } finally {
      setRejectingBidId(null);
    }
  };

  const maskName = (fullname: string): string => {
    const names = fullname.trim().split(' ');
    return names.map(name => {
      if (name.length === 0) return '';
      return name.charAt(0).toUpperCase() + '*'.repeat(Math.max(name.length - 1, 4));
    }).join(' ');
  };

  const maskEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    
    const maskedUsername = username.charAt(0).toLowerCase() + '*'.repeat(4);
    return `${maskedUsername}@${domain}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (bid: Bid) => {
    if (bid.status === 'accepted' && bid.confirmationStatus === 'pending') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1">
          <Loader2 size={14} className="animate-spin" />
          Awaiting Confirmation
        </span>
      );
    }
    if (bid.status === 'confirmed' || (bid.status === 'accepted' && bid.confirmationStatus === 'confirmed')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
          <CheckCircle size={14} />
          Confirmed
        </span>
      );
    }
    if (bid.status === 'declined' || bid.confirmationStatus === 'declined') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
          <XCircle size={14} />
          Declined
        </span>
      );
    }
    if (bid.status === 'rejected') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
          <XCircle size={14} />
          Rejected
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        Pending
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] text-white p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Bids Received</h2>
              <p className="text-white/90 text-sm">{projectTitle}</p>
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
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-[#2D6CDF]" size={40} />
            </div>
          ) : bids.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bids Yet</h3>
              <p className="text-gray-500">
                Freelancers haven't submitted any bids for this project yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bids.map((bid) => (
                <div
                  key={bid._id}
                  className={`border rounded-xl p-4 sm:p-6 transition-all ${
                    bid.status === 'accepted'
                      ? 'border-green-300 bg-green-50'
                      : bid.status === 'rejected'
                      ? 'border-gray-300 bg-gray-50 opacity-60'
                      : 'border-gray-200 hover:border-[#2D6CDF] hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Freelancer Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {bid.freelancerId.profilePhoto ? (
                          <img
                            src={bid.freelancerId.profilePhoto}
                            alt={bid.freelancerId.fullname}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          bid.freelancerId.fullname.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-[#1F1F1F]">
                              {maskName(bid.freelancerId.fullname)}
                            </h3>
                            <p className="text-sm text-gray-600">{maskEmail(bid.freelancerId.email)}</p>
                          </div>
                          {getStatusBadge(bid)}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign size={16} className="text-[#2D6CDF]" />
                            <span className="font-bold text-lg text-[#2D6CDF]">
                              {bid.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} />
                            <span>{formatDate(bid.submittedAt)}</span>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-[#1F1F1F] mb-2">Proposal</h4>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {bid.proposal}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {bid.status === 'pending' && (
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => handleAcceptBid(bid._id)}
                          disabled={acceptingBidId !== null || rejectingBidId !== null}
                          className="bg-[#2D6CDF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                        >
                          {acceptingBidId === bid._id ? (
                            <>
                              <Loader2 className="animate-spin" size={18} />
                              Accepting...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={18} />
                              Accept Bid
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleRejectBid(bid._id)}
                          disabled={acceptingBidId !== null || rejectingBidId !== null}
                          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                        >
                          {rejectingBidId === bid._id ? (
                            <>
                              <Loader2 className="animate-spin" size={18} />
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <XCircle size={18} />
                              Reject Bid
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    {(bid.status === 'confirmed' || (bid.status === 'accepted' && bid.confirmationStatus === 'confirmed')) && (
                      <div className="flex lg:flex-col gap-2">
                        <button
                          onClick={() => {
                            navigate('/escrow', {
                              state: {
                                projectId: projectId,
                                bidId: bid._id,
                                projectDetails: {
                                  title: projectTitle,
                                  freelancer: bid.freelancerId.fullname,
                                  agreedAmount: bid.amount,
                                },
                              },
                            });
                          }}
                          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                          <DollarSign size={18} />
                          Proceed to Payment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Total Bids: <span className="font-semibold">{bids.length}</span>
          </p>
        
        </div>
      </div>
    </div>
  );
}
