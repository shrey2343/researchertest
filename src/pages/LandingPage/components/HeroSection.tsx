
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Search,
  MapPin,
  Award,
  Clock,
  TrendingUp,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Shield,
  Globe,
  Zap
} from 'lucide-react'
import type { PageType } from '../../../types'
import AnimatedBackground from './AnimatedBackground'

interface HeroSectionProps {
  onNavigate: (page: PageType | (() => void)) => void
  onShowResults: () => void
}

const researcherImages = [
  {
    src: '/images/Dr. James Wilson.png',
    name: 'Dr. James Wilson',
    field: 'AI & Machine Learning Expert',
    rating: '4.9',
    location: 'London, UK',
    // : 'Google',
    companyLogo: <img src="https://cdn.pixabay.com/photo/2015/11/02/14/01/google-1018443_1280.png" alt="Google" className="w-24 h-8 object-contain" />,
    projects: 142,
    avgResponse: '2 hours',
    successRate: '98%',
    badges: ['Top Rated', 'AI Expert', 'Fast Responder']
  },
  {
    src: '/images/Dr. Maria Garcia.png',
    name: 'Dr. Maria Garcia',
    field: 'Data Science Specialist',
    rating: '4.8',
    location: 'New York, USA',
    company: 'Microsoft',
    companyLogo: <img src="https://cdn.pixabay.com/photo/2014/04/03/10/23/windows-310290_1280.png" alt="Microsoft" className="w-18 h-8 object-contain" />,
    projects: 89,
    avgResponse: '1 hour',
    successRate: '96%',
    badges: ['Verified', 'Data Guru', '24/7 Available']
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    name: 'Dr. David Chen',
    field: 'Clinical Research Lead',
    rating: '5.0',
    location: 'Boston, USA',
    company: 'Harvard',
    companyLogo: <img src="https://i.pinimg.com/1200x/ad/b4/6d/adb46d6381b1fbb92daf5c6f448f7951.jpg" alt="Harvard" className="w-18 h-14 object-contain" />,
    projects: 203,
    avgResponse: '3 hours',
    successRate: '99%',
    badges: ['Elite', 'Clinical Expert', 'High Demand']
  },
  {
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    name: 'Dr. Sarah Johnson',
    field: 'Biotechnology Researcher',
    rating: '4.9',
    location: 'Cambridge, UK',
    company: 'Oxford',
    companyLogo: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Uni_Oxford_logo.svg/500px-Uni_Oxford_logo.svg.png?20081116171714" alt="Oxford" className="w-18 h-14 object-contain" />,
    projects: 156,
    avgResponse: '4 hours',
    successRate: '95%',
    badges: ['Premium', 'Biotech Leader', 'Quality Guaranteed']
  },
]

const skills = [
  'AI & Machine Learning',
  'Data Science',
  'Clinical Research',
  'Biotechnology',
  'Software Development',
  'Market Research',
  'Academic Writing',
  'Statistical Analysis',
  'Web Development',
  'Mobile App Development',
  'Blockchain',
  'Cybersecurity',
  'Digital Marketing',
  'Content Writing',
  'Graphic Design'
]

const stats = [
  { value: '10K+', label: 'Verified Researchers', icon: Shield },
  { value: '95%', label: 'Success Rate', icon: TrendingUp },
  { value: '<24h', label: 'Avg. Match Time', icon: Clock },
  { value: '150+', label: 'Countries', icon: Globe }
]

const trendingSearches = [
  'Generative AI Research',
  'Clinical Trials',
  'Market Analysis',
  'Quantum Computing',
  'Biomedical Engineering'
]

