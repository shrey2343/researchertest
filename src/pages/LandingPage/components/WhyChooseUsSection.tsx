

import { Shield, CreditCard, Headphones, Award, Zap, Globe, User, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUsSection() {
  const features = [
    { icon: Shield, title: 'Smart AI Matching', description: 'Get connected to the right scientist or expert based on your exact project needs — no guesswork.' },
    { icon: Globe, title: 'Global Talent Pool', description: 'Work with scientists, researchers, and consultants from across the world, without borders' },
    { icon: CreditCard, title: 'Secure Payments', description: 'Your payment stays protected and is released only when you’re satisfied with the work.' },

    { icon: Award, title: 'Quality Assurance', description: 'Collaborate with experienced professionals and get reliable, high-quality outcomes.' },
    {icon: User ,title: 'On-Demand Expertise',description: 'Hire experts for short consultations or long-term projects, on your terms.'
    },
    {
    icon: Layers,
    title: 'One Platform, Many Disciplines',
    description: 'Scientists, researchers, and consultants — all in one seamless ecosystem.'
  }

  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#eef6ff] via-[#dbe9ff] to-[#c0d4ff]">
      {/* Background soft gradients & shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.05)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The best platform for research collaboration
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
              >
                {/* Card glowing shape */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200/30 via-cyan-200/30 to-blue-200/30 rounded-2xl pointer-events-none"
                  animate={{ opacity: [0, 0.25, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />

                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 relative z-10 shadow-md">
                  <Icon size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-700 relative z-10">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
