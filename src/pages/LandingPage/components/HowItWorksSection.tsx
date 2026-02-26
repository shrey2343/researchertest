import { FileText, Users, Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const companySteps = [
    {
      icon: FileText,
      title: 'Post Your Project',
      desc: 'Describe your requirements in minutes with clear goals and deliverables.',
    },
    {
      icon: Users,
      title: 'Get AI Matched Experts',
      desc: 'AI matching connects you with trusted researchers.',
    },
    {
      icon: Shield,
      title: 'Collaborate Securely',
      desc: 'Chat, share files, assign tasks, and track progress safely.',
    },
    {
      icon: CheckCircle,
      title: 'Pay with Confidence',
      desc: 'Milestone-based payments ensure transparency and trust.',
    },
  ]

  const expertSteps = [
    {
      icon: Users,
      title: 'Create Your Profile',
      desc: 'Add credentials, skills, publications, and experience.',
    },
    {
      icon: Shield,
      title: 'Get Verified',
      desc: 'Build trust through certification and verification.',
    },
    {
      icon: FileText,
      title: 'Find Global Projects',
      desc: 'Work with companies, labs, and universities worldwide.',
    },
    {
      icon: CheckCircle,
      title: 'Earn & Build Impact',
      desc: 'Grow your reputation and income through meaningful work.',
    },
  ]

  // Enhanced StepItem component
  const StepItem = ({ step, index }) => {
    const Icon = step.icon
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, x: 8 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative flex gap-6 group cursor-pointer"
      >
        {/* Enhanced Timeline circle */}
        <div className="flex flex-col items-center">
          <motion.div 
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[3px] shadow-lg group-hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center">
              <Icon size={22} strokeWidth={2.5} className="text-blue-600 group-hover:text-indigo-600 transition-colors" />
            </div>
            {/* Step number */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
              {index + 1}
            </div>
          </motion.div>

          {/* Enhanced vertical line */}
          {index !== 3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '100%', opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
              className="w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-transparent mt-4 group-hover:from-blue-500 group-hover:via-indigo-500 transition-colors"
            />
          )}
        </div>

        {/* Enhanced Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="flex-1 group-hover:translate-x-1 transition-transform"
        >
          <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {step.title}
          </h4>
          <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors">
            {step.desc}
          </p>
          {/* Accent line */}
          <motion.div
            className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-3 group-hover:w-16 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all"
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
          />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          repeatType: 'reverse', 
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400/50 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 30, 0],
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.3
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Enhanced Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, 60, 0], 
          x: [0, 40, 0], 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/25 via-cyan-300/15 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, -70, 0], 
          x: [0, -50, 0], 
          scale: [1, 1.25, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: 'easeInOut', 
          delay: 4 
        }}
        className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-bl from-indigo-300/25 via-purple-300/15 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How It Works —{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fast & Simple
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A seamless workflow designed for clients and Experts to collaborate effortlessly
          </motion.p>
        </motion.div>

        {/* Enhanced Two columns */}
        <div className="grid lg:grid-cols-2 gap-16 sm:gap-20 lg:gap-24">
          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background card */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg" />
            <div className="relative p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
                For{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Clients
                </span>
              </h3>
              <div className="space-y-8 sm:space-y-12">
                {companySteps.map((step, i) => (
                  <StepItem key={i} step={step} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background card */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg" />
            <div className="relative p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
                For{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Experts
                </span>
              </h3>
              <div className="space-y-8 sm:space-y-12">
                {expertSteps.map((step, i) => (
                  <StepItem key={i} step={step} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
