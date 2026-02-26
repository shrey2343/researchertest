import { MessageCircle, Heart, Star, Zap, Sparkles, Coffee, Music, Smile, Sun, Moon, Award, BookOpen, Flame, Cloud, Rocket } from 'lucide-react';

interface ChatBackgroundProps {
  themeIndex: number;
}

const ChatBackground = ({ themeIndex }: ChatBackgroundProps) => {
  const themes = [
    {
      name: 'Thunder Energy',
      icons: [Zap, Flame, Rocket],
      emojis: ['⚡', '🔥', '💥', '⚡', '🚀'],
      color: 'text-yellow-400',
      bgPattern: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
    },
    {
      name: 'Academic Excellence',
      icons: [BookOpen, Award, Star],
      emojis: ['📚', '🎓', '📖', '🏆', '✨'],
      color: 'text-blue-500',
      bgPattern: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(37, 99, 235, 0.12) 0%, transparent 50%)',
    },
    {
      name: 'Romantic Connection',
      icons: [Heart, Sparkles, Smile],
      emojis: ['💖', '💕', '🌸', '💝', '✨'],
      color: 'text-pink-400',
      bgPattern: 'radial-gradient(circle at 40% 40%, rgba(244, 114, 182, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
    },
    {
      name: 'Brave Spirit',
      icons: [Award, Rocket, Flame],
      emojis: ['🦁', '💪', '🔱', '⚔️', '🛡️'],
      color: 'text-orange-500',
      bgPattern: 'radial-gradient(circle at 25% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(234, 88, 12, 0.15) 0%, transparent 50%)',
    },
    {
      name: 'Sky Dreams',
      icons: [Cloud, Star, Moon],
      emojis: ['☁️', '🌙', '⭐', '🌟', '✨'],
      color: 'text-cyan-400',
      bgPattern: 'radial-gradient(circle at 50% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)',
    },
  ];

  const currentTheme = themes[themeIndex];
  const positions = [
    { top: '5%', left: '3%', delay: '0s', size: 18 },
    { top: '15%', right: '5%', delay: '0.8s', size: 16 },
    { top: '10%', left: '15%', delay: '0.4s', size: 20, emoji: true },
    { top: '25%', left: '8%', delay: '1.6s', size: 18 },
    { top: '22%', right: '12%', delay: '1.2s', size: 20, emoji: true },
    { top: '35%', right: '18%', delay: '2.4s', size: 16 },
    { top: '40%', left: '6%', delay: '2s', size: 18, emoji: true },
    { top: '50%', left: '20%', delay: '3.2s', size: 20 },
    { top: '48%', right: '8%', delay: '2.8s', size: 18, emoji: true },
    { top: '60%', right: '25%', delay: '3.6s', size: 16 },
    { top: '58%', left: '25%', delay: '1.4s', size: 20, emoji: true },
    { top: '70%', right: '15%', delay: '1.8s', size: 18 },
    { top: '75%', left: '10%', delay: '4s', size: 16, emoji: true },
    { top: '68%', right: '4%', delay: '0.6s', size: 20 },
    { top: '82%', left: '18%', delay: '2.2s', size: 18, emoji: true },
    { top: '85%', right: '20%', delay: '3.4s', size: 16 },
    { top: '92%', left: '8%', delay: '4.2s', size: 20, emoji: true },
    { top: '95%', right: '10%', delay: '4.8s', size: 18 },
  ];

  return (
    <>
      {/* Animated Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: currentTheme.bgPattern }}
      />
      
      {/* Floating Icons/Emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {positions.map((pos, index) => {
          const isEmoji = pos.emoji;
          const Icon = currentTheme.icons[index % currentTheme.icons.length];
          const emoji = currentTheme.emojis[index % currentTheme.emojis.length];

          return (
            <div
              key={`${themeIndex}-${index}`}
              className="absolute animate-float-slow"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                animationDelay: pos.delay,
                opacity: 0.35,
              }}
            >
              {isEmoji ? (
                <span 
                  className="drop-shadow-lg"
                  style={{ 
                    fontSize: `${pos.size}px`, 
                    display: 'block', 
                    lineHeight: 1,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {emoji}
                </span>
              ) : (
                <Icon size={pos.size} className={currentTheme.color} strokeWidth={2} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatBackground;
