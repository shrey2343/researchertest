import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { logoutUser, loginUser as apiLoginUser, registerUser, adminLogin as apiAdminLogin } from './services/api';
import Navbar from './components/layout/Navbar';
import ResearchLoader from './components/shared/ResearchLoader';
import toast from 'react-hot-toast';
import EscrowServiceTerms from './pages/Policies/EscrowServiceTerms';
import ProfileViewPopup from './components/shared/ProfileViewPopup';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const AdminLoginPage = lazy(() => import('./pages/Auth/AdminLoginPage'));
const GoogleCallback = lazy(() => import('./pages/Auth/GoogleCallback'));
const BiddingPage = lazy(() => import('./pages/BiddingPage'));
const MessagingPage = lazy(() => import('./pages/MessagingPage'));
const EscrowPaymentPage = lazy(() => import('./pages/EscrowPaymentPage'));
const VerificationCertificationPage = lazy(() => import('./pages/VerificationCertificationPage'));
const FreelancerAccountDetailsPage = lazy(() => import('./pages/FreelancerAccountDetailsPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/Dashboard/Admin/AdminDashboard'));
const TermsAndConditions = lazy(() => import('./pages/Policies/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/Policies/PrivacyPolicy'));
const AcademicIntegrity = lazy(() => import('./pages/Policies/AcademicIntegrity'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const PostProjectPage = lazy(() => import('./pages/PostProjectPage'));
const AIDevelopmentService = lazy(() => import('./pages/Services/AIDevelopmentService'));
const DataAnalysisService = lazy(() => import('./pages/Services/DataAnalysisService'));
const ClinicalResearchService = lazy(() => import('./pages/Services/ClinicalResearchService'));
const SupplyChainService = lazy(() => import('./pages/Services/SupplyChainService'));
const MobileDevelopmentService = lazy(() => import('./pages/Services/MobileDevelopmentService'));
const VideoProductionService = lazy(() => import('./pages/Services/VideoProductionService'));
const ProgressDetails = lazy(() => import('./pages/ProgressDetails'));
const SocialResearchService = lazy(() => import('./pages/Services/SocialResearchService'));
const TranslationService = lazy(() => import('./pages/Services/TranslationService'));
const ExpertsPage = lazy(() => import('./pages/ExpertsPage'));
const BidConfirmationPage = lazy(() => import('./pages/BidConfirmationPage'));

type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'admin-login' | 'bidding' | 'post-project' | 'postprojectpage' | 'messaging' | 'escrow' | 'verification' | 'freelancer-account-details' | 'client-dashboard' | 'freelancer-dashboard' | 'admin-dashboard' | 'terms-and-conditions' | 'privacy-policy' | 'academic-integrity-policy' | 'escrow-service-terms' | 'contact-us' | 'help-center' | 'faq' | 'cookie-policy' | 'ai-development' | 'data-analysis' | 'clinical-research' | 'supply-chain' | 'mobile-development' | 'video-production' | 'social-research' | 'translation' | 'experts';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, setUser, refreshUser, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('signup');

  const handleNavigate = (page: PageType) => {
    if (page === 'login') {
      setAuthInitialTab('login');
      setShowAuthPopup(true);
      return;
    }
    if (page === 'signup') {
      setAuthInitialTab('signup');
      setShowAuthPopup(true);
      return;
    }
    setCurrentPage(page);
    const routes: Record<PageType, string> = {
      'home': '/', 'about': '/about', 'blog': '/blog', 'pricing': '/pricing',
      'login': '/login', 'signup': '/signup', 'admin-login': '/admin/login',
      'bidding': '/bidding', 'post-project': '/post-project', 'postprojectpage': '/postprojectpage', 'messaging': '/messaging', 'escrow': '/escrow',
      'verification': '/verification', 'freelancer-account-details': '/freelancer-account-details',
      'client-dashboard': '/client-dashboard', 'freelancer-dashboard': '/freelancer-dashboard',
      'admin-dashboard': '/admin-dashboard', 'terms-and-conditions': '/terms-and-conditions',
      'privacy-policy': '/privacy-policy', 'academic-integrity-policy': '/academic-integrity-policy',
      'escrow-service-terms': '/escrow-service-terms', 'contact-us': '/contact-us',
      'help-center': '/help-center', 'faq': '/faq', 'cookie-policy': '/cookie-policy',
      'ai-development': '/services/ai-development', 'data-analysis': '/services/data-analysis',
      'clinical-research': '/services/clinical-research', 'supply-chain': '/services/supply-chain',
      'mobile-development': '/services/mobile-development', 'video-production': '/services/video-production',
      'social-research': '/services/social-research', 'translation': '/services/translation',
      'experts': '/experts'
    };
    navigate(routes[page]);
  };

  useEffect(() => {
    if (location.pathname === '/auth/google/callback') {
      // Don't change page for Google callback
      return;
    }
    if (location.pathname === '/login') {
      setAuthInitialTab('login');
      setShowAuthPopup(true);
      setCurrentPage('home');
    } else if (location.pathname === '/signup') {
      setAuthInitialTab('signup');
      setShowAuthPopup(true);
      setCurrentPage('home');
    } else if (location.pathname.startsWith('/services/')) {
      const servicePath = location.pathname.replace('/services/', '');
      const servicePageMap: Record<string, PageType> = {
        'ai-development': 'ai-development',
        'data-analysis': 'data-analysis',
        'clinical-research': 'clinical-research',
        'supply-chain': 'supply-chain',
        'mobile-development': 'mobile-development',
        'video-production': 'video-production',
        'social-research': 'social-research',
        'translation': 'translation'
      };
      const servicePage = servicePageMap[servicePath];
      if (servicePage) {
        setCurrentPage(servicePage);
      }
    } else if (location.pathname.startsWith('/bidding')) {
      setCurrentPage('bidding');
    } else {
      const pathToPage: Record<string, PageType> = {
        '/': 'home', '/about': 'about', '/blog': 'blog', '/pricing': 'pricing',
        '/admin': 'admin-login',
        '/post-project': 'post-project', '/postprojectpage': 'postprojectpage', '/messaging': 'messaging', '/escrow': 'escrow',
        '/verification': 'verification', '/freelancer-account-details': 'freelancer-account-details',
        '/client-dashboard': 'client-dashboard', '/freelancer-dashboard': 'freelancer-dashboard',
        '/admin-dashboard': 'admin-dashboard', '/terms-and-conditions': 'terms-and-conditions',
        '/privacy-policy': 'privacy-policy', '/academic-integrity-policy': 'academic-integrity-policy',
        '/escrow-service-terms': 'escrow-service-terms', '/contact-us': 'contact-us',
        '/help-center': 'help-center', '/faq': 'faq', '/cookie-policy': 'cookie-policy',
        '/experts': 'experts'
      };
      const page = pathToPage[location.pathname] || 'home';
      setCurrentPage(page);
    }
  }, [location.pathname]);

  const handleLogin = async (email: string, password: string) => {
    const response = await apiLoginUser({ email, password });
    if (response.success && response.user) {
      // Store token in localStorage for socket authentication
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      setUser(response.user);
      setShowAuthPopup(false);
      navigate(response.user.role === 'client' ? '/client-dashboard' : '/freelancer-dashboard');
    }
  };

  const handleSignup = async (data: any) => {
    await registerUser(data);
    await refreshUser();
    setShowAuthPopup(false);
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // This now handles localStorage cleanup
      setUser(null);
      navigate('/');
      toast.success('Logged out successfully', {
        duration: 2000,
        style: {
          background: '#3b82f6',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
        },
        icon: '👋'
      });
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleJoinAsExpert = () => {
    setAuthInitialTab('signup');
    setShowAuthPopup(true);
  };

  const handleCloseAuth = () => {
    setShowAuthPopup(false);
  };

  const handleSwitchToLogin = () => {
    setAuthInitialTab('login');
  };

  const handleAdminLogin = async (email: string, password: string) => {
    const response = await apiAdminLogin({ email, password });
    if (response.success && response.user) {
      // Store token in localStorage for socket authentication
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      setUser(response.user);
      navigate('/admin-dashboard');
    }
  };

  const renderPage = () => {
    // Handle Google callback route
    if (location.pathname === '/auth/google/callback') {
      return <GoogleCallback />;
    }
    
    // Handle progress details route
    if (location.pathname.startsWith('/progress-details/')) {
      return <ProgressDetails />;
    }
    
    // Handle bid confirmation route
    if (location.pathname.startsWith('/confirm-bid/')) {
      return <BidConfirmationPage />;
    }
    
    switch (currentPage) {
      case 'home': return <LandingPage onNavigate={handleNavigate} onSignup={handleSignup} onLogin={handleLogin} />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'blog': return <BlogPage onNavigate={handleNavigate} />;
      case 'pricing': return <PricingPage onNavigate={handleNavigate} />;
      case 'signup': return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => handleNavigate('login')} onClose={() => handleNavigate('home')} />;
      case 'admin-login': return <AdminLoginPage onAdminLogin={handleAdminLogin} />;
      case 'bidding': return <BiddingPage />;
      case 'post-project': return <PostProjectPage />;
      case 'postprojectpage': return <PostProjectPage />;
      case 'messaging': return <MessagingPage />;
      case 'escrow': return <EscrowPaymentPage />;
      case 'verification': return <VerificationCertificationPage />;
      case 'freelancer-account-details': return <FreelancerAccountDetailsPage />;
      case 'client-dashboard': return <Dashboard />;
      case 'freelancer-dashboard': return <Dashboard />;
      case 'admin-dashboard':
        if (!isAuthenticated || user?.role !== 'admin') {
          navigate('/admin/login');
          return <AdminLoginPage onAdminLogin={handleAdminLogin} />;
        }
        return <AdminDashboard />;
      case 'terms-and-conditions': return <TermsAndConditions />;
      case 'privacy-policy': return <PrivacyPolicy />;
      case 'academic-integrity-policy': return <AcademicIntegrity />;
      case 'escrow-service-terms': return <EscrowServiceTerms />;
      case 'contact-us': return <ContactPage />;
      case 'help-center': return <HelpCenterPage />;
      case 'faq': return <FAQPage />;
      case 'cookie-policy': return <CookiePolicyPage />;
      case 'ai-development': return <AIDevelopmentService />;
      case 'data-analysis': return <DataAnalysisService />;
      case 'clinical-research': return <ClinicalResearchService />;
      case 'supply-chain': return <SupplyChainService />;
      case 'mobile-development': return <MobileDevelopmentService />;
      case 'video-production': return <VideoProductionService />;
      case 'social-research': return <SocialResearchService />;
      case 'translation': return <TranslationService />;
      case 'experts': return <ExpertsPage onNavigate={handleNavigate} />;
      default: return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  const showNavigation = !['login', 'signup', 'admin-login', 'admin-dashboard', 'terms-and-conditions', 'privacy-policy', 'academic-integrity-policy', 'escrow-service-terms', 'contact-us', 'help-center', 'faq', 'cookie-policy'].includes(currentPage);

  if (loading) return <ResearchLoader />;

  return (
    <>
      {showNavigation && (
        <Navbar
          onNavigate={handleNavigate}
          onViewProfile={() => setShowProfilePopup(true)}
          onLogout={handleLogout}
          onJoinAsExpert={handleJoinAsExpert}
        />
      )}

      <Suspense fallback={<ResearchLoader />}>
        {renderPage()}
      </Suspense>

      {showProfilePopup && <ProfileViewPopup onClose={() => setShowProfilePopup(false)} />}



      {showAuthPopup && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 10000 }}>
          <div 
            className="absolute inset-0 bg-black/60" 
            onClick={handleCloseAuth}
          />
          <div className="relative w-full max-w-4xl mx-auto transform transition-all" style={{ zIndex: 10001 }}>
            <Suspense fallback={<ResearchLoader />}>
              <SignupPage 
                onSignup={handleSignup}
                onSwitchToLogin={handleSwitchToLogin}
                onLogin={handleLogin}
                onClose={handleCloseAuth}
                initialTab={authInitialTab}
              />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
