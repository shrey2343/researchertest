import { Briefcase, GraduationCap, AlertTriangle, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProblemSection() {
  return (
    <section className="relative pt-20 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Warning Icons */}
      <motion.div
        className="absolute top-20 left-20 text-blue-300/30"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <AlertTriangle size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-indigo-300/30"
        animate={{
          rotate: [0, -15, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Target size={35} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div

          >

          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 pb-2">
            The Challenge
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Understanding the pain points that both companies and researchers face in today's fragmented ecosystem
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Companies Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative h-full"
            whileHover={{ y: -5 }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col">
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Briefcase className="text-white" size={28} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">For Companies & Organizations</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2" />
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-blue-600 mb-3">Hard to find truly skilled experts</h4>
                <p className="text-gray-700 leading-relaxed">
                  Finding truly skilled experts is difficult, time-consuming, and unreliable. Companies often struggle to identify the right talent among scattered profiles, inconsistent credentials, and fragmented platforms.
                </p>
              </div>

              {/* Pain Points */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Finding the right expert is slow and uncertain</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span>Hard to assess real skills and accountability</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>Delays cost time, money, and momentum</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Researchers Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative h-full"
            whileHover={{ y: -5 }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col">
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="text-white" size={28} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900"> For Experts, Scientists & Consultants</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-blue-600 mb-3">
                  Low visibility despite high-level skills and experience
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Despite strong skills and experience, many experts struggle to gain visibility and be discovered by the right clients.
                </p>
              </div>


              {/* Pain Points */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>High expertise, low visibility</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>No time for branding and outreach</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                  <span>Hard to reach the right clients</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
