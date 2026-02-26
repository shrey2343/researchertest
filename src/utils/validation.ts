// Validation utility functions

export const validateProjectTitle = (title: string): { valid: boolean; error?: string } => {
  const trimmed = title.trim();
  if (!trimmed) return { valid: false, error: 'Project title is required' };
  if (trimmed.length < 5) return { valid: false, error: 'Project title must be at least 5 characters' };
  if (trimmed.length > 100) return { valid: false, error: 'Project title must not exceed 100 characters' };
  if (!/^[a-zA-Z]/.test(trimmed)) return { valid: false, error: 'Project title must start with a letter' };
  if (/[<>{}[\]();]/.test(trimmed)) return { valid: false, error: 'Project title contains invalid characters' };
  return { valid: true };
};

export const validateProjectDescription = (desc: string): { valid: boolean; error?: string } => {
  const trimmed = desc.trim();
  if (!trimmed) return { valid: false, error: 'Project description is required' };
  if (trimmed.length < 10) return { valid: false, error: 'Description must be at least 10 characters' };
  if (trimmed.length > 1024) return { valid: false, error: 'Description must not exceed 1024 characters' };
  if (!/^[a-zA-Z]/.test(trimmed)) return { valid: false, error: 'Description must start with a letter' };
  if (/<script|<iframe|<object|<embed/.test(trimmed.toLowerCase())) {
    return { valid: false, error: 'Description contains unsafe HTML content' };
  }
  return { valid: true };
};

export const validateBudget = (min: number, max: number): { valid: boolean; error?: string } => {
  if (isNaN(min) || isNaN(max)) return { valid: false, error: 'Budget must be valid numbers' };
  if (min < 500) return { valid: false, error: 'Minimum budget must be at least $500' };
  if (max > 10000000) return { valid: false, error: 'Maximum budget cannot exceed $10,000,000' };
  if (min < 0 || max < 0) return { valid: false, error: 'Budget cannot be negative' };
  if (min > max) return { valid: false, error: 'Minimum budget cannot exceed maximum budget' };
  if (max - min > 1000000 && min < 10000) return { valid: false, error: 'Budget range is too wide for small projects' };
  return { valid: true };
};

export const validateFirstName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'First name is required' };
  if (trimmed.length < 3) return { valid: false, error: 'First name must be at least 3 characters' };
  if (trimmed.length > 10) return { valid: false, error: 'First name must not exceed 10 characters' };
  if (!/^[a-zA-Z]+$/.test(trimmed)) return { valid: false, error: 'First name must contain only letters' };
  return { valid: true };
};

export const validateLastName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Last name is required' };
  if (trimmed.length < 3) return { valid: false, error: 'Last name must be at least 3 characters' };
  if (trimmed.length > 20) return { valid: false, error: 'Last name must not exceed 20 characters' };
  if (!/^[a-zA-Z]+$/.test(trimmed)) return { valid: false, error: 'Last name must contain only letters' };
  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (password.length > 50) return { valid: false, error: 'Password must not exceed 50 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain at least one uppercase letter' };
  if (!/[a-z]/.test(password)) return { valid: false, error: 'Password must contain at least one lowercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Password must contain at least one number' };
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return { valid: false, error: 'Password must contain at least one special character' };
  if (/(.)\1{3,}/.test(password)) return { valid: false, error: 'Password contains repeating characters' };
  if (password.toLowerCase().includes('password')) {
    return { valid: false, error: 'Password is too common or weak' };
  }
  return { valid: true };
};

export const validatePincode = (pincode: string): { valid: boolean; error?: string } => {
  if (!pincode) return { valid: false, error: 'Pincode is required' };
  if (!/^\d{6}$/.test(pincode)) return { valid: false, error: 'Pincode must be exactly 6 digits' };
  return { valid: true };
};

export const validatePhoneNumber = (phone: string, countryCode?: string): { valid: boolean; error?: string } => {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Indian phone number validation (if country code is +91 or 'in')
  if (countryCode === '91' || countryCode === 'in') {
    if (digitsOnly.length !== 10) {
      return { valid: false, error: 'Indian mobile number must be exactly 10 digits' };
    }
    if (!/^[6-9]/.test(digitsOnly)) {
      return { valid: false, error: 'Indian mobile number must start with 6, 7, 8, or 9' };
    }
  } else {
    // International phone number validation
    if (digitsOnly.length < 7) {
      return { valid: false, error: 'Phone number must be at least 7 digits' };
    }
    if (digitsOnly.length > 15) {
      return { valid: false, error: 'Phone number is too long' };
    }
  }
  
  // Check for all same digits (like 0000000000)
  if (/^(\d)\1+$/.test(digitsOnly)) {
    return { valid: false, error: 'Phone number cannot be all same digits' };
  }
  
  return { valid: true };
};

