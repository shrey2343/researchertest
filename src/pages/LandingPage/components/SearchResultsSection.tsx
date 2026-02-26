import { CheckCircle, Award, Star, X, Clock, Shield, ChevronRight } from 'lucide-react';
import type { Freelancer } from '../../../types';

interface SearchResultsSectionProps {
  filteredFreelancers: Freelancer[];
  selectedCategory: string;
  onClearSearch: () => void;
  onClearCategory: () => void;
}

export default function SearchResultsSection({
  filteredFreelancers,
  selectedCategory,
  onClearSearch,
  onClearCategory
}: SearchResultsSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F] mb-2">
                {selectedCategory ? `${selectedCategory} Experts` : 'Search Results'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Found {filteredFreelancers.length} expert{filteredFreelancers.length !== 1 ? 's' : ''} matching your criteria
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Clear Search button clicked');
                onClearSearch();
              }}
              className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-[#2D6CDF] transition-colors cursor-pointer z-10 relative"
              type="button"
            >
              <X size={20} />
              <span>Clear Search</span>
            </button>
          </div>

          {selectedCategory && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <span className="inline-flex items-center gap-2 bg-[#2D6CDF] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold">
                {selectedCategory}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Clear Category button clicked');
                    onClearCategory();
                  }}
                  className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </span>
            </div>
          )}

          <div className="grid gap-4 sm:gap-6">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold flex-shrink-0">
                      {freelancer.name}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base sm:text-lg text-[#1F1F1F] truncate">Researcher {freelancer.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{freelancer.expertise}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {freelancer.verified && (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        <CheckCircle size={12} />
                        <span>Verified</span>
                      </span>
                    )}
                    {freelancer.certified && (
                      <span className="inline-flex items-center gap-1 bg-[#2D6CDF]/10 text-[#2D6CDF] px-2 py-1 rounded text-xs font-semibold">
                        <Award size={12} />
                        <span>Certified</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Degree:</span>
                      <span className="font-semibold text-[#1F1F1F] text-right">{freelancer.degree}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold text-[#1F1F1F]">{freelancer.country}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-semibold text-[#2D6CDF]">{freelancer.rate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 flex-wrap">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="ml-1 font-bold text-[#1F1F1F]">{freelancer.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({freelancer.reviews} reviews)</span>
                    <span className="text-gray-500 text-xs">• {freelancer.projects} projects</span>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {freelancer.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="bg-[#F5F7FA] text-[#1F1F1F] px-2 py-1 rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                    <Clock size={14} className="flex-shrink-0" />
                    <span>Responds in {freelancer.responseTime}</span>
                  </div>

                  <button className="w-full bg-[#2D6CDF] text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#1F1F1F] transition-all">
                    View Profile & Hire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFreelancers.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1F1F] mb-2">No experts found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Clear Filters button clicked');
                  onClearSearch();
                }}
                className="bg-[#2D6CDF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all cursor-pointer z-10 relative"
                type="button"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F1F1F]">Confidentiality Assured</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              We take several measures to help you work with full confidence and peace of mind.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <ChevronRight className="text-[#2D6CDF] flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-[#1F1F1F] text-sm mb-1">Keep your project private</h4>
                    <p className="text-xs text-gray-600">Restrict who can see your project and send you proposals. Invite only specific freelancers to view your project.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2 mb-2">
                  <ChevronRight className="text-[#2D6CDF] flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-[#1F1F1F] text-sm mb-1">NDAs and IP protection</h4>
                    <p className="text-xs text-gray-600">Our T&C include a default confidentiality clause that protects your IP and NDA for added protection before sharing details.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <ChevronRight className="text-[#2D6CDF] flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-[#1F1F1F] text-sm mb-1">Secure communication</h4>
                    <p className="text-xs text-gray-600">All messages and files are encrypted and stored securely. Anonymous identities protect your privacy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
