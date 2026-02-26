import { useEffect, useState } from 'react';
import { getSuggestedFreelancers, sendInvitation } from '../services/matchingApi';
import { Users, TrendingUp, Mail, DollarSign, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Freelancer {
  _id: string;
  fullname: string;
  email: string;
  profilePhoto?: string;
  title: string;
  skills: string[];
  hourlyRate: number;
  availability: string;
  matchScore: number;
  matchLevel: {
    level: string;
    label: string;
    color: string;
    badge: string;
  };
  invitationStatus: string | null;
}

interface SuggestedFreelancersProps {
  projectId: string;
}

export default function SuggestedFreelancers({ projectId }: SuggestedFreelancersProps) {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchSuggestedFreelancers();
    }
  }, [projectId]);

  const fetchSuggestedFreelancers = async () => {
    try {
      const response = await getSuggestedFreelancers(projectId);
      if (response.success) {
        setFreelancers(response.freelancers || []);
      }
    } catch (error) {
      console.error('Failed to fetch suggested freelancers:', error);
      toast.error('Failed to load suggested freelancers');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (freelancerId: string, freelancerName: string) => {
    try {
      setInviting(freelancerId);
      const response = await sendInvitation(projectId, freelancerId);
      if (response.success) {
        toast.success(`Invitation sent to ${freelancerName}`);
        // Update local state
        setFreelancers(
          freelancers.map((f) =>
            f._id === freelancerId ? { ...f, invitationStatus: 'pending' } : f
          )
        );
      } else {
        toast.error(response.message || 'Failed to send invitation');
      }
    } catch (error) {
      console.error('Failed to send invitation:', error);
      toast.error('Failed to send invitation');
    } finally {
      setInviting(null);
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

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (freelancers.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 text-lg">No matching freelancers found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your project requirements</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Users className="text-cyan-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Suggested Freelancers</h3>
        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
          {freelancers.length} Matches
        </span>
      </div>

      {freelancers.map((freelancer) => (
        <div
          key={freelancer._id}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            {/* Profile Photo */}
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {freelancer.fullname
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">***</h4>
                  <p className="text-sm text-gray-600">{freelancer.title || 'Freelancer'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 ${getMatchBadgeColor(
                    freelancer.matchLevel.level
                  )}`}
                >
                  <TrendingUp size={14} />
                  {freelancer.matchScore}% Match
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {freelancer.skills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {freelancer.skills.length > 5 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{freelancer.skills.length - 5} more
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  <span>₹{freelancer.hourlyRate}/hr</span>
                </div>
                {freelancer.availability && (
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="capitalize">{freelancer.availability}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div>
                {freelancer.invitationStatus === 'pending' ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle size={16} />
                    Invitation Sent
                  </button>
                ) : freelancer.invitationStatus === 'accepted' ? (
                  <button
                    disabled
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle size={16} />
                    Accepted
                  </button>
                ) : (
                  <button
                    onClick={() => handleInvite(freelancer._id, freelancer.fullname)}
                    disabled={inviting === freelancer._id}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mail size={16} />
                    {inviting === freelancer._id ? 'Sending...' : 'Invite to Bid'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
