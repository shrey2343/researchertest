import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Star, CheckCircle } from 'lucide-react';

export default function TranslationService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Hero Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 sm:p-12 mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Globe size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Translation</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={20} fill="currentColor" />
                      <span className="font-semibold text-gray-700">4.8</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">2,200+ projects completed</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Professional localization services for global communication.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our translation experts provide accurate and culturally appropriate translations across multiple languages. From documents to websites, we ensure your message resonates with global audiences.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl text-center min-w-[200px]">
              <div className="text-sm opacity-90 mb-2">Starting from</div>
              <div className="text-3xl font-bold mb-4">$25/hr</div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors w-full mb-3">
                Post Project
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors w-full">
                Browse Experts
              </button>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Document Translation',
              description: 'Professional translation of business and legal documents',
              price: '$25-50/hr',
              features: ['Legal Documents', 'Business Reports', 'Academic Papers']
            },
            {
              title: 'Website Localization',
              description: 'Complete website translation and cultural adaptation',
              price: '$30-60/hr',
              features: ['Website Translation', 'Cultural Adaptation', 'SEO Optimization']
            },
            {
              title: 'Technical Translation',
              description: 'Specialized translation for technical and scientific content',
              price: '$40-80/hr',
              features: ['Technical Manuals', 'Scientific Papers', 'Software Localization']
            },
            {
              title: 'Certified Translation',
              description: 'Official certified translations for legal purposes',
              price: '$35-70/hr',
              features: ['Legal Certification', 'Official Documents', 'Notarized Translation']
            }
          ].map((category, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="text-blue-600 font-semibold mb-4">{category.price}</div>
              <div className="space-y-2">
                {category.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Go Global?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Connect with professional translators and expand your reach to international markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors">
              Post Translation Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Browse Translators
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}