export const validateCity = (city: string): { valid: boolean; error?: string } => {
  const trimmed = city.trim();
  if (!trimmed) return { valid: false, error: 'City is required' };
  if (trimmed.length < 3) return { valid: false, error: 'City must be at least 3 characters' };
  if (trimmed.length > 15) return { valid: false, error: 'City must not exceed 15 characters' };
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) return { valid: false, error: 'City must contain only letters and spaces' };
  return { valid: true };
};

export const validateZipCode = (zip: string, country?: string): { valid: boolean; error?: string } => {
  if (!zip) return { valid: false, error: 'Zip code is required' };
  
  const patterns: Record<string, RegExp> = {
    'United States': /^\d{5}(-\d{4})?$/,
    'United Kingdom': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    'Canada': /^[A-Z]\d[A-Z] \d[A-Z]\d$/i,
    'Australia': /^\d{4}$/,
    'India': /^\d{6}$/,
  };
  
  if (country && patterns[country]) {
    if (!patterns[country].test(zip)) {
      return { valid: false, error: `Invalid zip/postal code format for ${country}` };
    }
  } else {
    // Default validation for unknown countries
    if (!/^[a-zA-Z0-9\s-]{3,10}$/.test(zip)) {
      return { valid: false, error: 'Invalid zip code format' };
    }
  }
  
  return { valid: true };
};

export const validateInstituteName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Institute name is required for business billing' };
  if (trimmed.length < 5) return { valid: false, error: 'Institute name must be at least 5 characters' };
  if (trimmed.length > 50) return { valid: false, error: 'Institute name must not exceed 50 characters' };
  if (!/^[a-zA-Z0-9\s&.,'-]+$/.test(trimmed)) return { valid: false, error: 'Institute name contains invalid characters' };
  return { valid: true };
};

export const validateInstituteAddress = (address: string): { valid: boolean; error?: string } => {
  const trimmed = address.trim();
  if (!trimmed) return { valid: false, error: 'Institute address is required for business billing' };
  if (trimmed.length < 3) return { valid: false, error: 'Institute address must be at least 3 characters' };
  if (trimmed.length > 100) return { valid: false, error: 'Institute address must not exceed 100 characters' };
  if (/<script|<iframe/.test(trimmed.toLowerCase())) return { valid: false, error: 'Address contains unsafe content' };
  return { valid: true };
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email) return { valid: false, error: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, error: 'Please enter a valid email address' };
  if (email.length > 100) return { valid: false, error: 'Email must not exceed 100 characters' };
  
  // Common disposable email domains
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', 'mailinator.com', 
    'yopmail.com', '10minutemail.com', 'fakeinbox.com'
  ];
  const domain = email.split('@')[1];
  if (disposableDomains.some(d => domain.includes(d))) {
    return { valid: false, error: 'Disposable email addresses are not allowed' };
  }
  
  return { valid: true };
};

export const validateDeadline = (date: Date): { valid: boolean; error?: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 3);
  
  if (date < minDate) return { valid: false, error: 'Deadline must be at least 3 days from today' };
  if (date > new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())) {
    return { valid: false, error: 'Deadline cannot be more than 1 year from now' };
  }
  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  const trimmed = username.trim();
  if (!trimmed) return { valid: false, error: 'Username is required' };
  if (trimmed.length < 3) return { valid: false, error: 'Username must be at least 3 characters' };
  if (trimmed.length > 20) return { valid: false, error: 'Username must not exceed 20 characters' };
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  if (/^[0-9]/.test(trimmed)) return { valid: false, error: 'Username cannot start with a number' };
  return { valid: true };
};

export const validateBio = (bio: string): { valid: boolean; error?: string } => {
  const trimmed = bio.trim();
  if (!trimmed) return { valid: false, error: 'Bio is required' };
  if (trimmed.length < 50) return { valid: false, error: 'Bio must be at least 50 characters' };
  if (trimmed.length > 500) return { valid: false, error: 'Bio must not exceed 500 characters' };
  if (/<script|<iframe|<object|<embed/.test(trimmed.toLowerCase())) {
    return { valid: false, error: 'Bio contains unsafe HTML content' };
  }
  return { valid: true };
};

