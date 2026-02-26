import { CheckCircle, Shield, Sparkles, Lock, FileText, Users, Award, Globe, TrendingUp, Briefcase, GraduationCap, Zap, HeartHandshake, Target } from 'lucide-react';
import type { PlatformStat, Freelancer, SuccessStory, Testimonial, Step, WhyUsItem } from '../types';

export const SEARCH_SUGGESTIONS = [
  'Software Engineering', 'Statistics', 'Supply Chain', 'Sustainability',
  'SPSS', 'Structural Engineering', 'Signal Processing', 'Sentiment Analysis'
];

export const PLATFORM_STATS: PlatformStat[] = [
  { value: '200+', label: 'Research Domains', icon: Globe },
  { value: '20,000+', label: 'Verified Researchers', icon: Users },
  { value: '15,000+', label: 'Projects Completed', icon: CheckCircle },
  { value: '10%', label: 'Platform Commission', icon: TrendingUp }
];

export const TRUSTED_BY = [
  'Universities',
  'Deep-Tech Startups',
  'Enterprises',
  'Research Labs',
  'Innovators',
  'R&D Teams'
];

export const CATEGORIES = [
  'R&D Projects',
  'Thesis & Publications',
  'Data Analysis',
  'Literature Review',
  'Consulting',
  'Prototyping',
  'Proof-of-Concept',
  'Research Competitions',
  'Innovation Challenges',
  'Experimental Design'
];

export const RESEARCH_DOMAINS = [
  'Science & Engineering',
  'Healthcare & Medicine',
  'Artificial Intelligence',
  'Supply Chain',
  'Sustainability',
  'Business Research',
  'Deep-Tech',
  'Biotechnology'
];

export const ALL_FREELANCERS: Freelancer[] = [
  {
    id: 'RM',
    name: 'RM',
    rating: 4.9,
    reviews: 127,
    verified: true,
    certified: true,
    skills: ['AI Research', 'Machine Learning', 'Deep Learning', 'NLP'],
    expertise: 'Artificial Intelligence',
    degree: 'PhD Computer Science',
    country: 'United States',
    rate: '$95/hr',
    projects: 247,
    responseTime: '2 hours',
    categories: ['R&D Projects', 'Consulting', 'Proof-of-Concept']
  },
  {
    id: 'SJ',
    name: 'SJ',
    rating: 5.0,
    reviews: 89,
    verified: true,
    certified: true,
    skills: ['Clinical Research', 'Healthcare Analytics', 'Medical Writing'],
    expertise: 'Healthcare Research',
    degree: 'MD, PhD',
    country: 'United Kingdom',
    rate: '$110/hr',
    projects: 168,
    responseTime: '1 hour',
    categories: ['Thesis & Publications', 'Data Analysis', 'Literature Review']
  },
  {
    id: 'AD',
    name: 'AD',
    rating: 4.8,
    reviews: 103,
    verified: true,
    certified: true,
    skills: ['Supply Chain Optimization', 'Operations Research', 'Analytics'],
    expertise: 'Supply Chain & Operations',
    degree: 'PhD Industrial Engineering',
    country: 'Germany',
    rate: '$85/hr',
    projects: 192,
    responseTime: '3 hours',
    categories: ['R&D Projects', 'Consulting', 'Data Analysis']
  },
  {
    id: 'TJ',
    name: 'TJ',
    rating: 4.9,
    reviews: 145,
    verified: true,
    certified: true,
    skills: ['Renewable Energy', 'Environmental Science', 'Carbon Analysis'],
    expertise: 'Sustainability Research',
    degree: 'PhD Environmental Engineering',
    country: 'Netherlands',
    rate: '$90/hr',
    projects: 312,
    responseTime: '2 hours',
    categories: ['R&D Projects', 'Literature Review', 'Consulting']
  },
  {
    id: 'MK',
    name: 'MK',
    rating: 4.7,
    reviews: 98,
    verified: true,
    certified: true,
    skills: ['Biotechnology', 'Genetic Engineering', 'CRISPR'],
    expertise: 'Biotech Research',
    degree: 'PhD Biotechnology',
    country: 'Singapore',
    rate: '$100/hr',
    projects: 203,
    responseTime: '4 hours',
    categories: ['R&D Projects', 'Experimental Design', 'Prototyping']
  },
  {
    id: 'LC',
    name: 'LC',
    rating: 5.0,
    reviews: 76,
    verified: true,
    certified: true,
    skills: ['Market Research', 'Business Analytics', 'Strategic Analysis'],
    expertise: 'Business Research',
    degree: 'PhD Business Administration',
    country: 'Canada',
    rate: '$80/hr',
    projects: 156,
    responseTime: '1 hour',
    categories: ['Consulting', 'Data Analysis', 'Research Competitions']
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    title: 'AI Prototype Development',
    industry: 'Deep-Tech Startup',
    client: 'Tech Innovators Inc',
    researcher: 'PhD AI Researcher',
    duration: '21 days',
    cost: '$2,950',
    result: 'Built prototype 3x faster than traditional hiring. Successfully demonstrated proof-of-concept to investors and secured Series A funding.'
  },
  {
    title: 'Sustainability Impact Analysis',
    industry: 'Enterprise',
    client: 'Global Manufacturing Corp',
    researcher: 'PhD Environmental Scientist',
    duration: '28 days',
    cost: '$3,200',
    result: 'Comprehensive carbon footprint analysis leading to 40% reduction strategy and ESG compliance certification.'
  },
  {
    title: 'Drug Discovery Literature Review',
    industry: 'Healthcare',
    client: 'Biotech Research Lab',
    researcher: 'MD, PhD Clinical Research',
    duration: '18 days',
    cost: '$1,800',
    result: 'Systematic review of 300+ papers identified novel research direction, leading to successful grant application worth $500K.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    organization: 'DeepTech Startup',
    avatar: 'SC',
    rating: 5,
    text: 'Finding AI researchers globally was a struggle—until this platform. We built our prototype 3x faster and connected with experts we could never have found otherwise.'
  },
  {
    name: 'Dr. Michael Torres',
    role: 'Neuroscience Researcher',
    organization: 'Independent Researcher',
    avatar: 'MT',
    rating: 5,
    text: 'Finally, a platform that respects researchers and gives us global exposure. I\'ve worked on amazing projects from three continents and built my reputation while earning fairly.'
  },
  {
    name: 'Prof. Aisha Patel',
    role: 'Research Director',
    organization: 'University Research Lab',
    avatar: 'AP',
    rating: 5,
    text: 'This platform solved our biggest challenge—finding specialized talent quickly. The verification system ensures quality, and the escrow payment protects everyone involved.'
  }
];

