import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, CheckCircle } from 'lucide-react';

export default function SocialResearchService() {
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
                  <Users size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Social Research</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={20} fill="currentColor" />
                      <span className="font-semibold text-gray-700">4.6</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">900+ projects completed</span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Market & social studies to understand human behavior and social trends.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our social research experts conduct comprehensive studies on human behavior, social trends, and market dynamics. From surveys to ethnographic research, we provide insights into social phenomena.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl text-center min-w-[200px]">
              <div className="text-sm opacity-90 mb-2">Starting from</div>
              <div className="text-3xl font-bold mb-4">$35/hr</div>
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
              title: 'Market Research',
              description: 'Consumer behavior and market trend analysis',
              price: '$40-70/hr',
              features: ['Consumer Surveys', 'Market Analysis', 'Trend Identification']
            },
            {
              title: 'Social Surveys',
              description: 'Large-scale social and demographic studies',
              price: '$30-55/hr',
              features: ['Survey Design', 'Data Collection', 'Statistical Analysis']
            },
            {
              title: 'Ethnographic Research',
              description: 'Qualitative research on cultural and social practices',
              price: '$50-90/hr',
              features: ['Field Research', 'Cultural Analysis', 'Participant Observation']
            },
            {
              title: 'Policy Research',
              description: 'Research for public policy and social programs',
              price: '$45-80/hr',
              features: ['Policy Analysis', 'Impact Assessment', 'Stakeholder Research']
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
          <h3 className="text-3xl font-bold mb-4">Ready to Understand Social Dynamics?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Connect with social research experts and gain insights into human behavior and social trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors">
              Post Social Research Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Browse Social Researchers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}