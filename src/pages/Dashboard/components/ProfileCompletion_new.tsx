// This file contains the updated background with blue theme
// Replace the background section in ProfileCompletion.tsx starting from line 383

// Background section to replace:
      {/* Animated Background Elements - Professional Blue Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-10 left-5 w-[550px] h-[550px] bg-gradient-to-br from-blue-500/22 to-indigo-500/22 rounded-full blur-3xl animate-float" style={{ animationDuration: '25s' }}></div>
        <div className="absolute top-20 right-10 w-[650px] h-[650px] bg-gradient-to-br from-indigo-600/20 to-blue-700/20 rounded-full blur-3xl animate-float" style={{ animationDuration: '30s', animationDelay: '3s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/18 to-indigo-600/18 rounded-full blur-3xl animate-float" style={{ animationDuration: '35s', animationDelay: '5s' }}></div>
        
        {/* Professional Animated Shapes */}
        <div className="absolute top-[15%] right-[8%] w-80 h-80 border-2 border-blue-400/22 rounded-full animate-spin-slow" style={{ animationDuration: '40s' }}></div>
        <div className="absolute bottom-[20%] left-[10%] w-64 h-64 border-2 border-indigo-400/22 rounded-full animate-spin-slow" style={{ animationDuration: '45s', animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[12%] w-56 h-56 border border-blue-300/18 rounded-2xl rotate-45 animate-spin-slow" style={{ animationDuration: '50s' }}></div>
        <div className="absolute bottom-[35%] right-[15%] w-72 h-72 border border-indigo-300/18 rounded-2xl -rotate-12 animate-spin-slow" style={{ animationDuration: '55s', animationDelay: '4s' }}></div>
        
        {/* Animated Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <line x1="70%" y1="30%" x2="85%" y2="50%" stroke="#6366f1" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <line x1="20%" y1="70%" x2="40%" y2="85%" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />
          <line x1="60%" y1="15%" x2="75%" y2="25%" stroke="#6366f1" strokeWidth="1.5" className="animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />
        </svg>
        
        {/* Professional Icons with Animation */}
        <div className="absolute top-[18%] right-[10%] opacity-[0.11] animate-float" style={{ animationDuration: '20s' }}>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="25" width="70" height="60" rx="5" stroke="#3b82f6" strokeWidth="2.5" />
            <line x1="32" y1="40" x2="78" y2="40" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="52" x2="65" y2="52" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="64" x2="72" y2="64" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            <circle cx="85" cy="30" r="10" stroke="#3b82f6" strokeWidth="2.5" />
            <path d="M82 30L84 32L88 28" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute bottom-[28%] left-[6%] opacity-[0.11] animate-float" style={{ animationDuration: '22s', animationDelay: '2s' }}>
          <svg width="105" height="105" viewBox="0 0 105 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="52.5" cy="35" r="15" stroke="#6366f1" strokeWidth="2.5" />
            <path d="M52.5 50C42 50 30 55 30 62V75H75V62C75 55 63 50 52.5 50Z" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="52.5" cy="52.5" r="35" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute top-[52%] right-[5%] opacity-[0.11] animate-float" style={{ animationDuration: '24s', animationDelay: '1s' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="35" stroke="#3b82f6" strokeWidth="2.5" />
            <path d="M50 25V50L70 65" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="#3b82f6" />
          </svg>
        </div>
        <div className="absolute top-[65%] left-[22%] opacity-[0.11] animate-float" style={{ animationDuration: '26s', animationDelay: '3s' }}>
          <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="45" height="40" rx="4" stroke="#6366f1" strokeWidth="2.5" />
            <path d="M47.5 30V20M47.5 20L42 25M47.5 20L53 25" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="33" y1="42" x2="62" y2="42" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            <line x1="33" y1="52" x2="57" y2="52" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            <line x1="33" y1="62" x2="60" y2="62" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute bottom-[45%] right-[20%] opacity-[0.11] animate-float" style={{ animationDuration: '28s', animationDelay: '4s' }}>
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="45" cy="45" r="30" stroke="#3b82f6" strokeWidth="2.5" />
            <circle cx="45" cy="35" r="8" stroke="#3b82f6" strokeWidth="2" />
            <path d="M30 60C30 52 36 48 45 48C54 48 60 52 60 60" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Animated Dots Network */}
        <div className="absolute top-[25%] left-[18%] w-3 h-3 bg-blue-500/38 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[35%] right-[22%] w-3 h-3 bg-indigo-500/38 rounded-full animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[38%] left-[28%] w-3 h-3 bg-blue-500/38 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-[58%] right-[18%] w-3 h-3 bg-indigo-500/38 rounded-full animate-pulse" style={{ animationDuration: '3.8s', animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-[25%] left-[35%] w-3 h-3 bg-blue-400/38 rounded-full animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '2s' }}></div>
        <div className="absolute top-[45%] left-[8%] w-3 h-3 bg-indigo-400/38 rounded-full animate-pulse" style={{ animationDuration: '3.3s', animationDelay: '0.8s' }}></div>
        
        {/* Subtle Animated Waves */}
        <div className="absolute top-[12%] left-0 w-full h-[220px] bg-gradient-to-r from-transparent via-blue-300/12 to-transparent transform -skew-y-3 animate-wave" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-[15%] right-0 w-full h-[200px] bg-gradient-to-r from-transparent via-indigo-300/12 to-transparent transform skew-y-3 animate-wave" style={{ animationDuration: '25s', animationDelay: '3s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
      </div>

// Also update:
// 1. Line 383: Change background from "from-indigo-50 via-purple-50 to-pink-50" to "from-blue-50 via-slate-50 to-indigo-50"
// 2. Line 395: Change max-w-5xl to max-w-6xl
// 3. Line 398: Remove animate-pulse from header icon
// 4. Line 398: Change gradient from "from-indigo-600 via-purple-600 to-pink-600" to "from-blue-600 via-indigo-600 to-blue-700"
// 5. Line 401: Change gradient from "from-indigo-600 via-purple-600 to-pink-600" to "from-blue-600 via-indigo-600 to-blue-700"
// 6. Line 408: Change Sparkles color from "text-purple-600" to "text-blue-600"
// 7. Line 411: Change gradient from "from-indigo-600 to-purple-600" to "from-blue-600 to-indigo-600"
// 8. Line 419: Change bg-purple-500 to bg-blue-500
// 9. Line 1119: Change submit button gradient from "from-indigo-600 via-purple-600 to-pink-600" to "from-blue-600 via-indigo-600 to-blue-700"
