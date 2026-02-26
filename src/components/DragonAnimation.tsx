import { motion } from 'framer-motion';

export default function ResearchAnimation() {
  return (
    <div className="relative w-full h-80 flex items-end justify-center overflow-hidden bg-gradient-to-t from-blue-50/30 to-transparent rounded-2xl">
      {/* Animated research elements */}
      <motion.div
        initial={{ y: 300, opacity: 0, scale: 0.5 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="relative"
      >
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="drop-shadow-2xl"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="microscopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <radialGradient id="glowGrad">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Glow background */}
          <circle cx="150" cy="180" r="120" fill="url(#glowGrad)" />

          {/* Stack of Books - Base */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Book 1 - Bottom */}
            <rect x="80" y="220" width="140" height="20" rx="2" fill="#1e40af" filter="url(#shadow)" />
            <rect x="85" y="220" width="5" height="20" fill="#1e3a8a" />
            <path d="M 80 230 L 220 230" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
            
            {/* Book 2 */}
            <rect x="75" y="195" width="150" height="22" rx="2" fill="url(#bookGrad)" filter="url(#shadow)" />
            <rect x="80" y="195" width="5" height="22" fill="#1d4ed8" />
            <text x="150" y="210" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">RESEARCH</text>
            
            {/* Book 3 - Top */}
            <rect x="85" y="172" width="130" height="20" rx="2" fill="#2563eb" filter="url(#shadow)" />
            <rect x="90" y="172" width="5" height="20" fill="#1e40af" />
          </motion.g>

          {/* Microscope */}
          <motion.g
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
            }}
          >
            {/* Base */}
            <ellipse cx="60" cy="235" rx="25" ry="8" fill="#6d28d9" filter="url(#shadow)" />
            <rect x="50" y="215" width="20" height="20" fill="url(#microscopeGrad)" filter="url(#shadow)" />
            
            {/* Arm */}
            <motion.path
              d="M 60 215 L 60 180 L 75 165"
              stroke="url(#microscopeGrad)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 60 215 L 60 180 L 75 165",
                  "M 60 215 L 60 182 L 77 167",
                  "M 60 215 L 60 180 L 75 165",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Eyepiece */}
            <circle cx="75" cy="165" r="8" fill="#8b5cf6" filter="url(#shadow)" />
            <circle cx="75" cy="165" r="4" fill="#a78bfa" />
            
            {/* Lens glow */}
            <motion.circle
              cx="60"
              cy="225"
              r="8"
              fill="#60a5fa"
              opacity="0.6"
              animate={{
                r: [8, 12, 8],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          {/* DNA Helix */}
          <motion.g
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              delay: 0.7,
            }}
          >
            {/* DNA Strand 1 */}
            <motion.path
              d="M 230 240 Q 235 220, 230 200 Q 225 180, 230 160"
              stroke="url(#dnaGrad)"
              strokeWidth="4"
              fill="none"
              animate={{
                d: [
                  "M 230 240 Q 235 220, 230 200 Q 225 180, 230 160",
                  "M 230 240 Q 225 220, 230 200 Q 235 180, 230 160",
                  "M 230 240 Q 235 220, 230 200 Q 225 180, 230 160",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* DNA Strand 2 */}
            <motion.path
              d="M 250 240 Q 245 220, 250 200 Q 255 180, 250 160"
              stroke="url(#dnaGrad)"
              strokeWidth="4"
              fill="none"
              animate={{
                d: [
                  "M 250 240 Q 245 220, 250 200 Q 255 180, 250 160",
                  "M 250 240 Q 255 220, 250 200 Q 245 180, 250 160",
                  "M 250 240 Q 245 220, 250 200 Q 255 180, 250 160",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* DNA Connections */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.line
                key={i}
                x1="230"
                y1={160 + i * 16}
                x2="250"
                y2={160 + i * 16}
                stroke="#10b981"
                strokeWidth="2"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.g>

          {/* Graduation Cap */}
          <motion.g
            initial={{ y: -50, opacity: 0, rotate: -45 }}
            animate={{
              y: 0,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              duration: 1.5,
              delay: 1,
              ease: "backOut",
            }}
            style={{ transformOrigin: "150px 120px" }}
          >
            <motion.g
              animate={{
                y: [0, -5, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "150px 120px" }}
            >
              {/* Cap base */}
              <path
                d="M 120 120 L 150 110 L 180 120 L 150 130 Z"
                fill="#1e40af"
                filter="url(#shadow)"
              />
              {/* Cap top */}
              <rect x="130" y="105" width="40" height="8" rx="1" fill="#2563eb" filter="url(#shadow)" />
              {/* Tassel */}
              <motion.g
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "150px 105px" }}
              >
                <line x1="150" y1="105" x2="150" y2="125" stroke="#fbbf24" strokeWidth="2" />
                <circle cx="150" cy="128" r="4" fill="#fbbf24" />
              </motion.g>
            </motion.g>
          </motion.g>

          {/* Floating molecules/atoms */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + i * 25}
              cy={140 + (i % 3) * 15}
              r="3"
              fill={i % 2 === 0 ? "#60a5fa" : "#34d399"}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Knowledge sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.g
              key={i}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            >
              <path
                d={`M ${120 + i * 30} ${100 + (i % 2) * 40} l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z`}
                fill="#fbbf24"
              />
            </motion.g>
          ))}
        </motion.svg>
      </motion.div>

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? '4px' : '3px',
            height: i % 3 === 0 ? '4px' : '3px',
            background: i % 2 === 0 ? '#3b82f6' : '#10b981',
            left: `${15 + i * 8}%`,
            bottom: `${5 + (i % 4) * 12}%`,
          }}
          animate={{
            y: [0, -60, -120],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-56 h-6 bg-blue-900/10 rounded-full blur-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
