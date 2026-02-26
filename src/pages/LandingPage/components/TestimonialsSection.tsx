import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'CTO, TechVision',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'Xperthiring made it incredibly easy to find qualified researchers. The quality of work exceeded our expectations.',
    },
    {
      name: 'Michael Chen',
      title: 'Research Director, BioLabs',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'The verification process gives us confidence. We found experts who truly understood our complex requirements.',
    },
    {
      name: 'Emily Rodriguez',
      title: 'VP Operations, GlobalCorp',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'Fast, reliable, and professional. This platform has become essential for our research projects.',
    },
    {
      name: 'David Miller',
      title: 'CEO, InnovateLabs',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'The platform connected us with world-class researchers. Our project was completed ahead of schedule.',
    },
    {
      name: 'Lisa Anderson',
      title: 'Head of R&D, MedTech',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'Outstanding service! Found the perfect match for our complex biotech project within days.',
    },
    {
      name: 'James Wilson',
      title: 'Founder, DataCorp',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      rating: 5,
      quote: 'The AI matching system is brilliant. Saved us weeks of searching for the right data scientist.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0"
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

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 25 - 12, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.8, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}

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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by thousands of satisfied clients worldwide
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-200/50 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-200/50 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} className="sm:w-7 sm:h-7" />
          </button>

          {/* Testimonial Slideshow */}
          <div className="relative h-auto min-h-[300px] sm:h-80 overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300, rotateY: 45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -45 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-2 sm:p-0"
              >
                <div className="relative group w-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl px-6 sm:px-10 lg:px-16 py-8 sm:py-12 border border-blue-100 shadow-2xl overflow-visible mt-6 sm:mt-10">
                    {/* Quote Icon - Fixed positioning */}
                    <motion.div
                      className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg z-10"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Quote className="text-white" size={20} />
                    </motion.div>

                    {/* Content Layout - Responsive */}
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                      {/* Profile Section - Top on mobile, Left on desktop */}
                      <motion.div
                        className="flex flex-col items-center lg:items-start order-1 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <motion.img
                          src={testimonials[currentIndex].photo}
                          alt={testimonials[currentIndex].name}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-blue-200 shadow-lg mb-4"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="text-center lg:text-left">
                          <div className="font-bold text-gray-900 text-lg sm:text-xl mb-1">{testimonials[currentIndex].name}</div>
                          <div className="text-blue-600 font-medium text-sm">{testimonials[currentIndex].title}</div>
                        </div>
                        
                        {/* Stars */}
                        <div className="flex gap-1 mt-4">
                          {[...Array(testimonials[currentIndex].rating)].map((_, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                              <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Quote Text - Bottom on mobile, Right on desktop */}
                      <motion.div
                        className="lg:col-span-2 order-2 lg:order-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-center lg:text-left">
                          "{testimonials[currentIndex].quote}"
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-blue-500 w-8' 
                    : 'bg-blue-200 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
