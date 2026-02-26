import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, CreditCard, Building, Hash, Code, Wallet } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { updateProfile, getBankAccount, updateBankAccount } from '../../../../services/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing'>('profile');
  const [loading, setLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [bankData, setBankData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    upiId: '',
  });

  const [hasBankAccount, setHasBankAccount] = useState(false);

  useEffect(() => {
    if (activeTab === 'billing') {
      fetchBankAccount();
    }
  }, [activeTab]);

  const fetchBankAccount = async () => {
    setBankLoading(true);
    try {
      const response = await getBankAccount();
      if (response.success && response.bankAccount) {
        const account = response.bankAccount;
        setBankData({
          accountHolderName: account.accountHolderName || '',
          bankName: account.bankName || '',
          accountNumber: account.accountNumber || '',
          ifscCode: account.ifscCode || '',
          accountType: account.accountType || '',
          upiId: account.upiId || '',
        });
        setHasBankAccount(!!(account.accountNumber || account.upiId));
      }
    } catch (error: any) {
      console.error('Failed to fetch bank account:', error);
    } finally {
      setBankLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', profileData.fullname);
      formData.append('email', profileData.email);
      formData.append('phoneNumber', profileData.phoneNumber);

      const response = await updateProfile(formData);
      if (response.success) {
        toast.success('Profile updated successfully!');
        await refreshUser();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBankAccountUpdate = async () => {
    if (!bankData.accountHolderName && !bankData.bankName && !bankData.accountNumber && !bankData.upiId) {
      toast.error('Please provide at least some billing details');
      return;
    }

    setBankLoading(true);
    try {
      const response = await updateBankAccount(bankData);
      if (response.success) {
        toast.success('Billing details updated successfully!');
        setHasBankAccount(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update billing details');
    } finally {
      setBankLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white border border-blue-200 rounded-2xl shadow-lg p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full px-4 py-3 font-semibold transition-all rounded-xl cursor-pointer touch-manipulation active:scale-95 ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="inline-block mr-2" size={16} />
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className={`w-full px-4 py-3 font-semibold transition-all rounded-xl cursor-pointer touch-manipulation active:scale-95 ${
              activeTab === 'billing'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="inline-block mr-2" size={16} />
            Billing Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-blue-200 rounded-2xl shadow-lg p-6">
        {activeTab === 'profile' ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <User className="inline-block mr-2" size={16} />
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullname}
                onChange={(e) => setProfileData({ ...profileData, fullname: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Mail className="inline-block mr-2" size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Phone className="inline-block mr-2" size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+1 234 567 8900"
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Billing Details</h3>
            {!hasBankAccount && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Billing Information</strong>
                  <br />
                  Add your billing details for payment processing and invoicing.
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <User className="inline-block mr-2" size={16} />
                Account Holder Name
              </label>
              <input
                type="text"
                value={bankData.accountHolderName}
                onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Building className="inline-block mr-2" size={16} />
                Bank Name
              </label>
              <input
                type="text"
                value={bankData.bankName}
                onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Bank name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Hash className="inline-block mr-2" size={16} />
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Code className="inline-block mr-2" size={16} />
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankData.ifscCode}
                  onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="SBIN0001234"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Account Type</label>
              <select
                value={bankData.accountType}
                onChange={(e) => setBankData({ ...bankData, accountType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Wallet className="inline-block mr-2" size={16} />
                UPI ID (Optional)
              </label>
              <input
                type="text"
                value={bankData.upiId}
                onChange={(e) => setBankData({ ...bankData, upiId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="yourname@paytm"
              />
            </div>

            <button
              onClick={handleBankAccountUpdate}
              disabled={bankLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bankLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  {hasBankAccount ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Save size={20} />
                  {hasBankAccount ? 'Update Billing Details' : 'Save Billing Details'}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
