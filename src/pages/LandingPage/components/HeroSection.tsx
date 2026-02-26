// import { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   ArrowRight,
//   CheckCircle,
//   Star,
//   Search,
//   MapPin,
//   Award,
//   Clock,
//   TrendingUp,
//   Users,
//   Sparkles,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Shield,
//   Globe,
//   Zap
// } from 'lucide-react'
// import type { PageType } from '../../../types'
// import AnimatedBackground from './AnimatedBackground'

// interface HeroSectionProps {
//   onNavigate: (page: PageType | (() => void)) => void
//   onShowResults: () => void
// }

// const researcherImages = [
//   {
//     src: '/images/Dr. James Wilson.png',
//     name: 'Dr. James Wilson',
//     field: 'AI & Machine Learning Expert',
//     rating: '4.9',
//     location: 'London, UK',
//     // : 'Google',
//     companyLogo: <img src="https://cdn.pixabay.com/photo/2015/11/02/14/01/google-1018443_1280.png" alt="Google" className="w-24 h-8 object-contain" />,
//     projects: 142,
//     avgResponse: '2 hours',
//     successRate: '98%',
//     badges: ['Top Rated', 'AI Expert', 'Fast Responder']
//   },
//   {
//     src: '/images/Dr. Maria Garcia.png',
//     name: 'Dr. Maria Garcia',
//     field: 'Data Science Specialist',
//     rating: '4.8',
//     location: 'New York, USA',
//     company: 'Microsoft',
//     companyLogo: <img src="https://cdn.pixabay.com/photo/2014/04/03/10/23/windows-310290_1280.png" alt="Microsoft" className="w-18 h-8 object-contain" />,
//     projects: 89,
//     avgResponse: '1 hour',
//     successRate: '96%',
//     badges: ['Verified', 'Data Guru', '24/7 Available']
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
//     name: 'Dr. David Chen',
//     field: 'Clinical Research Lead',
//     rating: '5.0',
//     location: 'Boston, USA',
//     company: 'Harvard',
//     companyLogo: <img src="https://i.pinimg.com/1200x/ad/b4/6d/adb46d6381b1fbb92daf5c6f448f7951.jpg" alt="Harvard" className="w-18 h-14 object-contain" />,
//     projects: 203,
//     avgResponse: '3 hours',
//     successRate: '99%',
//     badges: ['Elite', 'Clinical Expert', 'High Demand']
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
//     name: 'Dr. Sarah Johnson',
//     field: 'Biotechnology Researcher',
//     rating: '4.9',
//     location: 'Cambridge, UK',
//     company: 'Oxford',
//     companyLogo: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Uni_Oxford_logo.svg/500px-Uni_Oxford_logo.svg.png?20081116171714" alt="Oxford" className="w-18 h-14 object-contain" />,
//     projects: 156,
//     avgResponse: '4 hours',
//     successRate: '95%',
//     badges: ['Premium', 'Biotech Leader', 'Quality Guaranteed']
//   },
// ]

// const skills = [
//   'AI & Machine Learning',
//   'Data Science',
//   'Clinical Research',
//   'Biotechnology',
//   'Software Development',
//   'Market Research',
//   'Academic Writing',
//   'Statistical Analysis',
//   'Web Development',
//   'Mobile App Development',
//   'Blockchain',
//   'Cybersecurity',
//   'Digital Marketing',
//   'Content Writing',
//   'Graphic Design'
// ]

// const stats = [
//   { value: '10K+', label: 'Verified Researchers', icon: Shield },
//   { value: '95%', label: 'Success Rate', icon: TrendingUp },
//   { value: '<24h', label: 'Avg. Match Time', icon: Clock },
//   { value: '150+', label: 'Countries', icon: Globe }
// ]

// const trendingSearches = [
//   'Generative AI Research',
//   'Clinical Trials',
//   'Market Analysis',
//   'Quantum Computing',
//   'Biomedical Engineering'
// ]

