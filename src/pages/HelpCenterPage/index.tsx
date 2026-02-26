import { Search, Book, MessageCircle, Shield, CreditCard, Users, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Lightbulb, BookOpen, Briefcase, TrendingUp, Sparkles, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpCenterPage() {
  // Floating icons configuration
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: Book, color: 'text-indigo-400', size: 26, opacity: 0.19 },
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
    { Icon: MessageCircle, color: 'text-cyan-500', size: 30, opacity: 0.17 },
    { Icon: Shield, color: 'text-indigo-500', size: 28, opacity: 0.18 },
    { Icon: CreditCard, color: 'text-green-400', size: 26, opacity: 0.16 }
  ];

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using Xperthiring",
      articles: [
        "How to create your first project",
        "Setting up your profile",
        "Understanding our platform",
        "Finding the right expert"
      ]
    },
    {
      icon: Users,
      title: "For Clients",
      description: "Everything you need to know as a client",
      articles: [
        "How to post a project",
        "Reviewing proposals",
        "Managing your projects",
        "Payment and billing"
      ]
    },
    {
      icon: MessageCircle,
      title: "For Experts",
      description: "Guide for research experts and freelancers",
      articles: [
        "Creating winning proposals",
        "Building your reputation",
        "Getting verified",
        "Earning and withdrawals"
      ]
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Payment methods, billing, and financial questions",
      articles: [
        "Payment methods",
        "Escrow protection",
        "Refund policy",
        "Tax information"
      ]
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Security, privacy, and platform safety",
      articles: [
        "Account security",
        "Reporting issues",
        "Privacy settings",
        "Academic integrity"
      ]
    },
    {
      icon: Book,
      title: "Technical Support",
      description: "Technical issues and troubleshooting",
      articles: [
        "Login problems",
        "File upload issues",
        "Browser compatibility",
        "Mobile app support"
      ]
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
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
              <Book className="text-white" size={40} />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6">
            Help <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Center</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Find answers to your questions and get the help you need
          </p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative px-4"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full pl-14 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-sm sm:text-base"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-md"
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <motion.li
                      key={articleIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {article}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-gray-200 mb-12 sm:mb-16 shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 sm:mb-8">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border-2 border-blue-200 hover:border-blue-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Rocket size={20} className="text-blue-600" />
                  How to post your first project
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">Step-by-step guide to creating and posting your research project</p>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all border-2 border-green-200 hover:border-green-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield size={20} className="text-green-600" />
                  Understanding escrow protection
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">Learn how our escrow system protects your payments</p>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all border-2 border-purple-200 hover:border-purple-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Award size={20} className="text-purple-600" />
                  Getting verified as an expert
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">Requirements and process for expert verification</p>
              </motion.a>
            </div>
            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl hover:from-cyan-100 hover:to-blue-100 transition-all border-2 border-cyan-200 hover:border-cyan-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CreditCard size={20} className="text-cyan-600" />
                  Payment methods and billing
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">Accepted payment methods and billing information</p>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all border-2 border-orange-200 hover:border-orange-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <GraduationCap size={20} className="text-orange-600" />
                  Academic integrity policy
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">Our commitment to academic honesty and ethical research</p>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href="#"
                className="block p-4 sm:p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all border-2 border-indigo-200 hover:border-indigo-400"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Users size={20} className="text-indigo-600" />
                  Dispute resolution process
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">How we handle disputes between clients and experts</p>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-300 shadow-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Still need help?</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">Can't find what you're looking for? Our support team is here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-all duration-200 text-sm sm:text-base"
            >
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}