// import { Brain, Database, Microscope, Package, Dna, Leaf, Users, Wrench, DollarSign, TrendingUp } from 'lucide-react';

// export default function BrowseCategoriesSection() {
//   const categories = [
//     { name: 'AI & Machine Learning', icon: Brain, count: '2,500+', color: 'bg-blue-500' },
//     { name: 'Data Science', icon: Database, count: '3,200+', color: 'bg-green-500' },
//     { name: 'Clinical Research', icon: Microscope, count: '1,800+', color: 'bg-purple-500' },
//     { name: 'Supply Chain', icon: Package, count: '1,500+', color: 'bg-orange-500' },
//     { name: 'Biotechnology', icon: Dna, count: '1,200+', color: 'bg-red-500' },
//     { name: 'Environmental Science', icon: Leaf, count: '900+', color: 'bg-emerald-500' },
//     { name: 'Social Sciences', icon: Users, count: '1,600+', color: 'bg-indigo-500' },
//     { name: 'Engineering', icon: Wrench, count: '2,800+', color: 'bg-gray-600' },
//     { name: 'Finance & Economics', icon: DollarSign, count: '2,100+', color: 'bg-yellow-500' },
//     { name: 'Marketing Research', icon: TrendingUp, count: '1,400+', color: 'bg-pink-500' },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Browse by Category
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Find the perfect expert for your specific research needs
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {categories.map((category) => {
//             const Icon = category.icon;
//             return (
//               <div
//                 key={category.name}
//                 className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
//               >
//                 <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                   <Icon size={28} className="text-white" />
//                 </div>
//                 <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                   {category.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {category.count} experts
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


import { Brain, Database, Microscope, Package, Dna, Leaf, Users, Wrench, DollarSign, TrendingUp, Shield, FileText, FlaskConical, BarChart3, BookOpen, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BrowseCategoriesSection() {
  const categories = [
  {
    name: 'Medical & Clinical Writing',
    icon: Microscope,
    count: '1,500+',
    description: 'Clinical reports, protocols, manuscripts, and medical content'
  },
  {
    name: 'Data Science & Analytics',
    icon: Database,
    count: '2,400+',
    description: 'Data modeling, predictive analytics, and research insights'
  },
  {
    name: 'Regulatory & Compliance Affairs',
    icon: Shield,
    count: '1,100+',
    description: 'Regulatory strategy, submissions, and global compliance'
  },
  {
    name: 'Scientific & Technical Consulting',
    icon: Brain,
    count: '1,300+',
    description: 'Research strategy, feasibility analysis, and innovation support'
  },
  {
    name: 'Research & Scientific Writing',
    icon: FileText,
    count: '1,700+',
    description: 'Research papers, grants, whitepapers, and documentation'
  },
  {
    name: 'Product Formulation & Optimization',
    icon: FlaskConical,
    count: '950+',
    description: 'Formulation design, testing, and performance optimization'
  },
  {
    name: 'Product Development & Innovation',
    icon: Package,
    count: '1,600+',
    description: 'Concept development, prototyping, and product validation'
  },
  {
    name: 'Statistical Analysis & Modeling',
    icon: BarChart3,
    count: '2,000+',
    description: 'Biostatistics, experimental design, and data interpretation'
  },
  {
    name: 'Literature Review & Research Synthesis',
    icon: BookOpen,
    count: '1,400+',
    description: 'Systematic reviews, meta-analysis, and evidence synthesis'
  },
  {
    name: 'Clinical Research & Trial Support',
    icon: Activity,
    count: '1,800+',
    description: 'Study design, trial execution, and clinical reporting'
  }
];



  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-slate-50 overflow-hidden">
      {/* Enhanced Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 50px 50px, 50px 50px'
        }}
      />

      {/* Stylish Geometric Shapes */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-200/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 right-16 w-24 h-24 border-2 border-indigo-200/40 rotate-45"
        style={{ borderRadius: '20%' }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full"
      />

      {/* Enhanced Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
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
            top: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' :
              i % 3 === 1 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(168, 85, 247, 0.4)'
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
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Browse by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find the perfect expert for your specific research needs across diverse fields
          </motion.p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {categories.map((category, i) => {
            const Icon = category.icon
            return (
              <motion.div
                key={i}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl border border-gray-200/50 cursor-pointer overflow-hidden transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Enhanced Gradient Border on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl lg:rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Dynamic Hover Background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
                  }}
                />

                {/* Enhanced Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -3, 3, 0],
                    boxShadow: '0 15px 30px rgba(59, 130, 246, 0.25)'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                    rotate: { duration: 0.5 }
                  }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Icon Glow Effect */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
                  <Icon size={24} className="relative text-white drop-shadow-sm" strokeWidth={2.5} />
                </motion.div>

                {/* Enhanced Content */}
                <motion.div
                  className="relative"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                    {category.name}
                  </h3>
                  {/* <p className="text-sm font-medium text-gray-600 mb-1">
                    {category.count} experts
                  </p> */}
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {category.description}
                  </p>


                </motion.div>

                {/* Animated Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-2xl lg:rounded-b-3xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  whileHover={{ height: '3px' }}
                  transition={{
                    width: { duration: 0.8, delay: i * 0.1 + 0.5 },
                    height: { duration: 0.3 }
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
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
