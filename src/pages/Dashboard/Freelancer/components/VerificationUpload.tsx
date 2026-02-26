import { useState, useEffect } from 'react';
import { Shield, Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { submitVerification, getUserVerifications } from '../../../../services/verificationApi';
import toast from 'react-hot-toast';

interface Verification {
  _id: string;
  verificationType: string;
  documents: { documentType: string; documentUrl: string; documentName: string }[];
  status: string;
  submittedAt: string;
  adminReview?: {
    comments: string;
    reviewedAt: string;
  };
}

export default function VerificationUpload() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(false);
  const [verificationType, setVerificationType] = useState('identity');
  const [documents, setDocuments] = useState([
    { documentType: '', documentUrl: '', documentName: '' }
  ]);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await getUserVerifications();
      if (response.success) {
        setVerifications(response.verifications);
      }
    } catch (error) {
      console.error('Failed to fetch verifications:', error);
    }
  };

  const addDocument = () => {
    setDocuments([...documents, { documentType: '', documentUrl: '', documentName: '' }]);
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const updateDocument = (index: number, field: string, value: string) => {
    const updated = documents.map((doc, i) =>
      i === index ? { ...doc, [field]: value } : doc
    );
    setDocuments(updated);
  };

  const handleSubmit = async () => {
    const validDocs = documents.filter(doc => doc.documentType && doc.documentUrl && doc.documentName);
    
    if (validDocs.length === 0) {
      toast.error('Please add at least one document');
      return;
    }

    try {
      setLoading(true);
      const response = await submitVerification({
        verificationType,
        documents: validDocs
      });

      if (response.success) {
        toast.success('Verification submitted successfully!');
        setDocuments([{ documentType: '', documentUrl: '', documentName: '' }]);
        fetchVerifications();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit verification');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: any; bg: string; text: string }> = {
      pending: { icon: Clock, bg: 'bg-amber-100', text: 'text-amber-700' },
      approved: { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' },
      rejected: { icon: XCircle, bg: 'bg-red-100', text: 'text-red-700' }
    };
    const style = config[status] || config.pending;
    const Icon = style.icon;
    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${style.bg} ${style.text} flex items-center gap-1`}>
        <Icon size={14} />
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-blue-900 mb-1">Get Verified</h4>
            <p className="text-sm text-blue-800">
              Submit your documents for verification to get a verified badge on your profile. This increases trust and helps you win more projects.
            </p>
          </div>
        </div>
      </div>

      {/* Submit New Verification */}
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Verification Request</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Verification Type</label>
            <select
              value={verificationType}
              onChange={(e) => setVerificationType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="identity">Identity Verification</option>
              <option value="education">Education Verification</option>
              <option value="professional">Professional Verification</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-bold text-gray-700">Documents</label>
              <button
                type="button"
                onClick={addDocument}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
              >
                <Upload size={16} />
                Add Document
              </button>
            </div>

            {documents.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <FileText className="text-blue-500" size={20} />
                  {documents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={doc.documentType}
                    onChange={(e) => updateDocument(index, 'documentType', e.target.value)}
                    placeholder="Document Type (e.g., Passport, Degree Certificate)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    value={doc.documentUrl}
                    onChange={(e) => updateDocument(index, 'documentUrl', e.target.value)}
                    placeholder="Document URL (Google Drive, Dropbox, etc.)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    value={doc.documentName}
                    onChange={(e) => updateDocument(index, 'documentName', e.target.value)}
                    placeholder="Document Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Upload size={20} />
                Submit for Verification
              </>
            )}
          </button>
        </div>
      </div>

      {/* Previous Verifications */}
      {verifications.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Verification Requests</h3>
          <div className="space-y-3">
            {verifications.map((verification) => (
              <div key={verification._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900 capitalize">{verification.verificationType} Verification</h4>
                    <p className="text-sm text-gray-600">
                      Submitted on {new Date(verification.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(verification.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {verification.documents.length} document(s) submitted
                </p>
                {verification.adminReview && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700">Admin Comments:</p>
                    <p className="text-sm text-gray-600">{verification.adminReview.comments}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
