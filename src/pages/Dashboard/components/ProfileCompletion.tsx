import { useState, useEffect } from 'react';
import { 
  User, GraduationCap, Briefcase, Plus, X, Save, ChevronDown, 
  Award, Star, Clock, Mail, Phone, BookOpen, PenTool, Target, 
  Brain, Layers, Code, Database, Shield, CheckCircle, Sparkles,
  AlertCircle, FileText, MapPin, Globe, Users, Heart, Zap,
  TrendingUp, BarChart, LineChart, PieChart, Cpu, Cloud, Server,
  CheckSquare, Circle, HelpCircle, Camera, Upload
} from 'lucide-react';
import toast from 'react-hot-toast';
import { validateFirstName, validateLastName, validateEmail, validatePhoneNumber, validateBio, validateHourlyRate } from '../../../utils/validation';
import { updateProfile } from '../../../services/api';

interface ProfileCompletionProps {
  onComplete: (profileData: any) => void;
  userInfo?: any;
}

export default function ProfileCompletion({ onComplete, userInfo }: ProfileCompletionProps) {
  const [profileData, setProfileData] = useState({
    firstName: userInfo?.fullname?.split(' ')[0] || '',
    lastName: userInfo?.fullname?.split(' ').slice(1).join(' ') || '',
    email: userInfo?.email || '',
    phoneNumber: userInfo?.phoneNumber || '',
    title: '',
    bio: '',
    skills: [] as string[],
    expertise: [] as string[],
    researchAreas: [] as string[],
    degrees: [{ degree: '', institution: '', year: '', field: '' }],
    experience: [{ position: '', company: '', duration: '', description: '' }],
    hourlyRate: '',
    availability: 'full-time' as 'full-time' | 'part-time' | 'contract',
    profileImage: null as File | null
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Dropdown open states
  const [skillDropdownOpen, setSkillDropdownOpen] = useState(false);
  const [expertiseDropdownOpen, setExpertiseDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);
  const [degreeDropdownOpen, setDegreeDropdownOpen] = useState<number | null>(null);
  const [availabilityDropdownOpen, setAvailabilityDropdownOpen] = useState(false);

  const availabilityOptions = [
    { value: 'full-time', label: 'Full-time', icon: Clock, description: '40+ hours/week', color: 'from-blue-500 to-cyan-500' },
    { value: 'part-time', label: 'Part-time', icon: Users, description: '20-39 hours/week', color: 'from-blue-500 to-indigo-500' },
    { value: 'contract', label: 'On-demand', icon: Zap, description: 'Project-based', color: 'from-orange-500 to-red-500' }
  ];

  const researchAreaOptions = [
    { id: 'writing', label: 'Writing', icon: PenTool, color: 'from-blue-500 to-indigo-500', lightColor: 'from-blue-100 to-indigo-100', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
    { id: 'research', label: 'Research', icon: BookOpen, color: 'from-blue-500 to-cyan-500', lightColor: 'from-blue-100 to-cyan-100', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
    { id: 'consulting', label: 'Consulting', icon: Target, color: 'from-emerald-500 to-teal-500', lightColor: 'from-emerald-100 to-teal-100', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50' },
    { id: 'data-ai', label: 'Data & AI', icon: Brain, color: 'from-orange-500 to-red-500', lightColor: 'from-orange-100 to-red-100', textColor: 'text-orange-700', bgColor: 'bg-orange-50' },
    { id: 'product-dev', label: 'Product Development', icon: Layers, color: 'from-indigo-500 to-violet-500', lightColor: 'from-indigo-100 to-violet-100', textColor: 'text-indigo-700', bgColor: 'bg-indigo-50' }
  ];

  const categorySkillsMap: Record<string, { icon: any; color: string; skills: string[] }> = {
    'Writing': { icon: PenTool, color: 'blue', skills: ['Copywriting', 'Translation', 'Clinical Research Writing', 'Technical Writing', 'Medical Writing',
      'Content Review & Editing', 'Corporate & Legal Documentation', 'Journalistic & Media Writing', 'Creative & Storytelling Content',
      'Non-Medical Regulatory Writing', 'Audio-to-Text Services', 'SEO & Search Content', 'Business Reports'] },
    'Research': { icon: BookOpen, color: 'blue', skills: ['Systematic Literature Review', 'Technology Foresight', 'Feasibility Analysis', 'Research Assessment', 'Secondary Research', 'Gap Analysis', 'Gray Literature Search', 'Market Intelligence', 'User Insights',
      'Scientific and Technical Research', 'Content Verification', 'Trend Analysis', 'Policy & Standards Review', 'Competitive Analysis', 'Market Research'] },
    'Consulting': { icon: Target, color: 'emerald', skills: ['Scientific & Technical Advisory', 'Manufacturing Advisory', 'Business Strategy Advisory',
      'Regulatory & Compliance Advisory', 'Legal Advisory Services', 'Operational Excellence Consulting', 'Healthcare Strategy Advisory',
      'Digital Transformation Strategy', 'Financial Strategy Advisory', 'Go-to-Market Advisory'] },
    'Data & AI': { icon: Brain, color: 'orange', skills: ['Natural Language Processing', 'Image Processing', 'Strategic Insights', 'Data Cleaning', 'Data Visualization', 'Data Processing', 'Algorithm Design-ML',
      'Text Mining & Analytics', 'Statistical Analysis', 'Algorithm Design-Non ML', 'Image Analysis', 'Big Data Analytics', 'Predictive Modeling', 'Data Mining', 'MLOps & Model Monitoring', 'Generative AI Solutions'] },
    'Product Development': { icon: Layers, color: 'indigo', skills: ['Product Validation', 'Concept Development', 'Quality Assurance & Control (QA/QC)', 'Product Compliance', 'Packaging & Design', 'Reverse Engineering', 'Formulation',
      'Material Sourcing', 'Recipe Development', 'Prototyping & Modeling', 'Stability & Shelf-Life Testing', 'Manufacturing Support',
      'Product Evaluation & Testing', 'Device Fabrication', 'Product Launch Support', 'Process Optimization', 'Pilot Production',
      'Innovation & Ideation', 'Regulatory Documentation', 'Supply Chain Coordination'] }
  };

  const categoryExpertiseMap: Record<string, { icon: any; color: string; expertise: string[] }> = {
    'Writing': { icon: PenTool, color: 'blue', expertise: ['Bioinformatics', 'Cancer Biology', 'Data Science & Analytics', 'Artificial Intelligence',
      'Neuroscience', 'Pharmacology & Drug Development', 'Clinical Medicine', 'Environmental Science', 'Molecular Biology', 'Microbiology',
      'Genetics & Genomics', 'Computer Science', 'Mathematics & Statistics', 'Clinical Research', 'Public Health & Policy', 'Chemistry',
      'Theoretical Physics', 'Immunology', 'Biomedical Engineering', 'Biotechnology & Life Sciences'] },
    'Research': { icon: BookOpen, color: 'blue', expertise: ['Molecular Biology', 'Public Health', 'Genetics', 'Neuroscience', 'Psychology', 'Biochemistry', 'Clinical Research', 'Epidemiology', 'Medicine', 'Pharmacology', 'Biotechnology', 'Data Science', 'Physics', 'Behavioral Science', 'Environmental Science', 'Immunology', 'Cancer Biology'] },
    'Consulting': { icon: Target, color: 'emerald', expertise: ['Molecular Biology', 'Genetics', 'Materials Science & Engineering', 'Microbiology', 'Food Science & Technology', 'Biotechnology', 'Cosmetic & Skincare Formulation', 'Chemistry', 'Pharmaceutical Development', 'Biomedical Engineering', 'Environmental Science', 'Process Optimization', 'Clinical Research Consulting', 'Nanotechnology', 'Regulatory Compliance'] },
    'Data & AI': { icon: Brain, color: 'orange', expertise: ['Machine Learning', 'Computer Vision', 'Bioinformatics', 'Artificial Intelligence', 'Applied Mathematics', 'Data Analysis', 'Software Engineering', 'Statistics', 'Deep Learning', 'Natural Language Processing (NLP)', 'Data Engineering', 'Big Data Analytics', 'Predictive Modeling', 'Reinforcement Learning', 'Healthcare Data Analytics', 'Neural Networks', 'Data Visualization', 'Optimization Algorithms'] },
    'Product Development': { icon: Layers, color: 'indigo', expertise: ['Formulation', 'Genetics', 'Medical Devices', 'Food Science & Technology', 'Engineering Design', 'Biopolymers', 'Skin Care & Cosmetology', 'Chemistry', 'Pharmaceutical Formulation', 'Biotechnology', 'Materials Science & Engineering', 'Product Innovation', 'Process Engineering', 'Regulatory Compliance', 'Packaging & Shelf-Life Design'] }
  };

  const degreeOptions = [
    { value: 'PhD', icon: Award, color: 'from-blue-500 to-indigo-500' },
    { value: 'Masters', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
    { value: 'Bachelors', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { value: 'Associate', icon: Layers, color: 'from-yellow-500 to-orange-500' },
    { value: 'Diploma', icon: FileText, color: 'from-indigo-500 to-blue-500' },
    { value: 'Certificate', icon: Award, color: 'from-blue-500 to-cyan-500' }
  ];

  // Calculate profile completion progress accurately
  useEffect(() => {
    // Define all required fields with their weights
    const sections = [
      { name: 'firstName', weight: 5, check: () => profileData.firstName.trim() !== '' && !validateField('firstName', profileData.firstName) },
      { name: 'lastName', weight: 5, check: () => profileData.lastName.trim() !== '' && !validateField('lastName', profileData.lastName) },
      { name: 'title', weight: 5, check: () => profileData.title.trim() !== '' && !validateField('title', profileData.title) },
      { name: 'bio', weight: 10, check: () => profileData.bio.trim() !== '' && !validateField('bio', profileData.bio) && profileData.bio.length >= 10 },
      { name: 'skills', weight: 10, check: () => profileData.skills.length > 0 },
      { name: 'expertise', weight: 10, check: () => profileData.expertise.length > 0 },
      { name: 'researchAreas', weight: 10, check: () => profileData.researchAreas.length > 0 },
      { name: 'degrees', weight: 10, check: () => profileData.degrees.some(d => d.degree && d.institution && d.field && d.year) },
      { name: 'experience', weight: 10, check: () => profileData.experience.some(e => e.position && e.company && e.description) },
      { name: 'hourlyRate', weight: 5, check: () => profileData.hourlyRate.trim() !== '' && !validateField('hourlyRate', profileData.hourlyRate) },
      { name: 'availability', weight: 5, check: () => true }, // Always selected
      { name: 'email', weight: 5, check: () => profileData.email.trim() !== '' && !validateField('email', profileData.email) },
      { name: 'phoneNumber', weight: 5, check: () => String(profileData.phoneNumber).trim() !== '' && !validateField('phoneNumber', String(profileData.phoneNumber)) }
    ];

    let completedWeight = 0;
    const totalWeight = sections.reduce((sum, section) => sum + section.weight, 0);
    const newCompletedSections: Record<string, boolean> = {};

    sections.forEach(section => {
      const isComplete = section.check();
      newCompletedSections[section.name] = isComplete;
      if (isComplete) {
        completedWeight += section.weight;
      }
    });

    const calculatedProgress = Math.round((completedWeight / totalWeight) * 100);
    setProgress(calculatedProgress);
    setCompletedSections(newCompletedSections);
  }, [profileData]);

  const getFilteredSkills = () => {
    if (profileData.researchAreas.length === 0) return [];
    const filtered = new Set<string>();
    profileData.researchAreas.forEach(area => {
      const skills = categorySkillsMap[area]?.skills || [];
      skills.forEach(skill => filtered.add(skill));
    });
    return Array.from(filtered);
  };

  const getFilteredExpertise = () => {
    if (profileData.researchAreas.length === 0) return [];
    const filtered = new Set<string>();
    profileData.researchAreas.forEach(area => {
      const expertise = categoryExpertiseMap[area]?.expertise || [];
      expertise.forEach(exp => filtered.add(exp));
    });
    return Array.from(filtered);
  };

  const getCategoryColor = (area: string): string => {
    const category = researchAreaOptions.find(opt => opt.label === area);
    return category?.color.split(' ')[0].replace('from-', '') || 'indigo';
  };

  const handleSkillSelect = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData({ ...profileData, skills: [...profileData.skills, skill] });
      toast.success(`Added "${skill}" to skills`, { icon: '✅', duration: 2000 });
    }
    setSkillDropdownOpen(false);
  };

  const removeSkill = (skill: string) => {
    setProfileData({ ...profileData, skills: profileData.skills.filter(s => s !== skill) });
    toast.success(`Removed "${skill}"`, { icon: '🗑️', duration: 2000 });
  };

  const handleExpertiseSelect = (expertise: string) => {
    if (expertise && !profileData.expertise.includes(expertise)) {
      setProfileData({ ...profileData, expertise: [...profileData.expertise, expertise] });
      toast.success(`Added "${expertise}" to expertise`, { icon: '✅', duration: 2000 });
    }
    setExpertiseDropdownOpen(false);
  };

  const removeExpertise = (expertise: string) => {
    setProfileData({ ...profileData, expertise: profileData.expertise.filter(e => e !== expertise) });
    toast.success(`Removed "${expertise}"`, { icon: '🗑️', duration: 2000 });
  };

  const handleAvailabilitySelect = (availability: 'full-time' | 'part-time' | 'contract') => {
    setProfileData({ ...profileData, availability });
    setAvailabilityDropdownOpen(false);
  };

  const handleResearchAreaSelect = (area: string) => {
    if (area && !profileData.researchAreas.includes(area)) {
      setProfileData({ ...profileData, researchAreas: [...profileData.researchAreas, area] });
      toast.success(`Added "${area}" research area`, { icon: '📚', duration: 2000 });
    }
    setResearchDropdownOpen(false);
  };

  const removeResearchArea = (area: string) => {
    setProfileData({ 
      ...profileData, 
      researchAreas: profileData.researchAreas.filter(a => a !== area),
      skills: profileData.skills.filter(s => !getFilteredSkills().includes(s)),
      expertise: profileData.expertise.filter(e => !getFilteredExpertise().includes(e))
    });
    toast.success(`Removed "${area}"`, { icon: '🗑️', duration: 2000 });
  };

  const addDegree = () => {
    setProfileData({
      ...profileData,
      degrees: [...profileData.degrees, { degree: '', institution: '', year: '', field: '' }]
    });
  };

  const removeDegree = (index: number) => {
    setProfileData({
      ...profileData,
      degrees: profileData.degrees.filter((_, i) => i !== index)
    });
  };

  const updateDegree = (index: number, field: string, value: string) => {
    const updated = profileData.degrees.map((deg, i) =>
      i === index ? { ...deg, [field]: value } : deg
    );
    setProfileData({ ...profileData, degrees: updated });
  };

  const addExperience = () => {
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, { position: '', company: '', duration: '', description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = profileData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setProfileData({ ...profileData, experience: updated });
  };

  const validateField = (field: string, value: any): string => {
    let result;
    switch (field) {
      case 'firstName':
        result = validateFirstName(value);
        return result.valid ? '' : result.error || '';
      case 'lastName':
        result = validateLastName(value);
        return result.valid ? '' : result.error || '';
      case 'title':
        if (!value || value.trim().length < 3) return 'Title must be at least 3 characters';
        if (!/^[a-zA-Z]/.test(value)) return 'Title must start with a letter';
        return '';
      case 'bio':
        if (!value || value.trim().length < 10) return 'Bio must be at least 10 characters';
        if (value.trim().length > 500) return 'Bio must not exceed 500 characters';
        return '';
      case 'email':
        result = validateEmail(value);
        return result.valid ? '' : result.error || '';
      case 'phoneNumber':
        result = validatePhoneNumber(String(value));
        return result.valid ? '' : result.error || '';
      case 'hourlyRate':
        const rate = parseInt(value);
        result = validateHourlyRate(rate);
        return result.valid ? '' : result.error || '';
      case 'institution':
        if (!value || value.trim().length < 2) return 'Institution must be at least 2 characters';
        return '';
      case 'field':
        if (!value || value.trim().length < 2) return 'Field must be at least 2 characters';
        return '';
      case 'year':
        if (!/^\d+$/.test(value)) return 'Year must contain only numbers';
        if (value.length !== 4) return 'Year must be 4 digits';
        const year = parseInt(value);
        if (year < 1900 || year > new Date().getFullYear()) return 'Please enter a valid year';
        return '';
      case 'position':
        if (!value || value.trim().length < 2) return 'Position must be at least 2 characters';
        return '';
      case 'company':
        if (!value || value.trim().length < 2) return 'Company must be at least 2 characters';
        return '';
      case 'duration':
        if (!value) return '';
        if (!/^[0-9-]+$/.test(value)) return 'Duration must contain only numbers and dashes';
        return '';
      case 'description':
        if (!value || value.trim().length < 10) return 'Description must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const isFormValid = () => {
    return progress === 100;
  };

  const handleComplete = async () => {
    const errors: Record<string, string> = {};

    if (!profileData.firstName.trim()) errors.firstName = 'First name is required';
    else {
      const firstNameError = validateField('firstName', profileData.firstName);
      if (firstNameError) errors.firstName = firstNameError;
    }

    if (!profileData.lastName.trim()) errors.lastName = 'Last name is required';
    else {
      const lastNameError = validateField('lastName', profileData.lastName);
      if (lastNameError) errors.lastName = lastNameError;
    }

    if (!profileData.title.trim()) errors.title = 'Professional title is required';
    else {
      const titleError = validateField('title', profileData.title);
      if (titleError) errors.title = titleError;
    }

    if (!profileData.bio.trim()) errors.bio = 'Professional bio is required';
    else {
      const bioError = validateField('bio', profileData.bio);
      if (bioError) errors.bio = bioError;
    }

    if (profileData.skills.length === 0) errors.skills = 'At least one technical skill is required';
    if (profileData.expertise.length === 0) errors.expertise = 'At least one expertise area is required';
    if (profileData.researchAreas.length === 0) errors.researchAreas = 'At least one research area is required';

    if (!profileData.degrees.some(d => d.degree && d.institution && d.field && d.year)) {
      errors.degrees = 'At least one complete degree is required';
    }

    if (!profileData.experience.some(e => e.position && e.company && e.description)) {
      errors.experience = 'At least one complete experience entry is required';
    }

    if (!profileData.hourlyRate.trim()) errors.hourlyRate = 'Hourly rate is required';
    else {
      const hourlyRateError = validateField('hourlyRate', profileData.hourlyRate);
      if (hourlyRateError) errors.hourlyRate = hourlyRateError;
    }

    if (!profileData.email.trim()) errors.email = 'Email address is required';
    else {
      const emailError = validateField('email', profileData.email);
      if (emailError) errors.email = emailError;
    }

    const phoneStr = String(profileData.phoneNumber || '');
    if (!phoneStr.trim()) errors.phoneNumber = 'Phone number is required';
    else {
      const phoneError = validateField('phoneNumber', phoneStr);
      if (phoneError) errors.phoneNumber = phoneError;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      const errorCount = Object.keys(errors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''}`, { duration: 4000 });
      return;
    }

    try {
      // Skip image upload for now - make it optional
      if (profileData.profileImage) {
        console.log('Profile image selected but will be uploaded later');
      }
      
      try {
        await onComplete(profileData);
        toast.success('Profile completed successfully!', { icon: '🎉', duration: 5000 });
      } catch (completeError: any) {
        console.error('Profile completion error:', completeError);
        toast.error(`Profile completion failed: ${completeError?.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('General error:', error);
      toast.error(`Failed to save profile: ${error?.message || 'Unknown error'}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setSkillDropdownOpen(false);
        setExpertiseDropdownOpen(false);
        setResearchDropdownOpen(false);
        setDegreeDropdownOpen(null);
        setAvailabilityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'from-red-500 to-orange-500';
    if (progress < 60) return 'from-yellow-500 to-orange-500';
    if (progress < 80) return 'from-blue-500 to-indigo-500';
    return 'from-green-500 to-emerald-500';
  };

  const getProgressMessage = (progress: number) => {
    if (progress === 0) return 'Start your profile journey';
    if (progress < 30) return 'Getting started';
    if (progress < 60) return 'Making good progress';
    if (progress < 80) return 'Almost there';
    if (progress < 100) return 'Just a few steps left';
    return 'Profile complete! Ready to submit';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Gradient Orbs - More Visible */}
        <div className="absolute top-10 left-5 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDuration: '25s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-full blur-3xl animate-float" style={{ animationDuration: '30s', animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-cyan-400/25 to-blue-400/25 rounded-full blur-3xl animate-float" style={{ animationDuration: '28s', animationDelay: '3s' }}></div>
        
        {/* Animated Gradient Waves */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-0 w-full h-[300px] bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -skew-y-6 animate-wave" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-[40%] right-0 w-full h-[250px] bg-gradient-to-r from-transparent via-indigo-200/20 to-transparent transform skew-y-6 animate-wave" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-[20%] left-0 w-full h-[280px] bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent transform -skew-y-6 animate-wave" style={{ animationDuration: '20s', animationDelay: '4s' }}></div>
        </div>
        
        {/* Floating Emojis - Larger and More Visible */}
        <div className="absolute top-24 left-[12%] text-8xl opacity-30 animate-float" style={{ animationDuration: '15s' }}>🎓</div>
        <div className="absolute top-[18%] right-[8%] text-7xl opacity-30 animate-float" style={{ animationDuration: '18s', animationDelay: '1s' }}>📚</div>
        <div className="absolute top-[42%] left-[6%] text-9xl opacity-25 animate-float" style={{ animationDuration: '22s', animationDelay: '3s' }}>💼</div>
        <div className="absolute bottom-[22%] right-[12%] text-8xl opacity-30 animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}>🚀</div>
        <div className="absolute bottom-[38%] left-[10%] text-7xl opacity-25 animate-float" style={{ animationDuration: '25s', animationDelay: '4s' }}>💎</div>
        <div className="absolute top-[58%] right-[6%] text-8xl opacity-30 animate-float" style={{ animationDuration: '19s', animationDelay: '1.5s' }}>💡</div>
        <div className="absolute top-[72%] left-[18%] text-7xl opacity-25 animate-float" style={{ animationDuration: '23s', animationDelay: '3.5s' }}>🎯</div>
        <div className="absolute bottom-[12%] right-[22%] text-9xl opacity-25 animate-float" style={{ animationDuration: '21s', animationDelay: '2.5s' }}>✨</div>
        
        {/* Decorative Icons/Images - Larger */}
        <div className="absolute top-[12%] right-[4%] opacity-20">
          <svg width="150" height="150" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float" style={{ animationDuration: '18s' }}>
            <path d="M60 10L70 40H100L76 58L86 88L60 70L34 88L44 58L20 40H50L60 10Z" fill="url(#grad1)" />
            <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" /></linearGradient></defs>
          </svg>
        </div>
        <div className="absolute bottom-[28%] left-[3%] opacity-20">
          <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}>
            <circle cx="50" cy="50" r="40" stroke="url(#grad2)" strokeWidth="8" fill="none" />
            <path d="M50 20V50L70 70" stroke="url(#grad2)" strokeWidth="6" strokeLinecap="round" />
            <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0891b2" /></linearGradient></defs>
          </svg>
        </div>
        <div className="absolute top-[48%] right-[2%] opacity-20">
          <svg width="120" height="120" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float" style={{ animationDuration: '22s', animationDelay: '1s' }}>
            <rect x="10" y="20" width="70" height="50" rx="5" fill="url(#grad3)" />
            <rect x="20" y="30" width="50" height="3" fill="white" opacity="0.8" />
            <rect x="20" y="40" width="40" height="3" fill="white" opacity="0.8" />
            <rect x="20" y="50" width="45" height="3" fill="white" opacity="0.8" />
            <defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
          </svg>
        </div>
        
        {/* Animated Geometric Shapes - More Prominent */}
        <div className="absolute top-[22%] right-[20%] w-40 h-40 border-4 border-blue-400/40 rounded-2xl rotate-12 animate-spin-slow"></div>
        <div className="absolute bottom-[32%] left-[28%] w-32 h-32 border-4 border-indigo-400/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[52%] right-[28%] w-28 h-28 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[65%] left-[35%] w-36 h-36 border-4 border-cyan-400/40 rounded-2xl -rotate-12 animate-spin-slow" style={{ animationDuration: '35s' }}></div>
        
        {/* Floating Dots Pattern */}
        <div className="absolute top-[15%] left-[25%] w-3 h-3 bg-blue-400/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-[35%] right-[30%] w-4 h-4 bg-indigo-400/50 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[45%] left-[40%] w-3 h-3 bg-cyan-400/50 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute top-[80%] right-[35%] w-4 h-4 bg-blue-500/50 rounded-full animate-ping" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 pt-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-2xl mb-6 shadow-xl">
            <User className="text-white" size={36} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mb-3">Complete Your Profile</h1>
          <p className="text-gray-600 text-lg">Help clients discover your expertise and land your next research opportunity</p>
        </div>

        {/* Progress Bar - Premium */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-10 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-600" size={20} />
              <span className="text-base font-semibold text-gray-800">Profile Completion</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className={`h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full transition-all duration-500 shadow-lg`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            {getProgressMessage(progress)}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-xl border-2 border-blue-200/50 rounded-2xl divide-y divide-gray-200/50 shadow-2xl">
          {/* Basic Information */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <User size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
              {completedSections.firstName && completedSections.lastName && completedSections.title && completedSections.bio && (
                <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-green-700">Complete</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Image Upload */}
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProfileData({ ...profileData, profileImage: file });
                          const reader = new FileReader();
                          reader.onload = (e) => setImagePreview(e.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                      <Camera size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upload a professional photo (Optional)</p>
                    <p className="text-xs text-gray-500">You can add this later in your profile settings</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => {
                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                      setProfileData({ ...profileData, firstName: e.target.value });
                    }
                  }}
                  onBlur={(e) => {
                    const error = validateField('firstName', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, firstName: error });
                    } else {
                      const { firstName, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                    validationErrors.firstName 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="John"
                />
                {validationErrors.firstName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => {
                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                      setProfileData({ ...profileData, lastName: e.target.value });
                    }
                  }}
                  onBlur={(e) => {
                    const error = validateField('lastName', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, lastName: error });
                    } else {
                      const { lastName, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                    validationErrors.lastName 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="Doe"
                />
                {validationErrors.lastName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.lastName}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  onBlur={(e) => {
                    const error = validateField('title', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, title: error });
                    } else {
                      const { title, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm transition-all duration-200 ${
                    validationErrors.title 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="e.g., PhD in Computer Science"
                />
                {validationErrors.title && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.title}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  onBlur={(e) => {
                    const error = validateField('bio', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, bio: error });
                    } else {
                      const { bio, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl text-sm resize-none transition-all duration-200 ${
                    validationErrors.bio 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="Brief description of your research background..."
                />
                {validationErrors.bio ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.bio}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 characters</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Star size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Skills & Expertise</h2>
              {completedSections.skills && completedSections.expertise && completedSections.researchAreas && (
                <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-green-700">Complete</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Research Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Areas <span className="text-red-500">*</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.researchAreas.map(area => {
                    const category = researchAreaOptions.find(opt => opt.label === area);
                    const Icon = category?.icon || BookOpen;
                    return (
                      <span
                        key={area}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn"
                      >
                        <Icon size={14} />
                        {area}
                        <button
                          type="button"
                          onClick={() => removeResearchArea(area)}
                          className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>

                <div className="dropdown-container relative">
                  <button
                    type="button"
                    onClick={() => setResearchDropdownOpen(!researchDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white/50 rounded-xl flex items-center justify-between text-sm text-gray-700 hover:border-blue-400 hover:bg-white transition-all duration-200 shadow-sm"
                  >
                    <span className="text-gray-500">Select research areas</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${researchDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {researchDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto animate-slideDown">
                      {researchAreaOptions.map(area => {
                        const Icon = area.icon;
                        const isSelected = profileData.researchAreas.includes(area.label);
                        return (
                          <button
                            key={area.id}
                            type="button"
                            onClick={() => handleResearchAreaSelect(area.label)}
                            disabled={isSelected}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                              isSelected 
                                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-gray-700'
                            }`}
                          >
                            <div className={`w-8 h-8 bg-gradient-to-br ${area.color} rounded-lg flex items-center justify-center shadow-sm`}>
                              <Icon size={14} className="text-white" />
                            </div>
                            <span className="flex-1 text-left font-medium">{area.label}</span>
                            {isSelected && <CheckCircle size={16} className="text-green-500" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {validationErrors.researchAreas && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.researchAreas}
                  </p>
                )}
              </div>

              {/* Technical Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Skills <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                {profileData.researchAreas.length === 0 ? (
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                    <AlertCircle size={16} />
                    Select research areas first
                  </div>
                ) : (
                  <div className="dropdown-container relative">
                    <button
                      type="button"
                      onClick={() => setSkillDropdownOpen(!skillDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-300 bg-white/50 rounded-xl flex items-center justify-between text-sm text-gray-700 hover:border-blue-400 hover:bg-white transition-all duration-200 shadow-sm"
                    >
                      <span className="text-gray-500">Select technical skills</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${skillDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {skillDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto animate-slideDown">
                        {getFilteredSkills().map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillSelect(skill)}
                            disabled={profileData.skills.includes(skill)}
                            className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-all duration-200 ${
                              profileData.skills.includes(skill)
                                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 text-gray-700'
                            }`}
                          >
                            <span className="flex-1 text-left">{skill}</span>
                            {profileData.skills.includes(skill) && <CheckCircle size={14} className="text-green-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {validationErrors.skills && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.skills}
                  </p>
                )}
              </div>

              {/* Expertise Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise Areas <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.expertise.map(exp => (
                    <span
                      key={exp}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn"
                    >
                      {exp}
                      <button
                        type="button"
                        onClick={() => removeExpertise(exp)}
                        className="hover:bg-emerald-200 rounded-full p-1 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                {profileData.researchAreas.length === 0 ? (
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                    <AlertCircle size={16} />
                    Select research areas first
                  </div>
                ) : (
                  <div className="dropdown-container relative">
                    <button
                      type="button"
                      onClick={() => setExpertiseDropdownOpen(!expertiseDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-300 bg-white/50 rounded-xl flex items-center justify-between text-sm text-gray-700 hover:border-emerald-400 hover:bg-white transition-all duration-200 shadow-sm"
                    >
                      <span className="text-gray-500">Select expertise areas</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${expertiseDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {expertiseDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto animate-slideDown">
                        {getFilteredExpertise().map(exp => (
                          <button
                            key={exp}
                            type="button"
                            onClick={() => handleExpertiseSelect(exp)}
                            disabled={profileData.expertise.includes(exp)}
                            className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-all duration-200 ${
                              profileData.expertise.includes(exp)
                                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 text-gray-700'
                            }`}
                          >
                            <span className="flex-1 text-left">{exp}</span>
                            {profileData.expertise.includes(exp) && <CheckCircle size={14} className="text-green-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {validationErrors.expertise && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.expertise}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Degrees */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Academic Degrees</h2>
              </div>
              <div className="flex items-center gap-3">
                {completedSections.degrees && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-xs font-medium text-green-700">Complete</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={addDegree}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {profileData.degrees.map((degree, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center text-xs text-emerald-700">{index + 1}</span>
                      Degree #{index + 1}
                    </h3>
                    {profileData.degrees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDegree(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg p-1 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="dropdown-container relative">
                      <button
                        type="button"
                        onClick={() => setDegreeDropdownOpen(degreeDropdownOpen === index ? null : index)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl flex items-center justify-between text-sm shadow-sm hover:border-emerald-400 transition-all duration-200"
                      >
                        <span className={degree.degree ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                          {degree.degree || 'Select Degree'}
                        </span>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${degreeDropdownOpen === index ? 'rotate-180' : ''}`} />
                      </button>

                      {degreeDropdownOpen === index && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 animate-slideDown">
                          {degreeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                updateDegree(index, 'degree', opt.value);
                                setDegreeDropdownOpen(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                            >
                              <div className={`w-7 h-7 bg-gradient-to-br ${opt.color} rounded-lg flex items-center justify-center shadow-sm`}>
                                <opt.icon size={12} className="text-white" />
                              </div>
                              <span className="font-medium">{opt.value}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={degree.institution}
                      onChange={(e) => updateDegree(index, 'institution', e.target.value)}
                      placeholder="Institution"
                      className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    />

                    <input
                      type="text"
                      value={degree.field}
                      onChange={(e) => updateDegree(index, 'field', e.target.value)}
                      placeholder="Field of Study"
                      className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    />

                    <input
                      type="text"
                      value={degree.year}
                      onChange={(e) => {
                        if (/^\d*$/.test(e.target.value) && e.target.value.length <= 4) {
                          updateDegree(index, 'year', e.target.value);
                        }
                      }}
                      placeholder="Year"
                      maxLength={4}
                      className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Professional Experience</h2>
              </div>
              <div className="flex items-center gap-3">
                {completedSections.experience && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-xs font-medium text-green-700">Complete</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-xs text-blue-700">{index + 1}</span>
                      Experience #{index + 1}
                    </h3>
                    {profileData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg p-1 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      placeholder="Position"
                      className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company"
                      className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => {
                      if (/^[0-9-]*$/.test(e.target.value)) {
                        updateExperience(index, 'duration', e.target.value);
                      }
                    }}
                    placeholder="Duration (e.g., 2020-2023)"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm mb-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />

                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Brief description of responsibilities"
                    rows={2}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm resize-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rate & Availability */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Rate & Availability</h2>
              {completedSections.hourlyRate && (
                <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-green-700">Complete</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="text"
                    value={profileData.hourlyRate}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setProfileData({ ...profileData, hourlyRate: e.target.value });
                      }
                    }}
                    onBlur={(e) => {
                      const error = validateField('hourlyRate', e.target.value);
                      if (error) {
                        setValidationErrors({ ...validationErrors, hourlyRate: error });
                      } else {
                        const { hourlyRate, ...rest } = validationErrors;
                        setValidationErrors(rest);
                      }
                    }}
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl text-sm shadow-sm transition-all duration-200 ${
                      validationErrors.hourlyRate 
                        ? 'border-red-300 bg-red-50/50' 
                        : 'border-gray-300 bg-white/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white'
                    }`}
                    placeholder="50"
                  />
                </div>
                {validationErrors.hourlyRate && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.hourlyRate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <div className="dropdown-container relative">
                  <button
                    type="button"
                    onClick={() => setAvailabilityDropdownOpen(!availabilityDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white/50 rounded-xl flex items-center justify-between text-sm shadow-sm hover:border-orange-400 hover:bg-white transition-all duration-200"
                  >
                    <span className="font-medium">{availabilityOptions.find(o => o.value === profileData.availability)?.label}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${availabilityDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {availabilityDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 animate-slideDown">
                      {availabilityOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleAvailabilitySelect(option.value as 'full-time' | 'part-time' | 'contract')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200"
                          >
                            <div className={`w-8 h-8 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center shadow-sm`}>
                              <Icon size={14} className="text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <span className="text-gray-900 font-medium">{option.label}</span>
                              <p className="text-xs text-gray-500">{option.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Mail size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
              {completedSections.email && completedSections.phoneNumber && (
                <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-green-700">Complete</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  onBlur={(e) => {
                    const error = validateField('email', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, email: error });
                    } else {
                      const { email, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm shadow-sm transition-all duration-200 ${
                    validationErrors.email 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="john@example.com"
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setProfileData({ ...profileData, phoneNumber: e.target.value });
                    }
                  }}
                  onBlur={(e) => {
                    const error = validateField('phoneNumber', e.target.value);
                    if (error) {
                      setValidationErrors({ ...validationErrors, phoneNumber: error });
                    } else {
                      const { phoneNumber, ...rest } = validationErrors;
                      setValidationErrors(rest);
                    }
                  }}
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-xl text-sm shadow-sm transition-all duration-200 ${
                    validationErrors.phoneNumber 
                      ? 'border-red-300 bg-red-50/50' 
                      : 'border-gray-300 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white'
                  }`}
                  placeholder="1234567890"
                />
                {validationErrors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {validationErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleComplete}
            disabled={!isFormValid()}
            className={`w-full px-6 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
              isFormValid()
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isFormValid() ? (
              <>
                <Sparkles size={22} className="animate-pulse" />
                Complete Profile
                <Save size={22} />
              </>
            ) : (
              <>
                <AlertCircle size={22} />
                Complete All Required Fields
              </>
            )}
          </button>
          
          {!isFormValid() && (
            <p className="text-sm text-gray-500 text-center mt-3 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Fill in all required fields to unlock profile submission
            </p>
          )}
        </div>
      </div>
    </div>
  );
}