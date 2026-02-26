import {
  Users, FolderOpen, DollarSign, AlertCircle, Shield, Settings,
  BarChart3, FileBarChart, Award, Wrench, LogOut, Menu, X, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../../services/authApi';
import { useAuth } from '../../../../contexts/AuthContext';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export default function AdminSidebar({
  activeTab,
  onTabChange,
  isMobileMenuOpen,
  onMobileMenuToggle
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await adminLogout();
      setUser(null);
      navigate('/admin/login');
    } catch {
      setUser(null);
      navigate('/admin/login');
    }
  };

  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'verifications', icon: Shield, label: 'Verifications' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'payments', icon: DollarSign, label: 'Payments & Escrow' },
    { id: 'disputes', icon: AlertCircle, label: 'Disputes' },
    { id: 'skills', icon: Wrench, label: 'Skills Management' },
    { id: 'reports', icon: FileBarChart, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-72 min-w-[288px] flex-shrink-0 text-black p-4 sm:p-6 flex flex-col
          lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:z-30
          fixed top-0 left-0 h-full z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isMobileMenuOpen ? 'bg-white border-r border-gray-300 shadow-2xl' : ''}
        `}
        style={{ background: isMobileMenuOpen ? 'white' : 'linear-gradient(to-br, #E2E2E2, #D1D1D1, #C0C0C0)' }}
      >
        {/* Glow / orbs */}
        {!isMobileMenuOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gray-400/20 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl" />
          </div>
        )}

        {/* Logo */}
        <div className="flex flex-col items-center -mt-7 relative z-6">
          <div className="w-40 h-25 sm:w-40 sm:h-20">
            <img
              src="/images/login.png" 
              alt="Xperthiring Logo"
              className="object-contain"
              style={{ width: '150px', height: '100px' }}
            />
          </div>
        </div>
        {/* Menu */}
        <nav className="space-y-2 flex-1 relative z-10">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (onMobileMenuToggle) onMobileMenuToggle();
              }}
              className={`
                w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base hover:scale-105 hover:shadow-md duration-200
                ${activeTab === item.id
                  ? 'bg-gray-300 border border-gray-400 text-black'
                  : 'hover:bg-gray-200 text-black hover:text-gray-800'
                }
              `}
            >
              <item.icon size={18} className="sm:w-5 sm:h-5 text-black" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sign Out */}
        <div className={`pt-6 border-t relative z-10 ${isMobileMenuOpen ? 'border-gray-300' : 'border-gray-400'}`}>
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base hover:scale-105 hover:shadow-md duration-200 ${
              isMobileMenuOpen 
                ? 'text-gray-700 hover:text-red-600 hover:bg-red-50' 
                : 'text-white hover:text-red-400 hover:bg-red-800'
            }`}
          >
            <LogOut size={18} className={`sm:w-5 sm:h-5 ${isMobileMenuOpen ? 'text-gray-700' : 'text-black'}`} />
            <span className={isMobileMenuOpen ? 'text-gray-700' : 'text-black'}>Sign Out</span>
          </button>

        </div>
      </aside>
    </>
  );
}
