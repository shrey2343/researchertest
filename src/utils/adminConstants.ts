import { Users, FolderOpen, DollarSign, AlertCircle } from 'lucide-react';

export const ADMIN_STATS = [
  { label: 'Total Users', value: '12,847', icon: Users, color: 'bg-[#2D6CDF]', change: '+12.5%', trend: 'up' as const },
  { label: 'Active Projects', value: '1,892', icon: FolderOpen, color: 'bg-green-500', change: '+8.2%', trend: 'up' as const },
  { label: 'Revenue (Month)', value: '₹142,581', icon: DollarSign, color: 'bg-purple-500', change: '+15.3%', trend: 'up' as const },
  { label: 'Pending Disputes', value: '23', icon: AlertCircle, color: 'bg-red-500', change: '-5.1%', trend: 'down' as const }
];

export const RECENT_USERS = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@university.edu', role: 'freelancer', verified: true, joined: '2 hours ago', status: 'active' },
  { id: 2, name: 'Michael Chen', email: 'mchen@researchcorp.com', role: 'client', verified: true, joined: '5 hours ago', status: 'active' },
  { id: 3, name: 'Dr. Emily Watson', email: 'ewatson@mit.edu', role: 'freelancer', verified: false, joined: '1 day ago', status: 'pending' },
  { id: 4, name: 'Robert Martinez', email: 'rmartinez@stanford.edu', role: 'client', verified: true, joined: '2 days ago', status: 'active' }
];

export const RECENT_PROJECTS = [
  { id: 1, title: 'Machine Learning Model Development', client: 'TechCorp Inc', freelancer: 'Dr. Sarah Johnson', amount: 5000, status: 'in-progress', date: '2024-01-15' },
  { id: 2, title: 'Statistical Analysis Research', client: 'University Labs', freelancer: 'Dr. Michael Smith', amount: 3500, status: 'completed', date: '2024-01-14' },
  { id: 3, title: 'Data Visualization Dashboard', client: 'Global Research', freelancer: null, amount: 4200, status: 'open', date: '2024-01-13' }
];

export const PENDING_VERIFICATIONS = [
  { id: 1, freelancer: 'DR', type: 'Academic', submittedDate: '2 days ago', documents: 3 },
  { id: 2, freelancer: 'JK', type: 'Professional', submittedDate: '5 days ago', documents: 5 },
  { id: 3, freelancer: 'SM', type: 'Academic', submittedDate: '1 week ago', documents: 4 }
];

export const ACTIVE_DISPUTES = [
  { id: 1, project: 'Data Analysis for Market Research', client: 'ABC Corp', freelancer: 'Dr. John Doe', amount: 3500, status: 'under review', date: '3 days ago' },
  { id: 2, project: 'Statistical Modeling Project', client: 'XYZ Research', freelancer: 'Dr. Jane Smith', amount: 5000, status: 'open', date: '1 week ago' }
];

export const SKILLS_DATABASE = [
  'Machine Learning',
  'Statistical Analysis',
  'Data Visualization',
  'Python Programming',
  'R Programming',
  'Natural Language Processing',
  'Deep Learning',
  'Time Series Analysis',
  'Data Mining',
  'Big Data Analytics'
];
