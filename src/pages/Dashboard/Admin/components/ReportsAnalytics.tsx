import { useEffect, useState } from 'react';
import { getAnalyticsReport } from '../../../../services/reportsApi';
import { DollarSign, Users, Briefcase, TrendingUp, Download, Calendar, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReportsAnalytics() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    fetchReport();
  }, [dateRange]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await getAnalyticsReport();
      if (response.success) {
        setReport(response.report);
      }
    } catch (error) {
      console.error('Failed to fetch report:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    toast.success('CSV download feature coming soon!');
  };

  const downloadPDF = () => {
    toast.success('PDF download feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!report) {
    return <div className="text-center py-12 text-gray-500">No data available</div>;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-sm text-gray-600">Comprehensive platform insights and metrics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Download size={16} />
              CSV
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-blue-600" size={24} />
            <span className="text-xs text-blue-600 font-semibold">REVENUE</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">₹{report.revenue.total.toLocaleString()}</div>
          <div className="text-xs text-blue-600 mt-1">Total Earned</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-green-600" size={24} />
            <span className="text-xs text-green-600 font-semibold">USERS</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{report.users.total}</div>
          <div className="text-xs text-green-600 mt-1">Total Users</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="text-purple-600" size={24} />
            <span className="text-xs text-purple-600 font-semibold">PROJECTS</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{report.projects.total}</div>
          <div className="text-xs text-purple-600 mt-1">Total Projects</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-amber-600" size={24} />
            <span className="text-xs text-amber-600 font-semibold">CONVERSION</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">{report.engagement.conversionRate}%</div>
          <div className="text-xs text-amber-600 mt-1">Success Rate</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-cyan-600" size={24} />
            <span className="text-xs text-cyan-600 font-semibold">ACTIVE</span>
          </div>
          <div className="text-2xl font-bold text-cyan-900">{report.users.newThisMonth}</div>
          <div className="text-xs text-cyan-600 mt-1">New This Month</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-indigo-600" size={24} />
            <span className="text-xs text-indigo-600 font-semibold">ESCROW</span>
          </div>
          <div className="text-2xl font-bold text-indigo-900">₹{report.revenue.escrowHeld.toLocaleString()}</div>
          <div className="text-xs text-indigo-600 mt-1">Held Amount</div>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-3">
            {report.revenue.monthlyTrend.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-600">{monthNames[item._id.month - 1]} {item._id.year}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(item.revenue / Math.max(...report.revenue.monthlyTrend.map((m: any) => m.revenue))) * 100}%` }}
                  >
                    <span className="text-white text-xs font-semibold">₹{item.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h3>
          <div className="space-y-3">
            {report.revenue.byCategory.slice(0, 6).map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700 truncate">{item._id || 'Uncategorized'}</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">₹{item.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth Trend</h3>
          <div className="space-y-3">
            {report.users.growthTrend.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-20 text-sm text-gray-600">{monthNames[item._id.month - 1]} {item._id.year}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(item.count / Math.max(...report.users.growthTrend.map((m: any) => m.count))) * 100}%` }}
                  >
                    <span className="text-white text-xs font-semibold">{item.count} users</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Clients</span>
              <span className="text-lg font-bold text-blue-600">{report.users.clients}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Freelancers</span>
              <span className="text-lg font-bold text-green-600">{report.users.freelancers}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Verified Users</span>
              <span className="text-lg font-bold text-purple-600">{report.users.verified}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">New This Week</span>
              <span className="text-lg font-bold text-amber-600">{report.users.newThisWeek}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Analytics */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Project Status Distribution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">{report.projects.open}</div>
            <div className="text-sm text-gray-600 mt-1">Open</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600">{report.projects.inProgress}</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">{report.projects.completed}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-3xl font-bold text-red-600">{report.projects.cancelled}</div>
            <div className="text-sm text-gray-600 mt-1">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Paying Clients</h3>
          <div className="space-y-3">
            {report.revenue.topClients.slice(0, 5).map((client: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{client.name}</div>
                  <div className="text-xs text-gray-500 truncate">{client.email}</div>
                </div>
                <div className="text-right ml-3">
                  <div className="font-bold text-blue-600">₹{client.totalSpent.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{client.projectCount} projects</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Freelancers */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Earning Freelancers</h3>
          <div className="space-y-3">
            {report.revenue.topFreelancers.slice(0, 5).map((freelancer: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{freelancer.name}</div>
                  <div className="text-xs text-gray-500 truncate">{freelancer.email}</div>
                </div>
                <div className="text-right ml-3">
                  <div className="font-bold text-green-600">₹{freelancer.totalEarned.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{freelancer.projectCount} projects</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{report.systemHealth.uptime}</div>
            <div className="text-sm text-gray-600 mt-1">Uptime</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{report.systemHealth.avgResponseTime}</div>
            <div className="text-sm text-gray-600 mt-1">Avg Response</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{report.systemHealth.paymentFailureRate}%</div>
            <div className="text-sm text-gray-600 mt-1">Payment Failure</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{report.engagement.totalBids}</div>
            <div className="text-sm text-gray-600 mt-1">Total Bids</div>
          </div>
        </div>
      </div>
    </div>
  );
}
