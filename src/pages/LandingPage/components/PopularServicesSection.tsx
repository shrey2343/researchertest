import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Code,
  TrendingUp,
  FileText,
  Box,
  Smartphone,
  LineChart,
  Users,
  Globe,
} from 'lucide-react'

const services = [
 {
    name: 'Data, AI & Analytics',
    icon: Code,
    desc: 'AI-driven insights, machine learning models & advanced data analysis',
    id: 'ai-development',
  },
  {
    name: 'Management & Strategy Consulting',
    icon: TrendingUp,
    desc: 'Business strategy, growth planning & decision-making support',
    id: 'management-consulting',
  },
  {
    name: 'Marketing & Growth Consulting',
    icon: Box,
    desc: 'Market positioning, customer insights & growth strategies',
    id: 'marketing-growth',
  },
  {
    name: 'Clinical & Healthcare Research',
    icon: FileText,
    desc: 'Clinical studies, healthcare data analysis & research consulting',
    id: 'clinical-research',
  },
  {
    name: 'IT & Digital Transformation',
    icon: Smartphone,
    desc: 'Technology consulting, system modernization & digital solutions',
    id: 'digital-transformation',
  },
  {
    name: 'Policy, Economic & Impact Research',
    icon: Users,
    desc: 'Public policy analysis, economic research & social impact studies',
    id: 'policy-research',
  },
  {
    name: 'Academic & Scientific Research Consulting',
    icon: Globe,
    desc: 'Thesis support, paper writing guidance & advanced research methods',
    id: 'academic-research',
  },
  {
  name: 'Financial & Investment Research',
  icon: LineChart,
  desc: 'Market analysis, financial modeling & investment insights',
  id: 'financial-research',
},
]

export default function PopularServicesSection() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-slate-100">
      {/* Enhanced Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
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
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
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
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/30 via-cyan-300/20 to-transparent rounded-full blur-3xl"
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
        className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-bl from-indigo-300/30 via-purple-300/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            High-impact services delivered by verified experts using AI matching
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, i) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.03 }}
                onClick={() => handleServiceClick(service.id)}
                className="group relative rounded-2xl lg:rounded-3xl bg-white/90 backdrop-blur-sm border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Enhanced Gradient Border on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl lg:rounded-3xl blur-sm opacity-0 group-hover:opacity-30 transition-all duration-500" />
                
                {/* Dynamic Hover Background */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
                  }}
                />

                {/* Animated Top Accent Line */}
                <motion.div 
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-t-2xl lg:rounded-t-3xl"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />

                {/* Floating Corner Accent */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />

                <div className="relative p-6 sm:p-8 flex flex-col gap-4 sm:gap-5">
                  {/* Enhanced Icon with Multiple Effects */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -5, 5, 0],
                      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 20,
                      rotate: { duration: 0.6 }
                    }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Icon Glow Effect */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
                    <Icon size={24} className="relative text-white sm:w-6 sm:h-6 drop-shadow-sm" />
                  </motion.div>

                  {/* Enhanced Title with Slide Effect */}
                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  >
                    {service.name}
                  </motion.h3>

                  {/* Description with Fade Effect */}
                  <motion.p 
                    className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    whileHover={{ opacity: 0.9 }}
                  >
                    {service.desc}
                  </motion.p>

                  {/* Animated Accent Line with Gradient */}
                  <motion.div 
                    className="h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mt-2 group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-500 transition-all duration-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: '3rem' }}
                    whileHover={{ width: '4rem' }}
                    transition={{ 
                      width: { duration: 0.8, delay: i * 0.1 + 0.5 },
                      colors: { duration: 0.3 }
                    }}
                    viewport={{ once: true }}
                  />

                  {/* Hover Arrow Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
