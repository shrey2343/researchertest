import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Lightbulb, Microscope, Code, Briefcase, Tag, Sparkles, Zap, Star, Eye, Heart, Share2, Search, Beaker, Brain, Database, Dna, FileText, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Footer from '../../components/layout/Footer';

interface BlogPageProps {
  onNavigate: (page: 'home' | 'about' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard') => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen, color: 'blue' },
    { id: 'research-methods', name: 'Research Methods', icon: Microscope, color: 'purple' },
    { id: 'innovation', name: 'Innovation & Tech', icon: Lightbulb, color: 'yellow' },
    { id: 'career', name: 'Research Careers', icon: Briefcase, color: 'green' },
    { id: 'tools', name: 'Tools & Software', icon: Code, color: 'indigo' },
    { id: 'trends', name: 'Industry Trends', icon: TrendingUp, color: 'pink' }
  ];

  const featuredBlogs = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Academic Research in 2025',
      summary: 'Explore how artificial intelligence and machine learning are transforming research methodologies, data analysis, and scientific discovery across multiple disciplines.',
      category: 'Innovation & Tech',
      author: 'Dr. Sarah Chen',
      authorRole: 'AI Research Specialist',
      date: 'March 15, 2025',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['AI', 'Machine Learning', 'Research Innovation'],
      views: '12.5K',
      likes: '892',
      featured: true
    },
    {
      id: 2,
      title: 'The Complete Guide to Literature Reviews for PhD Researchers',
      summary: 'Master the art of conducting comprehensive literature reviews with proven strategies, tools, and frameworks used by successful doctoral candidates worldwide.',
      category: 'Research Methods',
      author: 'Prof. James Morrison',
      authorRole: 'Academic Research Consultant',
      date: 'March 12, 2025',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['PhD', 'Literature Review', 'Academic Writing'],
      views: '9.8K',
      likes: '654',
      featured: true
    },
    {
      id: 3,
      title: 'Building a Successful Career as a Freelance Research Consultant',
      summary: 'Learn how to transition from academia to freelance research consulting, including pricing strategies, client acquisition, and building your professional reputation.',
      category: 'Research Careers',
      author: 'Dr. Maria Rodriguez',
      authorRole: 'Freelance Research Strategist',
      date: 'March 10, 2025',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Freelancing', 'Career Development', 'Consulting'],
      views: '7.2K',
      likes: '521'
    },
    {
      id: 4,
      title: 'Top 10 Data Analysis Tools Every Researcher Should Know in 2025',
      summary: 'Discover the most powerful statistical analysis software, visualization tools, and platforms that are essential for modern quantitative and qualitative research.',
      category: 'Tools & Software',
      author: 'Dr. Michael Zhang',
      authorRole: 'Data Science Researcher',
      date: 'March 8, 2025',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Data Analysis', 'Software Tools', 'Statistics'],
      views: '15.3K',
      likes: '1.1K'
    },
    {
      id: 5,
      title: 'The Rise of Bioinformatics: Opportunities and Career Paths',
      summary: 'Understand the growing field of bioinformatics, from genomic sequencing to computational biology, and explore lucrative career opportunities in this interdisciplinary domain.',
      category: 'Industry Trends',
      author: 'Dr. Emily Watson',
      authorRole: 'Bioinformatics Specialist',
      date: 'March 5, 2025',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Bioinformatics', 'Genomics', 'Career Trends'],
      views: '6.9K',
      likes: '478'
    },
    {
      id: 6,
      title: 'Grant Writing Mastery: How to Secure Funding for Your Research',
      summary: 'Unlock the secrets to writing compelling grant proposals that win funding. Learn from experts who have secured millions in research grants across various disciplines.',
      category: 'Research Methods',
      author: 'Prof. David Kumar',
      authorRole: 'Grant Writing Expert',
      date: 'March 3, 2025',
      readTime: '14 min read',
      image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Grant Writing', 'Research Funding', 'Academic Writing'],
      views: '11.2K',
      likes: '823'
    }
  ];

  // Floating icons configuration - Increased for better coverage
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.2 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.18 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: FileText, color: 'text-indigo-400', size: 26, opacity: 0.2 },
    { Icon: FlaskConical, color: 'text-cyan-400', size: 30, opacity: 0.17 },
    { Icon: Atom, color: 'text-orange-400', size: 32, opacity: 0.16 },
    { Icon: Rocket, color: 'text-red-400', size: 28, opacity: 0.19 },
    { Icon: Target, color: 'text-yellow-400', size: 30, opacity: 0.15 },
    { Icon: Award, color: 'text-emerald-400', size: 26, opacity: 0.2 },
    { Icon: GraduationCap, color: 'text-violet-400', size: 32, opacity: 0.18 },
    { Icon: Globe, color: 'text-teal-400', size: 28, opacity: 0.16 },
    { Icon: Microscope, color: 'text-blue-500', size: 30, opacity: 0.17 },
    { Icon: Code, color: 'text-purple-500', size: 28, opacity: 0.19 },
    { Icon: Lightbulb, color: 'text-yellow-500', size: 32, opacity: 0.15 },
    { Icon: BookOpen, color: 'text-blue-600', size: 30, opacity: 0.18 },
    { Icon: Briefcase, color: 'text-gray-400', size: 28, opacity: 0.16 },
    { Icon: TrendingUp, color: 'text-green-500', size: 32, opacity: 0.17 },
    { Icon: Sparkles, color: 'text-pink-500', size: 26, opacity: 0.2 },
    { Icon: Zap, color: 'text-yellow-600', size: 30, opacity: 0.15 },
    { Icon: Star, color: 'text-amber-400', size: 28, opacity: 0.19 },
    { Icon: Heart, color: 'text-rose-400', size: 26, opacity: 0.16 },
    { Icon: Eye, color: 'text-indigo-500', size: 30, opacity: 0.18 },
    { Icon: Search, color: 'text-slate-400', size: 28, opacity: 0.17 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Icons Background - Covers Entire Page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const IconComponent = item.Icon;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{
                opacity: item.opacity,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                x: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                y: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <IconComponent size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-sm px-5 py-2.5 rounded-full text-blue-700 text-sm font-semibold mb-6 border border-blue-200 shadow-lg"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>Research Insights & Innovation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Xperthiring
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Knowledge Hub
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Expert insights, research methodologies, and industry trends from the world's leading research professionals
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
                <div className="relative flex items-center">
                  <Search className="absolute left-5 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics, or authors..."
                    className="w-full pl-14 pr-4 py-4 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 shadow-xl text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8"
            >
              {[
                { label: 'Articles', value: '500+', icon: BookOpen },
                { label: 'Expert Authors', value: '150+', icon: User },
                { label: 'Monthly Readers', value: '50K+', icon: Eye }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-white/60 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium transition-all shadow-md ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm sm:text-base">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Featured Articles</h2>
              <p className="text-base sm:text-lg text-gray-600">Handpicked by our editorial team</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={20} />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      {blog.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {blog.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star size={12} className="fill-yellow-900" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{blog.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{blog.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{blog.tags.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Author & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-white" size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{blog.author}</p>
                        <p className="text-xs text-gray-500 truncate">{blog.authorRole}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-blue-600 font-semibold text-sm"
                    >
                      Read
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
              className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
              >
                <Zap size={32} className="text-white" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want to Contribute?</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Share your research expertise with thousands of professionals. Write for Xperthiring and help shape the future of scientific collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('signup')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Become a Contributor
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Share2 size={20} />
                  Share Your Story
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white/60 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Write About</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Xperthiring Blog publishes authoritative, peer-reviewed content on topics that matter to the global research community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Research Methodologies',
                description: 'Qualitative and quantitative methods, experimental design, statistical analysis, systematic reviews, and best practices for rigorous research.',
                icon: Microscope,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Innovation & Technology',
                description: 'AI in research, machine learning applications, bioinformatics breakthroughs, data science tools, and emerging deep-tech trends.',
                icon: Lightbulb,
                color: 'from-yellow-500 to-orange-500'
              },
              {
                title: 'Academic & Career Growth',
                description: 'PhD guidance, post-doctoral opportunities, grant writing, publication strategies, career transitions, and freelance consulting.',
                icon: Briefcase,
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Industry Insights',
                description: 'Market trends, R&D partnerships, startup innovation, scientific entrepreneurship, and the business of research.',
                icon: TrendingUp,
                color: 'from-blue-500 to-indigo-500'
              }
            ].map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {topic.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
