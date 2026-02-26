import { Building2, CreditCard, Smartphone, CheckCircle, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

export default function FreelancerAccountDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { freelancerAccount, freelancerName, projectTitle, bidAmount } = location.state || {};

  const copyToClipboard = (text: string, fieldName: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleDownloadDetails = () => {
    const details = `
Freelancer Payment Details
===========================

Project: ${projectTitle}
Freelancer: ${freelancerName}
Amount: $${bidAmount}

Bank Account Information:
------------------------
Account Holder Name: ${freelancerAccount?.accountHolderName || 'N/A'}
Bank Name: ${freelancerAccount?.bankName || 'N/A'}
Account Number: ${freelancerAccount?.accountNumber || 'N/A'}
IFSC Code: ${freelancerAccount?.ifscCode || 'N/A'}
Account Type: ${freelancerAccount?.accountType || 'N/A'}
UPI ID: ${freelancerAccount?.upiId || 'N/A'}

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([details], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `freelancer_payment_details_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-400" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Payment Approved!</h1>
          <p className="text-xl text-gray-300">Admin has been notified to release the payment</p>
        </div>

        {/* Success Message */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 mb-6">
          <div className="bg-green-500/20 border-2 border-green-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-green-300 text-lg mb-2">
                  Project Completion Confirmed
                </h3>
                <p className="text-green-200">
                  Thank you for confirming your satisfaction with the completed work. 
                  Our admin team has been notified and will process the payment release shortly.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Project</p>
              <p className="font-bold text-white">{projectTitle || 'N/A'}</p>
            </div>
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Freelancer</p>
              <p className="font-bold text-white">{freelancerName || 'N/A'}</p>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Payment Amount</p>
              <p className="text-2xl font-bold text-green-400">${bidAmount || '0.00'}</p>
            </div>
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <p className="font-bold text-amber-300">Pending Admin Release</p>
            </div>
          </div>
        </div>

        {/* Freelancer Bank Account Details */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="text-cyan-400" size={28} />
              Freelancer Payment Details
            </h2>
            <button
              onClick={handleDownloadDetails}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Download size={18} />
              Download
            </button>
          </div>

          {freelancerAccount ? (
            <div className="space-y-4">
              {/* Account Holder Name */}
              {freelancerAccount.accountHolderName && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Account Holder Name</p>
                    <p className="font-bold text-white text-lg">
                      {freelancerAccount.accountHolderName}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(freelancerAccount.accountHolderName, 'holderName')}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedField === 'holderName' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              )}

              {/* Bank Name */}
              {freelancerAccount.bankName && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Bank Name</p>
                    <p className="font-bold text-white text-lg">
                      {freelancerAccount.bankName}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(freelancerAccount.bankName, 'bankName')}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedField === 'bankName' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              )}

              {/* Account Number */}
              {freelancerAccount.accountNumber && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1 flex items-center gap-3">
                    <CreditCard className="text-cyan-400" size={24} />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Account Number</p>
                      <p className="font-bold text-white text-lg font-mono">
                        {freelancerAccount.accountNumber}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(freelancerAccount.accountNumber, 'accountNumber')}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedField === 'accountNumber' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              )}

              {/* IFSC Code */}
              {freelancerAccount.ifscCode && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">IFSC Code</p>
                    <p className="font-bold text-white text-lg font-mono">
                      {freelancerAccount.ifscCode}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(freelancerAccount.ifscCode, 'ifscCode')}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedField === 'ifscCode' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              )}

              {/* Account Type */}
              {freelancerAccount.accountType && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Account Type</p>
                  <p className="font-bold text-white text-lg capitalize">
                    {freelancerAccount.accountType}
                  </p>
                </div>
              )}

              {/* UPI ID */}
              {freelancerAccount.upiId && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1 flex items-center gap-3">
                    <Smartphone className="text-cyan-400" size={24} />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">UPI ID</p>
                      <p className="font-bold text-white text-lg">
                        {freelancerAccount.upiId}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(freelancerAccount.upiId, 'upiId')}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy"
                  >
                    {copiedField === 'upiId' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6 text-center">
              <p className="text-amber-200 font-semibold">
                Freelancer has not provided bank account details yet.
              </p>
              <p className="text-amber-300 text-sm mt-2">
                The admin team will contact the freelancer to collect payment information.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => navigate('/client-dashboard')}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-md"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/messaging')}
            className="flex-1 bg-white/10 border-2 border-cyan-400 text-cyan-400 px-6 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-white transition-all"
          >
            Message Freelancer
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
