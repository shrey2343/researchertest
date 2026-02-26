import { Check, Sparkles, Zap, X, ArrowRight, Shield, TrendingUp, Users, Award, Star, Heart, Eye, ChevronDown, HelpCircle, Percent, DollarSign, Coins, Wallet, CreditCard, BadgeCheck, Rocket, Crown, Gift, TrendingDown, Clock, Target, Briefcase, Globe, Code, Database, Brain, Lightbulb, FileText, BarChart3, Layers, Zap as Lightning } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Footer from '../../components/layout/Footer';

interface PricingPageProps {
  onNavigate: (page: 'home' | 'about' | 'blog' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard') => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    { icon: Shield, title: 'Secure Payments', desc: 'Bank-grade encryption' },
    { icon: BadgeCheck, title: 'Verified Experts', desc: '10K+ researchers' },
    { icon: TrendingUp, title: '98% Success', desc: 'Project completion' },
    { icon: Clock, title: 'Fast Matching', desc: 'Under 24 hours' },
    { icon: Users, title: 'Global Network', desc: '150+ countries' },
    { icon: Award, title: 'Top Quality', desc: 'Expert-level work' },
  ];

  const faqs = [
    {
      question: 'How does 0% commission really work?',
      answer: 'Unlike other platforms that charge 10-30% commission, we charge absolutely nothing. You pay exactly what you agree with the researcher - no hidden fees, no platform cuts. We make money through optional premium features and enterprise subscriptions, not by taking a cut of your hard-earned money.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'Zero hidden fees. The price you see is the price you pay. No service charges, no processing fees, no surprise deductions. We believe in complete transparency.'
    },
    {
      question: 'How do you make money with 0% commission?',
      answer: 'We offer optional premium features like priority support, advanced analytics, and team collaboration tools. Enterprise clients can subscribe to our business plans. But for standard project matching and payments? Completely free.'
    },
    {
      question: 'Is there a catch?',
      answer: 'No catch. We built this platform to empower researchers and clients, not to profit from their transactions. Our mission is to make research collaboration accessible and affordable for everyone.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, PayPal, bank transfers, and wire transfers. All payments are processed securely through encrypted gateways with PCI DSS compliance.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fafbff 0%, #f0f4ff 25%, #e8f0fe 50%, #dce9ff 75%, #f0f4ff 100%)' }}>
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(45, 108, 223, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(45, 108, 223, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.25) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Giant 0% Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
              className="inline-block mb-8 sm:mb-12 relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-3xl opacity-40 animate-pulse" />
              
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white px-12 sm:px-20 py-8 sm:py-12 rounded-3xl shadow-2xl border-4 border-white/30"
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Percent size={48} className="sm:w-[72px] sm:h-[72px]" strokeWidth={3} />
                  </motion.div>
                  <div className="text-left">
                    <div className="text-6xl sm:text-9xl font-black leading-none">0%</div>
                    <div className="text-xl sm:text-3xl font-bold mt-2">COMMISSION</div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Crown size={28} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Gift size={28} className="text-white" />
                </div>
              </motion.div>
              
              {/* Sparkle Effects */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI) / 8) * 150}%`,
                    top: `${50 + Math.sin((i * Math.PI) / 8) * 150}%`,
                  }}
                  animate={{
                    scale: [0, 1.8, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Sparkles className="text-blue-500" size={32} />
                </motion.div>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-gray-900"
            >
              Keep 100% of Your Money
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed"
            >
              No platform fees. No hidden charges. No commission.
              <br />
              <span className="font-bold text-blue-600">Pay only what you agree with your researcher.</span>
            </motion.p>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto mb-12 sm:mb-16"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-blue-200 shadow-xl"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <feature.icon size={20} className="sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-[10px] sm:text-xs">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Comparison Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
            >
              {/* Other Platforms */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-red-200 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl opacity-10">😞</div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Other Platforms</h3>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="text-red-500" size={28} strokeWidth={3} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <span className="text-gray-700 font-medium">Project Cost</span>
                      <span className="font-bold text-gray-900 text-lg">$1,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="text-red-500" size={20} />
                        <span className="text-gray-700 font-medium">Platform Fee (20%)</span>
                      </div>
                      <span className="font-bold text-red-600 text-lg">-$200</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-red-100 to-red-200 rounded-xl border-2 border-red-300 shadow-lg">
                      <span className="font-bold text-gray-900 text-lg">You Pay</span>
                      <span className="text-3xl font-black text-red-600">$1,200</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="text-sm text-red-700 space-y-2">
                      <div className="flex items-center gap-2">
                        <X size={16} />
                        <span>Hidden processing fees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X size={16} />
                        <span>Service charges apply</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X size={16} />
                        <span>Withdrawal fees extra</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Xperthiring */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl border-4 border-blue-300 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl opacity-20">🎉</div>
                
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Xperthiring</h3>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Check className="text-white" size={28} strokeWidth={3} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                      <span className="text-white font-medium">Project Cost</span>
                      <span className="font-bold text-white text-lg">$1,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40">
                      <div className="flex items-center gap-2">
                        <Percent className="text-white" size={20} />
                        <span className="text-white font-medium">Platform Fee (0%)</span>
                      </div>
                      <span className="font-bold text-white text-lg">$0</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="flex items-center justify-between p-5 bg-white/40 backdrop-blur-sm rounded-xl border-2 border-white/50 shadow-xl">
                      <span className="font-bold text-white text-lg">You Pay</span>
                      <span className="text-3xl font-black text-white">$1,000</span>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6 p-5 bg-white/30 backdrop-blur-sm rounded-xl border-2 border-white/40 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                          <Gift size={24} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">You Save</span>
                      </div>
                      <span className="text-3xl font-black text-white">$200</span>
                    </div>
                  </motion.div>
                  
                  <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <div className="text-sm text-white space-y-2">
                      <div className="flex items-center gap-2">
                        <Check size={16} strokeWidth={3} />
                        <span>No hidden fees ever</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} strokeWidth={3} />
                        <span>Free withdrawals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} strokeWidth={3} />
                        <span>100% transparent pricing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('signup')}
                className="px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 group"
              >
                <span>Start Saving Today</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('about')}
                className="px-12 py-6 bg-white/80 backdrop-blur-md text-blue-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-white transition-all flex items-center justify-center gap-3 border-2 border-blue-200"
              >
                <Eye size={24} />
                <span>See How It Works</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-blue-600 text-sm font-semibold mb-4 border border-blue-200">
              <HelpCircle size={16} />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-blue-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-gray-600" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden shadow-2xl border border-blue-200"
          >
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, #3b82f6 2px, transparent 2px)',
                backgroundSize: '50px 50px',
              }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-6"
              >
                <Rocket size={40} className="text-white" />
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Ready to Save Money?
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands who are keeping 100% of their money
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('signup')}
                className="px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3 group"
              >
                <span>Get Started Free</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <p className="text-gray-600 text-sm mt-6">
                No credit card required • No hidden fees • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
