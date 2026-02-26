import { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import StatsOverview from './components/StatsOverview';
import RecentUsersCard from './components/RecentUsersCard';
import PlatformActivityCard from './components/PlatformActivityCard';
import RecentProjectsTable from './components/RecentProjectsTable';
import AdminProjectsTable from './components/AdminProjectsTable';
import AllProjectsTable from './components/AllProjectsTable';
import UserManagementTable from './components/UserManagementTable';
import VerificationWorkflow from './components/VerificationWorkflow';
import DisputeResolution from './components/DisputeResolution';
import SkillsManagement from './components/SkillsManagement';
import PlatformSettings from './components/PlatformSettings';
import ReportsAnalytics from './components/ReportsAnalytics';
import {
  ACTIVE_DISPUTES,
  SKILLS_DATABASE
} from '../../../utils/adminConstants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);

  const handleDataChange = () => {
    // Increment trigger to refresh stats
    setStatsRefreshTrigger(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsOverview refreshTrigger={statsRefreshTrigger} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentUsersCard />
              <PlatformActivityCard />
            </div>
            <RecentProjectsTable />
          </div>
        );

      case 'users':
        return <UserManagementTable onUserDeleted={handleDataChange} />;

      case 'projects':
        return <AllProjectsTable />;

      case 'payments':
        return <AdminProjectsTable />;

      case 'verifications':
        return <VerificationWorkflow />;

      case 'certifications':
        return (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
            <p className="text-gray-600">Certification management coming soon...</p>
          </div>
        );

      case 'disputes':
        return <DisputeResolution disputes={ACTIVE_DISPUTES} />;

      case 'skills':
        return <SkillsManagement skills={SKILLS_DATABASE} />;

      case 'reports':
        return <ReportsAnalytics />;

      case 'settings':
        return <PlatformSettings />;

      default:
        return <div className="text-center text-gray-600 py-12">Select a section from the sidebar</div>;
    }
  };

  return (
    <div
  className="min-h-screen flex flex-col lg:flex-row "
  style={{
    background: `
      radial-gradient(circle at top right, rgba(10,102,194,0.06), transparent 40%),
      linear-gradient(180deg, #F3F8FF 0%, #EEF4FF 100%)
    `
  }}
>


      {/* Glow orbs */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div> */}

      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 lg:ml-72 relative z-10 overflow-x-auto text-[#4B5563]">

        <div className="max-w-full mx-auto ">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8 mt-16 lg:mt-0">


            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'projects' && 'All Projects'}
            {activeTab === 'payments' && 'Payment Management'}
            {activeTab === 'verifications' && 'Verification Requests'}
            {activeTab === 'certifications' && 'Certifications'}
            {activeTab === 'disputes' && 'Dispute Resolution'}
            {activeTab === 'skills' && 'Skills Management'}
            {activeTab === 'reports' && 'Reports & Analytics'}
            {activeTab === 'settings' && 'Platform Settings'}
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
