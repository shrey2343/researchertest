import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function AnimatedHeroHeading() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Researchers', 'Scientists', 'AI Experts', 'Domain Specialists'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1], // easeOutQuart
      },
    },
  };

  const gradientVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      backgroundPosition: '0% 50%',
    },
    visible: {
      opacity: 1,
      scale: 1,
      backgroundPosition: '100% 50%',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.h1
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 tracking-wide"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={wordVariants} className="inline-block mr-3">
        Hire a
      </motion.span>
      
      <motion.span
        variants={gradientVariants}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] drop-shadow-lg cursor-default mr-3"
        style={{
          backgroundSize: '200% auto',
          animation: 'gradient 3s ease infinite',
        }}
      >
        <span ref={typedRef}></span>
      </motion.span>
      
      <motion.span variants={wordVariants} className="inline-block mr-3">
        — Instantly
      </motion.span>
      
      <motion.span 
        variants={wordVariants} 
        className="inline-block text-white drop-shadow-lg"
      >
        with AI
      </motion.span>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </motion.h1>
  );
}
