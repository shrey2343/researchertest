import { useState, useEffect } from 'react';
import { User, CheckCircle, AlertCircle } from 'lucide-react';
import ProfileCompletion from './components/ProfileCompletion';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../services/config';
import ClientDashboard from './Client';
import FreelancerDashboard from './Freelancer';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'freelancer') {
      checkProfileStatus();
    } else {
      setLoading(false);
    }
  }, [user?.role]);

  const checkProfileStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/researcher-profile`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setProfileCompleted(data.profileCompleted || false);
      }
    } catch (error) {
      console.error('Error checking profile status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = async (profileData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/researcher-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      
      if (data.success) {
        setProfileCompleted(true);
        toast.success('Profile completed successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D6CDF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show profile completion for new researchers
  if (user?.role === 'freelancer' && !profileCompleted) {
    return <ProfileCompletion onComplete={handleProfileComplete} userInfo={user} />;
  }

  // Route to appropriate dashboard
  if (user?.role === 'client') {
    return <ClientDashboard />;
  } else {
    return <FreelancerDashboard />;
  }
}