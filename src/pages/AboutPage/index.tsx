import { CheckCircle, Globe, Shield, Zap, ChevronRight } from 'lucide-react';
import Footer from '../../components/layout/Footer';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard') => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] min-h-screen">
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            About Xperthiring
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connecting Research Expertise with Real-World Innovation
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p>
              Xperthiring is a next-generation research services marketplace designed to bridge the gap between complex real-world projects and certified research experts from across the globe. Our platform enables clients to instantly find, hire, and collaborate with verified researchers across more than 200+ scientific, academic, and deep-tech domains. With AI-powered matching, Xperthiring ensures every project is connected to the right expert—saving time, reducing guesswork, and accelerating innovation.
            </p>

            <p>
              We are committed to transforming how research collaborations are initiated, managed, and delivered. Whether you are an academic, a startup founder, a PhD scholar, or a corporate R&D team, Xperthiring provides a trusted environment to outsource research tasks, receive expert-level insights, and complete breakthrough projects with confidence. Our ecosystem brings together certified researchers specializing in literature reviews, quantitative/qualitative analysis, machine learning models, clinical studies, scientific writing, bioinformatics, and more.
            </p>

            <p>
              Backed by a secure workflow, milestone-based project tracking, dispute resolution, and transparent communication systems, Xperthiring streamlines the entire research-to-delivery journey. Our mission is simple: to make world-class research expertise accessible, affordable, and instantly available to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose Xperthiring?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">200+ Research Domains</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Access verified experts across scientific, academic, and deep-tech fields worldwide. From bioinformatics to machine learning, clinical research to supply chain optimization—we connect you with specialists who understand your unique challenges.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Verified Researchers</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Work with certified professionals with proven academic credentials and expertise. Every researcher on our platform undergoes rigorous verification to ensure you're working with qualified experts who can deliver exceptional results.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Matching</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Get instantly matched to the right expert, saving time and accelerating innovation. Our intelligent system analyzes your project requirements and connects you with researchers who have the exact skills and experience you need.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Trusted</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Milestone tracking, dispute resolution, and complete confidentiality throughout. Your intellectual property is protected with anonymous collaboration options and secure communication channels designed specifically for sensitive research work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of researchers and clients transforming how research gets done. Whether you're looking to hire an expert or share your expertise, Xperthiring is your gateway to innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Join as a Researcher
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
              >
                Hire a Researcher
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
