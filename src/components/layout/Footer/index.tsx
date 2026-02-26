import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Facebook, Twitter, Linkedin, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccessStoriesClick = () => {
    navigate('/');
    setTimeout(() => {
      const successSection = document.querySelector('[data-section="success-stories"]');
      if (successSection) {
        successSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top Section - Logo & CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-12 border-b border-white/10">
        <img
                src="/images/logo.png"
                alt="Xperthiring"
                className="h-16 w-auto"
              />

          <div className="space-y-4">
            
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              The World's First Research Innovation Economy. Connect with verified researchers and breakthrough projects instantly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <button
              onClick={() => handleNavigation('/signup')}
              className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button> */}
            {/* <button
              onClick={() => handleNavigation('/bidding')}
              className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
            >
              Browse Projects
            </button> */}
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {/* Experts by Service */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {['AI Development', 'Data Analysis', 'Clinical Research', 'Supply Chain'].map((item) => (
                <li key={item}>
                  <button onClick={() => handleNavigation('/bidding')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Experts by Subject */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Subjects</h3>
            <ul className="space-y-2.5">
              {['Computer Science', 'Medicine', 'Engineering', 'Business'].map((item) => (
                <li key={item}>
                  <button onClick={() => handleNavigation('/bidding')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Blog', path: '/blog' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'Find Projects', path: '/bidding' },
                { label: 'Post Project', path: '/post-project' }
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => handleNavigation(item.path)} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Researchers */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Researchers</h3>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavigation('/signup')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Join as Expert</button></li>
              <li><button onClick={() => handleNavigation('/verification')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Get Verified</button></li>
              <li><button onClick={() => handleNavigation('/verification')} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Certification</button></li>
              <li><button onClick={handleSuccessStoriesClick} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Success Stories</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Help Center', path: '/help-center' },
                { label: 'Contact Support', path: '/contact-us' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Cookie Policy', path: '/cookie-policy' }
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => handleNavigation(item.path)} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Terms', path: '/terms-and-conditions' },
                { label: 'Privacy', path: '/privacy-policy' },
                { label: 'Academic Policy', path: '/academic-integrity-policy' },
                { label: 'Escrow Terms', path: '/escrow-service-terms' }
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => handleNavigation(item.path)} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 border-y border-white/10">
          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400 leading-relaxed">
                  <p>Xperthiring Inc.</p>
                  <p>123 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                <a href="mailto:support@Xperthiring.com" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  support@Xperthiring.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: FileText, color: 'hover:bg-gray-500/20', iconColor: 'hover:text-gray-300', path: '/blog' },
                { icon: Twitter, color: 'hover:bg-blue-400/20', iconColor: 'hover:text-blue-400', path: '#' },
                { icon: Facebook, color: 'hover:bg-blue-600/20', iconColor: 'hover:text-blue-500', path: '#' },
                { icon: Linkedin, color: 'hover:bg-blue-700/20', iconColor: 'hover:text-blue-600', path: '#' }
              ].map((social, i) => (
                <button
                  key={i}
                  onClick={() => social.path !== '#' && handleNavigation(social.path)}
                  className={`w-11 h-11 bg-white/5 ${social.color} rounded-xl flex items-center justify-center transition-all hover:scale-110`}
                >
                  <social.icon size={20} className={`text-gray-400 ${social.iconColor} transition-colors`} />
                </button>
              ))}
            </div>
          </div>

          {/* Payment Partners */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Payment Partners</h3>
            <div className="flex gap-3">
              <div className="bg-white rounded-lg p-2.5 w-16 h-11 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <svg width="40" height="13" viewBox="0 0 40 13" fill="none">
                  <path d="M15.39 1.6h-2.76L10.83 11.2h2.76L15.39 1.6zm-4.57 0L8.32 8.23 7.09 2.74c-.09-.46-.42-1.14-.83-1.14H0l-.05.23c.91.18 1.97.46 2.61.82.36.23.46.46.55.82L5.49 11.2h2.88L12.74 1.6H8.82zm16.46 6.4c0-2.51-3.43-2.65-3.43-3.75 0-.37.37-.55 1.1-.55.68 0 1.37.14 1.97.37l.36-1.65c-.55-.23-1.28-.37-2.15-.37-2.29 0-3.89 1.19-3.89 2.88 0 1.23 1.1 1.92 1.97 2.47.87.55 1.19.91 1.19 1.42 0 .78-.96 1.1-1.83 1.1-.78 0-1.65-.18-2.38-.46l-.36 1.74c.55.23 1.56.41 2.61.41 2.47 0 4.07-1.19 4.07-3.02l.14.05zm6.03-6.4h-2.15c-.55 0-.96.32-1.19.78L25.14 11.2h2.88s.46-1.28.55-1.56h3.43c.09.37.37 1.56.37 1.56h2.56L31.28 1.6zm-2.38 6.17c.23-.59 1.1-2.88 1.1-2.88s.23-.59.37-.96l.18.91s.55 2.56.64 2.93h-2.29z" fill="#1434CB"/>
                </svg>
              </div>
              <div className="bg-white rounded-lg p-2.5 w-16 h-11 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <svg width="40" height="13" viewBox="0 0 40 13" fill="none">
                  <path d="M7.266 2.047c.165-.863.69-1.156 1.565-1.156h4.839c2.889 0 4.839 1.156 4.839 3.467 0 3.467-2.315 5.778-5.204 5.778h-1.565c-.365 0-.69.293-.79.658l-.365 2.311c-.1.365-.365.658-.69.658H7.631c-.2 0-.365-.158-.325-.365L8.856 2.047h-1.59z" fill="#003087"/>
                  <path d="M19.266 2.047c.165-.863.69-1.156 1.565-1.156h4.839c2.889 0 4.839 1.156 4.839 3.467 0 3.467-2.315 5.778-5.204 5.778h-1.565c-.365 0-.69.293-.79.658l-.365 2.311c-.1.365-.365.658-.69.658h-2.264c-.2 0-.365-.158-.325-.365L20.856 2.047h-1.59z" fill="#0070BA"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Xperthiring. The World's First Research Innovation Economy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
