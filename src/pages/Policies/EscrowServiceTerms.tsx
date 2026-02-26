import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, CheckCircle, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Lightbulb, BookOpen, Briefcase, TrendingUp, Sparkles, Zap, Star, Heart, Eye, Search, FileText, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EscrowServiceTerms() {
  const navigate = useNavigate();

  // Floating icons configuration
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: FileText, color: 'text-indigo-400', size: 26, opacity: 0.19 },
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
    { Icon: Heart, color: 'text-rose-400', size: 26, opacity: 0.16 },
    { Icon: Eye, color: 'text-indigo-500', size: 30, opacity: 0.17 },
    { Icon: Search, color: 'text-slate-400', size: 28, opacity: 0.18 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-8 sm:py-12 px-4">
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

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 sm:mb-6 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md text-sm sm:text-base"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 border-gray-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Escrow Service Terms</h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed"
            >
              Last Updated: December 26, 2025
            </motion.p>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">1</span>
                </div>
                Escrow Service Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                Xperthiring's Escrow Service provides a secure payment mechanism that protects both clients and freelancers. 
                When you use our escrow service, funds are held securely by Xperthiring until project deliverables are 
                approved by the client.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 my-4">
                <div className="flex items-start gap-3">
                  <Lock className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-blue-900 text-xs sm:text-sm leading-relaxed">
                    All payments are processed through secure payment gateways and held in a dedicated escrow account 
                    until project completion is verified.
                  </p>
                </div>
              </div>
            </motion.section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">2</span>
                </div>
                How Escrow Works
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3 sm:gap-4 items-start bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl border-2 border-blue-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Payment Deposit</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Client deposits the agreed project amount plus 10% platform commission into escrow. 
                      This payment is processed immediately but held securely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start bg-gradient-to-r from-indigo-50 to-blue-50 p-3 sm:p-4 rounded-xl border-2 border-indigo-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Work Commencement</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Once funds are in escrow, the freelancer is notified to begin work. The freelancer 
                      has assurance that payment is secured.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start bg-gradient-to-r from-purple-50 to-indigo-50 p-3 sm:p-4 rounded-xl border-2 border-purple-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Delivery & Review</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Freelancer submits completed work for client review. Client has the right to request 
                      revisions or approve the deliverables.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4 items-start bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border-2 border-green-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-lg text-sm sm:text-base">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Payment Release</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      Upon client approval, funds are released to the freelancer's account (minus 10% platform fee). 
                      Payment is typically processed within 2-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">3</span>
                </div>
                Platform Commission
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                Xperthiring charges a 10% platform commission on all transactions. This fee covers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-2 border-green-200">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700">Secure escrow account management and payment processing</span>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700">Platform maintenance, security, and customer support</span>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border-2 border-purple-200">
                  <CheckCircle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700">Dispute resolution services and fraud protection</span>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border-2 border-orange-200">
                  <CheckCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700">Transaction monitoring and compliance</span>
                </li>
              </ul>
            </section>

            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-6 sm:mt-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Questions or Concerns?</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed">
                If you have any questions about our Escrow Service Terms, please contact our support team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      <strong>Email:</strong> escrow@Xperthiring.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-indigo-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      <strong>Support:</strong> Available 24/7 through the platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
