import { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, X, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validatePhoneNumber
} from '../../../utils/validation';


const topCountries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
];

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79297V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z" fill="white" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8055 10.2292C19.8055 9.55056 19.7501 8.86667 19.6306 8.19861H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0875V17.5866H16.8251C18.7192 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
    <path d="M10.2002 20C12.9502 20 15.2643 19.1056 16.8294 17.5866L13.6068 15.0875C12.7096 15.6979 11.5518 16.0433 10.2045 16.0433C7.54388 16.0433 5.28928 14.2832 4.50397 11.9169H1.17969V14.4927C2.78438 17.6894 6.31104 20 10.2002 20Z" fill="#34A853"/>
    <path d="M4.49967 11.9169C4.07605 10.675 4.07605 9.33061 4.49967 8.08867V5.51294H1.17969C-0.206016 8.26356 -0.206016 11.7421 1.17969 14.4927L4.49967 11.9169Z" fill="#FBBC04"/>
    <path d="M10.2002 3.95671C11.6246 3.93506 13.0006 4.47225 14.0379 5.45728L16.8898 2.60539C15.1766 0.990833 12.9329 0.0819444 10.2002 0.105278C6.31104 0.105278 2.78438 2.41589 1.17969 5.51294L4.49967 8.08867C5.27928 5.71694 7.53818 3.95671 10.2002 3.95671Z" fill="#EA4335"/>
  </svg>
);


interface SignupPageProps {
  onSignup: (data: any) => void;
  onSwitchToLogin: () => void;
  onLogin?: (email: string, password: string) => void;
  onClose?: () => void;
  initialTab?: 'login' | 'signup';
}

