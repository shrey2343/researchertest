import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, refreshToken, shouldRefreshToken, isTokenExpired } from '../services/api';

interface User {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: 'client' | 'freelancer' | 'admin';
  profilePhoto?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      // Check if token is expired
      if (isTokenExpired()) {
        console.log('Token expired, clearing user session');
        setUser(null);
        setLoading(false);
        return;
      }

      // Check if token needs refresh (less than 1 day remaining)
      if (shouldRefreshToken()) {
        console.log('Token needs refresh, refreshing...');
        try {
          await refreshToken();
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Failed to refresh token:', error);
          // Continue to fetch user even if refresh fails
        }
      }

      const response = await getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    // Set up automatic token refresh check every 30 minutes
    const refreshInterval = setInterval(() => {
      if (shouldRefreshToken() && !isTokenExpired()) {
        console.log('Auto-refreshing token...');
        refreshToken()
          .then(() => console.log('Token auto-refreshed successfully'))
          .catch((error) => console.error('Failed to auto-refresh token:', error));
      }
    }, 30 * 60 * 1000); // Check every 30 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
