// export default function PlatformStatsSection() {
//   const stats = [
//     { number: '10M+', label: 'Total Researchers', emoji: '👨‍🔬' },
//     { number: '5M+', label: 'Projects Completed', emoji: '✅' },
//     { number: '98%', label: 'Customer Satisfaction', emoji: '😍' },
//     { number: '190+', label: 'Countries', emoji: '🌍' },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
//       {/* Floating background elements */}
//       <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
//       <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-4">
//             🚀 Trusted by Millions
//           </h2>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//             Join the world's largest research marketplace 🌐
//           </p>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {stats.map((stat) => (
//             <div
//               key={stat.label}
//               className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
//             >
//               <div className="text-4xl mb-4">{stat.emoji}</div>
//               <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
//                 {stat.number}
//               </div>
//               <div className="text-lg text-blue-100">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { TrendingUp, Users, Star, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlatformStatsSection() {
  const stats = [
    { 
      icon: Users, 
      number: '10M+', 
      label: 'Active Researchers',
      description: 'Verified experts worldwide'
    },
    { 
      icon: TrendingUp, 
      number: '5M+', 
      label: 'Projects Completed',
      description: 'Successfully delivered'
    },
    { 
      icon: Star, 
      number: '4.9/5', 
      label: 'Average Rating',
      description: 'Client satisfaction'
    },
    { 
      icon: Globe, 
      number: '190+', 
      label: 'Countries',
      description: 'Global reach'
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 overflow-hidden">
      {/* Enhanced Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          repeatType: 'reverse', 
          ease: 'linear'
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
        }}
      />

      {/* Stylish Geometric Shapes */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-16 left-12 w-40 h-40 border-2 border-white/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 right-20 w-32 h-32 border-2 border-white/15 rotate-45"
        style={{ borderRadius: '25%' }}
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/3 w-20 h-20 bg-white/10 rounded-full"
      />

      {/* Enhanced Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30"
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(i) * 40, 0],
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`
          }}
        />
      ))}

      {/* Enhanced Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, 80, 0], 
          x: [0, 50, 0], 
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute -top-48 -left-48 w-96 h-96 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, -100, 0], 
          x: [0, -60, 0], 
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: 'easeInOut', 
          delay: 5 
        }}
        className="absolute bottom-0 -right-48 w-[500px] h-[500px] bg-gradient-to-bl from-white/20 via-white/10 to-transparent rounded-full blur-3xl"
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trusted by{' '}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Millions
            </span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join the world's largest research marketplace connecting experts globally
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 text-center border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Enhanced Gradient Border on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl lg:rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Floating Corner Accent */}
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />

                {/* Enhanced Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, 0],
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 400, 
                    damping: 20,
                    rotate: { duration: 0.6 }
                  }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Icon Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
                  <Icon size={32} className="relative text-white drop-shadow-sm" strokeWidth={2.5} />
                </motion.div>

                {/* Enhanced Content */}
                <motion.div
                  className="relative"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Number */}
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div className="text-lg sm:text-xl font-bold text-white/90 group-hover:text-white transition-colors duration-300 mb-1 sm:mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm sm:text-base text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {stat.description}
                  </div>
                </motion.div>

                {/* Animated Accent Line */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-b-2xl lg:rounded-b-3xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  whileHover={{ height: '3px' }}
                  transition={{ 
                    width: { duration: 0.8, delay: i * 0.1 + 0.5 },
                    height: { duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
