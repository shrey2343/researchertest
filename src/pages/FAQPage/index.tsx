import { useState } from 'react';
import { ChevronDown, ChevronUp, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Lightbulb, BookOpen, Briefcase, TrendingUp, Sparkles, Zap, Star, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Floating icons configuration
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: HelpCircle, color: 'text-indigo-400', size: 26, opacity: 0.19 },
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
    { Icon: MessageCircle, color: 'text-cyan-500', size: 30, opacity: 0.17 }
  ];

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is Xperthiring?",
          answer: "Xperthiring is a platform that connects researchers, academics, and businesses with expert freelancers who can help with research projects, data analysis, academic writing, and other specialized tasks."
        },
        {
          question: "How does Xperthiring work?",
          answer: "Clients post their research projects, experts submit proposals, and clients choose the best expert for their needs. All payments are secured through our escrow system until the work is completed satisfactorily."
        },
        {
          question: "Is Xperthiring free to use?",
          answer: "Creating an account and browsing projects is free. We charge a small service fee only when a project is successfully completed."
        }
      ]
    },
    {
      category: "For Clients",
      questions: [
        {
          question: "How do I post a project?",
          answer: "After creating an account, click 'Post a Project' and fill out the project details including description, budget, timeline, and required expertise. Your project will be reviewed and published within 24 hours."
        },
        {
          question: "How do I choose the right expert?",
          answer: "Review expert profiles, ratings, portfolios, and proposals. Look for relevant experience, good communication, and competitive pricing. You can also interview experts before making a decision."
        },
        {
          question: "What if I'm not satisfied with the work?",
          answer: "Our escrow system protects your payment until you approve the work. If you're not satisfied, you can request revisions or dispute the project through our resolution center."
        }
      ]
    },
    {
      category: "For Experts",
      questions: [
        {
          question: "How do I become a verified expert?",
          answer: "Complete your profile with education credentials, work experience, and portfolio samples. Submit verification documents and pass our skills assessment. Verification typically takes 3-5 business days."
        },
        {
          question: "How much can I earn?",
          answer: "Earnings vary based on your expertise, experience, and project complexity. Top experts earn $50-200+ per hour. You set your own rates and can negotiate project fees."
        },
        {
          question: "When do I get paid?",
          answer: "Payment is released from escrow once the client approves your work. Funds are typically available in your account within 24 hours and can be withdrawn to your bank account or PayPal."
        }
      ]
    },
    {
      category: "Payments & Security",
      questions: [
        {
          question: "How does the escrow system work?",
          answer: "When a client hires you, they deposit the project payment into escrow. The funds are held securely until the work is completed and approved. This protects both clients and experts."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards, PayPal, bank transfers, and cryptocurrency. All transactions are processed securely through our encrypted payment system."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we use bank-level encryption and security measures to protect your data. We never share your personal information with third parties without your consent."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
              <HelpCircle className="text-white" size={40} />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Find quick answers to common questions about Xperthiring
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8 sm:space-y-12">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-gray-200 shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 sm:mb-8">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <motion.div
                      key={faqIndex}
                      whileHover={{ scale: 1.01 }}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors flex items-center justify-between gap-4"
                      >
                        <span className="text-sm sm:text-lg font-semibold text-gray-900 flex-1">{faq.question}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          )}
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white">
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="text-center mt-12 sm:mt-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-300 shadow-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white" size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Still have questions?</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
            Can't find the answer you're looking for? Our support team is ready to help.
          </p>
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
              Browse Help Center
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
