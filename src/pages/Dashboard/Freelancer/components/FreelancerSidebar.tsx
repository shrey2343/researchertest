import { LayoutDashboard, Sparkles, Search, Send, FolderKanban, CheckSquare, UserCircle2, LogOut, Menu, X, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../../services/authApi';
import { useAuth } from '../../../../contexts/AuthContext';

interface FreelancerSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export default function FreelancerSidebar({
  activeTab,
  onTabChange,
  isMobileMenuOpen,
  onMobileMenuToggle
}: FreelancerSidebarProps) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch {
      setUser(null);
      navigate('/login');
    }
  };

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'recommended', icon: Sparkles, label: 'Recommended Projects' },
    { id: 'available', icon: Search, label: 'Browse Projects' },
    { id: 'proposals', icon: Send, label: 'My Proposals' },
    { id: 'active', icon: FolderKanban, label: 'Active Projects' },
    { id: 'completed', icon: CheckSquare, label: 'Completed Projects' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: UserCircle2, label: 'Profile' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden absolute top-[100px] left-4 z-[60] w-9 h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Menu size={18} />
        </button>
      )}

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
          w-72 min-w-[288px] flex-shrink-0 text-black flex flex-col
          lg:fixed lg:top-10 lg:left-0 lg:h-screen lg:z-30 lg:p-6
          fixed top-16 left-0 h-[calc(100vh-64px)] z-40 transition-transform duration-300 p-3 pt-4
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

        {/* Logo and Close Button */}
        <div className="flex items-center justify-between relative z-4 mb-3 lg:mb-4">
          <div className="w-24 h-12 lg:w-40 lg:h-20 flex-shrink-0">
            <img
              src="/images/login.png" 
              alt="Xperthiring Logo"
              className="object-contain w-full h-full"
            />
          </div>
          {isMobileMenuOpen && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 transition-colors flex-shrink-0"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Menu */}
        <nav className="space-y-1.5 flex-1 relative z-10">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (onMobileMenuToggle && isMobileMenuOpen) onMobileMenuToggle();
              }}
              className={`
                group w-full flex items-center gap-2 px-2.5 py-2 lg:px-4 lg:py-3 rounded-xl transition-all text-xs lg:text-base hover:scale-105 hover:shadow-md duration-200
                ${activeTab === item.id
                  ? 'bg-gray-300 border border-gray-400 text-black shadow-lg'
                  : 'hover:bg-gray-200 text-black hover:text-gray-800'
                }
              `}
            >
              <item.icon size={16} className="lg:w-5 lg:h-5 text-black group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              <span className="truncate font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}