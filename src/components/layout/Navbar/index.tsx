import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Bell, Search } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ProfileDropdown from '../../ProfileDropdown';

type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'admin-login' | 'bidding' | 'post-project' | 'messaging' | 'escrow' | 'verification' | 'freelancer-account-details' | 'client-dashboard' | 'freelancer-dashboard' | 'admin-dashboard' | 'experts';

interface NavbarProps {
  onNavigate: (page: PageType) => void;
  onViewProfile: () => void;
  onLogout: () => void;
  onJoinAsExpert?: () => void;
}

export default function Navbar({ onNavigate, onViewProfile, onLogout, onJoinAsExpert }: NavbarProps) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on desktop
      if (window.innerWidth >= 1024) {
        setScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleMobileNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-2xl">
      <div className="absolute inset-0" style={{ background: scrolled ? 'rgba(10, 14, 39, 0.95)' : 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0f1629 100%)' }}></div>

      <div className={`absolute inset-0 backdrop-blur-md border-b transition-all ${scrolled ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'}`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16 md:h-17">
          <div className="flex items-center gap-8 lg:gap-12">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate(isAuthenticated && user?.role === 'client' ? 'client-dashboard' : 'home')}
            >
              <img
                src="/images/logo.png"
                alt="Xperthiring"
                className="h-16 w-auto"
              />

            </div>

            <div className="hidden lg:flex items-center gap-1">
              {isAuthenticated && user ? (
                <>
                  {user.role === 'client' && (
                    <button onClick={() => { onNavigate('client-dashboard'); window.location.href = '/client-dashboard'; }} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                      Dashboard
                    </button>
                  )}
                  {user.role === 'freelancer' && (
                    <button onClick={() => { onNavigate('freelancer-dashboard'); window.location.href = '/freelancer-dashboard'; }} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                      Dashboard
                    </button>
                  )}
                  {user.role !== 'client' && (
                    <button onClick={() => onNavigate('bidding')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                      Projects
                    </button>
                  )}
                  <button onClick={() => onNavigate('messaging')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                    Messages
                  </button>
                  {user.role === 'freelancer' && (
                    <button onClick={() => onNavigate('verification')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                      Verification
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button onClick={() => onNavigate('bidding')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                    Find Projects
                  </button>
                  <button
                    onClick={() => onNavigate('experts')}
                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all"
                  >
                    Experts
                  </button>

                  <button onClick={() => onNavigate('pricing')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                    Pricing
                  </button>
                  <button onClick={() => onNavigate('blog')} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all">
                    Blog
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 absolute right-4 top-1/2 transform -translate-y-1/2">
            {isAuthenticated && user ? (
              <ProfileDropdown onViewProfile={onViewProfile} onLogout={onLogout} />
            ) : (
              <>
                <button onClick={() => onNavigate('login')} className="px-5 py-2.5 text-gray-300 hover:text-white font-semibold transition-all rounded-lg hover:bg-white/10">
                  Login
                </button>
                <button onClick={() => onNavigate('post-project')} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all border border-white/20">
                  Post a Project
                </button>
                <button onClick={onJoinAsExpert || (() => onNavigate('signup'))} className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 hover:scale-105">
                  Join as Expert
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onJoinAsExpert || (() => onNavigate('signup'))} className="hidden sm:block lg:hidden px-3 py-1.5 text-xs font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100 transition-all">
              Join as expert
            </button>
            <button onClick={() => onNavigate('post-project')} className="hidden sm:block lg:hidden px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all">
              Request a Service
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-16 md:top-17 bg-black/70 backdrop-blur-md transition-all duration-300 z-40 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] border-b border-white/10 shadow-2xl transition-all duration-300 ease-out ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`} onClick={(e) => e.stopPropagation()}>
          <div className="max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] overflow-y-auto px-4 py-6">
            {isAuthenticated && user ? (
              <>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.fullname} className="w-14 h-14 rounded-full object-cover ring-2 ring-cyan-500/50 shadow-lg" />
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-cyan-500/50">
                        {user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate text-lg">{user.fullname}</p>
                      <p className="text-sm text-cyan-400 font-medium">{user.role === 'client' ? 'Client' : 'Researcher'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  {user.role === 'client' && (
                    <button onClick={() => { handleMobileNavigate('client-dashboard'); window.location.href = '/client-dashboard'; }} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all">
                      Dashboard
                    </button>
                  )}
                  {user.role === 'freelancer' && (
                    <button onClick={() => { handleMobileNavigate('freelancer-dashboard'); window.location.href = '/freelancer-dashboard'; }} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all">
                      Dashboard
                    </button>
                  )}
                  {user.role !== 'client' && (
                    <button onClick={() => handleMobileNavigate('bidding')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all">
                      Projects
                    </button>
                  )}
                  <button onClick={() => handleMobileNavigate('messaging')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all">
                    Messages
                  </button>
                </div>

                <div className="border-t border-white/10 my-4"></div>

                <div className="space-y-1">
                  <button onClick={() => { onViewProfile(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all">
                    Profile
                  </button>
                  <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-semibold transition-all">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <button onClick={() => handleMobileNavigate('bidding')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    <span>Find Projects</span>
                  </button>
                  <button onClick={() => handleMobileNavigate('experts')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">👨‍🔬</span>
                    <span>Browse Experts</span>
                  </button>
                  <button onClick={() => handleMobileNavigate('post-project')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <span>Post a Project</span>
                  </button>
                  <button onClick={() => handleMobileNavigate('pricing')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <span>Pricing Plans</span>
                  </button>
                  <button onClick={() => handleMobileNavigate('blog')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">📰</span>
                    <span>Blog & News</span>
                  </button>
                  <button onClick={() => handleMobileNavigate('about')} className="w-full text-left px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 rounded-xl font-semibold transition-all flex items-center gap-3">
                    <span className="text-2xl">ℹ️</span>
                    <span>About Us</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
