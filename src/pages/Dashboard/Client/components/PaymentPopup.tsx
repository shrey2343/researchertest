import { motion } from 'framer-motion';
import { DollarSign, X, AlertCircle, Minus, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentPopupProps {
  projectId: string;
  bidId: string;
  projectTitle: string;
  freelancerName: string;
  amount: number;
  onMinimize: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function PaymentPopup({ projectId, bidId, projectTitle, freelancerName, amount, onMinimize, isMinimized = false, onToggleMinimize }: PaymentPopupProps) {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate('/escrow', {
      state: {
        projectId,
        bidId,
        projectDetails: {
          title: projectTitle,
          freelancer: freelancerName,
          agreedAmount: amount,
        },
      },
    });
  };

  return (
    <div className={`fixed z-[9999] transition-all duration-300 ${
      isMinimized 
        ? 'top-20 right-4 w-80' 
        : 'inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'
    } p-4`}>
      <motion.div
        initial={{ opacity: 0, scale: isMinimized ? 0.8 : 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          width: isMinimized ? '300px' : 'auto',
          height: isMinimized ? 'auto' : 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-2 ${
          isMinimized 
            ? 'max-w-sm border-green-200 shadow-green-100' 
            : 'max-w-md w-full border-transparent'
        }`}
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 relative">
          <div className="flex items-center justify-between">
            {onToggleMinimize && (
              <button
                onClick={onToggleMinimize}
                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
              </button>
            )}
            <button
              onClick={onMinimize}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg ml-auto"
            >
              <X size={16} />
            </button>
          </div>
          {!isMinimized && (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Payment Required</h2>
                <p className="text-white/90 text-sm">Freelancer has confirmed</p>
              </div>
            </div>
          )}
          {isMinimized && (
            <div className="mt-2">
              <h3 className="font-bold text-sm">Payment Required</h3>
              <p className="text-white/90 text-xs">{freelancerName} confirmed</p>
            </div>
          )}
        </div>

        {!isMinimized && (
          <div className="p-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-6">
              <div className="flex gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>{freelancerName}</strong> has confirmed their availability for your project.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Please proceed with escrow payment to start the project.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Project:</span>
                <span className="font-semibold text-gray-900">{projectTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Freelancer:</span>
                <span className="font-semibold text-gray-900">{freelancerName}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-600 text-lg">Amount:</span>
                <span className="font-bold text-2xl text-green-600">${amount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
            >
              Proceed to Payment
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your payment will be held securely in escrow until project completion
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