export const CLIENT_STEPS: Step[] = [
  {
    step: '1',
    icon: FileText,
    title: 'Post Your Project',
    description: 'Describe what you need in minutes. Set your budget, timeline, and requirements.'
  },
  {
    step: '2',
    icon: Sparkles,
    title: 'Get Matched with Verified Experts',
    description: 'AI-powered matching suggests top 5 researchers based on skills, ratings, and past performance.'
  },
  {
    step: '3',
    icon: HeartHandshake,
    title: 'Collaborate Securely',
    description: 'Chat, share files, assign tasks—all within the platform with complete confidentiality.'
  },
  {
    step: '4',
    icon: Lock,
    title: 'Pay with Confidence',
    description: 'Milestone-based payments through secure escrow. Release funds only after approval.'
  }
];

export const FREELANCER_STEPS: Step[] = [
  {
    step: '1',
    icon: Users,
    title: 'Create Your Profile',
    description: 'Add credentials, publications, skills, and research expertise.'
  },
  {
    step: '2',
    icon: Award,
    title: 'Get Verified',
    description: 'Build trust through platform verification and optional certification.'
  },
  {
    step: '3',
    icon: Globe,
    title: 'Find Global Projects',
    description: 'Work with companies, labs, and universities worldwide.'
  },
  {
    step: '4',
    icon: TrendingUp,
    title: 'Earn & Build Impact',
    description: 'Grow your reputation and income with fair compensation (you receive 90%, and the platform fee is only 10%).'
  }
];

export const WHY_US_ITEMS: WhyUsItem[] = [
  { icon: GraduationCap, title: 'Better Talent', desc: 'Verified academic credentials and research expertise' },
  { icon: Briefcase, title: 'Higher Quality Projects', desc: 'Meaningful R&D work, not generic tasks' },
  { icon: Shield, title: 'Research-Driven Workflows', desc: 'Built specifically for scientific collaboration' },
  { icon: Globe, title: 'Global Innovation Ecosystem', desc: 'Connect across 200+ research domains worldwide' },
  { icon: Zap, title: 'Dedicated R&D Tools', desc: 'File sharing, milestone tracking, secure collaboration' },
  { icon: Lock, title: 'Complete Confidentiality', desc: 'Anonymous identities and secure communication' }
];

export const TRUST_BADGES = [
  { icon: CheckCircle, label: 'Verified & certified experts only' },
  { icon: Shield, label: 'Confidential Collaboration' },
  { icon: Sparkles, label: 'AI Matchmaking across 200+ research domains' },
  { icon: Target, label: 'Ideal for R&D, thesis help, deep-tech projects, and innovation challenges' }
];

export const POPULAR_KEYWORDS = [
  'Machine Learning', 
  'Bioinformatics', 
  'Clinical Research', 
  'Drug Discovery', 
  'Genomics', 
  'Medical Imaging'
];
