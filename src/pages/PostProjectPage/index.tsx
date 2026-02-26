import { useState, useEffect, useRef } from 'react';
import { FileText, Users, CheckCircle, Lock, Shield, DollarSign, PenTool, BookOpen, Briefcase, TrendingUp, Lightbulb, Pencil, Beaker, Brain, Database, Dna, FlaskConical, Atom, Rocket, Target, Award, GraduationCap, Globe, Microscope, Code, Star, Heart, Eye, Search, Sparkles, Zap } from 'lucide-react';
import { postProjectFromLanding } from '../../services/projectService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser as apiLoginUser } from '../../services/api';
import { motion } from 'framer-motion';
import DragonAnimation from '../../components/DragonAnimation';
import {
  validateProjectTitle,
  validateProjectDescription,
  validateBudget,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePincode,
  validatePhoneNumber,
  validateCity,
  validateZipCode,
  validateEmail
} from '../../utils/validation';

export default function PostProjectPage() {
  const { setUser, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .dual-range-slider { position: relative; height: 24px; }
      .dual-range-slider input[type="range"] { position: absolute; width: 100%; height: 8px; background: transparent; -webkit-appearance: none; -moz-appearance: none; appearance: none; pointer-events: auto; outline: none; }
      /* Make the min thumb initially above the max so it's clickable; active one will be raised */
      .dual-range-slider input[type="range"].range-min { z-index: 3; }
      .dual-range-slider input[type="range"].range-max { z-index: 2; }
      .dual-range-slider input[type="range"]:active { z-index: 4; }
      .dual-range-slider input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; cursor: pointer; pointer-events: auto; border: none; box-shadow: none; }
      .dual-range-slider input[type="range"]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; cursor: pointer; pointer-events: auto; border: none; box-shadow: none; }
      .dual-range-slider .range-track { position: absolute; top: 8px; width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; }
      .dual-range-slider .range-fill { position: absolute; top: 8px; height: 8px; background: #3b82f6; border-radius: 4px; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const bringToFront = (which: 'min' | 'max') => {
    if (minRef.current) minRef.current.style.zIndex = which === 'min' ? '4' : '3';
    if (maxRef.current) maxRef.current.style.zIndex = which === 'max' ? '4' : '2';
  };
  const [privacyOption, setPrivacyOption] = useState<'all' | 'invitation' | 'internal'>('all');

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedDeliverable, setSelectedDeliverable] = useState<string>('');
  const [lengthValue, setLengthValue] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<'words' | 'pages'>('words');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedMainExpertise, setSelectedMainExpertise] = useState<string>('');
  const [industryName, setIndustryName] = useState<string>('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showAllExpertise, setShowAllExpertise] = useState(false);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllDeliverables, setShowAllDeliverables] = useState(false);
  const [customExpertise, setCustomExpertise] = useState('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [feeType, setFeeType] = useState<'fixed' | 'hourly'>('fixed');
  const [budgetRange, setBudgetRange] = useState<string>('500-10000000');
  const [promoCode, setPromoCode] = useState<string>('');
  const [hiringTimeline, setHiringTimeline] = useState<string>('');
  const [importantFactors, setImportantFactors] = useState<string[]>([]);
  const [billingType, setBillingType] = useState<'individual' | 'business'>('individual');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [country, setCountry] = useState<string>('United States');
  const [vatNumber, setVatNumber] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [expertInvitation, setExpertInvitation] = useState<string>('self');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [minBudget, setMinBudget] = useState<string>('500');
  const [maxBudget, setMaxBudget] = useState<string>('1000000');

  const countryStates: { [key: string]: string[] } = {
    'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Canada': ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'],
    'India': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
  };

  const countryFlags: { [key: string]: string } = {
    '+1': '🇺🇸',
    '+44': '🇬🇧',
    '+91': '🇮🇳',
    '+61': '🇦🇺',
    '+86': '🇨🇳'
  };

  const validateField = (field: string, value: string): string => {
    let result;
    switch (field) {
      case 'firstName':
        result = validateFirstName(value);
        return result.valid ? '' : result.error || '';
      case 'lastName':
        result = validateLastName(value);
        return result.valid ? '' : result.error || '';
      case 'email':
        result = validateEmail(value);
        return result.valid ? '' : result.error || '';
      case 'password':
        result = validatePassword(value);
        return result.valid ? '' : result.error || '';
      case 'projectTitle':
        result = validateProjectTitle(value);
        return result.valid ? '' : result.error || '';
      case 'projectDescription':
        result = validateProjectDescription(value);
        return result.valid ? '' : result.error || '';
      case 'phoneNumber':
        result = validatePhoneNumber(value);
        return result.valid ? '' : result.error || '';
      case 'zipCode':
        result = validateZipCode(value);
        return result.valid ? '' : result.error || '';
      case 'city':
        result = validateCity(value);
        return result.valid ? '' : result.error || '';
      case 'minBudget':
      case 'maxBudget':
        const numValue = parseInt(value) || 0;
        const min = field === 'minBudget' ? numValue : parseInt(minBudget);
        const max = field === 'maxBudget' ? numValue : parseInt(maxBudget);
        result = validateBudget(min, max);
        return result.valid ? '' : result.error || '';
      default:
        return '';
    }
  };

  const categories = [
    { id: 'writing', name: 'Writing', icon: PenTool },
    { id: 'research', name: 'Research', icon: BookOpen },
    { id: 'consulting', name: 'Consulting', icon: Briefcase },
    { id: 'data-ai', name: 'Data & AI', icon: TrendingUp },
    { id: 'product-dev', name: 'Product Development', icon: Lightbulb }
  ];

  const writingTypes = [
    'Copywriting', 'Translation', 'Clinical Research Writing', 'Technical Writing', 'Medical Writing',
    'Content Review & Editing', 'Corporate & Legal Documentation', 'Journalistic & Media Writing', 'Creative & Storytelling Content',
    'Non-Medical Regulatory Writing', 'Audio-to-Text Services', 'SEO & Search Content', 'Business Reports'
  ];

  const writingActivities = [
    'Proofreading', 'Social Media Copy', 'Editing', 'Content', 'UX Copy', 'Taglines & Slogans',
    'Brochure', 'Email', 'Product Guide/User Handbook', 'Marketing Copy', 'Blog Post', 'Reports', 'Manuals', 'Summaries',
    'Writing', 'Newsletter', 'SEO Writing', 'Web Copy', 'Other', 'Landing Pages', 'Scripts'
  ];

  const researchTypes = [
    'Systematic Literature Review', 'Technology Foresight', 'Feasibility Analysis', 'Research Assessment', 'Secondary Research', 'Gap Analysis', 'Gray Literature Search', 'Market Intelligence', 'User Insights',
    'Scientific and Technical Research',
    'Content Verification', 'Trend Analysis', 'Policy & Standards Review', 'Competitive Analysis', 'Market Research'
  ];

  const marketResearchActivities = [
    'Survey Architecture',
    'Focus Group Facilitation',
    'Audience Segmentation',
    'Journey & Flow Mapping',
    'Survey Insights Analysis',
    'Persona Development',
    'In-Depth User Interviews',
    'Pricing Sensitivity Analysis',
    'Behavioral Observation',
    'Contextual Research',
    'Market Sizing & Forecasting',
    'Insight Clustering',
    'Choice Modeling Analysis'
  ];


  const marketResearchDeliverables = ['Report', 'Survey'];

  const researchDeliverables = ['Report'];

  const consultingTypes = [
    'Scientific & Technical Advisory',
    'Manufacturing Advisory',
    'Business Strategy Advisory',
    'Regulatory & Compliance Advisory',
    'Legal Advisory Services',
    'Operational Excellence Consulting',
    'Healthcare Strategy Advisory',
    'Digital Transformation Strategy',
    'Financial Strategy Advisory',
    'Go-to-Market Advisory'
  ]

  const consultingDeliverables = ['Written Report', 'Phone or Video Call', 'Workshop or Webinar', 'Slide Deck', 'Executive Summary', 'Action Plan'];

  const dataAiTypes = [
    'Natural Language Processing', 'Image Processing', 'Strategic Insights'
    , 'Data Cleaning', 'Data Visualization', 'Data Processing', 'Algorithm Design-ML',
    'Text Mining & Analytics', 'Statistical Analysis', 'Algorithm Design-Non ML', 'Image Analysis',
    'Big Data Analytics', 'Predictive Modeling', 'Data Mining', 'MLOps & Model Monitoring', 'Generative AI Solutions'
  ];

  const imageAnalysisTechniques = [
    'Clustering Analysis',
    'Similarity Measures',
    'Decision Tree Analysis',
    'Minimum Spanning Tree Analysis',
    'Statistical Image Analysis'
  ];

  const dataCleaningActivities = [
    'Sorting Data',
    'Machine Translation',
    'Data Type Conversion',
    'Handling Missing Values',
    'Removing Irrelevant Data',
    'Formatting Cleanup',
    'Error Correction',
    'Standardizing Capitalization'
  ];

  const dataProcessingActivities = [
    'Sorting Data',
    'Standardization',
    'Validation',
    'Computational Operations'
  ];

  const algorithmDesignMLTechniques = [
    'Neural Networks',
    'Decision Tree Models',
    'Support Vector Machines',
    'Gaussian Mixture Models',
    'K-Nearest Neighbors'
  ];

  const textMiningTechniques = [
    'Text Summarization',
    'Natural Language Processing (NLP)',
    'Information Retrieval',
    'Information Extraction',
    'Text Categorization',
    'Text Clustering',
    'Text Visualization'
  ];

  const statisticalActivities = [
    'Regression Modeling',
    'Mean Estimation',
    'Sample Size Calculation',
    'Standard Deviation Analysis',
    'Hypothesis Testing'
  ];

  const algorithmDesignNonMLTechniques = [
    'Divide and Conquer',
    'Dynamic Programming',
    'Greedy Algorithms',
    'Genetic Algorithms',
    'Brute Force Methods',
    'Backtracking Techniques',
    'Transform and Conquer'
  ];

  const imageProcessingTechniques = [
    'Image Generation (GANs)',
    'Image Restoration',
    'Template Matching',
    'Pixelation',
    'Linear Filtering',
    'Independent Component Analysis'
  ];

  const bigDataAnalyticsTechniques = [
    'Regression Modeling',
    'Association Rule Learning',
    'Genetic Algorithms',
    'Classification Tree Analysis'
  ];

  const dataVisualizationTechniques = [
    'Infographics',
    'Dashboards',
    'Charts',
    'Tables',
    'Maps',
    'Graphs'
  ];

  const predictiveModelingTechniques = [
    'Neural Networks',
    'Gradient Boosting Models',
    'Forecasting Models',
    'Prophet Models',
    'Classification Models',
    'Time Series Models',
    'Clustering Models',
    'Decision Tree Models',
    'General Linear Models',
    'Outlier Detection Models'
  ];

  const dataMiningTechniques = [
    'Predictive Regression Modeling',
    'Association Pattern Discovery',
    'Sequential Behavior Analysis',
    'Classification Modeling',
    'Anomaly Detection'
  ];


  const productDevTypes = [
    'Product Validation',
    'Concept Development',
    'Quality Assurance & Control (QA/QC)',
    'Product Compliance',
    'Packaging & Design',
    'Reverse Engineering',
    'Formulation',
    'Material Sourcing',
    'Recipe Development',
    'Prototyping & Modeling',
    'Stability & Shelf-Life Testing',
    'Manufacturing Support',
    'Product Evaluation & Testing',
    'Device Fabrication',
    'Product Launch Support',
    'Process Optimization',
    'Pilot Production',
    'Innovation & Ideation',
    'Regulatory Documentation',
    'Supply Chain Coordination'
  ];


  const productDevActivities = [
    'Ship a Sample or Prototype',
    'Consulting Call',
    'Lab Work',
    'Pilot Production',
    'Product Testing',
    'Formulation Experiments',
    'Packaging Review',
    'Stability Testing',
    'Design Iteration',
    'Regulatory Consultation'
  ];

  const deliverables = ['Section of document', 'Draft', 'Full document'];

  const expertiseOptions = [
    'Bioinformatics',
    'Cancer Biology',
    'Data Science & Analytics',
    'Artificial Intelligence',
    'Neuroscience',
    'Pharmacology & Drug Development',
    'Clinical Medicine',
    'Environmental Science',
    'Molecular Biology',
    'Microbiology',
    'Genetics & Genomics',
    'Computer Science',
    'Mathematics & Statistics',
    'Clinical Research',
    'Public Health & Policy',
    'Chemistry',
    'Theoretical Physics',
    'Immunology',
    'Biomedical Engineering',
    'Biotechnology & Life Sciences'
  ];


  const researchExpertiseOptions = [
    'Molecular Biology',
    'Public Health',
    'Genetics',
    'Neuroscience',
    'Psychology',
    'Biochemistry',
    'Clinical Research',
    'Epidemiology',
    'Medicine',
    'Pharmacology',
    'Biotechnology',
    'Data Science',
    'Physics',
    'Behavioral Science',
    'Environmental Science',
    'Immunology',
    'Cancer Biology'
  ];


  const consultingExpertiseOptions = [
    'Molecular Biology',
    'Genetics',
    'Materials Science & Engineering',
    'Microbiology',
    'Food Science & Technology',
    'Biotechnology',
    'Cosmetic & Skincare Formulation',
    'Chemistry',
    'Pharmaceutical Development',
    'Biomedical Engineering',
    'Environmental Science',
    'Process Optimization',
    'Clinical Research Consulting',
    'Nanotechnology',
    'Regulatory Compliance'
  ];


  const dataAiExpertiseOptions = [
    'Machine Learning',
    'Computer Vision',
    'Bioinformatics',
    'Artificial Intelligence',
    'Applied Mathematics',
    'Data Analysis',
    'Software Engineering',
    'Statistics',
    'Deep Learning',
    'Natural Language Processing (NLP)',
    'Data Engineering',
    'Big Data Analytics',
    'Predictive Modeling',
    'Reinforcement Learning',
    'Healthcare Data Analytics',
    'Neural Networks',
    'Data Visualization',
    'Optimization Algorithms'
  ];


  const productDevExpertiseOptions = [
    'Formulation',
    'Genetics',
    'Medical Devices',
    'Food Science & Technology',
    'Engineering Design',
    'Biopolymers',
    'Skin Care & Cosmetology',
    'Chemistry',
    'Pharmaceutical Formulation',
    'Biotechnology',
    'Materials Science & Engineering',
    'Product Innovation',
    'Process Engineering',
    'Regulatory Compliance',
    'Packaging & Shelf-Life Design'
  ];


  // const psychologySubFields = [];

  const industries = [
    'Academia', 'Accounting', 'Aerospace', 'Agriculture', 'Automotive', 'Aviation',
    'Biotech & Life Sciences', 'Chemicals', 'Consumer Goods & Retail', 'Defence & Military',
    'Education', 'Electronics', 'Energy', 'Entertainment', 'Environmental & Waste Management',
    'Fashion', 'Financial Services', 'Food & Beverage', 'Government', 'Healthcare & Medicine',
    'Hospitality', 'In vitro Diagnostics', 'Information Technology', 'Law & Legal',
    'Logistics & Supply Chain', 'Marketing & Advertising', 'Medical Devices',
    'Medical Equipment & Supplies', 'Mining & Metals', 'Pharmaceuticals',
    'Philanthropy & Fundraising', 'Publishing', 'Real Estate & Construction',
    'Staffing & Recruiting', 'Telecommunications', 'Textiles', 'Transportation',
    'Travel & Tourism', 'Utilities', 'Veterinary'
  ];

  const removeExpertise = (expertiseToRemove: string) => {
    setSelectedExpertise(selectedExpertise.filter(e => e !== expertiseToRemove));
  };

  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter(e => e !== expertise));
    } else {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };

  const addCustomExpertise = () => {
    if (customExpertise.trim() && !selectedExpertise.includes(customExpertise.trim())) {
      setSelectedExpertise([...selectedExpertise, customExpertise.trim()]);
      setCustomExpertise('');
    }
  };

  const toggleFactor = (factor: string) => {
    if (importantFactors.includes(factor)) {
      setImportantFactors(importantFactors.filter(f => f !== factor));
    } else {
      setImportantFactors([...importantFactors, factor]);
    }
  };

  const handleAuthenticatedSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Use authenticated user's data and existing project creation API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/project/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: projectTitle,
          introduction: projectDescription.substring(0, 200),
          detailedRequirements: projectDescription,
          skills: selectedExpertise,
          deliverables: selectedDeliverable || 'As specified',
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
          budgetMin: parseInt(budgetRange.split('-')[0]),
          budgetMax: parseInt(budgetRange.split('-')[1]),
          category: selectedCategory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
      } else {
        throw new Error(data.message || 'Failed to create project');
      }
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Privacy & Category', icon: Shield },
    { number: 2, title: 'Project Details', icon: FileText },
    { number: 3, title: 'Expertise & Budget', icon: DollarSign },
    { number: 4, title: isAuthenticated ? 'Timeline' : 'User & Timeline', icon: Users },
    ...(isAuthenticated ? [] : [{ number: 5, title: 'Billing & Submit', icon: CheckCircle }])
  ];

  // Floating icons configuration - 24 icons covering the entire page
  const floatingIcons = [
    { Icon: Beaker, color: 'text-blue-400', size: 32, opacity: 0.15 },
    { Icon: Brain, color: 'text-purple-400', size: 28, opacity: 0.18 },
    { Icon: Database, color: 'text-green-400', size: 30, opacity: 0.16 },
    { Icon: Dna, color: 'text-pink-400', size: 34, opacity: 0.15 },
    { Icon: FileText, color: 'text-indigo-400', size: 26, opacity: 0.19 },
    { Icon: FlaskConical, color: 'text-cyan-400', size: 30, opacity: 0.17 },
    { Icon: Atom, color: 'text-orange-400', size: 32, opacity: 0.16 },
    { Icon: Rocket, color: 'text-red-400', size: 28, opacity: 0.18 },
    { Icon: Target, color: 'text-yellow-400', size: 30, opacity: 0.15 },
    { Icon: Award, color: 'text-emerald-400', size: 26, opacity: 0.19 },
    { Icon: GraduationCap, color: 'text-violet-400', size: 32, opacity: 0.17 },
    { Icon: Globe, color: 'text-teal-400', size: 28, opacity: 0.16 },
    { Icon: Microscope, color: 'text-blue-500', size: 30, opacity: 0.17 },
    { Icon: Code, color: 'text-purple-500', size: 28, opacity: 0.18 },
    { Icon: Lightbulb, color: 'text-yellow-500', size: 32, opacity: 0.15 },
    { Icon: BookOpen, color: 'text-blue-600', size: 30, opacity: 0.18 },
    { Icon: Briefcase, color: 'text-gray-400', size: 28, opacity: 0.16 },
    { Icon: TrendingUp, color: 'text-green-500', size: 32, opacity: 0.17 },
    { Icon: Sparkles, color: 'text-pink-500', size: 26, opacity: 0.19 },
    { Icon: Zap, color: 'text-yellow-600', size: 30, opacity: 0.15 },
    { Icon: Star, color: 'text-amber-400', size: 28, opacity: 0.18 },
    { Icon: Heart, color: 'text-rose-400', size: 26, opacity: 0.16 },
    { Icon: Eye, color: 'text-indigo-500', size: 30, opacity: 0.17 },
    { Icon: Search, color: 'text-slate-400', size: 28, opacity: 0.18 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden pt-20">
      {/* Floating Icons Background - Fixed positioning covering entire page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const IconComponent = item.Icon;
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;

          return (
            <motion.div
              key={i}
              className={`absolute ${item.color}`}
              style={{
                opacity: item.opacity,
                left: `${startX}%`,
                top: `${startY}%`,
              }}
              animate={{
                x: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                y: [
                  0,
                  (Math.random() - 0.5) * 400,
                  (Math.random() - 0.5) * 400,
                  0
                ],
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <IconComponent size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="flex flex-col lg:flex-row relative z-10">
        {/* Main Content */}
        <div className="flex-1 flex justify-center lg:pr-80">
          <div className="w-full max-w-3xl px-3 sm:px-4 py-3 sm:py-6">

            {/* Mobile Sidebar - Show benefits on mobile */}
            <div className="lg:hidden mb-6">
              {currentStep <= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={20} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Why Choose Xperthiring?</h3>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 text-gray-900">Privacy Guaranteed</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Control who views your project and invite only trusted, top-rated freelancers.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 text-gray-900">Work That Delivers</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Partner with freelancers at every stage to get results you're happy with.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <DollarSign size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 text-gray-900">Pay Your Way</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Opt for hourly or project-based payments and finalize costs after freelancer discussions.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${currentStep === step.number
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ring-4 ring-blue-200'
                          : currentStep > step.number
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                            : 'bg-white text-gray-600 border-2 border-gray-300'
                          }`}>
                        {currentStep > step.number ? '✓' : step.number}
                      </motion.div>
                      <span className="text-xs mt-1 text-center hidden sm:block font-medium text-gray-700">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 flex-1 mx-1 rounded-full transition-all duration-500 ${currentStep > step.number ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-300'
                        }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-3 sm:p-4 overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {currentStep === 1 && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Privacy & Category</h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Customize your privacy settings and indicate what you need.
                  </p>

                  {/* Privacy Section */}
                  <h3 className="text-base font-bold text-gray-900 mb-3">Your Privacy Matters</h3>

                  <div className="space-y-2 sm:space-y-3 mb-4">
                    {/* All Experts Option */}
                    <div
                      onClick={() => setPrivacyOption('all')}
                      className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${privacyOption === 'all'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${privacyOption === 'all'
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                          }`}>
                          {privacyOption === 'all' && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="text-gray-700" size={16} />
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900">All Xperthiring Experts</h3>
                          </div>
                          <p className="text-xs text-gray-600">
                            My job post will be visible to all registered experts on the Xperthiring platform.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Invitation Only Option */}
                    <div
                      onClick={() => setPrivacyOption('invitation')}
                      className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${privacyOption === 'invitation'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${privacyOption === 'invitation'
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                          }`}>
                          {privacyOption === 'invitation' && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="text-gray-700" size={16} />
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Invitation Only</h3>
                          </div>
                          <p className="text-xs text-gray-600">
                            Only experts who I invite will be able to see my job post.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Internal Team Only Option */}
                    <div
                      onClick={() => setPrivacyOption('internal')}
                      className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${privacyOption === 'internal'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${privacyOption === 'internal'
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-gray-300'
                          }`}>
                          {privacyOption === 'internal' && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="text-gray-700" size={16} />
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Internal Team Only</h3>
                          </div>
                          <p className="text-xs text-gray-600">
                            Only members of my internal team will be able to view this job post.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Terms Checkbox */}
                  <div className="mb-4">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-700">
                        I confirm that I have read and agree to the{' '}
                        <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      </span>
                    </label>
                  </div>

                  {/* Category Section */}
                  <h3 className="text-base font-bold text-gray-900 mb-3">What kind of expert are you looking for?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-400 hover:shadow-md ${selectedCategory === category.id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200'
                          }`}
                      >
                        <category.icon
                          size={24}
                          className={`mb-1.5 sm:mb-2 ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                            }`}
                        />
                        <span className={`text-xs font-semibold text-center ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                          {category.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={!agreedToTerms || !selectedCategory}
                    onClick={() => setCurrentStep(2)}
                    className={`w-full py-2.5 px-6 rounded-lg font-semibold transition-all text-sm ${agreedToTerms && selectedCategory
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Next →
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Share details about your project requirements
                  </p>

                  {/* Type Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Type</h3>
                    <div className="flex flex-wrap gap-3">
                      {(selectedCategory === 'writing' ? writingTypes :
                        selectedCategory === 'research' ? researchTypes :
                          selectedCategory === 'consulting' ? consultingTypes :
                            selectedCategory === 'data-ai' ? dataAiTypes :
                              productDevTypes)
                        .slice(0, showAllTypes ? undefined : 4)
                        .map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3 py-2 text-xs sm:text-sm border rounded-lg text-left transition-all ${selectedType === type
                              ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      {(selectedCategory === 'writing' ? writingTypes :
                        selectedCategory === 'research' ? researchTypes :
                          selectedCategory === 'consulting' ? consultingTypes :
                            selectedCategory === 'data-ai' ? dataAiTypes :
                              productDevTypes).length > 4 && (
                          <button
                            onClick={() => setShowAllTypes(!showAllTypes)}
                            className="px-3 py-2 text-xs sm:text-sm border border-blue-300 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
                          >
                            {showAllTypes ? '- Show Less' : `+ ${(selectedCategory === 'writing' ? writingTypes :
                              selectedCategory === 'research' ? researchTypes :
                                selectedCategory === 'consulting' ? consultingTypes :
                                  selectedCategory === 'data-ai' ? dataAiTypes :
                                    productDevTypes).length - 4} More`}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Activity Selection - Conditional */}
                  {((selectedCategory === 'writing') ||
                    (selectedCategory === 'research' && selectedType === 'Market Research') ||
                    (selectedCategory === 'consulting') ||
                    (selectedCategory === 'product-dev') ||
                    (selectedCategory === 'data-ai' && ['Image Analysis', 'Data Cleaning', 'Data Processing', 'Algorithm Design-ML', 'Text Mining & Analytics', 'Statistical Analysis', 'Algorithm Design-Non ML', 'Image Processing', 'Big Data Analytics', 'Data Visualization', 'Predictive Modeling', 'Data Mining'].includes(selectedType))) && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Activity</h3>
                        <div className="flex flex-wrap gap-3">
                          {(selectedCategory === 'writing' ? writingActivities :
                            selectedCategory === 'research' ? marketResearchActivities :
                              selectedCategory === 'consulting' ? ['Consultation', 'Analysis', 'Strategy'] :
                                selectedCategory === 'product-dev' ? productDevActivities :
                                  selectedType === 'Image Analysis' ? imageAnalysisTechniques :
                                    selectedType === 'Data Cleaning' ? dataCleaningActivities :
                                      selectedType === 'Data Processing' ? dataProcessingActivities :
                                        selectedType === 'Algorithm Design-ML' ? algorithmDesignMLTechniques :
                                          selectedType === 'Text Mining & Analytics' ? textMiningTechniques :
                                            selectedType === 'Statistical Analysis' ? statisticalActivities :
                                              selectedType === 'Algorithm Design-Non ML' ? algorithmDesignNonMLTechniques :
                                                selectedType === 'Image Processing' ? imageProcessingTechniques :
                                                  selectedType === 'Big Data Analytics' ? bigDataAnalyticsTechniques :
                                                    selectedType === 'Data Visualization' ? dataVisualizationTechniques :
                                                      selectedType === 'Predictive Modeling' ? predictiveModelingTechniques :
                                                        dataMiningTechniques)
                            .slice(0, showAllActivities ? undefined : 4)
                            .map((activity) => (
                              <button
                                key={activity}
                                onClick={() => setSelectedActivity(activity)}
                                className={`px-3 py-2 text-xs sm:text-sm border rounded-lg text-left transition-all ${selectedActivity === activity
                                  ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                  }`}
                              >
                                {activity}
                              </button>
                            ))}
                          {(selectedCategory === 'writing' ? writingActivities :
                            selectedCategory === 'research' ? marketResearchActivities :
                              selectedCategory === 'consulting' ? ['Consultation', 'Analysis', 'Strategy'] :
                                selectedCategory === 'product-dev' ? productDevActivities :
                                  selectedType === 'Image Analysis' ? imageAnalysisTechniques :
                                    selectedType === 'Data Cleaning' ? dataCleaningActivities :
                                      selectedType === 'Data Processing' ? dataProcessingActivities :
                                        selectedType === 'Algorithm Design-ML' ? algorithmDesignMLTechniques :
                                          selectedType === 'Text Mining & Analytics' ? textMiningTechniques :
                                            selectedType === 'Statistical Analysis' ? statisticalActivities :
                                              selectedType === 'Algorithm Design-Non ML' ? algorithmDesignNonMLTechniques :
                                                selectedType === 'Image Processing' ? imageProcessingTechniques :
                                                  selectedType === 'Big Data Analytics' ? bigDataAnalyticsTechniques :
                                                    selectedType === 'Data Visualization' ? dataVisualizationTechniques :
                                                      selectedType === 'Predictive Modeling' ? predictiveModelingTechniques :
                                                        dataMiningTechniques).length > 4 && (
                              <button
                                onClick={() => setShowAllActivities(!showAllActivities)}
                                className="px-3 py-2 text-xs sm:text-sm border border-blue-300 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
                              >
                                {showAllActivities ? '- Show Less' : `+ ${(selectedCategory === 'writing' ? writingActivities :
                                  selectedCategory === 'research' ? marketResearchActivities :
                                    selectedCategory === 'consulting' ? ['Consultation', 'Analysis', 'Strategy'] :
                                      selectedCategory === 'product-dev' ? productDevActivities :
                                        selectedType === 'Image Analysis' ? imageAnalysisTechniques :
                                          selectedType === 'Data Cleaning' ? dataCleaningActivities :
                                            selectedType === 'Data Processing' ? dataProcessingActivities :
                                              selectedType === 'Algorithm Design-ML' ? algorithmDesignMLTechniques :
                                                selectedType === 'Text Mining & Analytics' ? textMiningTechniques :
                                                  selectedType === 'Statistical Analysis' ? statisticalActivities :
                                                    selectedType === 'Algorithm Design-Non ML' ? algorithmDesignNonMLTechniques :
                                                      selectedType === 'Image Processing' ? imageProcessingTechniques :
                                                        selectedType === 'Big Data Analytics' ? bigDataAnalyticsTechniques :
                                                          selectedType === 'Data Visualization' ? dataVisualizationTechniques :
                                                            selectedType === 'Predictive Modeling' ? predictiveModelingTechniques :
                                                              dataMiningTechniques).length - 4} More`}
                              </button>
                            )}
                        </div>
                      </div>
                    )}

                  {/* Deliverable Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Deliverable</h3>
                    <div className="flex flex-wrap gap-3">
                      {(selectedCategory === 'consulting' ? consultingDeliverables :
                        selectedCategory === 'research' && selectedType === 'Market Research' ? marketResearchDeliverables :
                          selectedCategory === 'research' ? researchDeliverables :
                            deliverables)
                        .slice(0, showAllDeliverables ? undefined : 4)
                        .map((deliverable) => (
                          <button
                            key={deliverable}
                            onClick={() => setSelectedDeliverable(deliverable)}
                            className={`px-3 py-2 text-xs sm:text-sm border rounded-lg text-left transition-all ${selectedDeliverable === deliverable
                              ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                          >
                            {deliverable}
                          </button>
                        ))}
                      {(selectedCategory === 'consulting' ? consultingDeliverables :
                        selectedCategory === 'research' && selectedType === 'Market Research' ? marketResearchDeliverables :
                          selectedCategory === 'research' ? researchDeliverables :
                            deliverables).length > 4 && (
                          <button
                            onClick={() => setShowAllDeliverables(!showAllDeliverables)}
                            className="px-3 py-2 text-xs sm:text-sm border border-blue-300 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
                          >
                            {showAllDeliverables ? '- Show Less' : `+ ${(selectedCategory === 'consulting' ? consultingDeliverables :
                              selectedCategory === 'research' && selectedType === 'Market Research' ? marketResearchDeliverables :
                                selectedCategory === 'research' ? researchDeliverables :
                                  deliverables).length - 4} More`}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Length - Only for Writing */}
                  {selectedCategory === 'writing' && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Length <span className="text-red-500">*</span></h3>
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <input
                          type="text"
                          value={lengthValue}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              const numValue = parseInt(value) || 0;
                              const minRequired = lengthUnit === 'words' ? 50 : 1;
                              if (numValue >= 0) {
                                setLengthValue(value);
                                if (value && numValue < minRequired) {
                                  setValidationErrors({ ...validationErrors, lengthValue: `Minimum ${minRequired} ${lengthUnit} required` });
                                } else {
                                  setValidationErrors({ ...validationErrors, lengthValue: '' });
                                }
                              }
                            }
                          }}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder={`Enter length (min ${lengthUnit === 'words' ? '50 words' : '1 page'})`}
                          className={`flex-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.lengthValue ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setLengthUnit('words');
                              const numValue = parseInt(lengthValue) || 0;
                              if (lengthValue && numValue < 50) {
                                setValidationErrors({ ...validationErrors, lengthValue: 'Minimum 50 words required' });
                              } else {
                                setValidationErrors({ ...validationErrors, lengthValue: '' });
                              }
                            }}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 border rounded-lg font-semibold transition-all ${lengthUnit === 'words'
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                          >
                            Words
                          </button>
                          <button
                            onClick={() => {
                              setLengthUnit('pages');
                              const numValue = parseInt(lengthValue) || 0;
                              if (lengthValue && numValue < 1) {
                                setValidationErrors({ ...validationErrors, lengthValue: 'Minimum 1 page required' });
                              } else {
                                setValidationErrors({ ...validationErrors, lengthValue: '' });
                              }
                            }}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 border rounded-lg font-semibold transition-all ${lengthUnit === 'pages'
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                          >
                            Pages
                          </button>
                        </div>
                      </div>
                      {validationErrors.lengthValue && <p className="text-xs text-yellow-600 mt-1">{validationErrors.lengthValue}</p>}
                    </div>
                  )}

                  {/* Project Title */}
                  <div className="mb-0">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Project Title <span className="text-red-500">*</span></h3>
                    <textarea
                      value={projectTitle}
                      onChange={(e) => {
                        setProjectTitle(e.target.value);
                        setValidationErrors({ ...validationErrors, projectTitle: validateField('projectTitle', e.target.value) });
                      }}
                      onBlur={(e) => setValidationErrors({ ...validationErrors, projectTitle: validateField('projectTitle', e.target.value) })}
                      rows={2}
                      minLength={5}
                      maxLength={100}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none text-sm ${validationErrors.projectTitle ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                      placeholder="Enter your project title (5-100 characters, must start with a letter)..."
                    />
                    {validationErrors.projectTitle && <p className="text-xs text-yellow-600 mt-1">{validationErrors.projectTitle}</p>}
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {projectTitle.length}/100
                    </div>
                  </div>

                  {/* Project Description & File Upload - Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {/* Project Description */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Project Description <span className="text-red-500">*</span></h3>
                      <textarea
                        value={projectDescription}
                        onChange={(e) => {
                          if (e.target.value.length <= 1024) {
                            setProjectDescription(e.target.value);
                            setValidationErrors({ ...validationErrors, projectDescription: validateField('projectDescription', e.target.value) });
                          }
                        }}
                        onBlur={(e) => setValidationErrors({ ...validationErrors, projectDescription: validateField('projectDescription', e.target.value) })}
                        rows={4}
                        maxLength={1024}
                        placeholder="Describe what you need to get done in detail (10-1024 characters, must start with a letter)..."
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none text-sm ${validationErrors.projectDescription ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                      />
                      {validationErrors.projectDescription && <p className="text-xs text-yellow-600 mt-1">{validationErrors.projectDescription}</p>}
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {projectDescription.length}/1024
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Upload File (Optional)</h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 transition-all h-[120px] flex flex-col justify-center relative">
                        <input
                          type="file"
                          id="file-upload"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              if (file.type === 'application/pdf') {
                                setUploadedFile(file);
                              } else {
                                alert('Please upload only PDF files');
                                e.target.value = '';
                              }
                            }
                          }}
                          className="hidden"
                          accept=".pdf,application/pdf"
                        />
                        {uploadedFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="text-xs font-semibold text-green-600">
                              {uploadedFile.name}
                            </div>
                            <button
                              onClick={() => setUploadedFile(null)}
                              className="text-red-500 hover:text-red-700 font-bold text-lg"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="text-xs text-gray-600 mb-1">
                              <span className="text-blue-600 font-semibold">Browse</span> or drag and drop
                            </div>
                            <div className="text-xs text-gray-500 mb-1">PDF only (Max: 100 MB)</div>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all order-2 sm:order-1"
                    >
                      ← Back
                    </button>
                    <button
                      disabled={!selectedType || !selectedDeliverable || !projectTitle.trim() || !projectDescription.trim() || (selectedCategory === 'writing' && !lengthValue) || validationErrors.projectTitle || validationErrors.projectDescription}
                      onClick={() => setCurrentStep(3)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all order-1 sm:order-2 ${selectedType && selectedDeliverable && projectTitle.trim() && projectDescription.trim() && (selectedCategory !== 'writing' || lengthValue) && !validationErrors.projectTitle && !validationErrors.projectDescription
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Expertise & Budget</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Select expertise and set your budget.
                  </p>

                  {/* Expertise Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Expertise</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(selectedCategory === 'research' ? researchExpertiseOptions :
                        selectedCategory === 'consulting' ? consultingExpertiseOptions :
                          selectedCategory === 'data-ai' ? dataAiExpertiseOptions :
                            selectedCategory === 'product-dev' ? productDevExpertiseOptions :
                              expertiseOptions)
                        .slice(0, showAllExpertise ? undefined : 4)
                        .map((expertise) => (
                          <button
                            key={expertise}
                            onClick={() => toggleExpertise(expertise)}
                            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${selectedExpertise.includes(expertise)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {expertise}
                          </button>
                        ))}
                      {(selectedCategory === 'research' ? researchExpertiseOptions :
                        selectedCategory === 'consulting' ? consultingExpertiseOptions :
                          selectedCategory === 'data-ai' ? dataAiExpertiseOptions :
                            selectedCategory === 'product-dev' ? productDevExpertiseOptions :
                              expertiseOptions).length > 4 && (
                          <button
                            onClick={() => setShowAllExpertise(!showAllExpertise)}
                            className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all flex items-center gap-1"
                          >
                            {showAllExpertise ? '- Show Less' : `+ ${(selectedCategory === 'research' ? researchExpertiseOptions :
                              selectedCategory === 'consulting' ? consultingExpertiseOptions :
                                selectedCategory === 'data-ai' ? dataAiExpertiseOptions :
                                  selectedCategory === 'product-dev' ? productDevExpertiseOptions :
                                    expertiseOptions).length - 4} More`}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Selected Expertise Display with Custom Input */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Expertise ({selectedExpertise.length})</h3>
                    <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 min-h-[80px]">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedExpertise.map((expertise) => (
                          <span
                            key={expertise}
                            onClick={() => removeExpertise(expertise)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs cursor-pointer hover:bg-blue-200 transition-colors"
                          >
                            {expertise}
                            <span className="text-blue-600 font-bold">×</span>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customExpertise}
                          onChange={(e) => setCustomExpertise(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addCustomExpertise()}
                          placeholder="Add custom expertise..."
                          className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <button
                          onClick={addCustomExpertise}
                          disabled={!customExpertise.trim()}
                          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${customExpertise.trim()
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Industry Selection */}
                  <div className="mb-6 relative">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Industry</h3>
                    <input
                      type="text"
                      value={industryName}
                      onChange={(e) => setIndustryName(e.target.value)}
                      onFocus={() => setShowIndustryDropdown(true)}
                      placeholder="Enter the Industry Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {showIndustryDropdown && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-2">
                          {industries.map((industry) => (
                            <button
                              key={industry}
                              onClick={() => {
                                setIndustryName(industry);
                                setShowIndustryDropdown(false);
                              }}
                              className="text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all"
                            >
                              {industry}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {showIndustryDropdown && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowIndustryDropdown(false)}
                    />
                  )}

                  {/* Fee Type */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Fee Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFeeType('fixed')}
                        className={`px-4 py-3 border-2 rounded-lg font-semibold transition-all text-sm ${feeType === 'fixed'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        Fixed Fee
                      </button>
                      <button
                        onClick={() => setFeeType('hourly')}
                        className={`px-4 py-3 border-2 rounded-lg font-semibold transition-all text-sm ${feeType === 'hourly'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        Hourly Fee
                      </button>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Budget: ${parseInt(budgetRange.split('-')[0]).toLocaleString('en-US')} – $
                      {parseInt(budgetRange.split('-')[1]).toLocaleString('en-US')}
                    </h3>

                    {/* Manual Budget Input */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Min Budget ($) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={minBudget}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              const val = parseInt(value) || 500;
                              const max = parseInt(maxBudget);
                              setMinBudget(value);
                              const error = validateField('minBudget', value);
                              if (!error && val <= max && val >= 500) {
                                setBudgetRange(`${val}-${max}`);
                                setValidationErrors({ ...validationErrors, minBudget: '' });
                              } else {
                                setValidationErrors({ ...validationErrors, minBudget: error || 'Min must be ≤ Max' });
                              }
                            }
                          }}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Min budget (numbers only)"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.minBudget ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {validationErrors.minBudget && <p className="text-xs text-yellow-600 mt-1">{validationErrors.minBudget}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Max Budget ($) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={maxBudget}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              const val = parseInt(value) || 10000000;
                              const min = parseInt(minBudget);
                              setMaxBudget(value);
                              const error = validateField('maxBudget', value);
                              if (!error && val >= min && val <= 10000000) {
                                setBudgetRange(`${min}-${val}`);
                                setValidationErrors({ ...validationErrors, maxBudget: '' });
                              } else {
                                setValidationErrors({ ...validationErrors, maxBudget: error || 'Max must be ≥ Min' });
                              }
                            }
                          }}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Max budget (numbers only)"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.maxBudget ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        />
                        {validationErrors.maxBudget && <p className="text-xs text-yellow-600 mt-1">{validationErrors.maxBudget}</p>}
                      </div>
                    </div>
                  </div>


                  {/* Promo Code */}
                  {/* <div className="mb-6">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Got a discount code?
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promotional code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div> */}

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all order-2 sm:order-1"
                    >
                      ← Back
                    </button>
                    <button
                      disabled={selectedExpertise.length === 0 || !industryName || !minBudget || !maxBudget || validationErrors.minBudget || validationErrors.maxBudget}
                      onClick={() => setCurrentStep(4)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all order-1 sm:order-2 ${selectedExpertise.length > 0 && industryName && minBudget && maxBudget && !validationErrors.minBudget && !validationErrors.maxBudget
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{isAuthenticated ? 'Timeline' : 'User & Timeline'}</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    {isAuthenticated ? 'When do you need to hire?' : 'Tell us about yourself and when you need to hire.'}
                  </p>

                  {/* User Details - Only show for unauthenticated users */}
                  {!isAuthenticated && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Information</h3>
                      {/* First Name and Last Name in one row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^[a-zA-Z]*$/.test(value) && value.length <= 10) {
                                setFirstName(value);
                                setValidationErrors({ ...validationErrors, firstName: validateField('firstName', value) });
                              }
                            }}
                            placeholder="Enter first name (letters only)"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.firstName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                          {validationErrors.firstName && <p className="text-xs text-yellow-600 mt-1">{validationErrors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^[a-zA-Z]*$/.test(value) && value.length <= 20) {
                                setLastName(value);
                                setValidationErrors({ ...validationErrors, lastName: validateField('lastName', value) });
                              }
                            }}
                            placeholder="Enter last name (letters only)"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.lastName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                          {validationErrors.lastName && <p className="text-xs text-yellow-600 mt-1">{validationErrors.lastName}</p>}
                        </div>
                      </div>
                      {/* Email and Password in one row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setValidationErrors({ ...validationErrors, email: validateField('email', e.target.value) });
                            }}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.email ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                          {validationErrors.email && <p className="text-xs text-yellow-600 mt-1">{validationErrors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setValidationErrors({ ...validationErrors, password: validateField('password', e.target.value) });
                            }}
                            placeholder="Create a password (min 8 characters)"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.password ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                          {validationErrors.password && <p className="text-xs text-yellow-600 mt-1">{validationErrors.password}</p>}
                        </div>
                      </div>
                      {/* Country and State in one row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Country</label>
                          <select
                            value={country}
                            onChange={(e) => {
                              setCountry(e.target.value);
                              setState('');
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>India</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">State</label>
                          <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">Select State</option>
                            {(countryStates[country] || []).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Pincode and Phone Number in one row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Pincode <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value) && value.length <= 6) {
                                setZipCode(value);
                                setValidationErrors({ ...validationErrors, zipCode: validateField('zipCode', value) });
                              }
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            placeholder="Enter 6-digit pincode"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.zipCode ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                          {validationErrors.zipCode && <p className="text-xs text-yellow-600 mt-1">{validationErrors.zipCode}</p>}
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                          <div className="flex gap-2">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="w-24 px-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                              <option value="+1">{countryFlags['+1']} +1</option>
                              <option value="+44">{countryFlags['+44']} +44</option>
                              <option value="+91">{countryFlags['+91']} +91</option>
                              <option value="+61">{countryFlags['+61']} +61</option>
                              <option value="+86">{countryFlags['+86']} +86</option>
                            </select>
                            <input
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 10) {
                                  setPhoneNumber(value);
                                  setValidationErrors({ ...validationErrors, phoneNumber: validateField('phoneNumber', value) });
                                }
                              }}
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={10}
                              placeholder="Enter 10-digit phone number"
                              className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.phoneNumber ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                          </div>
                          {validationErrors.phoneNumber && <p className="text-xs text-yellow-600 mt-1">{validationErrors.phoneNumber}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hiring Timeline */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">When do you need to hire?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Urgently, within 1-2 days',
                        'Within a week',
                        'Within a month',
                        'Longer than a month',
                        "I'll decide later"
                      ].map((option) => (
                        <button
                          key={option}
                          onClick={() => setHiringTimeline(option)}
                          className={`px-4 py-3 border-2 rounded-lg text-left text-xs sm:text-sm font-medium transition-all ${hiringTimeline === option
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Important Factors */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Important factors for hiring</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Feedback or approval from colleagues or team members',
                        'Approval from finance, compliance, legal, or security teams',
                        'Organization-specific contracts or documentation',
                        'None of these apply'
                      ].map((factor) => (
                        <label
                          key={factor}
                          className="flex items-start gap-2 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={importantFactors.includes(factor)}
                            onChange={() => toggleFactor(factor)}
                            className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-xs sm:text-sm text-gray-700">{factor}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all order-2 sm:order-1"
                    >
                      ← Back
                    </button>
                    <button
                      disabled={isAuthenticated ? !hiringTimeline : (!email || !password || !firstName || !lastName || !phoneNumber || !zipCode || !hiringTimeline || validationErrors.firstName || validationErrors.lastName || validationErrors.email || validationErrors.password || validationErrors.phoneNumber || validationErrors.zipCode)}
                      onClick={() => isAuthenticated ? handleAuthenticatedSubmit() : setCurrentStep(5)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all order-1 sm:order-2 ${(isAuthenticated ? hiringTimeline : (email && password && firstName && lastName && phoneNumber && zipCode && hiringTimeline && !validationErrors.firstName && !validationErrors.lastName && !validationErrors.email && !validationErrors.password && !validationErrors.phoneNumber && !validationErrors.zipCode))
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {isAuthenticated ? (isSubmitting ? 'Submitting...' : 'Submit Project') : 'Next →'}
                    </button>
                  </div>
                  {submitError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm">
                      {submitError}
                    </div>
                  )}
                </div>
              )}



              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create an account to post your project for free and get quotes fast.</h2>
                  <div className="max-w-md mx-auto mt-8">
                    {/* Email Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* First Name Field */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Last Name Field */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Submit Button */}
                    {/* Phone Number Field */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          placeholder="+1"
                          className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      disabled={!email || !firstName || !lastName || !phoneNumber}
                      onClick={() => setCurrentStep(7)}
                      className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all mb-4 ${email && firstName && lastName && phoneNumber
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Submit
                    </button>

                    {/* OR Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-semibold">OR</span>
                      </div>
                    </div>

                    {/* Back Button */}
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Project description</h2>
                  <p className="text-gray-600 mb-6">
                    Clearly describe your requirements, scope of work, and expected deliverables.
                  </p>

                  {/* Project Description Textarea */}
                  <div className="mb-6">
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={8}
                      placeholder="Enter detailed project description..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* File Upload Area */}
                  <div className="mb-8">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all">
                      <input
                        type="file"
                        id="file-upload"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            if (file.type === 'application/pdf') {
                              setUploadedFile(file);
                            } else {
                              alert('Please upload only PDF files');
                              e.target.value = '';
                            }
                          }
                        }}
                        className="hidden"
                        accept=".pdf,application/pdf"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-gray-600 mb-2">
                          <span className="text-blue-600 font-semibold">Drag and drop here</span> or <span className="text-blue-600 font-semibold">browse</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">(Max. file size: 100 MB)</div>
                        {uploadedFile ? (
                          <div className="mt-4">
                            <div className="text-sm font-semibold text-gray-700 mb-2">{uploadedFile.name}</div>
                            <div className="text-sm text-green-600 font-semibold">100% uploaded</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">No file chosen</div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(6)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all"
                    >
                      <span>←</span> Back
                    </button>
                    <button
                      disabled={!projectDescription.trim()}
                      onClick={() => setCurrentStep(8)}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all ${projectDescription.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select your fee type and budget</h2>
                  <p className="text-gray-600 mb-6">
                    You’re free to modify your fee after posting the project.
                  </p>

                  {/* Fee Type Selection */}
                  <div className="mb-6">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setFeeType('fixed')}
                        className={`flex-1 px-6 py-4 border-2 rounded-lg font-semibold transition-all ${feeType === 'fixed'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        Fixed Fee
                      </button>
                      <button
                        onClick={() => setFeeType('hourly')}
                        className={`flex-1 px-6 py-4 border-2 rounded-lg font-semibold transition-all ${feeType === 'hourly'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        Hourly Fee
                      </button>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Budget: ₹{parseInt(budgetRange.split('-')[0]).toLocaleString('en-IN')} - ₹{parseInt(budgetRange.split('-')[1]).toLocaleString('en-IN')}
                    </h3>
                    <div className="relative px-2">
                      <div className="h-2 bg-gray-300 rounded-full mb-6 relative">
                        <div
                          className="h-2 bg-green-400 rounded-full absolute"
                          style={{
                            left: `${((parseInt(budgetRange.split('-')[0]) - 500) / 9999500) * 100}%`,
                            right: `${100 - ((parseInt(budgetRange.split('-')[1]) - 500) / 9999500) * 100}%`
                          }}
                        />
                        <input
                          type="range"
                          min="500"
                          max="10000000"
                          step="10000"
                          value={budgetRange.split('-')[0]}
                          onChange={(e) => {
                            const minVal = parseInt(e.target.value);
                            const maxVal = parseInt(budgetRange.split('-')[1]);
                            if (minVal <= maxVal) {
                              setBudgetRange(`${minVal}-${maxVal}`);
                            }
                          }}
                          ref={minRef}
                          onMouseDown={() => bringToFront('min')}
                          onTouchStart={() => bringToFront('min')}
                          className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-auto"
                          style={{
                            WebkitAppearance: 'none',
                            zIndex: '2'
                          }}
                        />
                        <input
                          type="range"
                          min="500"
                          max="10000000"
                          step="10000"
                          value={budgetRange.split('-')[1]}
                          onChange={(e) => {
                            const maxVal = parseInt(e.target.value);
                            const minVal = parseInt(budgetRange.split('-')[0]);
                            if (maxVal >= minVal) {
                              setBudgetRange(`${minVal}-${maxVal}`);
                            }
                          }}
                          ref={maxRef}
                          onMouseDown={() => bringToFront('max')}
                          onTouchStart={() => bringToFront('max')}
                          className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-auto"
                          style={{
                            WebkitAppearance: 'none',
                            zIndex: '3'
                          }}
                        />
                      </div>
                      <style>{`
                        input[type='range'] {
                          outline: none;
                        }
                        input[type='range']::-webkit-slider-thumb {
                          appearance: none;
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: white;
                          cursor: pointer;
                          border: 2px solid #4B5563;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        }
                        input[type='range']::-moz-range-thumb {
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: white;
                          cursor: pointer;
                          border: 2px solid #4B5563;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                        }
                        input[type='range']::-webkit-slider-runnable-track {
                          background: transparent;
                          height: 8px;
                        }
                        input[type='range']::-moz-range-track {
                          background: transparent;
                          border: none;
                        }
                      `}</style>
                    </div>
                  </div>

                  {/* Promotional Code */}
                  <div className="mb-8">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      Got a discount code?
                    </label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promotional code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(7)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all"
                    >
                      <span>←</span> Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(9)}
                      className="px-8 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    >
                      Post Project
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 9 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">When would you like to start working with a freelancer?</h2>

                  {/* Timeline Options */}
                  <div className="space-y-3 mb-8">
                    {[
                      'Urgently, within 1-2 days',
                      'Within a week',
                      'Within a month',
                      'Longer than a month',
                      "I'll decide later"
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => setHiringTimeline(option)}
                        className={`w-full px-6 py-4 border-2 rounded-lg text-left font-medium transition-all ${hiringTimeline === option
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Important Factors */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Mention any key factors or next steps for hiring an expert on Xperthiring.
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Feedback or approval from colleagues or team members while choosing who to hire',
                        'Approval from finance, compliance, legal, security or other teams to manage work or payments through Xperthiring',
                        'Organization-specific contracts or documents, like vendor agreements, conflict of interest documentation, or tax documentation',
                        'None of these apply'
                      ].map((factor) => (
                        <label
                          key={factor}
                          className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={importantFactors.includes(factor)}
                            onChange={() => toggleFactor(factor)}
                            className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{factor}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Final Message */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <p className="text-center text-gray-900 font-semibold">
                      Ready to go? Post your project and get quotes instantly.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(8)}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all"
                    >
                      <span>←</span> Back
                    </button>
                    <button
                      disabled={!hiringTimeline}
                      onClick={() => setCurrentStep(10)}
                      className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${hiringTimeline
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Billing & Submit</h2>

                  <div className="mb-4 sm:mb-6">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button
                        onClick={() => setBillingType('individual')}
                        className={`px-4 sm:px-6 py-3 border-2 rounded-lg font-semibold transition-all text-sm ${billingType === 'individual'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}>
                        Individual
                      </button>
                      <button
                        onClick={() => setBillingType('business')}
                        className={`px-4 sm:px-6 py-3 border-2 rounded-lg font-semibold transition-all text-sm ${billingType === 'business'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}>
                        Business
                      </button>
                    </div>
                  </div>

                  {billingType === 'business' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                          Company/Institute Name
                        </label>

                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => {
                            const value = e.target.value;

                            // Allow only letters and spaces, must start with letter
                            if (/^[A-Za-z][A-Za-z\s]*$/.test(value) || value === "") {
                              setCompanyName(value);
                            }
                          }}
                          placeholder="Enter company name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Company/Institute Address</label>
                        <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="Enter company address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Address Line 1 <span className="text-red-500">*</span></label>
                    <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="Street address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                    <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Apartment, suite, etc." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setValidationErrors({ ...validationErrors, city: validateField('city', e.target.value) });
                        }}
                        placeholder="City (3-15 letters only)"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${validationErrors.city ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                      />
                      {validationErrors.city && <p className="text-xs text-yellow-600 mt-1">{validationErrors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Zip Code <span className="text-red-500">*</span></label>
                      <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip code" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>India</option>
                    </select>
                  </div>
                  {/* 
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">VAT Details</h3>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">VAT Number</label>
                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} placeholder="Enter VAT number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div> */}

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(4)} className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-all order-2 sm:order-1">
                      ← Back
                    </button>
                    <button
                      disabled={!addressLine1 || !zipCode || !city || isSubmitting || validationErrors.zipCode || validationErrors.city}
                      onClick={async () => {
                        setIsSubmitting(true);
                        setSubmitError('');
                        try {
                          const response = await postProjectFromLanding({
                            privacy: privacyOption,
                            category: selectedCategory,
                            selectedType,
                            selectedActivity,
                            selectedDeliverable,
                            writingLength: lengthValue,
                            writingLengthUnit: lengthUnit,
                            expertiseTags: selectedExpertise,
                            industries: [industryName],
                            title: projectTitle,
                            fullname: `${firstName} ${lastName}`,
                            email,
                            password,
                            phoneNumber,
                            countryCode,
                            description: projectDescription,
                            pdfFile: uploadedFile,
                            feeType,
                            budget: parseInt(budgetRange.split('-')[1]),
                            hiringTimeline,
                            hiringFactors: importantFactors,
                            billingType,
                            addressLine1,
                            addressLine2,
                            city,
                            state,
                            zipCode,
                            country,
                            companyName,
                            companyRegistration: companyAddress,
                            vatNumber,
                            expertInvitation
                          });

                          // Automatically login the user after account creation
                          if (response.success && response.user) {
                            console.log('Project posted, logging in user:', email);
                            try {
                              // Use the login API to properly authenticate
                              const loginResponse = await apiLoginUser({ email, password });
                              if (loginResponse.success && loginResponse.user) {
                                setUser(loginResponse.user);
                                setShowSuccessModal(true);
                              }
                            } catch (loginError) {
                              console.error('Auto-login failed:', loginError);
                              // Fallback: still show success modal
                              setShowSuccessModal(true);
                            }
                          }
                        } catch (error: any) {
                          setSubmitError(error.message || 'Failed to submit project');
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      className={`px-8 py-3 rounded-lg font-bold text-base sm:text-lg transition-all order-1 sm:order-2 ${addressLine1 && zipCode && city && !isSubmitting && !validationErrors.zipCode && !validationErrors.city ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                      {isSubmitting ? 'Submitting...' : 'Complete Submission'}
                    </button>
                  </div>
                  {submitError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm">
                      {submitError}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Desktop Fixed */}
        <div className="hidden lg:block fixed right-0 top-0 w-80 bg-white/80 backdrop-blur-sm border-l border-blue-200 text-gray-900 p-6 h-screen overflow-hidden pt-20">
          {currentStep <= 6 ? (
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 truncate text-gray-900">Privacy Guaranteed</h3>
                  <p className="text-xs text-gray-600">
                    Control who views your project and invite only trusted, top-rated freelancers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 truncate text-gray-900">Work That Delivers</h3>
                  <p className="text-xs text-gray-600">
                    Partner with freelancers at every stage to get results you’re happy with.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1 truncate text-gray-900">Pay Your Way</h3>
                  <p className="text-xs text-gray-600">
                    Opt for hourly or project-based payments and finalize costs after freelancer discussions.
                  </p>
                </div>
              </div>

              {/* Dragon Animation */}
              <div className="mt-8 pt-6 border-t border-blue-200">
                <DragonAnimation />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <h3 className="text-base font-semibold mb-3 truncate text-gray-900">Project Summary</h3>
              <div className="border-t border-blue-200 mb-4" />

              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 border-l-2 border-dashed border-blue-400" />

                <div className="space-y-4">
                  {[
                    {
                      label: 'Privacy', value: privacyOption === 'all'
                        ? 'All Xperthiring Experts'
                        : privacyOption === 'invitation'
                          ? 'Invitation Only'
                          : 'Internal Team Only', completed: true
                    },
                    { label: 'Scope Of Work', value: `${selectedCategory}, ${selectedType}`, completed: !!selectedCategory },
                    { label: 'Expertise & Industry', value: `${selectedExpertise.join(', ')}, ${industryName}`, completed: selectedExpertise.length > 0 },
                    { label: 'Title', value: projectTitle || 'Not set yet', completed: !!projectTitle },
                    { label: 'Description', value: projectDescription ? `${projectDescription.substring(0, 30)}...` : 'Not set yet', completed: !!projectDescription },
                    { label: 'Budget', value: `$${budgetRange.split('-')[0]} - $${budgetRange.split('-')[1]}`, completed: currentStep >= 3, active: currentStep === 3 },
                    { label: 'User & Timeline', value: hiringTimeline || 'Not set yet', completed: currentStep >= 4, active: currentStep === 4 },
                    { label: 'Billing', value: addressLine1 ? `${city}, ${state}` : 'Not set yet', completed: currentStep >= 5, active: currentStep === 5 }
                  ].map((item, index) => (
                    <div key={index} className="relative flex gap-3">
                      <div className="absolute left-[-24px] top-1">
                        {item.completed ? (
                          <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        ) : item.active ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white">
                            <CheckCircle size={12} className="text-blue-500" />
                          </div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>

                      <div className={`flex-1 rounded-lg px-3 py-2 min-w-0 ${item.active ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{item.label}</p>
                            <p className="text-xs text-gray-600 truncate">{item.value}</p>
                          </div>
                          <button className="text-gray-500 hover:text-gray-700 flex-shrink-0">
                            <Pencil size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border-2 border-gray-200"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <CheckCircle className="text-green-600" size={40} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
              >
                Congratulations!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                Your address is saved and your project is successfully posted.
              </motion.p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Xperthiring Team Invite */}
              <div
                onClick={() => setExpertInvitation('team')}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${expertInvitation === 'team' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="invite"
                    className="mt-1"
                    checked={expertInvitation === 'team'}
                    onChange={() => { }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">I want the Xperthiring team to invite experts on my behalf.</p>
                    <p className="text-sm text-gray-600 mb-2">Learn more</p>
                    <p className="text-blue-600 font-bold">Pay USD 7.99</p>
                  </div>
                </div>
              </div>

              {/* Self Invite */}
              <div
                onClick={() => setExpertInvitation('self')}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${expertInvitation === 'self' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="invite"
                    className="mt-1"
                    checked={expertInvitation === 'self'}
                    onChange={() => { }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">I will invite experts myself.</p>
                  </div>
                </div>
              </div>

              {/* Internal Team Invite */}
              <div
                onClick={() => setExpertInvitation('internal')}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${expertInvitation === 'internal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="invite"
                    className="mt-1"
                    checked={expertInvitation === 'internal'}
                    onChange={() => { }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">I want to invite my internal team.</p>
                    <p className="text-sm text-gray-600 mb-2">Only internal members will receive the invitation.</p>
                  </div>
                </div>
              </div>
            </div>


            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowSuccessModal(false);
                // Navigate to client dashboard - user is already authenticated
                if (isAuthenticated) {
                  navigate('/client-dashboard');
                } else {
                  window.location.href = '/client-dashboard';
                }
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              <span>Invite Experts</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
