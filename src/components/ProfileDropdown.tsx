import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileDropdownProps {
  onViewProfile: () => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  onViewProfile,
  onLogout,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  const roleDisplay = user.role === 'client' ? 'Client' : 'Researcher';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Profile menu"
      >
        {user.profilePhoto ? (
          <img 
            src={user.profilePhoto} 
            alt={user.fullname}
            className="w-10 h-10 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {getInitials(user.fullname)}
          </div>
        )}
        <ChevronDown
          size={16}
          className={`text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed right-4 top-16 w-48 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 overflow-hidden z-[9999] animate-fadeIn">
            <div className="px-3 py-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                {user.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt={user.fullname}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user.fullname)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{user.fullname}</p>
                  <p className="text-xs text-gray-300">{roleDisplay}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  onViewProfile();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-2 text-gray-300 hover:text-cyan-400"
              >
                <User size={16} />
                <span className="font-medium text-sm">Profile</span>
              </button>

              <div className="border-t border-white/10 my-1"></div>

              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-red-500/20 transition-colors flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                <LogOut size={16} />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
