import { motion } from 'framer-motion';

export default function SuccessStoriesSection() {
  const stories = [
    {
      company: 'TechCorp',
      project: 'AI Model Development',
      result: '40% efficiency increase',
      quote: 'Xperthiring connected us with the perfect AI expert. Project delivered ahead of schedule!',
    },
    {
      company: 'BioMed Inc',
      project: 'Clinical Trial Analysis',
      result: '3 months saved',
      quote: 'Found a certified researcher who understood our complex requirements perfectly.',
    },
    {
      company: 'LogiChain',
      project: 'Supply Chain Optimization',
      result: '$2M cost reduction',
      quote: 'The expertise we found here transformed our entire logistics operation.',
    },
  ];

  return (
    <section className="relative py-28 bg-gradient-to-br from-[#f0f4ff] via-[#dbe7ff] to-[#c0d4ff] overflow-hidden">
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ backgroundPosition: '0 0' }}
        animate={{ backgroundPosition: '32px 32px' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(37,99,235,0.05), rgba(37,99,235,0.05) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.05) 1px, transparent 1px, transparent 32px)
          `
        }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
            Success Stories
            <span className="absolute left-0 -bottom-2 w-24 h-1 bg-blue-500 rounded-full"></span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4">
            Real results from real clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <motion.div
                className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-blue-200/30 blur-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              <div className="text-blue-600 font-bold text-xl mb-2">{story.company}</div>
              <div className="text-gray-900 font-semibold text-lg mb-2">{story.project}</div>
              <div className="text-green-600 font-bold text-2xl mb-4">{story.result}</div>
              <p className="text-gray-600 italic leading-relaxed">"{story.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
