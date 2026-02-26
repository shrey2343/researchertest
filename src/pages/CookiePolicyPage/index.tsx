import { Cookie, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Lightbulb, BookOpen, Briefcase, TrendingUp, Sparkles, Zap, Star, Shield, Lock, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  // Floating icons configuration
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: Cookie, color: 'text-indigo-400', size: 26, opacity: 0.19 },
    { Icon: FlaskConical, color: 'text-cyan-400', size: 30, opacity: 0.17 },
    { Icon: Atom, color: 'text-orange-400', size: 32, opacity: 0.16 },
    { Icon: Rocket, color: 'text-red-400', size: 28, opacity: 0.18 },
    { Icon: Target, color: 'text-yellow-400', size: 30, opacity: 0.15 },
    { Icon: Award, color: 'text-emerald-400', size: 26, opacity: 0.19 },
    { Icon: GraduationCap, color: 'text-violet-400', size: 32, opacity: 0.17 },
    { Icon: Globe, color: 'text-teal-400', size: 28, opacity: 0.16 },
    { Icon: Microscope, color: 'text-blue-500', size: 30, opacity: 0.17 },
    { Icon: Code, color: 'text-purple-500', size: 28, opacity: 0.18 },
    { Icon: Lightbulb, color: 'text-yellow-500', size: 32, opacity: 0.15 },
    { Icon: BookOpen, color: 'text-blue-600', size: 30, opacity: 0.18 },
    { Icon: Briefcase, color: 'text-gray-400', size: 28, opacity: 0.16 },
    { Icon: TrendingUp, color: 'text-green-500', size: 32, opacity: 0.17 },
    { Icon: Sparkles, color: 'text-pink-500', size: 26, opacity: 0.19 },
    { Icon: Zap, color: 'text-yellow-600', size: 30, opacity: 0.15 },
    { Icon: Star, color: 'text-amber-400', size: 28, opacity: 0.18 },
    { Icon: Shield, color: 'text-cyan-500', size: 30, opacity: 0.17 },
    { Icon: Lock, color: 'text-indigo-500', size: 28, opacity: 0.18 },
    { Icon: Eye, color: 'text-green-400', size: 26, opacity: 0.16 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Icons Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const IconComponent = item.Icon;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{
                opacity: item.opacity,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, 0],
                y: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <IconComponent size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
              <Cookie className="text-white" size={40} />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Cookie <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 px-4">
            Last updated: January 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-gray-200 space-y-6 sm:space-y-8 shadow-lg"
        >
          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">What Are Cookies</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">How We Use Cookies</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              Xperthiring uses cookies to enhance your browsing experience and provide personalized services. 
              We use cookies for the following purposes:
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-2 border-blue-200">
                <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Authentication and security</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span>Remembering your preferences and settings</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border-2 border-purple-200">
                <CheckCircle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Analyzing website traffic and usage patterns</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border-2 border-orange-200">
                <CheckCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Providing personalized content and recommendations</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border-2 border-cyan-200">
                <CheckCircle size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                <span>Improving our services and user experience</span>
              </motion.li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border-2 border-blue-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield size={24} className="text-blue-600" />
                  Essential Cookies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions 
                  like page navigation, access to secure areas, and authentication. The website cannot function 
                  properly without these cookies.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp size={24} className="text-green-600" />
                  Performance Cookies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  These cookies collect information about how visitors use our website, such as which pages are 
                  visited most often and if users get error messages. This data helps us improve how our website works.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border-2 border-purple-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles size={24} className="text-purple-600" />
                  Functionality Cookies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal 
                  features. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 sm:p-6 border-2 border-orange-200">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target size={24} className="text-orange-600" />
                  Analytics Cookies
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We use analytics cookies to understand how our website is being used and to improve user experience. 
                  These cookies collect information anonymously and report website trends.
                </p>
              </motion.div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Third-Party Cookies</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              We may also use third-party cookies from trusted partners to provide additional functionality:
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-cyan-50 to-blue-50 p-3 rounded-lg border-2 border-cyan-200">
                <Globe size={20} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                <span><strong>Google Analytics:</strong> To analyze website traffic and user behavior</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                <Lock size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Payment Processors:</strong> To process secure payments</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border-2 border-purple-200">
                <Star size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <span><strong>Social Media Platforms:</strong> To enable social sharing features</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border-2 border-orange-200">
                <Briefcase size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <span><strong>Customer Support:</strong> To provide live chat and support services</span>
              </motion.li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your cookie 
              preferences through:
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-2 border-blue-200">
                <Eye size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Your browser settings - most browsers allow you to refuse cookies</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span>Our cookie consent banner when you first visit our website</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border-2 border-purple-200">
                <Award size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Your account settings for personalization preferences</span>
              </motion.li>
            </ul>
            <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex items-start gap-2">
                <Lightbulb className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                <span>Please note that if you choose to reject cookies, some features of our website may not function properly.</span>
              </p>
            </motion.div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Cookie Retention</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              Different cookies have different retention periods:
            </p>
            <ul className="space-y-2 sm:space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border-2 border-red-200">
                <Zap size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <span><strong>Session Cookies:</strong> Deleted when you close your browser</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200">
                <Database size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                <Lock size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span><strong>Authentication Cookies:</strong> Typically expire after 30 days of inactivity</span>
              </motion.li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Updates to This Policy</h2>
            <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex items-start gap-3">
                <Rocket className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
                <span>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for 
                  legal and regulatory reasons. We will notify you of any significant changes by posting the new 
                  policy on this page with an updated "Last updated" date.
                </span>
              </p>
            </motion.div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Contact Us</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <motion.div whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-700">
                      <strong>Email:</strong> privacy@Xperthiring.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Globe className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-700">
                      <strong>Address:</strong> Xperthiring Inc., 123 Innovation Drive, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}