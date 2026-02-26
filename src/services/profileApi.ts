/**
 * Profile API Service
 * 
 * Handles all researcher profile related API calls
 */

import { API_BASE_URL } from './config';

// Update researcher profile
export const updateResearcherProfile = async (profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/user/researcher-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to update profile');
  }
  return data;
};

// Get researcher profile
export const getResearcherProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/user/researcher-profile`, {
    credentials: 'include',
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Failed to get profile');
  }
  return data;
};