// export default function HeroSection({ onNavigate, onShowResults }: HeroSectionProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [showDropdown, setShowDropdown] = useState(false)
//   const [filteredSkills, setFilteredSkills] = useState(skills)
//   const [isAutoRotating, setIsAutoRotating] = useState(true)
//   const [isPlayingDemo, setIsPlayingDemo] = useState(false)
//   const carouselRef = useRef<HTMLDivElement>(null)

//   // Auto rotate images
//   useEffect(() => {
//     if (!isAutoRotating) return

//     const interval = setInterval(
//       () => setCurrentImageIndex((i) => (i + 1) % researcherImages.length),
//       7000
//     )
//     return () => clearInterval(interval)
//   }, [isAutoRotating])

//   // Filter skills based on search
//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = skills.filter(skill =>
//         skill.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       setFilteredSkills(filtered)
//     } else {
//       setFilteredSkills(skills)
//     }
//   }, [searchQuery])

//   // Demo video simulation
//   useEffect(() => {
//     if (isPlayingDemo) {
//       const timer = setTimeout(() => {
//         setIsPlayingDemo(false)
//       }, 5000)
//       return () => clearTimeout(timer)
//     }
//   }, [isPlayingDemo])

//   const handleSkillSelect = (skill: string) => {
//     setSearchQuery(skill)
//     setShowDropdown(false)
//     onShowResults()
//   }

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       onShowResults()
//     }
//   }

//   const nextImage = () => {
//     setCurrentImageIndex((i) => (i + 1) % researcherImages.length)
//     setIsAutoRotating(false)
//     setTimeout(() => setIsAutoRotating(true), 10000)
//   }

//   const prevImage = () => {
//     setCurrentImageIndex((i) => (i - 1 + researcherImages.length) % researcherImages.length)
//     setIsAutoRotating(false)
//     setTimeout(() => setIsAutoRotating(true), 10000)
//   }

//   const scrollCarousel = (direction: 'left' | 'right') => {
//     if (carouselRef.current) {
//       const scrollAmount = 170
//       carouselRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       })
//     }
//   }

//   return (
//     <section className="relative py-6 sm:py-10 lg:py-14" style={{ overflow: 'visible' }}>
//       {/* Ultra Cool 3D Animated Background */}
//       <AnimatedBackground />

//       {/* Overlay gradient for better text readability */}
//       <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 pointer-events-none" />

//       {/* Animated Mesh Grid with Particles */}
//       <motion.div
//         className="absolute inset-0 opacity-[0.12]"
//         animate={{
//           backgroundPosition: ['0% 0%', '100% 100%'],
//           rotate: [0, 360]
//         }}
//         transition={{
//           duration: 30,
//           repeat: Infinity,
//           repeatType: 'reverse',
//           ease: 'linear'
//         }}
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
//             radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
//             linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
//             linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
//           `,
//           backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
//         }}
//       />

