// import { motion } from 'framer-motion';

// export default function TrustedBySection() {
//   const companies = [
//     { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
//     { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
//     { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
//     { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
//     { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
//     { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
//     { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
//     { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
//   ];

//   const stats = [
//     '20,000+ projects successfully launched',

//     'Freelancers across 175+ countries',

//     '4.7★ average freelancer rating',

//     'Trusted by forward-thinking businesses',
//   ];

//   return (
//     <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
//       {/* Animated Background Pattern */}
//       <motion.div
//         className="absolute inset-0 opacity-[0.05]"
//         animate={{
//           backgroundPosition: ['0% 0%', '100% 100%'],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           repeatType: 'reverse',
//           ease: 'linear'
//         }}
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
//             linear-gradient(45deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
//           `,
//           backgroundSize: '100% 100%, 40px 40px'
//         }}
//       />

//       {/* Floating Orbs */}
//       <motion.div
//         animate={{
//           y: [0, 30, 0],
//           x: [0, 20, 0],
//           scale: [1, 1.1, 1]
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: 'easeInOut'
//         }}
//         className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-xl"
//       />
//       <motion.div
//         animate={{
//           y: [0, -40, 0],
//           x: [0, -30, 0],
//           scale: [1, 1.15, 1]
//         }}
//         transition={{
//           duration: 18,
//           repeat: Infinity,
//           ease: 'easeInOut',
//           delay: 2
//         }}
//         className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-bl from-indigo-300/20 to-transparent rounded-full blur-xl"
//       />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-8 sm:mb-12"
//         >
//           <p className="text-blue-600 text-base sm:text-lg font-semibold">Trusted by leading organizations worldwide</p>
//         </motion.div>

//         {/* Company Logos */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="mb-8 sm:mb-12"
//         >
//           <div className="flex items-center justify-center gap-8 sm:gap-15 md:gap-10 flex-wrap">
//             {companies.map((company, idx) => (
//               <motion.div
//                 key={idx}
//                 className="flex items-center justify-center group"
//                 whileHover={{ scale: 1.1, y: -2 }}
//               >
//                 <img
//                   src={company.logo}
//                   alt={company.name}
//                   className="h-6 sm:h-8 md:h-10 w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Stats Ticker */}
//       <div className="relative overflow-hidden h-12 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600">
//         <motion.div
//           className="flex gap-8 sm:gap-16 items-center whitespace-nowrap py-3 sm:py-4"
//           animate={{ x: ['0%', '-50%'] }}
//           transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
//         >
//           {[...stats, ...stats, ...stats].map((stat, idx) => (
//             <div key={idx} className="font-semibold text-white text-sm sm:text-base mx-4 sm:mx-8">
//               {stat}
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
