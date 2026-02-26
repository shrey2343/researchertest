import { useState, useEffect } from 'react';
import { ALL_FREELANCERS } from '../../utils/constants';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import HeroSection from './components/HeroSection';
// import TrustedBySection from './components/TrustedBySection';
import PopularServicesSection from './components/PopularServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import BrowseCategoriesSection from './components/BrowseCategoriesSection';
// import PlatformStatsSection from './components/PlatformStatsSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import SearchResultsSection from './components/SearchResultsSection';
import Footer from '../../components/layout/Footer';
import SignupPage from '../Auth/SignupPage';
import type { PageType } from '../../types';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
  onSignup?: (data: any) => void;
  onLogin?: (email: string, password: string) => void;
}

export default function LandingPage({ onNavigate, onSignup, onLogin }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredFreelancers = ALL_FREELANCERS.filter(freelancer => {
    const matchesCategory = !selectedCategory || freelancer.categories.includes(selectedCategory);
    const matchesSearch = !searchQuery ||
      freelancer.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      freelancer.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleClearSearch = () => {
    console.log('Clear search clicked');
    setShowResults(false);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
  };

  const handleJoinAsExpert = () => {
    setShowSignupPopup(true);
  };

  const handleCloseSignup = () => {
    setShowSignupPopup(false);
  };

  const handleSignupSuccess = async (data: any) => {
    if (onSignup) {
      await onSignup(data);
    }
    setShowSignupPopup(false);
  };

  const handleSwitchToLogin = () => {
    setShowSignupPopup(false);
    onNavigate('login');
  };

  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/50 transition-all duration-300"
      >
        <ArrowUp size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Hero Section */}
      <HeroSection onNavigate={handleJoinAsExpert} onShowResults={() => setShowResults(true)} />

      {showResults ? (
        <div className="bg-white">
          <SearchResultsSection
            filteredFreelancers={filteredFreelancers}
            selectedCategory={selectedCategory}
            onClearSearch={handleClearSearch}
            onClearCategory={handleClearCategory}
          />
        </div>
      ) : (
        <>
          {/* Trusted By Section */}
          {/* <TrustedBySection /> */}
          
          {/* Popular Services */}
          <PopularServicesSection />
          
          {/* How It Works */}
          <HowItWorksSection />
          
          {/* Browse Categories */}
          <BrowseCategoriesSection />
          
          {/* Platform Stats
          <PlatformStatsSection /> */}
          
          {/* Problem Section */}
          <ProblemSection />
          
          {/* Solution Section */}
          <SolutionSection />
          
          {/* Why Choose Us */}
          <WhyChooseUsSection />
          
          {/* Success Stories */}
          <SuccessStoriesSection />
          
          {/* Testimonials */}
          <TestimonialsSection />
          
          {/* CTA Section */}
          <CTASection onNavigate={handleJoinAsExpert} />
        </>
      )}

      {/* Footer */}
      <Footer />
      
      {/* Signup Popup */}
      {showSignupPopup && (
        <SignupPage 
          onSignup={handleSignupSuccess}
          onSwitchToLogin={handleSwitchToLogin}
          onLogin={onLogin}
          onClose={handleCloseSignup}
        />
      )}
    </div>
  );
}