//       {/* Floating Animated Particles */}
//       {Array.from({ length: 20 }).map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
//           animate={{
//             y: [0, -30, 0],
//             x: [0, Math.sin(i) * 20, 0],
//             scale: [1, 1.5, 1]
//           }}
//           transition={{
//             duration: 3 + Math.random() * 2,
//             repeat: Infinity,
//             delay: i * 0.2
//           }}
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`
//           }}
//         />
//       ))}

//       {/* Floating Gradient Orbs with Glow */}
//       <motion.div
//         animate={{
//           y: [0, 60, 0],
//           x: [0, 40, 0],
//           scale: [1, 1.15, 1],
//           rotate: [0, 180, 360]
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: 'easeInOut'
//         }}
//         className="absolute -top-64 -left-64 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 via-cyan-300/20 to-transparent rounded-full blur-3xl"
//       />
//       <motion.div
//         animate={{
//           y: [0, -80, 0],
//           x: [0, -60, 0],
//           scale: [1, 1.2, 1],
//           rotate: [360, 180, 0]
//         }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: 'easeInOut',
//           delay: 1
//         }}
//         className="absolute top-1/3 -right-72 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-300/30 via-purple-300/25 to-transparent rounded-full blur-3xl"
//       />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* LEFT CONTENT - Enhanced */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.8,
//               type: 'spring',
//               stiffness: 100
//             }}
//             className="space-y-8 sm:space-y-10 text-center lg:text-left relative z-10"
//           >
//             {/* Premium Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 rounded-full border border-blue-100 shadow-sm"
//             >

//             </motion.div>

//             {/* Main Headline */}
//             <div className="space-y-3 sm:space-y-4">
//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight sm:leading-tight"
//               >
//                 Get the Perfect{' '}
//                 <span className="relative inline-block">
//                   <span className="relative z-10">Verified</span>
//                   <motion.div
//                   />
//                 </span>{' '}
//                 Researcher
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   AI-Matched to Your Project
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg sm:max-w-xl mx-auto lg:mx-0 leading-relaxed"
//               >
//                 Get the right expert ,support,matched by Ai for your exact project needs.
//                 <span className="block mt-1 sm:mt-2 text-blue-700 font-medium">
//                   Our AI, matches projects with perfect expertise instantly.
//                 </span>
//               </motion.p>
//             </div>


//             {/* Enhanced Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="relative max-w-xl mx-auto lg:mx-0"
//             >
//               <div className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setShowDropdown(true)}
//                     // placeholder="      What do you need...?"
//                     className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 pl-10 sm:pl-12 md:pl-14 pr-24 sm:pr-28 md:pr-32 text-sm sm:text-base text-gray-700 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 placeholder-gray-400"
//                   />
//                   <Search className="absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />

//                   {/* AI Assistant Badge */}
//                   <div className="absolute right-20 sm:right-24 md:right-28 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-blue-600 font-medium">
//                     <Zap className="w-3 h-3" />
//                     <span>AI Match</span>
//                   </div>

//                   <motion.button
//                     onClick={handleSearch}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="absolute right-1 top-0 bottom-0 my-auto h-fit bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl"
//                   >
//                     Search
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Trending Searches */}
//               <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
//                 <span className="text-xs text-gray-500 flex items-center gap-1">
//                   <TrendingUp size={22} /> Trending:-
//                 </span>
//                 {trendingSearches.map((search, index) => (
//                   <motion.button
//                     key={index}
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() => handleSkillSelect(search)}
//                     className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
//                   >
//                     {search}
//                   </motion.button>
//                 ))}
//               </div>

//               {/* Enhanced Dropdown */}
//               <AnimatePresence>
//                 {showDropdown && (
//                   <>
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="fixed inset-0 z-40"
//                       onClick={() => setShowDropdown(false)}
//                     />
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
//                     >
//                       {/* Sticky Header */}
//                       <div className="text-xs font-semibold text-gray-500 px-3 py-3 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
//                         POPULAR SKILLS
//                       </div>

//                       {/* Scrollable Content with increased height */}
//                       <div 
//                         className="overflow-y-scroll"
//                         style={{
//                           maxHeight: '400px',
//                           scrollbarWidth: 'thin',
//                           scrollbarColor: '#3b82f6 #f3f4f6'
//                         }}
//                       >
//                         <div className="p-2 space-y-1">
//                           {filteredSkills.map((skill, index) => (
//                             <button
//                               key={index}
//                               onClick={() => handleSkillSelect(skill)}
//                               className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg flex items-center gap-2 group"
//                             >
//                               <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//                                 <Award className="w-3 h-3 text-blue-600" />
//                               </div>
//                               {skill}
//                               <ArrowRight className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </button>
//                           ))}
//                           {/* Extra padding at bottom to ensure last item is fully visible */}
//                           <div className="h-4" />
//                         </div>
//                         {filteredSkills.length === 0 && (
//                           <div className="px-4 py-6 text-center">
//                             <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//                             <p className="text-gray-500">No skills found</p>
//                             <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   </>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Enhanced CTA Buttons with Demo */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               className="flex flex-col sm:flex-row items-center gap-3 pt-4 justify-center lg:justify-start flex-wrap"
//             >
//               <motion.button
//                 whileHover={{ y: -3, scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => onNavigate('signup')}
//                 className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-white shadow-xl text-sm sm:text-base"
//               >
//                 Join as Expert
//               </motion.button>

//               <motion.button
//                 whileHover={{ y: -3, scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => window.location.href = '/post-project'}
//                 className="group relative overflow-hidden rounded-full border-2 border-blue-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-blue-600 bg-white hover:bg-blue-50 text-sm sm:text-base"
//               >
//                 Post a Project
//               </motion.button>


//               <motion.button
//                 whileHover={{ y: -3, scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setIsPlayingDemo(true)}
//                 className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
//               >

//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT - Premium Researcher Showcase */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, x: 50 }}
//             animate={{ opacity: 1, scale: 1, x: 0 }}
//             transition={{
//               duration: 1,
//               type: 'spring',
//               stiffness: 80,
//               delay: 0.3
//             }}
//             className="relative hidden lg:block"
//           >
//             {/* Main Container */}
//             <div className="relative flex items-start gap-8">
//               {/* Navigation Arrows */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={prevImage}
//                 className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
//               >
//                 <ChevronLeft className="w-6 h-6 text-gray-700" />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={nextImage}
//                 className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-white transition-colors"
//               >
//                 <ChevronRight className="w-6 h-6 text-gray-700" />
//               </motion.button>

//               {/* Large Profile Image */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentImageIndex}
//                   initial={{ opacity: 0, x: -20, rotateY: -10 }}
//                   animate={{ opacity: 1, x: 0, rotateY: 0 }}
//                   exit={{ opacity: 0, x: 20, rotateY: 10 }}
//                   transition={{ duration: 0.7 }}
//                   className="relative"
//                 >
//                   <div className="relative w-[240px] h-[300px] group mt-32">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
//                     <motion.img
//                       src={researcherImages[currentImageIndex].src}
//                       alt={researcherImages[currentImageIndex].name}
//                       className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-white"
//                       initial={{ scale: 1.1 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.8 }}
//                       style={{
//                         maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
//                         WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
//                       }}
//                     />

//                     {/* Premium Badges */}
//                     <div className="absolute top-4 right-4 flex flex-col gap-2">
//                       <motion.div
//                         initial={{ scale: 0, rotate: -180 }}
//                         animate={{ scale: 1, rotate: 0 }}
//                         transition={{ delay: 0.4, type: 'spring' }}
//                         className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-2.5 shadow-2xl"
//                       >
//                         <CheckCircle className="text-white" size={20} />
//                       </motion.div>
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ delay: 0.6, type: 'spring' }}
//                         className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-2 shadow-2xl"
//                       >
//                         <Award className="text-white" size={16} />
//                       </motion.div>
//                     </div>

//                     {/* Performance Stats Overlay */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.8 }}
//                       className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 rounded-b-2xl"
//                     >
//                       <div className="grid grid-cols-3 gap-4 text-white">
//                         <div className="text-center">
//                           <div className="font-bold text-lg">{researcherImages[currentImageIndex].projects}</div>
//                           <div className="text-xs opacity-80">Projects</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="font-bold text-lg">{researcherImages[currentImageIndex].avgResponse}</div>
//                           <div className="text-xs opacity-80">Response</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="font-bold text-lg">{researcherImages[currentImageIndex].successRate}</div>
//                           <div className="text-xs opacity-80">Success</div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Animated Curved Connection Line */}
//               <motion.svg
//                 className="absolute left-[240px] top-[180px] z-10"
//                 width="80"
//                 height="100"
//                 viewBox="0 0 80 100"
//                 fill="none"
//               >
//                 <motion.path
//                   d="M 0 20 Q 40 30, 80 60"
//                   stroke="url(#gradient)"
//                   strokeWidth="2"
//                   strokeDasharray="5,5"
//                   fill="none"
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={{ pathLength: 1, opacity: 1 }}
//                   transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
//                 />
//                 <defs>
//                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
//                     <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
//                   </linearGradient>
//                 </defs>
//               </motion.svg>

//               {/* Enhanced Info Card */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentImageIndex}
//                   initial={{ opacity: 0, x: 20, scale: 0.95 }}
//                   animate={{ opacity: 1, x: 0, scale: 1 }}
//                   exit={{ opacity: 0, x: -20, scale: 0.95 }}
//                   transition={{ duration: 0.7 }}
//                   className="bg-white rounded-xl shadow-lg p-5 w-[250px] border border-gray-200 mt-40"
//                 >
//                   {/* Map with dot */}


//                   {/* Name */}
//                   <h3 className="font-bold text-lg text-blue-600 mb-3">
//                     {researcherImages[currentImageIndex].name}
//                   </h3>

//                   {/* Verified Expert */}
//                   <div className="flex items-start gap-2 mb-3">
//                     <CheckCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm text-gray-700 font-medium leading-tight">
//                         Verified Expert in {researcherImages[currentImageIndex].field}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Skills badge */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
//                       <CheckCircle size={12} className="text-gray-400" />
//                     </div>
//                     <span className="text-sm text-gray-600">
//                       {researcherImages[currentImageIndex].badges[0]}
//                     </span>
//                   </div>

//                   {/* Previously at */}
//                   <div className="pt-4 border-t border-gray-200">
//                     <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Previously at</p>
//                     <div className="flex items-center gap-2">
//                       <span className="text-2xl">{researcherImages[currentImageIndex].companyLogo}</span>
//                       <span className="font-bold text-gray-900">{researcherImages[currentImageIndex].company}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Enhanced Carousel with Navigation */}
//             <div className="mt-12 relative">
//               {/* Carousel Navigation */}
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-bold text-gray-900">Featured Researchers</h3>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => scrollCarousel('left')}
//                     className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button
//                     onClick={() => scrollCarousel('right')}
//                     className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>

//               {/* Carousel */}
//               <div className="relative">
//                 <div
//                   ref={carouselRef}
//                   className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
//                 >
//                   {researcherImages.map((researcher, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       whileHover={{ y: -6, scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex-shrink-0 w-40 bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 snap-center ${index === currentImageIndex
//                         ? 'border-blue-600 shadow-xl ring-2 ring-blue-500/20'
//                         : 'border-gray-100 hover:border-gray-300'
//                         }`}
//                     >
//                       {/* Status Indicator */}
//                       <div className="absolute top-3 right-3 z-10">
//                         <div className={`w-2 h-2 rounded-full ${index === 0 || index === 2 ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
//                       </div>