export const validateHourlyRate = (rate: number): { valid: boolean; error?: string } => {
  if (isNaN(rate)) return { valid: false, error: 'Hourly rate must be a valid number' };
  if (rate < 5) return { valid: false, error: 'Hourly rate must be at least $5' };
  if (rate > 500) return { valid: false, error: 'Hourly rate cannot exceed $500' };
  if (rate < 0) return { valid: false, error: 'Hourly rate cannot be negative' };
  if (!Number.isInteger(rate) && !/^\d+(\.\d{1,2})?$/.test(rate.toString())) {
    return { valid: false, error: 'Hourly rate can have maximum 2 decimal places' };
  }
  return { valid: true };
};

export const validateFileSize = (file: File, maxSizeMB: number): { valid: boolean; error?: string } => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) return { valid: false, error: `File size must not exceed ${maxSizeMB}MB` };
  if (file.size === 0) return { valid: false, error: 'File is empty' };
  return { valid: true };
};

export const validateFileType = (file: File, allowedTypes: string[] = ['application/pdf']): { valid: boolean; error?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type must be: ${allowedTypes.join(', ')}` };
  }
  
  // Additional file extension check
  const validExtensions = ['.pdf'];
  const fileName = file.name.toLowerCase();
  if (!validExtensions.some(ext => fileName.endsWith(ext))) {
    return { valid: false, error: 'File must have a valid PDF extension' };
  }
  
  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[<>{}[\]();]/g, '') // Remove dangerous characters
    .substring(0, 5000); // Limit length
};

// NEW VALIDATIONS

export const validateTermsAgreement = (agreed: boolean): { valid: boolean; error?: string } => {
  if (!agreed) return { valid: false, error: 'You must agree to the terms and conditions' };
  return { valid: true };
};

export const validateCategory = (category: string): { valid: boolean; error?: string } => {
  if (!category) return { valid: false, error: 'Please select a category' };
  return { valid: true };
};

export const validateIndustry = (industry: string): { valid: boolean; error?: string } => {
  const trimmed = industry.trim();
  if (!trimmed) return { valid: false, error: 'Industry is required' };
  if (trimmed.length < 2) return { valid: false, error: 'Industry must be at least 2 characters' };
  if (trimmed.length > 50) return { valid: false, error: 'Industry must not exceed 50 characters' };
  if (/[<>{}[\]();]/.test(trimmed)) return { valid: false, error: 'Industry contains invalid characters' };
  return { valid: true };
};

export const validateExpertiseCount = (expertise: string[], min: number = 1, max: number = 10): { valid: boolean; error?: string } => {
  if (expertise.length < min) return { valid: false, error: `Please select at least ${min} expertise area${min > 1 ? 's' : ''}` };
  if (expertise.length > max) return { valid: false, error: `Please select no more than ${max} expertise areas` };
  
  // Check for duplicates
  const uniqueExpertise = new Set(expertise.map(e => e.toLowerCase()));
  if (uniqueExpertise.size !== expertise.length) {
    return { valid: false, error: 'Duplicate expertise areas are not allowed' };
  }
  
  return { valid: true };
};

export const validateTimeline = (timeline: string): { valid: boolean; error?: string } => {
  if (!timeline) return { valid: false, error: 'Please select a hiring timeline' };
  return { valid: true };
};

export const validateAddressLine = (address: string): { valid: boolean; error?: string } => {
  const trimmed = address.trim();
  if (!trimmed) return { valid: false, error: 'Address is required' };
  if (trimmed.length < 5) return { valid: false, error: 'Address must be at least 5 characters' };
  if (trimmed.length > 100) return { valid: false, error: 'Address must not exceed 100 characters' };
  if (/<script|<iframe/.test(trimmed.toLowerCase())) return { valid: false, error: 'Address contains unsafe content' };
  return { valid: true };
};

export const validatePhoneWithCountryCode = (phone: string, countryCode: string): { valid: boolean; error?: string } => {
  const fullNumber = countryCode + phone;
  if (!/^\+\d{10,15}$/.test(fullNumber)) {
    return { valid: false, error: 'Please enter a valid international phone number' };
  }
  
  // Validate based on country code
  const countryCodeRules: Record<string, { min: number; max: number; pattern: RegExp }> = {
    '+1': { min: 11, max: 11, pattern: /^\+1\d{10}$/ }, // US/Canada: +1XXXXXXXXXX
    '+44': { min: 13, max: 13, pattern: /^\+44\d{10}$/ }, // UK: +44XXXXXXXXXX
    '+91': { min: 13, max: 13, pattern: /^\+91\d{10}$/ }, // India: +91XXXXXXXXXX
    '+61': { min: 12, max: 12, pattern: /^\+61\d{9}$/ }, // Australia: +61XXXXXXXXX
    '+86': { min: 14, max: 14, pattern: /^\+86\d{11}$/ }, // China: +86XXXXXXXXXXX
  };
  
  if (countryCodeRules[countryCode]) {
    const rule = countryCodeRules[countryCode];
    if (!rule.pattern.test(fullNumber)) {
      return { valid: false, error: `Invalid phone number format for ${countryCode}` };
    }
  }
  
  return { valid: true };
};

export const validateCompanyName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Company name is required for business billing' };
  if (trimmed.length < 3) return { valid: false, error: 'Company name must be at least 3 characters' };
  if (trimmed.length > 50) return { valid: false, error: 'Company name must not exceed 50 characters' };
  if (!/^[a-zA-Z0-9\s&.,'\-()]+$/.test(trimmed)) return { valid: false, error: 'Company name contains invalid characters' };
  if (/^(?:https?:\/\/)/.test(trimmed)) return { valid: false, error: 'Company name cannot be a URL' };
  return { valid: true };
};

export const validateVATNumber = (vat: string, country: string): { valid: boolean; error?: string } => {
  if (!vat) return { valid: true }; // Optional field
  
  const vatPatterns: Record<string, RegExp> = {
    'United States': /^\d{9}$/, // EIN
    'United Kingdom': /^GB\d{9}\d?$|^GB\d{12}$/,
    'Canada': /^\d{9}$/, // BN
    'Australia': /^\d{11}$/, // ABN
    'India': /^\d{15}$/, // GSTIN
  };
  
  if (country && vatPatterns[country]) {
    if (!vatPatterns[country].test(vat)) {
      return { valid: false, error: `Invalid VAT/Tax ID format for ${country}` };
    }
  }
  
  return { valid: true };
};

export const validateLengthValue = (value: string, unit: 'words' | 'pages'): { valid: boolean; error?: string } => {
  const numValue = parseInt(value) || 0;
  
  if (!value) return { valid: false, error: 'Length is required for writing projects' };
  if (isNaN(numValue)) return { valid: false, error: 'Length must be a valid number' };
  
  if (unit === 'words') {
    if (numValue < 50) return { valid: false, error: 'Minimum 50 words required' };
    if (numValue > 100000) return { valid: false, error: 'Maximum 100,000 words allowed' };
  } else {
    if (numValue < 1) return { valid: false, error: 'Minimum 1 page required' };
    if (numValue > 500) return { valid: false, error: 'Maximum 500 pages allowed' };
  }
  
  return { valid: true };
};

export const validateCustomExpertise = (expertise: string): { valid: boolean; error?: string } => {
  const trimmed = expertise.trim();
  if (!trimmed) return { valid: true }; // Optional
  
  if (trimmed.length < 3) return { valid: false, error: 'Custom expertise must be at least 3 characters' };
  if (trimmed.length > 30) return { valid: false, error: 'Custom expertise must not exceed 30 characters' };
  if (!/^[a-zA-Z\s&.,-]+$/.test(trimmed)) return { valid: false, error: 'Custom expertise contains invalid characters' };
  if (trimmed.toLowerCase().includes('http')) return { valid: false, error: 'Custom expertise cannot contain URLs' };
  
  return { valid: true };
};

export const validatePromoCode = (code: string): { valid: boolean; error?: string } => {
  if (!code) return { valid: true }; // Optional
  
  if (code.length < 4) return { valid: false, error: 'Promo code must be at least 4 characters' };
  if (code.length > 20) return { valid: false, error: 'Promo code must not exceed 20 characters' };
  if (!/^[a-zA-Z0-9\-_]+$/.test(code)) return { valid: false, error: 'Promo code contains invalid characters' };
  
  return { valid: true };
};

export const validateState = (state: string, country: string): { valid: boolean; error?: string } => {
  if (!state && country !== 'United Kingdom') return { valid: false, error: 'State is required' };
  return { valid: true };
};

export const validateImportantFactors = (factors: string[]): { valid: boolean; error?: string } => {
  if (factors.length === 0) return { valid: false, error: 'Please select at least one factor or "None of these apply"' };
  
  // Check for contradictory selections
  if (factors.includes('None of these apply') && factors.length > 1) {
    return { valid: false, error: 'Cannot select "None of these apply" with other factors' };
  }
  
  return { valid: true };
};