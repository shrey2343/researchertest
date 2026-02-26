import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { PageType } from '../../../types';

interface AnimatedCTAButtonsProps {
  onShowResults: () => void;
  onNavigate: (page: PageType) => void;
}

export default function AnimatedCTAButtons({ onShowResults, onNavigate }: AnimatedCTAButtonsProps) {
  return (
    <div className="flex flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
      <motion.button
        onClick={onShowResults}
        className="relative flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg overflow-hidden flex items-center justify-center gap-2"
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0284C7] to-[#0B3C9D] bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-lg"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          Hire a Researcher
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronRight size={20} />
          </motion.span>
        </span>
      </motion.button>

      <motion.button
        onClick={() => onNavigate('signup')}
        className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-700 rounded-xl font-semibold text-base sm:text-lg border border-slate-200"
        whileHover={{ 
          scale: 1.05,
          backgroundColor: 'rgba(248, 250, 252, 1)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        Join as a expert
      </motion.button>
    </div>
  );
}