//                       <div className="relative h-28 overflow-hidden">
//                         <img
//                           src={researcher.src}
//                           alt={researcher.name}
//                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                       </div>

//                       <div className="p-2.5">
//                         <div className="flex items-start justify-between mb-1">
//                           <h4 className="font-bold text-xs text-gray-900 truncate">
//                             {researcher.name}
//                           </h4>
//                           <div className="flex items-center gap-0.5">
//                             <Star size={9} className="text-amber-500 fill-amber-500" />
//                             <span className="text-xs font-bold text-gray-700">
//                               {researcher.rating}
//                             </span>
//                           </div>
//                         </div>

//                         <p className="text-xs text-gray-600 truncate mb-2">
//                           {researcher.field}
//                         </p>

//                         <div className="flex items-center justify-between text-xs text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <MapPin size={9} />
//                             <span className="text-xs">{researcher.location.split(',')[0]}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users size={9} />
//                             <span className="text-xs">{researcher.projects}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>

//               {/* Progress Indicator */}
//               <div className="flex justify-center gap-1.5 mt-4">
//                 {researcherImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
//                       ? 'w-6 bg-gradient-to-r from-blue-600 to-indigo-600'
//                       : 'bg-gray-300 hover:bg-gray-400'
//                       }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Floating Call to Action */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.5 }}
//         className="relative max-w-4xl mx-auto mt-12 lg:mt-20 px-4"
//       >