export default function SignupPage({ onSignup, onSwitchToLogin, onLogin, onClose, initialTab = 'signup' }: SignupPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '91',
    password: '',
    hearAbout: '',
    role: 'freelancer' as 'client' | 'freelancer'
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [captchaSent, setCaptchaSent] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaCorrectAnswer, setCaptchaCorrectAnswer] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('in');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [captchaError, setCaptchaError] = useState(false);
  const [loginError, setLoginError] = useState('');

  const countryFlags: {[key: string]: string} = {
    '+1': '🇺🇸',
    '+44': '🇬🇧',
    '+91': '🇮🇳',
    '+61': '🇦🇺',
    '+86': '🇨🇳',
    '+81': '🇯🇵',
    '+49': '🇩🇪',
    '+33': '🇫🇷',
    '+7': '🇷🇺',
    '+55': '🇧🇷'
  };

  const validateField = (field: string, value: string): string => {
    let result;
    switch(field) {
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
      case 'phoneNumber':
        result = validatePhoneNumber(value, selectedCountry);
        return result.valid ? '' : result.error || '';
      default:
        return '';
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      if (onLogin) {
        await onLogin(loginData.email, loginData.password);
        toast.success('Login successful!', { 
          duration: 1000,
          style: {
            background: '#10b981',
            color: '#fff',
            fontWeight: '600',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
          },
          icon: '🎉'
        });
      } else {
        onSwitchToLogin();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    // Validate all fields
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else {
      const error = validateField('firstName', formData.firstName);
      if (error) errors.firstName = error;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else {
      const error = validateField('lastName', formData.lastName);
      if (error) errors.lastName = error;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else {
      const error = validateField('password', formData.password);
      if (error) errors.password = error;
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else {
      const error = validateField('phoneNumber', formData.phoneNumber);
      if (error) errors.phoneNumber = error;
    }

    if (!agreedToTerms) {
      errors.terms = 'You must agree to Terms and Privacy Policy';
    }

    if (!agreedToPrivacy) {
      errors.privacy = 'You must consent to data processing';
    }

    if (!wantsUpdates) {
      errors.updates = 'You must agree to receive updates';
    }

    if (!formData.hearAbout) {
      errors.hearAbout = 'Please select how you heard about us';
    }

    if (!captchaVerified) {
      errors.captcha = 'Please solve the math problem to verify';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      const errorCount = Object.keys(errors).length;
      const fieldNames: Record<string, string> = {
        firstName: 'First Name',
        lastName: 'Last Name',
        password: 'Password',
        phoneNumber: 'Phone Number',
        terms: 'Terms Agreement',
        privacy: 'Privacy Consent',
        updates: 'Updates Agreement',
        hearAbout: 'How You Heard About Us',
        captcha: 'Math Verification'
      };
      const errorFields = Object.keys(errors).map(key => fieldNames[key] || key).join(', ');
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''}: ${errorFields}`, { duration: 5000 });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullname: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phoneNumber: `+${formData.countryCode}${formData.phoneNumber}`,
        password: formData.password,
        role: formData.role,
        captchaAnswer: captchaAnswer
      };

      await onSignup(userData);
      toast.success('Account created successfully!', { 
        duration: 1000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
        },
        icon: '🚀'
      });
    } catch (err: any) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInSignup = () => {
    toast('LinkedIn signup coming soon!', { icon: 'ℹ️' });
  };

  const handleGoogleSignup = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    
    if (!clientId) {
      toast.error('Google Client ID not configured');
      console.error('VITE_GOOGLE_CLIENT_ID is missing');
      return;
    }

    // Create OAuth URL for popup
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token id_token&` +
      `scope=openid email profile&` +
      `nonce=${Math.random().toString(36).substring(7)}&` +
      `prompt=select_account`;

    // Open popup window
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      authUrl,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    if (!popup) {
      toast.error('Popup was blocked. Please allow popups for this site.');
      return;
    }

    // Listen for message from popup
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        window.removeEventListener('message', handleMessage);
        
        const { idToken } = event.data;
        
        if (idToken) {
          await handleGoogleCallback({ credential: idToken });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Check if popup was closed
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);
  };

  const handleGoogleCallback = async (response: { credential: string }) => {
    setLoading(true);

    // Clean up the Google button UI
    const overlay = document.getElementById('google-signin-overlay');
    const buttonContainer = document.getElementById('google-signin-button-temp');
    if (overlay) document.body.removeChild(overlay);
    if (buttonContainer) document.body.removeChild(buttonContainer);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      
      const res = await fetch(`${apiUrl}/user/google-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          token: response.credential,
          role: formData.role
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Google signup failed');
      }

      if (data.success && data.token) {
        // Store token in localStorage as requested
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast.success('Google signup successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Google signup error:', err);
      toast.error(err.message || 'Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      if (onClose) {
        onClose();
      } else {
        window.history.back();
      }
    }
  };



  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/60 backdrop-blur-sm p-0"
    >

      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-lg md:max-w-2xl lg:max-w-3xl
                      bg-white sm:rounded-2xl shadow-2xl overflow-hidden 
                      sm:border border-gray-200 flex flex-col sm:m-4">

        {/* Header with Close Button */}
        <div className="relative w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                window.history.back();
              }
            }}
            className="relative w-full py-3 px-4 flex items-center justify-center gap-2 
                       text-white font-semibold text-sm backdrop-blur-sm
                       hover:bg-white/10 transition-colors group"
          >
            <X size={20} className="text-white group-hover:text-yellow-300 transition-colors" />
            <span className="group-hover:text-yellow-300 transition-colors">Close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b bg-gray-50 flex-shrink-0">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 text-sm ${activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 text-sm ${activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {activeTab === 'signup' ? (
            <div className="w-full px-4 py-4 sm:px-6 sm:py-4">
              <div className="text-center mb-3">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Create Your Expert Account</h2>
              </div>

              {/* <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={handleLinkedInSignup}
                  className="w-full bg-[#0077B5] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006399] transition-all flex items-center justify-center gap-2 shadow-md text-xs"
                >
                  <LinkedInIcon />
                  <span className="hidden xs:inline">LinkedIn</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full bg-white text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-md border-2 border-gray-200 text-xs"
                >
                  <GoogleIcon />
                  <span className="hidden xs:inline">Google</span>
                </button>
              </div> */}

              {/* <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500 font-medium">or continue with email</span>
                </div>
              </div> */}

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z]*$/.test(value) && value.length <= 10) {
                          setFormData({ ...formData, firstName: value });
                          setValidationErrors({...validationErrors, firstName: validateField('firstName', value)});
                        }
                      }}
                      placeholder="First Name (letters only)"
                      required
                      className={`w-full pl-3 pr-2 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.firstName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {validationErrors.firstName && <p className="text-xs text-yellow-600 mt-0.5">{validationErrors.firstName}</p>}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z]*$/.test(value) && value.length <= 20) {
                          setFormData({ ...formData, lastName: value });
                          setValidationErrors({...validationErrors, lastName: validateField('lastName', value)});
                        }
                      }}
                      placeholder="Last Name (letters only)"
                      required
                      className={`w-full pl-3 pr-2 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.lastName ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {validationErrors.lastName && <p className="text-xs text-yellow-600 mt-0.5">{validationErrors.lastName}</p>}
                  </div>
                </div>

                {/* Email with Math Captcha */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setValidationErrors({...validationErrors, email: validateField('email', e.target.value)});
                        // Auto-generate question when valid email is entered
                        if (e.target.value.includes('@') && e.target.value.includes('.') && !captchaSent) {
                          const allQuestions = [
                            { q: 'What is 2 + 3?', a: '5' },
                            { q: 'What is 4 + 1?', a: '5' },
                            { q: 'What is 6 - 1?', a: '5' },
                            { q: 'What is 10 ÷ 2?', a: '5' },
                            { q: 'What is 3 + 3?', a: '6' },
                            { q: 'What is 9 - 3?', a: '6' },
                            { q: 'What is 12 ÷ 2?', a: '6' },
                            { q: 'What is 2 × 3?', a: '6' },
                            { q: 'What is 3 + 4?', a: '7' },
                            { q: 'What is 5 + 2?', a: '7' },
                            { q: 'What is 14 - 7?', a: '7' },
                            { q: 'What is 21 ÷ 3?', a: '7' },
                            { q: 'What is 4 + 4?', a: '8' },
                            { q: 'What is 10 - 2?', a: '8' },
                            { q: 'What is 4 × 2?', a: '8' },
                            { q: 'What is 16 ÷ 2?', a: '8' },
                            { q: 'What is 5 + 4?', a: '9' },
                            { q: 'What is 3 × 3?', a: '9' },
                            { q: 'What is 18 - 9?', a: '9' },
                            { q: 'What is 27 ÷ 3?', a: '9' }
                          ];
                          const availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q.q));
                          const questionsToUse = availableQuestions.length > 0 ? availableQuestions : allQuestions;
                          const randomQ = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
                          setCaptchaQuestion(randomQ.q);
                          setCaptchaCorrectAnswer(randomQ.a);
                          setUsedQuestions([...usedQuestions, randomQ.q]);
                          setCaptchaAnswer('');
                          setCaptchaVerified(false);
                          setCaptchaSent(true);
                        }
                      }}
                      placeholder="Email Address"
                      required
                      className={`w-full pl-3 pr-2 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.email ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    />
                    {validationErrors.email && <p className="text-xs text-yellow-600 mt-0.5">{validationErrors.email}</p>}
                  </div>

                  {captchaSent && (
                    <div className="space-y-2">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700 font-medium text-center">
                          🧮 {captchaQuestion}
                        </p>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="text"
                          value={captchaAnswer}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setCaptchaAnswer(val);
                            // Auto-verify when answer is entered
                            if (val === captchaCorrectAnswer) {
                              setCaptchaVerified(true);
                              setCaptchaError(false);
                            } else if (val.length > 0) {
                              setCaptchaVerified(false);
                              setCaptchaError(true);
                            } else {
                              setCaptchaVerified(false);
                              setCaptchaError(false);
                            }
                          }}
                          placeholder="Enter your answer"
                          required
                          className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 text-center text-lg font-mono ${
                            captchaVerified 
                              ? 'border-green-500 bg-green-50 focus:ring-green-500' 
                              : captchaError
                              ? 'border-red-500 bg-red-50 focus:ring-red-500'
                              : 'border-blue-500 focus:ring-blue-500'
                          }`}
                        />
                        {captchaVerified && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-green-600 text-xl">✓</span>
                          </div>
                        )}
                        {captchaError && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-red-600 text-xl">✗</span>
                          </div>
                        )}
                      </div>
                      
                      {captchaVerified ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-700 text-center font-medium">
                            ✓ Correct! You can now create your account.
                          </p>
                        </div>
                      ) : captchaError ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-700 text-center font-medium">
                            ✗ Wrong answer! Please try again.
                          </p>
                        </div>
                      ) : null}
                      
                      {!captchaVerified && (
                        <button
                          type="button"
                          onClick={() => {
                            const allQuestions = [
                              { q: 'What is 2 + 3?', a: '5' },
                              { q: 'What is 4 + 1?', a: '5' },
                              { q: 'What is 6 - 1?', a: '5' },
                              { q: 'What is 10 ÷ 2?', a: '5' },
                              { q: 'What is 3 + 3?', a: '6' },
                              { q: 'What is 9 - 3?', a: '6' },
                              { q: 'What is 12 ÷ 2?', a: '6' },
                              { q: 'What is 2 × 3?', a: '6' },
                              { q: 'What is 3 + 4?', a: '7' },
                              { q: 'What is 5 + 2?', a: '7' },
                              { q: 'What is 14 - 7?', a: '7' },
                              { q: 'What is 21 ÷ 3?', a: '7' },
                              { q: 'What is 4 + 4?', a: '8' },
                              { q: 'What is 10 - 2?', a: '8' },
                              { q: 'What is 4 × 2?', a: '8' },
                              { q: 'What is 16 ÷ 2?', a: '8' },
                              { q: 'What is 5 + 4?', a: '9' },
                              { q: 'What is 3 × 3?', a: '9' },
                              { q: 'What is 18 - 9?', a: '9' },
                              { q: 'What is 27 ÷ 3?', a: '9' }
                            ];
                            const availableQuestions = allQuestions.filter(q => !usedQuestions.includes(q.q));
                            const questionsToUse = availableQuestions.length > 0 ? availableQuestions : allQuestions;
                            const randomQ = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
                            setCaptchaQuestion(randomQ.q);
                            setCaptchaCorrectAnswer(randomQ.a);
                            setUsedQuestions([...usedQuestions, randomQ.q]);
                            setCaptchaAnswer('');
                            setCaptchaVerified(false);
                          }}
                          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-xs font-semibold hover:bg-gray-300 transition-all"
                        >
                          Get New Question
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setValidationErrors({...validationErrors, password: validateField('password', e.target.value)});
                    }}
                    placeholder="Password (min. 8 characters)"
                    required
                    className={`w-full pl-3 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 ${validationErrors.password ? 'border-yellow-500 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {validationErrors.password && <p className="text-xs text-yellow-600 mt-0.5">{validationErrors.password}</p>}
                </div>

                <div className="flex gap-2">
                  <div className="w-32 flex-shrink-0">
                    <PhoneInput
                      country={'in'}
                      value={formData.countryCode}
                      onChange={(phone, country: any) => {
                        setFormData({ ...formData, countryCode: country.dialCode });
                        setSelectedCountry(country.countryCode);
                      }}
                      inputProps={{
                        readOnly: true,
                        style: { 
                          width: '100%',
                          height: '42px',
                          fontSize: '0.875rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          paddingLeft: '48px',
                          cursor: 'pointer'
                        }
                      }}
                      enableSearch={true}
                      searchPlaceholder="Search..."
                      preferredCountries={['in', 'us', 'gb', 'ae', 'au']}
                      countryCodeEditable={false}
                    />
                  </div>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const maxLength = selectedCountry === 'in' ? 10 : 15;
                      if (val.length <= maxLength) {
                        setFormData({ ...formData, phoneNumber: val });
                      }
                      const error = validateField('phoneNumber', val);
                      if (error) {
                        setValidationErrors({...validationErrors, phoneNumber: error});
                      } else {
                        setValidationErrors({...validationErrors, phoneNumber: ''});
                      }
                    }}
                    placeholder="Phone Number"
                    required
                    maxLength={selectedCountry === 'in' ? 10 : 15}
                    className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {validationErrors.phoneNumber && <p className="text-xs text-yellow-600 mt-0.5">{validationErrors.phoneNumber}</p>}

                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <span className="leading-tight">
                      I agree to Xperthiring's {' '}
                      <a href="#" className="text-blue-600 hover:underline font-medium">Terms</a> and{' '}
                      <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <span className="leading-tight">
                      I consent to data processing
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantsUpdates}
                      onChange={(e) => setWantsUpdates(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <span className="leading-tight">
                      Send me updates about opportunities
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    How did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.hearAbout}
                    onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Friend/Colleague Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    I want to join as:
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="freelancer"
                        checked={formData.role === 'freelancer'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'client' | 'freelancer' })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs text-gray-700">Freelancer</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="client"
                        checked={formData.role === 'client'}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'client' | 'freelancer' })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs text-gray-700">Client</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !captchaVerified || !agreedToTerms || !agreedToPrivacy || !wantsUpdates || !formData.hearAbout || formData.firstName.length < 3 || formData.firstName.length > 10 || formData.lastName.length < 3 || formData.lastName.length > 20 || formData.password.length < 8 || !formData.email.includes('@') || !formData.email.includes('.') || formData.phoneNumber.length < 10}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
                >
                  {loading ? 'Creating Account...' : '🚀 Create Expert Account'}
                </button>
              </form>

              <div className="text-center mt-3 pb-2">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full px-4 py-4 sm:px-8 sm:py-6">
              <div className="text-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to your Xperthiring account</p>
              </div>

              {/* <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={handleLinkedInSignup}
                  className="w-full bg-[#0077B5] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006399] transition-all flex items-center justify-center gap-2 shadow-md text-xs"
                >
                  <LinkedInIcon />
                  <span className="hidden xs:inline">LinkedIn</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full bg-white text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-md border-2 border-gray-200 text-xs"
                >
                  <GoogleIcon />
                  <span className="hidden xs:inline">Google</span>
                </button>
              </div> */}

              {/* <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500 font-medium">or sign in with email</span>
                </div>
              </div> */}

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700 text-center font-medium">
                      ✗ {loginError}
                    </p>
                  </div>
                )}
                
                <div className="relative">
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Email Address"
                    required
                    className="w-full pl-3 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Password"
                    required
                    className="w-full pl-3 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xs text-gray-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="text-center mt-4 pb-2">
                <p className="text-xs text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
