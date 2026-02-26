interface Dispute {
  id: number;
  project: string;
  client: string;
  freelancer: string;
  amount: number;
  status: string;
  date: string;
}

export default function DisputeResolution({ disputes }: { disputes: Dispute[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Active Disputes ({disputes.length})</h3>
      <div className="space-y-4">
        {disputes.map(dispute => (
          <div key={dispute.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{dispute.project}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Client: <span className="font-semibold">{dispute.client}</span> • Freelancer: <span className="font-semibold">{dispute.freelancer}</span></div>
                  <div>Amount in Escrow: <span className="font-semibold text-cyan-600">₹{dispute.amount}</span></div>
                  <div>Reported: {dispute.date}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                dispute.status === 'open' ? 'bg-yellow-100 text-yellow-600 border-yellow-300' : 'bg-blue-100 text-blue-600 border-blue-300'
              }`}>
                {dispute.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-cyan-100 text-cyan-600 border border-cyan-300 py-2 rounded-xl font-semibold hover:bg-cyan-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                Review Details
              </button>
              <button className="flex-1 bg-green-100 text-green-600 border border-green-300 py-2 rounded-xl font-semibold hover:bg-green-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                Resolve in Favor of Client
              </button>
              <button className="flex-1 bg-blue-100 text-blue-600 border border-blue-300 py-2 rounded-xl font-semibold hover:bg-blue-200 hover:scale-105 hover:shadow-md transition-all duration-200">
                Resolve in Favor of Freelancer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
