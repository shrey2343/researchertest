import { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, CreditCard, Building, Hash, Code, Wallet, Plus, GraduationCap, Briefcase, X } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { updateProfile, getBankAccount, updateBankAccount, getResearcherProfile, updateResearcherProfile } from '../../../../services/api';
import toast from 'react-hot-toast';
import { validateFirstName, validateLastName, validateEmail, validatePhoneNumber, validateBio, validateHourlyRate } from '../../../../utils/validation';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'researcher' | 'account'>('profile');
  const [loading, setLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);
  const [researcherLoading, setResearcherLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [bankData, setBankData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    upiId: '',
  });

  const [hasBankAccount, setHasBankAccount] = useState(false);

  const [researcherData, setResearcherData] = useState({
    firstName: user?.fullname?.split(' ')[0] || '',
    lastName: user?.fullname?.split(' ').slice(1).join(' ') || '',
    title: '',
    bio: '',
    skills: [] as string[],
    expertise: [] as string[],
    researchAreas: [] as string[],
    degrees: [{ degree: '', institution: '', year: '', field: '' }],
    experience: [{ position: '', company: '', duration: '', description: '' }],
    hourlyRate: '',
    availability: 'full-time' as 'full-time' | 'part-time' | 'contract'
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentExpertise, setCurrentExpertise] = useState('');
  const [currentResearchArea, setCurrentResearchArea] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const skillOptions = [
    'Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Deep Learning',
    'Research Methodology', 'Academic Writing', 'Literature Review', 'Survey Design',
    'Experimental Design', 'Qualitative Research', 'Quantitative Research', 'Meta-Analysis',
    'Sample Size Calculation', 'Standard Deviation Analysis', 'Hypothesis Testing',
    'Divide and Conquer', 'Dynamic Programming', 'Greedy Algorithms', 'Genetic Algorithms',
    'Brute Force Methods', 'Backtracking Techniques', 'Transform and Conquer',
    'Image Generation (GANs)', 'Image Restoration', 'Template Matching', 'Pixelation',
    'Linear Filtering', 'Independent Component Analysis', 'Regression Modeling',
    'Association Rule Learning', 'Classification Tree Analysis', 'Infographics',
    'Dashboards', 'Charts', 'Tables', 'Maps', 'Graphs', 'Neural Networks',
    'Gradient Boosting Models', 'Forecasting Models', 'Prophet Models',
    'Classification Models', 'Time Series Models', 'Clustering Models',
    'Decision Tree Models', 'General Linear Models', 'Outlier Detection Models',
    'Predictive Regression Modeling', 'Association Pattern Discovery',
    'Sequential Behavior Analysis', 'Anomaly Detection'
  ];

  const expertiseOptions = [
    'Bioinformatics', 'Cancer Biology', 'Data Science & Analytics', 'Artificial Intelligence',
    'Neuroscience', 'Pharmacology & Drug Development', 'Clinical Medicine',
    'Environmental Science', 'Molecular Biology', 'Microbiology', 'Genetics & Genomics',
    'Computer Science', 'Mathematics & Statistics', 'Clinical Research',
    'Public Health & Policy', 'Chemistry', 'Theoretical Physics', 'Immunology',
    'Biomedical Engineering', 'Biotechnology & Life Sciences', 'Public Health',
    'Genetics', 'Psychology', 'Biochemistry', 'Epidemiology', 'Medicine',
    'Pharmacology', 'Biotechnology', 'Data Science', 'Physics', 'Behavioral Science',
    'Materials Science & Engineering', 'Food Science & Technology',
    'Cosmetic & Skincare Formulation', 'Pharmaceutical Development',
    'Process Optimization', 'Clinical Research Consulting', 'Nanotechnology',
    'Regulatory Compliance', 'Machine Learning', 'Computer Vision', 'Applied Mathematics',
    'Software Engineering', 'Statistics', 'Natural Language Processing (NLP)',
    'Data Engineering', 'Big Data Analytics', 'Predictive Modeling',
    'Reinforcement Learning', 'Healthcare Data Analytics', 'Data Visualization',
    'Optimization Algorithms', 'Formulation', 'Medical Devices', 'Engineering Design',
    'Biopolymers', 'Skin Care & Cosmetology', 'Product Innovation',
    'Process Engineering', 'Packaging & Shelf-Life Design'
  ];

 const researchAreaOptions = [
    'Writing',
    'Research',
    'Consulting',
    'Data & AI',
    'Product Development'
  ];

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
        if (!value || value.trim().length < 5) return 'Bio must be at least 5 characters';
        if (!/^[a-zA-Z]/.test(value)) return 'Bio must start with a letter';
        return '';
      case 'email':
        result = validateEmail(value);
        return result.valid ? '' : result.error || '';
      case 'phoneNumber':
        result = validatePhoneNumber(value);
        return result.valid ? '' : result.error || '';
      case 'hourlyRate':
        const rate = parseInt(value);
        if (!value || isNaN(rate)) return 'Hourly rate is required';
        if (rate < 1 || rate > 1000) return 'Rate must be between $1 and $1000';
        return '';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (user?.role === 'freelancer') {
      if (activeTab === 'account') {
        fetchBankAccount();
      } else if (activeTab === 'researcher') {
        fetchResearcherProfile();
      }
    }
  }, [activeTab]);

  const fetchBankAccount = async () => {
    setBankLoading(true);
    try {
      const response = await getBankAccount();
      if (response.success && response.bankAccount) {
        const account = response.bankAccount;
        setBankData({
          accountHolderName: account.accountHolderName || '',
          bankName: account.bankName || '',
          accountNumber: account.accountNumber || '',
          ifscCode: account.ifscCode || '',
          accountType: account.accountType || '',
          upiId: account.upiId || '',
        });
        setHasBankAccount(!!(account.accountNumber || account.upiId));
      }
    } catch (error: any) {
      console.error('Failed to fetch bank account:', error);
    } finally {
      setBankLoading(false);
    }
  };

  const fetchResearcherProfile = async () => {
    setResearcherLoading(true);
    try {
      const response = await getResearcherProfile();
      if (response.success && response.researcherProfile) {
        const profile = response.researcherProfile;
        setResearcherData({
          firstName: profile.firstName || user?.fullname?.split(' ')[0] || '',
          lastName: profile.lastName || user?.fullname?.split(' ').slice(1).join(' ') || '',
          title: profile.title || '',
          bio: profile.bio || '',
          skills: profile.skills || [],
          expertise: profile.expertise || [],
          researchAreas: profile.researchAreas || [],
          degrees: profile.degrees?.length ? profile.degrees : [{ degree: '', institution: '', year: '', field: '' }],
          experience: profile.experience?.length ? profile.experience : [{ position: '', company: '', duration: '', description: '' }],
          hourlyRate: profile.hourlyRate || '',
          availability: profile.availability || 'full-time'
        });
      }
    } catch (error: any) {
      console.error('Failed to fetch researcher profile:', error);
    } finally {
      setResearcherLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', profileData.fullname);
      formData.append('email', profileData.email);
      formData.append('phoneNumber', profileData.phoneNumber);

      const response = await updateProfile(formData);
      if (response.success) {
        toast.success('Profile updated successfully!');
        await refreshUser();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBankAccountUpdate = async () => {
    if (!bankData.accountHolderName && !bankData.bankName && !bankData.accountNumber && !bankData.upiId) {
      toast.error('Please provide at least some payment details');
      return;
    }

    setBankLoading(true);
    try {
      const response = await updateBankAccount(bankData);
      if (response.success) {
        toast.success('Payment details updated successfully!');
        setHasBankAccount(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update payment details');
    } finally {
      setBankLoading(false);
    }
  };

  const handleResearcherProfileUpdate = async () => {
    const errors: Record<string, string> = {};

    // Validate required fields
    const firstNameError = validateField('firstName', researcherData.firstName);
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = validateField('lastName', researcherData.lastName);
    if (lastNameError) errors.lastName = lastNameError;

    const titleError = validateField('title', researcherData.title);
    if (titleError) errors.title = titleError;

    const bioError = validateField('bio', researcherData.bio);
    if (bioError) errors.bio = bioError;

    if (researcherData.skills.length === 0) {
      errors.skills = 'At least one technical skill is required';
    }

    if (researcherData.expertise.length === 0) {
      errors.expertise = 'At least one expertise area is required';
    }

    if (researcherData.researchAreas.length === 0) {
      errors.researchAreas = 'At least one research area is required';
    }

    const hourlyRateError = validateField('hourlyRate', researcherData.hourlyRate);
    if (hourlyRateError) errors.hourlyRate = hourlyRateError;

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please fix all validation errors before submitting');
      return;
    }

    setResearcherLoading(true);
    try {
      const response = await updateResearcherProfile(researcherData);
      if (response.success) {
        toast.success('Researcher profile updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update researcher profile');
    } finally {
      setResearcherLoading(false);
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (skill && !researcherData.skills.includes(skill)) {
      setResearcherData({ ...researcherData, skills: [...researcherData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setResearcherData({ ...researcherData, skills: researcherData.skills.filter(s => s !== skill) });
  };

  const handleExpertiseSelect = (expertise: string) => {
    if (expertise && !researcherData.expertise.includes(expertise)) {
      setResearcherData({ ...researcherData, expertise: [...researcherData.expertise, expertise] });
    }
  };

  const removeExpertise = (expertise: string) => {
    setResearcherData({ ...researcherData, expertise: researcherData.expertise.filter(e => e !== expertise) });
  };

  const handleResearchAreaSelect = (area: string) => {
    if (area && !researcherData.researchAreas.includes(area)) {
      setResearcherData({ ...researcherData, researchAreas: [...researcherData.researchAreas, area] });
    }
  };

  const removeResearchArea = (area: string) => {
    setResearcherData({ ...researcherData, researchAreas: researcherData.researchAreas.filter(a => a !== area) });
  };

  const addDegree = () => {
    setResearcherData({
      ...researcherData,
      degrees: [...researcherData.degrees, { degree: '', institution: '', year: '', field: '' }]
    });
  };

  const removeDegree = (index: number) => {
    setResearcherData({
      ...researcherData,
      degrees: researcherData.degrees.filter((_, i) => i !== index)
    });
  };

  const updateDegree = (index: number, field: string, value: string) => {
    const updated = researcherData.degrees.map((deg, i) => 
      i === index ? { ...deg, [field]: value } : deg
    );
    setResearcherData({ ...researcherData, degrees: updated });
  };

  const addExperience = () => {
    setResearcherData({
      ...researcherData,
      experience: [...researcherData.experience, { position: '', company: '', duration: '', description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    setResearcherData({
      ...researcherData,
      experience: researcherData.experience.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = researcherData.experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setResearcherData({ ...researcherData, experience: updated });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      {user?.role === 'freelancer' && (
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`group w-full px-3 py-4 font-semibold transition-all rounded-xl cursor-pointer touch-manipulation active:scale-95 text-xs sm:text-base hover:scale-105 duration-300 ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <User className="inline-block mr-2 group-hover:scale-110 transition-transform duration-300" size={16} />
              <span className="hidden sm:inline">Basic Profile</span>
              <span className="sm:hidden">Basic</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('researcher')}
              className={`group w-full px-3 py-4 font-semibold transition-all rounded-xl cursor-pointer touch-manipulation active:scale-95 text-xs sm:text-base hover:scale-105 duration-300 ${
                activeTab === 'researcher'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <GraduationCap className="inline-block mr-2 group-hover:scale-110 transition-transform duration-300" size={16} />
              <span className="hidden sm:inline">Researcher Profile</span>
              <span className="sm:hidden">Research</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('account')}
              className={`group w-full px-3 py-4 font-semibold transition-all rounded-xl cursor-pointer touch-manipulation active:scale-95 text-xs sm:text-base hover:scale-105 duration-300 ${
                activeTab === 'account'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <CreditCard className="inline-block mr-2 group-hover:scale-110 transition-transform duration-300" size={16} />
              <span className="hidden sm:inline">Payment Details</span>
              <span className="sm:hidden">Payment</span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
        {activeTab === 'profile' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="text-white" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <User className="text-blue-500" size={16} />
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullname}
                onChange={(e) => setProfileData({ ...profileData, fullname: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 placeholder-gray-500 hover:border-gray-400 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Mail className="inline-block mr-2" size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Phone className="inline-block mr-2" size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+1 234 567 8900"
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="group w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        ) : activeTab === 'researcher' ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Researcher Profile</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={researcherData.firstName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z]*$/.test(value)) {
                      setResearcherData({ ...researcherData, firstName: value });
                      const error = validateField('firstName', value);
                      setValidationErrors({ ...validationErrors, firstName: error });
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${validationErrors.firstName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-400'}`}
                />
                {validationErrors.firstName && <p className="text-xs text-yellow-600 mt-1">{validationErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={researcherData.lastName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z]*$/.test(value)) {
                      setResearcherData({ ...researcherData, lastName: value });
                      const error = validateField('lastName', value);
                      setValidationErrors({ ...validationErrors, lastName: error });
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${validationErrors.lastName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-400'}`}
                />
                {validationErrors.lastName && <p className="text-xs text-yellow-600 mt-1">{validationErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Professional Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={researcherData.title}
                onChange={(e) => {
                  setResearcherData({ ...researcherData, title: e.target.value });
                  const error = validateField('title', e.target.value);
                  setValidationErrors({ ...validationErrors, title: error });
                }}
                placeholder="e.g., PhD in Computer Science, Senior Data Scientist"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${validationErrors.title ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-400'}`}
              />
              {validationErrors.title && <p className="text-xs text-yellow-600 mt-1">{validationErrors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio <span className="text-red-500">*</span></label>
              <textarea
                value={researcherData.bio}
                onChange={(e) => {
                  setResearcherData({ ...researcherData, bio: e.target.value });
                  const error = validateField('bio', e.target.value);
                  setValidationErrors({ ...validationErrors, bio: error });
                }}
                placeholder="Brief description of your research background and expertise (50-500 characters)..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${validationErrors.bio ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-400'}`}
              />
              {validationErrors.bio && <p className="text-xs text-yellow-600 mt-1">{validationErrors.bio}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Technical Skills <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2 mb-2">
                {researcherData.skills.map(skill => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <select
                value=""
                onChange={(e) => handleSkillSelect(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ appearance: 'auto' }}
              >
                <option value="">Select skills</option>
                {skillOptions.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              {validationErrors.skills && <p className="text-xs text-yellow-600 mt-1">{validationErrors.skills}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Expertise Areas <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2 mb-2">
                {researcherData.expertise.map(expertise => (
                  <span key={expertise} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {expertise}
                    <button type="button" onClick={() => removeExpertise(expertise)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <select
                value=""
                onChange={(e) => handleExpertiseSelect(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ appearance: 'auto' }}
              >
                <option value="">Select expertise areas</option>
                {expertiseOptions.map(expertise => (
                  <option key={expertise} value={expertise}>{expertise}</option>
                ))}
              </select>
              {validationErrors.expertise && <p className="text-xs text-yellow-600 mt-1">{validationErrors.expertise}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Research Areas <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2 mb-2">
                {researcherData.researchAreas.map(area => (
                  <span key={area} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {area}
                    <button type="button" onClick={() => removeResearchArea(area)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <select
                value=""
                onChange={(e) => handleResearchAreaSelect(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ appearance: 'auto' }}
              >
                <option value="">Select research areas</option>
                {researchAreaOptions.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {validationErrors.researchAreas && <p className="text-xs text-yellow-600 mt-1">{validationErrors.researchAreas}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-gray-700">Academic Degrees</label>
                <button
                  type="button"
                  onClick={addDegree}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm"
                >
                  <Plus size={16} /> Add Degree
                </button>
              </div>
              {researcherData.degrees.map((degree, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <GraduationCap className="text-blue-500" size={20} />
                    {researcherData.degrees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDegree(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={degree.degree}
                      onChange={(e) => updateDegree(index, 'degree', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Masters">Masters</option>
                      <option value="Bachelors">Bachelors</option>
                    </select>
                    <input
                      type="text"
                      value={degree.institution}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(value)) {
                          updateDegree(index, 'institution', value);
                        }
                      }}
                      placeholder="Institution (letters only, min 3 chars)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={degree.field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(value)) {
                          updateDegree(index, 'field', value);
                        }
                      }}
                      placeholder="Field of Study (letters only, min 5 chars)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={degree.year}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          updateDegree(index, 'year', value);
                        }
                      }}
                      inputMode="numeric"
                      placeholder="Year (numbers only)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-gray-700">Professional Experience</label>
                <button
                  type="button"
                  onClick={addExperience}
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm"
                >
                  <Plus size={16} /> Add Experience
                </button>
              </div>
              {researcherData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Briefcase className="text-blue-500" size={20} />
                    {researcherData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z]/.test(value)) {
                          updateExperience(index, 'position', value);
                        }
                      }}
                      placeholder="Position / Role (min 3 chars, start with letter)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[a-zA-Z]/.test(value)) {
                          updateExperience(index, 'company', value);
                        }
                      }}
                      placeholder="Company / Organization (min 3 chars, start with letter)"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-9-]*$/.test(value)) {
                        updateExperience(index, 'duration', value);
                      }
                    }}
                    placeholder="Duration (e.g., 2020-2023, numbers and dash only)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^[a-zA-Z]/.test(value)) {
                        updateExperience(index, 'description', value);
                      }
                    }}
                    placeholder="Brief description (min 5 chars, start with letter)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hourly Rate (USD) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={researcherData.hourlyRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setResearcherData({ ...researcherData, hourlyRate: value });
                      const error = validateField('hourlyRate', value);
                      setValidationErrors({ ...validationErrors, hourlyRate: error });
                    }
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="50"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${validationErrors.hourlyRate ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-400'}`}
                />
                {validationErrors.hourlyRate && <p className="text-xs text-yellow-600 mt-1">{validationErrors.hourlyRate}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Availability <span className="text-red-500">*</span></label>
                <select
                  value={researcherData.availability}
                  onChange={(e) => setResearcherData({ ...researcherData, availability: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">On-demand</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleResearcherProfileUpdate}
              disabled={researcherLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {researcherLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Researcher Profile
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>
            {!hasBankAccount && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Payment Information</strong>
                  <br />
                  Add your preferred payment details to receive payments from clients worldwide.
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <User className="inline-block mr-2" size={16} />
                Account Holder Name
              </label>
              <input
                type="text"
                value={bankData.accountHolderName}
                onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Building className="inline-block mr-2" size={16} />
                Bank Name
              </label>
              <input
                type="text"
                value={bankData.bankName}
                onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Bank name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Hash className="inline-block mr-2" size={16} />
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Code className="inline-block mr-2" size={16} />
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={bankData.ifscCode}
                  onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="SBIN0001234"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Account Type</label>
              <select
                value={bankData.accountType}
                onChange={(e) => setBankData({ ...bankData, accountType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Wallet className="inline-block mr-2" size={16} />
                UPI ID (Optional)
              </label>
              <input
                type="text"
                value={bankData.upiId}
                onChange={(e) => setBankData({ ...bankData, upiId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="yourname@paytm"
              />
            </div>

            <button
              onClick={handleBankAccountUpdate}
              disabled={bankLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bankLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  {hasBankAccount ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Save size={20} />
                  {hasBankAccount ? 'Update Payment Details' : 'Save Payment Details'}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
