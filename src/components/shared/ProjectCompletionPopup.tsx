import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ProjectCompletionPopupProps {
  projectTitle: string;
  freelancerName: string;
  onApprove: () => void;
  onClose: () => void;
}

export default function ProjectCompletionPopup({
  projectTitle,
  freelancerName,
  onApprove,
  onClose,
}: ProjectCompletionPopupProps) {
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await onApprove();
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Project Completed!</h2>
              <p className="text-white/90 mt-1">Review and approve the work</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-[#1F1F1F] mb-2">Project Details</h3>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Project:</span> {projectTitle}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Freelancer:</span> {freelancerName}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1F1F1F]">
              Are you satisfied with the completed work?
            </h3>
            
            <p className="text-gray-600">
              The freelancer has marked this project as 100% completed. Please review the 
              deliverables and confirm if you are satisfied with the work.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Before Approving:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Review all project deliverables carefully</li>
                    <li>Ensure all requirements have been met</li>
                    <li>Test any code, data, or documents provided</li>
                    <li>Communicate with the freelancer if revisions are needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-bold text-green-900 mb-2">What happens when you approve?</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Admin will be notified to release payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Freelancer's account details will be displayed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Payment will be processed from escrow</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Project will be marked as completed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                isApproving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg'
              }`}
            >
              {isApproving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Yes, I'm Satisfied - Approve
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              disabled={isApproving}
              className="flex-1 bg-gray-100 text-[#1F1F1F] px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Later
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            If you need revisions, please close this popup and communicate with the freelancer before approving.
          </p>
        </div>
      </div>
    </div>
  );
}