//       </motion.div>
//     </section>
//   )
// }

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
    company: 'Google',
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
    src: '/images/Dr. David Chen.png',
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
    src: '/images/Dr. Sarah Johnson.png',
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
  const [currentExpertType, setCurrentExpertType] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const expertTypes = ['Scientists', 'Researchers', 'Consultants']

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
      2500 // Change every 2.5 seconds
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
    <section className="relative py-12 sm:py-10 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 min-h-fit lg:min-h-screen flex items-start lg:items-center overflow-hidden">
      {/* Ultra Cool 3D Animated Background */}
      <AnimatedBackground />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[52%_48%] gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 items-center relative">
          {/* Creative Gap Filler - Floating Stats & Particles - Hidden on tablets to prevent overlap */}
          {/* <div className="hidden xl:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"> */}
            {/* Animated Connecting Line */}
            {/* <motion.div
              className="absolute w-32 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/50 to-pink-500/30"
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1
              }}
            /> */}
            
            {/* Floating Particles */}
            {/* {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899'][i % 3]}, transparent)`,
                  left: `${(i % 4) * 30}px`,
                  top: `${Math.floor(i / 4) * 40 - 20}px`
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))} */}
            
            {/* Floating Stats Badge - AI Matching */}
            {/* <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-blue-100"
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-xs text-gray-500 font-medium">AI Matching</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">98% Success</div>
                </div>
              </div>
            </motion.div> */}
            
            {/* Floating Speed Badge - Rapid Support */}
            {/* <motion.div
              className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-3 border border-purple-100"
              animate={{
                y: [0, 10, 0],
                rotate: [2, -2, 2]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Rapid Support</div>
                  <div className="text-sm font-bold text-emerald-600">Within hours</div>
                </div>
              </div>
            </motion.div> */}
          {/* </div> */}
          {/* LEFT CONTENT - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100
            }}
            className="space-y-2 md:space-y-3 lg:space-y-4 text-center md:text-left relative z-10 w-full max-w-2xl mx-auto md:mx-0 px-2 xs:px-3 sm:px-4 md:px-0 pt-8 sm:pt-4 md:pt-0"
          >
            {/* Main Headline - Apple Style */}
            <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5 w-full pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[3.3rem] leading-[1.1] xs:text-[3.85rem] sm:text-[4.4rem] md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-center md:text-left"
              >
                <span className="block mb-1 sm:mb-1.5 md:mb-1.5">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Get World's</span>
                </span>
                <span className="block mb-1 sm:mb-1.5 md:mb-1.5">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
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
                <div className="mt-1 sm:mt-1.5 md:mt-1.5 min-h-[3.3rem] xs:min-h-[3.85rem] sm:min-h-[4.4rem] md:min-h-[2.75rem] lg:min-h-[3rem] xl:min-h-[3.5rem] flex items-center justify-center md:justify-start">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentExpertType}
                      initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-black text-[3.3rem] xs:text-[3.85rem] sm:text-[4.4rem] md:text-3xl lg:text-4xl xl:text-5xl"
                    >
                      {expertTypes[currentExpertType]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[1.375rem] xs:text-[1.65rem] sm:text-[2rem] md:text-base lg:text-lg leading-relaxed text-center md:text-left max-w-2xl mx-auto md:mx-0"
              >
                <span className="block text-gray-700 font-semibold mb-0.5 sm:mb-1 text-center md:text-left">
                  Get AI matched Experts for your exact needs,
                </span>
                <motion.div
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div className="inline-flex items-center gap-2 sm:gap-2 md:gap-3">
                    <motion.span
                      animate={{ 
                        rotate: [0, 180, 360],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      
                    </motion.span>
                    
                    <motion.span
                      className="font-black text-[1.65rem] xs:text-[2rem] sm:text-[2.5rem] md:text-lg lg:text-xl xl:text-2xl"
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
                    
                    <motion.span
                      animate={{ 
                        rotate: [0, 180, 360],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>


            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative w-full max-w-xl mx-auto md:mx-0 px-0 sm:px-1 md:px-0"
            >
              <div className="relative group w-full max-w-3xl mx-auto md:mx-0">
                {/* Animated Gradient Border Glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />

                {/* Inner Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Main Input Container */}
                  <div className="relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl overflow-hidden">
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3b82f6,transparent_50%),radial-gradient(circle_at_70%_80%,#8b5cf6,transparent_50%)]" />
                    </div>

                    {/* Input Wrapper */}
                    <div className="relative flex items-center px-2">
                      {/* Search Icon */}
                      <motion.div
                        className="pl-2 xs:pl-3 sm:pl-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500" />
                      </motion.div>

                      {/* Main Input */}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="What you're looking for..."
                        className="flex-1 px-1 xs:px-2 sm:px-3 md:px-4 py-2.5 xs:py-3 sm:py-3.5 md:py-4 pl-1 xs:pl-2 sm:pl-3 pr-1 xs:pr-2 sm:pr-4 text-[11px] xs:text-xs sm:text-sm md:text-base bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400 font-medium"
                      />

                      {/* AI Assistant Badge - Enhanced */}
                      <motion.div
                        className="hidden md:flex items-center gap-1 md:gap-1.5 lg:gap-2 px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 lg:py-1.5 mr-1 md:mr-2 lg:mr-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-300/30 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <div className="relative">
                          <motion.div
                            className="absolute -top-0.5 -right-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                          AI Match
                        </span>
                      </motion.div>

                      {/* Search Button - Enhanced */}
                      <motion.button
                        onClick={handleSearch}
                        whileHover={{
                          scale: 1.05,
                          rotate: [0, -5, 5, -5, 0]
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          background: [
                            "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                            "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                          ],
                        }}
                        transition={{
                          background: {
                            duration: 3,
                            repeat: Infinity,
                          },
                          rotate: {
                            duration: 0.5,
                          },
                        }}
                        className="relative mr-0.5 xs:mr-1 sm:mr-1.5 md:mr-2 px-2 xs:px-2.5 sm:px-3 md:px-4 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-white font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base shadow-xl hover:shadow-2xl overflow-hidden group/btn"
                      >
                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                        {/* Button Text */}
                        <span className="relative flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
                          <span>Search</span>
                          <motion.svg
                            className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
                        </span>

                        {/* Ripple Effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Searches */}
              <div className="mt-1.5 sm:mt-2 md:mt-2.5 flex flex-wrap gap-3.5 sm:gap-2 justify-center md:justify-start items-center">
                <span className="text-[1.1rem] sm:text-xs md:text-xs text-gray-500 flex items-center gap-1 sm:gap-1">
                  <TrendingUp size={24} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" /> Trending:
                </span>
                {trendingSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSkillSelect(search)}
                    className="text-[1.1rem] sm:text-xs bg-blue-50 text-blue-700 px-4.5 sm:px-2.5 md:px-3 py-2.5 sm:py-1.5 rounded-full hover:bg-blue-100 transition-colors whitespace-nowrap font-medium"
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
                      className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden mx-4 sm:mx-0"
                    >
                      {/* Sticky Header */}
                      <div className="text-xs font-semibold text-gray-500 px-3 py-3 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
                        POPULAR SKILLS
                      </div>

                      {/* Scrollable Content with increased height */}
                      <div
                        className="overflow-y-scroll"
                        style={{
                          maxHeight: '300px',
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
              className="flex flex-row items-center gap-2.5 xs:gap-3 sm:gap-3 pt-0 sm:pt-1 justify-center md:justify-start w-full"
            >
              <motion.button
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('signup')}
                className="flex-1 max-w-[200px] px-5.5 xs:px-6.5 sm:px-6 md:px-8 py-4 xs:py-4 sm:py-3 md:py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl font-bold transition-all shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 text-[0.95rem] xs:text-[1.1rem] sm:text-sm md:text-base whitespace-nowrap"
              >
                Join as Expert
              </motion.button>

              <motion.button
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/post-project'}
                className="flex-1 max-w-[200px] px-5.5 xs:px-6.5 sm:px-6 md:px-8 py-4 xs:py-4 sm:py-3 md:py-3.5 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-xl sm:rounded-2xl font-bold transition-all shadow-xl text-[0.95rem] xs:text-[1.1rem] sm:text-sm md:text-base whitespace-nowrap"
              >
                Post a Project
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
            className="relative hidden md:block"
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
                  <div className="relative w-[180px] md:w-[200px] lg:w-[230px] xl:w-[270px] h-[220px] md:h-[240px] lg:h-[280px] xl:h-[320px] group mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <motion.img
                      src={researcherImages[currentImageIndex].src}
                      alt={researcherImages[currentImageIndex].name}
                      className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-white"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                      }}
                    />

                    {/* Premium Badges */}
                    <div className="absolute top-1 right-1 md:right-2 flex flex-col gap-2 md:gap-3">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring' }}
                        className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-1.5 md:p-2 lg:p-2.5 shadow-2xl"
                      >
                        <CheckCircle className="text-white w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-1.5 md:p-2 shadow-2xl"
                      >
                        <Award className="text-white w-3 h-3 md:w-4 md:h-4" />
                      </motion.div>
                    </div>

                    {/* Performance Stats Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-1 md:p-1.5 rounded-b-2xl"
                    >
                      <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4 text-white">
                        <div className="text-center">
                          <div className="font-bold text-sm md:text-base lg:text-lg">{researcherImages[currentImageIndex].projects}</div>
                          <div className="text-[9px] md:text-[10px] lg:text-xs opacity-80">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm md:text-base lg:text-lg">{researcherImages[currentImageIndex].avgResponse}</div>
                          <div className="text-[9px] md:text-[10px] lg:text-xs opacity-80">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-sm md:text-base lg:text-lg">{researcherImages[currentImageIndex].successRate}</div>
                          <div className="text-[9px] md:text-[10px] lg:text-xs opacity-80">Success</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Animated Curved Connection Line */}
              <motion.svg
                className="absolute left-[165px] md:left-[185px] lg:left-[215px] xl:left-[255px] top-[100px] md:top-[110px] lg:top-[130px] xl:top-[160px] z-10"
                width="60"
                height="70"
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

              {/* Enhanced Info Card - Professional Version */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, scale: 0.95, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1], // Smooth easing curve
                    opacity: { duration: 0.5 }
                  }}
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-3 md:p-4 lg:p-5 xl:p-6 w-[180px] md:w-[200px] lg:w-[230px] xl:w-[260px] border border-gray-100/80 mt-28 md:mt-32 lg:mt-36 xl:mt-40 backdrop-blur-sm overflow-hidden group"
                >
                  {/* Map with dot */}


                  {/* Name */}
                  <h3 className="font-bold text-sm md:text-base lg:text-lg text-blue-600 mb-2 md:mb-3">
                    {researcherImages[currentImageIndex].name}
                  </h3>

                  {/* Verified Expert */}
                  <div className="flex items-start gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <CheckCircle size={14} className="text-blue-600 mt-0.5 flex-shrink-0 md:w-4 md:h-4" />
                    <div>
                      <p className="text-xs md:text-sm text-gray-700 font-medium leading-tight">
                        Verified Expert in {researcherImages[currentImageIndex].field}
                      </p>
                    </div>
                  </div>

                  {/* Skills badge */}
                  <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 border border-gray-400 rounded flex items-center justify-center">
                      <CheckCircle size={10} className="text-gray-400 md:w-3 md:h-3" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-600">
                      {researcherImages[currentImageIndex].badges[0]}
                    </span>
                  </div>

                  {/* Previously at */}
                  <div className="pt-3 md:pt-4 border-t border-gray-200">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide mb-1.5 md:mb-2">Previously at</p>
                    <div className="flex items-center gap-2">
                      {researcherImages[currentImageIndex].companyLogo}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Carousel with Navigation */}
            <div className="mt-12 relative">
              {/* Carousel Navigation */}
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-gray-900">Featured Researchers</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft size={15} />
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
                  className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
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

                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={researcher.src}
                          alt={researcher.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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