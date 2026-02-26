// import { TrendingUp, Users, Star, Globe } from 'lucide-react';

// export default function ModernStatsSection() {
//   const stats = [
//     { 
//       icon: Users, 
//       number: '10M+', 
//       label: 'Active Researchers',
//       description: 'Verified experts worldwide'
//     },
//     { 
//       icon: TrendingUp, 
//       number: '5M+', 
//       label: 'Projects Completed',
//       description: 'Successfully delivered'
//     },
//     { 
//       icon: Star, 
//       number: '4.9/5', 
//       label: 'Average Rating',
//       description: 'Client satisfaction'
//     },
//     { 
//       icon: Globe, 
//       number: '190+', 
//       label: 'Countries',
//       description: 'Global reach'
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-white mb-4">
//             Trusted by Millions
//           </h2>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//             Join the world's largest research marketplace
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={stat.label}
//                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
//               >
//                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Icon size={32} className="text-white" />
//                 </div>
//                 <div className="text-4xl font-bold text-white mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-xl font-semibold text-blue-100 mb-2">
//                   {stat.label}
//                 </div>
//                 <div className="text-blue-200 text-sm">
//                   {stat.description}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


import { TrendingUp, Users, Star, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModernStatsSection() {
  const stats = [
    { icon: Users, number: '10M+', label: 'Active Researchers', description: 'Verified experts worldwide' },
    { icon: TrendingUp, number: '5M+', label: 'Projects Completed', description: 'Successfully delivered' },
    { icon: Star, number: '4.9/5', label: 'Average Rating', description: 'Client satisfaction' },
    { icon: Globe, number: '190+', label: 'Countries', description: 'Global reach' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 2, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-purple-400/20 rounded-2xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400/20 rounded-full"
        animate={{
          rotate: [360, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg"
        animate={{
          rotate: [0, 180, 360],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full mb-6 border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">Global Impact</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Trusted by Millions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join the world's largest research marketplace
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 shadow-2xl group-hover:bg-white/10 transition-all duration-500">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent, rgba(59, 130, 246, 0.3), transparent)',
                      backgroundSize: '300% 300%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-white/20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon size={36} className="text-white" />
                    </motion.div>

                    {/* Number */}
                    <motion.div
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    {/* Label */}
                    <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                    
                    {/* Description */}
                    <div className="text-gray-300 text-sm leading-relaxed">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
