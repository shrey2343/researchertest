/**
 * Authentication API Service
 * Handles user registration, login, logout, and profile management
 */

import { API_BASE_URL } from './config';

// Register user
export const registerUser = async (userData: {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'client' | 'freelancer';
}) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  // Store token in localStorage for socket authentication
  if (data.success && data.token) {
    localStorage.setItem('token', data.token);
    const expirationTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
  
  return data;
};

// Google signup
export const googleSignup = async (token: string, role: 'client' | 'freelancer') => {
  const response = await fetch(`${API_BASE_URL}/user/google-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ token, role }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Google signup failed');
  }
  
  // Store token expiration time (3 days from now)
  if (data.success && data.token) {
    const expirationTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
  
  return data;
};

// Logout user
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  // Clear token and expiration from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
  
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }
  
  return data;
};

// Refresh token - extends the session
export const refreshToken = async () => {
  const response = await fetch(`${API_BASE_URL}/user/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Token refresh failed');
  }
  
  // Update token expiration time (3 days from now)
  if (data.success && data.token) {
    const expirationTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
  
  return data;
};

// Check if token needs refresh (refresh if less than 1 day remaining)
export const shouldRefreshToken = (): boolean => {
  const expirationTime = localStorage.getItem('tokenExpiration');
  if (!expirationTime) return false;
  
  const timeRemaining = parseInt(expirationTime) - Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  
  // Refresh if less than 1 day remaining
  return timeRemaining > 0 && timeRemaining < oneDayInMs;
};

// Check if token is expired
export const isTokenExpired = (): boolean => {
  const expirationTime = localStorage.getItem('tokenExpiration');
  if (!expirationTime) return true;
  
  return Date.now() >= parseInt(expirationTime);
};

// Update profile
export const updateProfile = async (profileData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/user/profile/update`, {
    method: 'POST',
    credentials: 'include',
    body: profileData, // FormData for file upload
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Profile update failed');
  }
  
  return data;
};

// Get current user from backend session
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user');
  }
  
  return data;
};

// Admin login
export const adminLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Admin login failed');
  }
  
  // Store token in localStorage for socket authentication
  if (data.success && data.token) {
    localStorage.setItem('token', data.token);
    const expirationTime = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }
  
  return data;
};

// Admin logout
export const adminLogout = async () => {
  const response = await fetch(`${API_BASE_URL}/user/admin/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  // Clear token expiration from localStorage
  localStorage.removeItem('tokenExpiration');
  
  if (!response.ok) {
    throw new Error(data.message || 'Admin logout failed');
  }
  
  return data;
};

// Get Bank Account Details (Freelancer only)
export const getBankAccount = async () => {
  const response = await fetch(`${API_BASE_URL}/user/bank-account`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch bank account');
  }
  
  return data;
};

// Update Bank Account Details (Freelancer only)
export const updateBankAccount = async (bankData: {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  upiId: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/user/bank-account/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bankData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update bank account');
  }
  
  return data;
};

// Get Active Sessions
export const getActiveSessions = async () => {
  const response = await fetch(`${API_BASE_URL}/user/sessions`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch sessions');
  }
  
  return data;
};

// Revoke a specific session
export const revokeSession = async (sessionId: string) => {
  const response = await fetch(`${API_BASE_URL}/user/sessions/${sessionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to revoke session');
  }
  
  return data;
};

// Logout from all devices
export const logoutAllDevices = async () => {
  const response = await fetch(`${API_BASE_URL}/user/sessions/logout-all`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();
  
  // Clear token expiration from localStorage
  localStorage.removeItem('tokenExpiration');
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to logout from all devices');
  }
  
  return data;
};

// Get token statistics
export const getTokenStats = async () => {
  const response = await fetch(`${API_BASE_URL}/user/sessions/stats`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch token stats');
  }
  
  return data;
};

// Get all freelancers
export const getAllFreelancers = async () => {
  const response = await fetch(`${API_BASE_URL}/user/freelancers`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch freelancers');
  }
  
  return data;
};
