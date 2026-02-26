import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Save, CreditCard, Building, Hash, Code, Wallet, Plus, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, getBankAccount, updateBankAccount, getResearcherProfile, updateResearcherProfile } from '../../services/api';
import toast from 'react-hot-toast';

interface ProfileViewPopupProps {
  onClose: () => void;
}

export default function ProfileViewPopup({ onClose }: ProfileViewPopupProps) {
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

  // Researcher profile data
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
    // Check if at least some payment information is provided
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

  const addSkill = () => {
    if (currentSkill && !researcherData.skills.includes(currentSkill)) {
      setResearcherData({ ...researcherData, skills: [...researcherData.skills, currentSkill] });
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResearcherData({ ...researcherData, skills: researcherData.skills.filter(s => s !== skill) });
  };

  const addExpertise = () => {
    if (currentExpertise && !researcherData.expertise.includes(currentExpertise)) {
      setResearcherData({ ...researcherData, expertise: [...researcherData.expertise, currentExpertise] });
      setCurrentExpertise('');
    }
  };

  const removeExpertise = (expertise: string) => {
    setResearcherData({ ...researcherData, expertise: researcherData.expertise.filter(e => e !== expertise) });
  };

  const addResearchArea = () => {
    if (currentResearchArea && !researcherData.researchAreas.includes(currentResearchArea)) {
      setResearcherData({ ...researcherData, researchAreas: [...researcherData.researchAreas, currentResearchArea] });
      setCurrentResearchArea('');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.fullname} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-lg sm:text-2xl font-bold text-[#2D6CDF]">
                    {user?.fullname.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{user?.fullname}</h2>
                <p className="text-blue-100 capitalize text-sm sm:text-base">{user?.role}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors self-start sm:self-center flex-shrink-0">
              <X size={24} className="sm:hidden" />
              <X size={28} className="hidden sm:block" />
            </button>
          </div>
        </div>

        {/* Tabs - Only show for freelancers */}
        {user?.role === 'freelancer' && (
          <div className="border-b border-gray-200 px-4 sm:px-8">
            <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 sm:px-6 py-3 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'profile'
                    ? 'text-[#2D6CDF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="inline-block mr-1 sm:mr-2" size={16} />
                <span className="hidden sm:inline">Basic Profile</span>
                <span className="sm:hidden">Profile</span>
                {activeTab === 'profile' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6CDF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('researcher')}
                className={`px-3 sm:px-6 py-3 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'researcher'
                    ? 'text-[#2D6CDF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <GraduationCap className="inline-block mr-1 sm:mr-2" size={16} />
                <span className="hidden sm:inline">Researcher Profile</span>
                <span className="sm:hidden">Research</span>
                {activeTab === 'researcher' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6CDF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-3 sm:px-6 py-3 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                  activeTab === 'account'
                    ? 'text-[#2D6CDF]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CreditCard className="inline-block mr-1 sm:mr-2" size={16} />
                <span className="hidden sm:inline">Payment Details</span>
                <span className="sm:hidden">Payment</span>
                {activeTab === 'account' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D6CDF]"></div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'profile' ? (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <User className="inline-block mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullname}
                  onChange={(e) => setProfileData({ ...profileData, fullname: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] text-sm sm:text-base"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Mail className="inline-block mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] text-sm sm:text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Phone className="inline-block mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] text-sm sm:text-base"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          ) : activeTab === 'researcher' ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">First Name</label>
                  <input
                    type="text"
                    value={researcherData.firstName}
                    onChange={(e) => setResearcherData({ ...researcherData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Last Name</label>
                  <input
                    type="text"
                    value={researcherData.lastName}
                    onChange={(e) => setResearcherData({ ...researcherData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Professional Title</label>
                <input
                  type="text"
                  value={researcherData.title}
                  onChange={(e) => setResearcherData({ ...researcherData, title: e.target.value })}
                  placeholder="e.g., PhD in Computer Science, Senior Data Scientist"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Professional Bio</label>
                <textarea
                  value={researcherData.bio}
                  onChange={(e) => setResearcherData({ ...researcherData, bio: e.target.value })}
                  placeholder="Brief description of your research background and expertise..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Technical Skills</label>
                <div className="flex gap-2 mb-3">
                  <select
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  >
                    <option value="">Select skills</option>
                    {skillOptions.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-3 bg-[#2D6CDF] text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {researcherData.skills.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Expertise Areas</label>
                <div className="flex gap-2 mb-3">
                  <select
                    value={currentExpertise}
                    onChange={(e) => setCurrentExpertise(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  >
                    <option value="">Select expertise areas</option>
                    {expertiseOptions.map(expertise => (
                      <option key={expertise} value={expertise}>{expertise}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="px-4 py-3 bg-[#2D6CDF] text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {researcherData.expertise.map(expertise => (
                    <span key={expertise} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {expertise}
                      <button type="button" onClick={() => removeExpertise(expertise)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Research Areas</label>
                <div className="flex gap-2 mb-3">
                  <select
                    value={currentResearchArea}
                    onChange={(e) => setCurrentResearchArea(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  >
                    <option value="">Select research areas</option>
                    {researchAreaOptions.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addResearchArea}
                    className="px-4 py-3 bg-[#2D6CDF] text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {researcherData.researchAreas.map(area => (
                    <span key={area} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {area}
                      <button type="button" onClick={() => removeResearchArea(area)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-bold text-[#1F1F1F]">Academic Degrees</label>
                  <button
                    type="button"
                    onClick={addDegree}
                    className="text-[#2D6CDF] hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} /> Add Degree
                  </button>
                </div>
                {researcherData.degrees.map((degree, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <GraduationCap className="text-[#2D6CDF]" size={20} />
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
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      >
                        <option value="">Select Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Masters">Masters</option>
                        <option value="Bachelors">Bachelors</option>
                      </select>
                      <input
                        type="text"
                        value={degree.institution}
                        onChange={(e) => updateDegree(index, 'institution', e.target.value)}
                        placeholder="Institution"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                      <input
                        type="text"
                        value={degree.field}
                        onChange={(e) => updateDegree(index, 'field', e.target.value)}
                        placeholder="Field of Study"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                      <input
                        type="text"
                        value={degree.year}
                        onChange={(e) => updateDegree(index, 'year', e.target.value)}
                        placeholder="Year"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-bold text-[#1F1F1F]">Professional Experience</label>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="text-[#2D6CDF] hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} /> Add Experience
                  </button>
                </div>
                {researcherData.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Briefcase className="text-[#2D6CDF]" size={20} />
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
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        placeholder="Position / Role"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Company / Organization"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                      />
                    </div>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Duration (e.g., 2020–2023)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] mb-3"
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Brief description of responsibilities and achievements"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Hourly Rate (USD)</label>
                  <input
                    type="number"
                    value={researcherData.hourlyRate}
                    onChange={(e) => setResearcherData({ ...researcherData, hourlyRate: e.target.value })}
                    placeholder="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Availability</label>
                  <select
                    value={researcherData.availability}
                    onChange={(e) => setResearcherData({ ...researcherData, availability: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">On-demand</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  />
                </div>
              </div>

              <button
                onClick={handleResearcherProfileUpdate}
                disabled={researcherLoading}
                className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {!hasBankAccount && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Payment Information</strong>
                    <br />
                    Add your preferred payment details to receive payments from clients worldwide.
                    All fields are optional - provide the information that works best for you.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-600 italic">
                  <strong>Note:</strong> All fields are optional. Provide the payment method that works for your country.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <User className="inline-block mr-2" size={16} />
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={bankData.accountHolderName}
                  onChange={(e) => setBankData({ ...bankData, accountHolderName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="John Doe"
                />
                <p className="text-xs text-gray-500 mt-1">Your full name as registered with your bank</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  <Building className="inline-block mr-2" size={16} />
                  Bank Name / Payment Service
                </label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                  placeholder="e.g., State Bank, PayPal, Payoneer, Wise"
                />
                <p className="text-xs text-gray-500 mt-1">Bank name or payment service provider</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Hash className="inline-block mr-2" size={16} />
                    Account Number / IBAN
                  </label>
                  <input
                    type="text"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="1234567890 or IBAN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Code className="inline-block mr-2" size={16} />
                    IFSC / SWIFT / Routing Code
                  </label>
                  <input
                    type="text"
                    value={bankData.ifscCode}
                    onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="SBIN0001234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                  Account Type
                </label>
                <select
                  value={bankData.accountType}
                  onChange={(e) => setBankData({ ...bankData, accountType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                >
                  <option value="">Select Account Type (Optional)</option>
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700 font-semibold mb-3">Alternative Payment Methods</p>
                <div>
                  <label className="block text-sm font-bold text-[#1F1F1F] mb-2">
                    <Wallet className="inline-block mr-2" size={16} />
                    UPI ID / PayPal Email / Other
                  </label>
                  <input
                    type="text"
                    value={bankData.upiId}
                    onChange={(e) => setBankData({ ...bankData, upiId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]"
                    placeholder="yourname@paytm, email@paypal.com, or other ID"
                  />
                  <p className="text-xs text-gray-500 mt-1">UPI ID, PayPal email, Payoneer, Wise, or any payment ID</p>
                </div>
              </div>

              <button
                onClick={handleBankAccountUpdate}
                disabled={bankLoading}
                className="w-full bg-[#2D6CDF] text-white py-3 rounded-xl font-bold hover:bg-[#1F1F1F] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
