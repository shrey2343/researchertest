import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, BookOpen, AlertTriangle, CheckCircle, Shield, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, Globe, Microscope, Code, Lightbulb, Briefcase, TrendingUp, Sparkles, Zap, Star, Heart, Eye, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AcademicIntegrity() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden py-12 px-4">
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
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Academic Integrity Policy</h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Our platform strictly follows academic integrity principles:
            </motion.p>

            <div className="space-y-4">
              {[
                { text: 'Services are provided for guidance, mentoring, and reference purposes only.', icon: BookOpen },
                { text: 'Users must not submit provided material as their own without proper citation.', icon: AlertTriangle },
                { text: 'Plagiarism, academic dishonesty, or policy violations are strictly prohibited.', icon: Shield },
                { text: 'Responsibility for academic submissions lies solely with the user.', icon: CheckCircle },
                { text: 'Violations may result in permanent account termination.', icon: AlertTriangle },
                { text: 'We promote ethical learning and responsible academic conduct.', icon: Award }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex gap-4 items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-all"
                  >
                    <IconComponent className="text-purple-600 flex-shrink-0 mt-0.5" size={24} />
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="text-purple-600" size={24} />
                <p className="text-sm font-semibold text-gray-900">Important Information</p>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Last Updated:</strong> December 22, 2025
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
