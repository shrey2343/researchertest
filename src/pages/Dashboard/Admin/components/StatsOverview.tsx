import { Users, FolderOpen, DollarSign, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAdminStats } from '../../../../services/adminApi';

interface StatCardProps {
  label: string;
  value: string;
  icon: any;
  color: string;
  change: string;
  trend: 'up' | 'down';
}

// Format large numbers to compact form (1L, 10L, 1M, etc.)
const formatNumber = (num: number): string => {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`; // Crores
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`; // Lakhs
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`; // Thousands
  return num.toString();
};

// Format currency with compact notation
const formatCurrency = (num: number): string => {
  return `₹${formatNumber(num)}`;
};

export default function StatsOverview({ refreshTrigger }: { refreshTrigger?: number } = {}) {
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [additionalStats, setAdditionalStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();
      if (response.success) {
        const { 
          totalUsers, activeProjects, totalRevenue, pendingDisputes,
          completedProjects, totalEscrow, pendingPayments,
          clientCount, freelancerCount, newUsersToday, newUsersThisWeek,
          newProjectsToday, revenueThisMonth, userGrowth, projectGrowth,
          openProjects, inProgressProjects, cancelledProjects
        } = response.stats;
        
        // Calculate revenue growth (comparing this month to total)
        const revenueGrowth = totalRevenue > 0 ? ((revenueThisMonth / totalRevenue) * 100).toFixed(1) : '0.0';
        
        setStats([
          { label: 'Total Users', value: formatNumber(totalUsers), icon: Users, color: 'bg-[#2D6CDF]', change: userGrowth, trend: 'up' as const },
          { label: 'Active Projects', value: formatNumber(activeProjects), icon: FolderOpen, color: 'bg-green-500', change: projectGrowth, trend: 'up' as const },
          { label: 'Revenue (Total)', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'bg-purple-500', change: `+${revenueGrowth}%`, trend: 'up' as const },
          { label: 'Pending Payments', value: formatNumber(pendingPayments), icon: AlertCircle, color: 'bg-amber-500', change: '', trend: 'up' as const }
        ]);
        
        setAdditionalStats({
          completedProjects,
          totalEscrow,
          clientCount,
          freelancerCount,
          newUsersToday,
          newUsersThisWeek,
          newProjectsToday,
          revenueThisMonth,
          openProjects,
          inProgressProjects,
          cancelledProjects
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <stat.icon className="text-white" size={24} />
              </div>
              {stat.change && (
                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex-shrink-0`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1" title={stat.value}>{stat.value}</div>
            <div className="text-sm text-gray-600 truncate" title={stat.label}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Additional Metrics Grid */}
      {additionalStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-blue-600 font-semibold mb-1 truncate">New Users Today</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-900" title={additionalStats.newUsersToday.toString()}>{formatNumber(additionalStats.newUsersToday)}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-green-600 font-semibold mb-1 truncate">New Users (Week)</div>
            <div className="text-xl sm:text-2xl font-bold text-green-900" title={additionalStats.newUsersThisWeek.toString()}>{formatNumber(additionalStats.newUsersThisWeek)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-purple-600 font-semibold mb-1 truncate">Clients</div>
            <div className="text-xl sm:text-2xl font-bold text-purple-900" title={additionalStats.clientCount.toString()}>{formatNumber(additionalStats.clientCount)}</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-cyan-600 font-semibold mb-1 truncate">Freelancers</div>
            <div className="text-xl sm:text-2xl font-bold text-cyan-900" title={additionalStats.freelancerCount.toString()}>{formatNumber(additionalStats.freelancerCount)}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-amber-600 font-semibold mb-1 truncate">New Projects Today</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-900" title={additionalStats.newProjectsToday.toString()}>{formatNumber(additionalStats.newProjectsToday)}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-emerald-600 font-semibold mb-1 truncate">Completed Projects</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-900" title={additionalStats.completedProjects.toString()}>{formatNumber(additionalStats.completedProjects)}</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-indigo-600 font-semibold mb-1 truncate">Total Escrow</div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-900" title={`₹${additionalStats.totalEscrow.toLocaleString()}`}>{formatCurrency(additionalStats.totalEscrow)}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4 overflow-hidden">
            <div className="text-xs text-pink-600 font-semibold mb-1 truncate">Revenue (Month)</div>
            <div className="text-xl sm:text-2xl font-bold text-pink-900" title={`₹${additionalStats.revenueThisMonth.toLocaleString()}`}>{formatCurrency(additionalStats.revenueThisMonth)}</div>
          </div>
        </div>
      )}
    </>
  );
}
