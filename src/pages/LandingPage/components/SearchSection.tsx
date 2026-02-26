import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { SEARCH_SUGGESTIONS, POPULAR_KEYWORDS } from '../../../utils/constants';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function SearchSection({ searchQuery, setSearchQuery, onSearch }: SearchSectionProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
      <motion.div 
        className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="p-2 sm:p-3">
          <div className="relative">
            <Search className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search by expertise, domain..."
              className="w-full pl-10 sm:pl-16 pr-20 sm:pr-36 py-3 sm:py-5 bg-white border-2 border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base md:text-lg placeholder:text-slate-400"
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
            <motion.button
              onClick={onSearch}
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-1 sm:gap-2 shadow-lg"
              whileHover={{ backgroundColor: '#1e40af' }}
            >
              <span>Search</span>
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </motion.button>
            <AnimatePresence>
              {showSuggestions && searchQuery && (
                <motion.div 
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 sm:max-h-80 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                {SEARCH_SUGGESTIONS
                  .filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                        onSearch();
                      }}
                      className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 flex items-center gap-2 sm:gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <Search size={16} className="text-slate-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{suggestion}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="px-3 sm:px-6 py-3 sm:py-4 bg-slate-50/80 border-t border-slate-200/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap">Popular:</span>
            {POPULAR_KEYWORDS.map((keyword, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setSearchQuery(keyword);
                  onSearch();
                }}
                className="px-2 sm:px-4 py-1 sm:py-2 bg-white text-slate-700 rounded-lg text-xs sm:text-sm font-medium transition-all border border-slate-200 shadow-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#EFF6FF',
                  color: '#1E40AF',
                  borderColor: '#93C5FD'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                {keyword}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
