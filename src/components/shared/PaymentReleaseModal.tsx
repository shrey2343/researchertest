import React, { useState } from "react";
import { API_BASE_URL } from "../../services/config";

interface BankAccount {
  accountHolderName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountType?: string;
  upiId?: string;
}

interface Freelancer {
  _id: string;
  fullname: string;
  email: string;
  bankAccount?: BankAccount;
}

interface PaymentReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminProjectId: string;
  freelancer: Freelancer;
  projectTitle: string;
  amount: number;
  onSuccess: () => void;
}

const PaymentReleaseModal: React.FC<PaymentReleaseModalProps> = ({
  isOpen,
  onClose,
  adminProjectId,
  freelancer,
  projectTitle,
  amount,
  onSuccess,
}) => {
  const [isReleasing, setIsReleasing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const handleReleaseClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRelease = async () => {
    try {
      setIsReleasing(true);
      console.log('Releasing payment for admin project ID:', adminProjectId);
      
      const response = await fetch(
        `${API_BASE_URL}/project/release-payment/${adminProjectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      console.log('Release payment response status:', response.status);
      console.log('Release payment response ok:', response.ok);
      
      const data = await response.json();
      console.log('Release payment response data:', data);

      if (data.success) {
        alert("Payment released successfully! Email sent to freelancer.");
        onSuccess();
        onClose();
      } else {
        console.error('Backend error:', data.message);
        throw new Error(data.message || "Failed to release payment");
      }
    } catch (error: any) {
      console.error("Release payment error:", error);
      alert(
        error.message || "Failed to release payment. Please try again."
      );
    } finally {
      setIsReleasing(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">💰 Release Payment</h2>
              <p className="text-green-100">Review and release payment to freelancer</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showConfirmation ? (
            <>
              {/* Project Details */}
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-semibold text-gray-800 mb-2">Project Details</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Project:</span> {projectTitle}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Freelancer:</span> {freelancer.fullname}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {freelancer.email}
                </p>
              </div>

              {/* Payment Amount */}
              <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-gray-600 text-sm mb-1">Payment Amount</p>
                <p className="text-4xl font-bold text-green-600">${amount}</p>
              </div>

              {/* Freelancer Bank Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Freelancer Payment Details
                </h3>

                {freelancer.bankAccount ? (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {freelancer.bankAccount.accountHolderName && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Account Holder:</span>
                        <span className="font-medium text-gray-800">
                          {freelancer.bankAccount.accountHolderName}
                        </span>
                      </div>
                    )}
                    {freelancer.bankAccount.bankName && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Bank Name:</span>
                        <span className="font-medium text-gray-800">
                          {freelancer.bankAccount.bankName}
                        </span>
                      </div>
                    )}
                    {freelancer.bankAccount.accountNumber && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-medium text-gray-800 font-mono">
                          {freelancer.bankAccount.accountNumber}
                        </span>
                      </div>
                    )}
                    {freelancer.bankAccount.ifscCode && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">IFSC Code:</span>
                        <span className="font-medium text-gray-800 font-mono">
                          {freelancer.bankAccount.ifscCode}
                        </span>
                      </div>
                    )}
                    {freelancer.bankAccount.accountType && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Account Type:</span>
                        <span className="font-medium text-gray-800">
                          {freelancer.bankAccount.accountType}
                        </span>
                      </div>
                    )}
                    {freelancer.bankAccount.upiId && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">UPI ID:</span>
                        <span className="font-medium text-gray-800">
                          {freelancer.bankAccount.upiId}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-800">
                      ⚠️ Freelancer has not provided bank account details yet.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReleaseClick}
                  disabled={!freelancer.bankAccount}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                    freelancer.bankAccount
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Release Payment
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Confirmation Screen */}
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Confirm Payment Release
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Are you sure you want to release the payment of{" "}
                  <span className="font-bold text-green-600">${amount}</span> to{" "}
                  <span className="font-medium">{freelancer.fullname}</span>?
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    ✓ Payment will be transferred to freelancer's account
                    <br />
                    ✓ Freelancer will receive an email with payment confirmation
                    <br />
                    ✓ A PDF receipt will be generated and sent
                    <br />✓ This action cannot be undone
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    disabled={isReleasing}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleConfirmRelease}
                    disabled={isReleasing}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isReleasing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Releasing...
                      </>
                    ) : (
                      "Confirm & Release"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentReleaseModal;
