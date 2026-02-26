// import { ArrowRight, Sparkles } from 'lucide-react';
// import type { PageType } from '../../../types';

// interface CTASectionProps {
//   onNavigate: (page: PageType) => void;
// }

// export default function CTASection({ onNavigate }: CTASectionProps) {
//   return (
//     <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 relative overflow-hidden">
//       {/* Floating emojis */}
//       <div className="absolute top-20 left-10 text-4xl opacity-30 animate-bounce">🚀</div>
//       <div className="absolute top-40 right-20 text-3xl opacity-20 animate-pulse">🎆</div>
//       <div className="absolute bottom-20 left-20 text-3xl opacity-25 animate-bounce">🎯</div>
      
//       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
//           <div className="flex justify-center mb-6">
//             <span className="text-6xl">🚀</span>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready to Get Started? 🎯
//           </h2>
//           <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
//             Join thousands of satisfied clients and find your perfect research expert today. 
//             It's free to get started! 🎆
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <button
//               onClick={() => onNavigate('signup')}
//               className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
//             >
//               🎉 Get Started Free
//               <ArrowRight size={20} />
//             </button>
//             <button
//               onClick={() => onNavigate('bidding')}
//               className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
//             >
//               💼 Post a Project
//               <ArrowRight size={20} />
//             </button>
//           </div>

//           <div className="mt-8 flex items-center justify-center gap-8 text-blue-200 text-sm">
//             <span>✓ No credit card required</span>
//             <span>✓ Free to join</span>
//             <span>✓ Cancel anytime</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { ArrowRight, Rocket, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PageType } from '../../../types';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
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
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
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

      {/* Decorative Icons */}
      <motion.div
        className="absolute top-20 left-20 text-white/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Sparkles size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-white/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Zap size={35} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/20 shadow-2xl">
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1), transparent)',
                backgroundSize: '300% 300%'
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            <div className="relative z-10">
              {/* Header Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="flex justify-center mb-8"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Rocket size={40} className="text-white" />
                </motion.div>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Ready to Get Started?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Join thousands of satisfied clients and find your perfect research expert today. 
                Start collaborating for free and transform your research projects.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              >
                <motion.button
                  onClick={() => onNavigate('signup')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>

                <motion.button
                  onClick={() => onNavigate('postprojectpage')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  Post a Project
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-8 text-white/80 text-sm"
              >
                {[
                  'No credit card required',
                  'Free to join',
                  'Cancel anytime'
                ].map((feature, idx) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-green-400" size={16} />
                    {feature}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
