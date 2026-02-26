export type PageType = 'home' | 'about' | 'blog' | 'pricing' | 'login' | 'signup' | 'bidding' | 'messaging' | 'escrow' | 'verification' | 'client-dashboard' | 'admin-dashboard';
export type UserRole = 'client' | 'freelancer' | 'admin' | null;

// Backend API role types (now matches frontend)
export type BackendRole = 'client' | 'freelancer';

// Helper function to convert backend roles to frontend roles (now same)
export const mapRoleToFrontend = (backendRole: BackendRole): 'client' | 'freelancer' => {
  return backendRole; // No conversion needed anymore
};

// Helper function to convert frontend roles to backend roles (now same)
export const mapRoleToBackend = (frontendRole: 'client' | 'freelancer'): BackendRole => {
  return frontendRole; // No conversion needed anymore
};

export interface Freelancer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  verified: boolean;
  certified: boolean;
  skills: string[];
  expertise: string;
  degree: string;
  country: string;
  rate: string;
  projects: number;
  responseTime: string;
  categories: string[];
}

export interface PlatformStat {
  value: string;
  label: string;
  icon: any;
}

export interface SuccessStory {
  title: string;
  industry: string;
  client: string;
  researcher: string;
  duration: string;
  cost: string;
  result: string;
}

export interface Testimonial {
  name: string;
  role: string;
  organization: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface Step {
  step: string;
  icon: any;
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: any;
  title: string;
  desc: string;
}
