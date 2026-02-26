import { X, User, Mail, Phone, Calendar, Briefcase, CreditCard, Building } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../../../services/adminApi';

interface UserDetailsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({ userId, isOpen, onClose }: UserDetailsModalProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetails();
    }
  }, [isOpen, userId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails(userId);
      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : user ? (
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="text-cyan-600" size={20} />
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <p className="font-semibold text-gray-900">{user.fullname}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    {user.phoneNumber || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Role</label>
                  <p className="font-semibold text-gray-900 capitalize">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
                      {user.role}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Joined Date</label>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    {formatDate(user.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Google ID</label>
                  <p className="font-semibold text-gray-900">{user.googleId || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Researcher Profile (if freelancer) */}
            {user.role === 'freelancer' && user.researcherProfile && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="text-cyan-600" size={20} />
                  Researcher Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <p className="font-semibold text-gray-900">{user.researcherProfile.title || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Bio</label>
                    <p className="text-gray-900">{user.researcherProfile.bio || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.researcherProfile.skills?.length > 0 ? (
                        user.researcherProfile.skills.map((skill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-sm">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No skills added</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Hourly Rate</label>
                      <p className="font-semibold text-gray-900">₹{user.researcherProfile.hourlyRate || 0}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Availability</label>
                      <p className="font-semibold text-gray-900 capitalize">{user.researcherProfile.availability || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Account (if freelancer) */}
            {user.role === 'freelancer' && user.bankAccount && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="text-cyan-600" size={20} />
                  Bank Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Account Holder Name</label>
                    <p className="font-semibold text-gray-900">{user.bankAccount.accountHolderName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Bank Name</label>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <Building size={16} className="text-gray-400" />
                      {user.bankAccount.bankName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Account Number</label>
                    <p className="font-semibold text-gray-900">{user.bankAccount.accountNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">IFSC Code</label>
                    <p className="font-semibold text-gray-900">{user.bankAccount.ifscCode || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Account Type</label>
                    <p className="font-semibold text-gray-900 capitalize">{user.bankAccount.accountType || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">UPI ID</label>
                    <p className="font-semibold text-gray-900">{user.bankAccount.upiId || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            User not found
          </div>
        )}

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