export default function HeroSection({ onNavigate, onShowResults }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredSkills, setFilteredSkills] = useState(skills)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isPlayingDemo, setIsPlayingDemo] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const expertTypes = ['Scientists', 'Researchers', 'Consultants']
  const [currentExpertType, setCurrentExpertType] = useState(0)

  // Auto rotate images
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(
      () => setCurrentImageIndex((i) => (i + 1) % researcherImages.length),
      7000
    )
    return () => clearInterval(interval)
  }, [isAutoRotating])

  // Auto rotate expert types
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentExpertType((i) => (i + 1) % expertTypes.length),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  // Filter skills based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = skills.filter(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSkills(filtered)
    } else {
      setFilteredSkills(skills)
    }
  }, [searchQuery])

  // Demo video simulation
  useEffect(() => {
    if (isPlayingDemo) {
      const timer = setTimeout(() => {
        setIsPlayingDemo(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPlayingDemo])

  const handleSkillSelect = (skill: string) => {
    setSearchQuery(skill)
    setShowDropdown(false)
    onShowResults()
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onShowResults()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((i) => (i + 1) % researcherImages.length)
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const prevImage = () => {
    setCurrentImageIndex((i) => (i - 1 + researcherImages.length) % researcherImages.length)
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), 10000)
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 170
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative py-6 sm:py-10 lg:py-14" style={{ overflow: 'hidden' }}>
      {/* Ultra Cool 3D Animated Background */}
      <AnimatedBackground />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 pointer-events-none" />

      {/* Animated Mesh Grid with Particles */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          rotate: [0, 360]
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
            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
        }}
      />

      {/* Floating Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Floating Gradient Orbs with Glow */}
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, 40, 0],
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-64 -left-64 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 via-cyan-300/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -80, 0],
          x: [0, -60, 0],
          scale: [1, 1.2, 1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute top-1/3 -right-72 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-300/30 via-purple-300/25 to-transparent rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100
            }}
            className="space-y-8 sm:space-y-10 text-center lg:text-left relative z-10"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 rounded-full border border-blue-100 shadow-sm"
            >

            </motion.div>

            {/* Main Headline */}
            <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5 w-full pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[2rem] leading-[1.1] xs:text-[2.3rem] sm:text-[2.8rem] md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-center md:text-left"
              >
                <span className="block mb-1 sm:mb-1.5 md:mb-1.5">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent text-[2.2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-5xl lg:text-6xl xl:text-7xl">
                    Get World's
                  </span>
                </span>
                <span className="block mb-1 sm:mb-1.5 md:mb-1.5">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] text-[2.2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-5xl lg:text-6xl xl:text-7xl">
                      Best Experts
                    </span>
                    <motion.div
                      className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 left-0 right-0 h-0.5 sm:h-1 md:h-1.5 rounded-full overflow-hidden"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          backgroundPosition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-white"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "easeInOut"
                        }}
                        style={{ width: '30%', opacity: 0.4 }}
                      />
                    </motion.div>
                  </span>
                </span>
                <div className="mt-1 sm:mt-1.5 md:mt-1.5 min-h-[2rem] xs:min-h-[2.3rem] sm:min-h-[2.8rem] md:min-h-[3.5rem] lg:min-h-[4rem] xl:min-h-[4.5rem] flex items-center justify-center md:justify-start">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentExpertType}
                      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-black text-[2rem] xs:text-[2.3rem] sm:text-[2.8rem] md:text-5xl lg:text-6xl xl:text-7xl"
                    >
                      {expertTypes[currentExpertType]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.h1>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold max-w-lg sm:max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Get AI matched Experts for your exact needs
              </motion.p>

              <motion.span
                className="font-black text-[1.65rem] xs:text-[2rem] sm:text-[2.5rem] md:text-lg lg:text-xl xl:text-2xl block"
                style={{
                  backgroundImage: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                0% commission
              </motion.span>
            </div>


            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative max-w-xl mx-auto lg:mx-0"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="What do you need...?"
                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 pl-10 sm:pl-12 md:pl-14 pr-24 sm:pr-28 md:pr-32 text-sm sm:text-base text-gray-700 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 placeholder-gray-400"
                  />
                  <Search className="absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />

                  {/* AI Assistant Badge with Pulsing Green Dot */}
                  <div className="absolute right-20 sm:right-24 md:right-28 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                    <div className="relative">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                          scale: [1, 2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <span>AI Match</span>
                  </div>

                  <motion.button
                    onClick={handleSearch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-1 top-0 bottom-0 my-auto h-fit bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl"
                  >
                    Search
                  </motion.button>
                </div>
              </div>

              {/* Trending Searches */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={22} /> Trending:-
                </span>
                {trendingSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSkillSelect(search)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>

              {/* Enhanced Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-visible"
                    >
                      {/* Sticky Header */}
                      <div className="text-xs font-semibold text-gray-500 px-3 py-3 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
                        POPULAR SKILLS
                      </div>

                      {/* Scrollable Content with increased height */}
                      <div 
                        className="overflow-visible"
                        style={{
                          maxHeight: '260px',
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#3b82f6 #f3f4f6'
                        }}
                      >
                        <div className="p-2 space-y-1">
                          {filteredSkills.map((skill, index) => (
                            <button
                              key={index}
                              onClick={() => handleSkillSelect(skill)}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 group"
                            >
                              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <Award className="w-3 h-3 text-blue-600" />
                              </div>
                              {skill}
                              <ArrowRight className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                          {/* Extra padding at bottom to ensure last item is fully visible */}
                          <div className="h-4" />
                        </div>
                        {filteredSkills.length === 0 && (
                          <div className="px-4 py-6 text-center">
                            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">No skills found</p>
                            <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Enhanced CTA Buttons with Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-row sm:flex-row items-center gap-3 pt-4 justify-center lg:justify-start flex-wrap"
            >
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('signup')}
                className="flex-1 max-w-[200px] px-5.5 xs:px-6.5 sm:px-6 md:px-8 py-4 xs:py-4 sm:py-3 md:py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl font-bold transition-all shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 text-[0.95rem] xs:text-[1.1rem] sm:text-sm md:text-base whitespace-nowrap"
              >
                Join as Expert
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/post-project'}
                className="flex-1 max-w-[200px] px-5.5 xs:px-6.5 sm:px-6 md:px-8 py-4 xs:py-4 sm:py-3 md:py-3.5 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-xl sm:rounded-2xl font-bold transition-all shadow-xl text-[0.95rem] xs:text-[1.1rem] sm:text-sm md:text-base whitespace-nowrap"
              >
                Post a Project
              </motion.button>


              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPlayingDemo(true)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
              >

              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT - Premium Researcher Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 1,
              type: 'spring',
              stiffness: 80,
              delay: 0.3
            }}
            className="relative hidden lg:block"
          >
            {/* Main Container */}
            <div className="relative flex items-start gap-8">
              

              {/* Large Profile Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: -20, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 20, rotateY: 10 }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  <div className="relative w-[240px] h-[300px] group mt-32">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <motion.img
                      src={researcherImages[currentImageIndex].src}
                      alt={researcherImages[currentImageIndex].name}
                      className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-white"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Premium Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-2.5 shadow-2xl"
                      >
                        <CheckCircle className="text-white" size={20} />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-2 shadow-2xl"
                      >
                        <Award className="text-white" size={16} />
                      </motion.div>
                    </div>

                    {/* Performance Stats Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-b-2xl"
                    >
                      <div className="grid grid-cols-3 gap-4 text-white">
                        <div className="text-center">
                          <div className="font-bold text-lg">{researcherImages[currentImageIndex].projects}</div>
                          <div className="text-xs opacity-80">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{researcherImages[currentImageIndex].avgResponse}</div>
                          <div className="text-xs opacity-80">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{researcherImages[currentImageIndex].successRate}</div>
                          <div className="text-xs opacity-80">Success</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Animated Curved Connection Line */}
              <motion.svg
                className="absolute left-[240px] top-[180px] z-10"
                width="80"
                height="100"
                viewBox="0 0 80 100"
                fill="none"
              >
                <motion.path
                  d="M 0 20 Q 40 30, 80 60"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Enhanced Info Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="bg-white rounded-xl shadow-lg p-5 w-[250px] border border-gray-200 mt-40"
                >
                  {/* Map with dot */}


                  {/* Name */}
                  <h3 className="font-bold text-lg text-blue-600 mb-3">
                    {researcherImages[currentImageIndex].name}
                  </h3>

                  {/* Verified Expert */}
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium leading-tight">
                        Verified Expert in {researcherImages[currentImageIndex].field}
                      </p>
                    </div>
                  </div>

                  {/* Skills badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                      <CheckCircle size={12} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {researcherImages[currentImageIndex].badges[0]}
                    </span>
                  </div>

                  {/* Previously at */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Previously at</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{researcherImages[currentImageIndex].companyLogo}</span>
                      <span className="font-bold text-gray-900">{researcherImages[currentImageIndex].company}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Carousel with Navigation */}
            <div className="mt-12 relative">
              {/* Carousel Navigation */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Featured Researchers</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Carousel */}
              <div className="relative">
                <div
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                >
                  {researcherImages.map((researcher, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-shrink-0 w-40 bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 snap-center ${index === currentImageIndex
                        ? 'border-blue-600 shadow-xl ring-2 ring-blue-500/20'
                        : 'border-gray-100 hover:border-gray-300'
                        }`}
                    >
                      {/* Status Indicator */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className={`w-2 h-2 rounded-full ${index === 0 || index === 2 ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                      </div>

                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={researcher.src}
                          alt={researcher.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-2.5">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold text-xs text-gray-900 truncate">
                            {researcher.name}
                          </h4>
                          <div className="flex items-center gap-0.5">
                            <Star size={9} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-gray-700">
                              {researcher.rating}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 truncate mb-2">
                          {researcher.field}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin size={9} />
                            <span className="text-xs">{researcher.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={9} />
                            <span className="text-xs">{researcher.projects}</span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {researcherImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                      ? 'w-6 bg-gradient-to-r from-blue-600 to-indigo-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="relative max-w-4xl mx-auto mt-12 lg:mt-20 px-4"
      >

      </motion.div>
    </section>
  )
}
