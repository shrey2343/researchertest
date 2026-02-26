import { API_BASE_URL } from './config';

const API_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get Admin Dashboard Statistics
export const getAdminStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get admin stats error:', error);
    throw error;
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};

// Get Recent Users
export const getRecentUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/recent`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get recent users error:', error);
    throw error;
  }
};

// Get Recent Projects
export const getRecentProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/projects/recent`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get recent projects error:', error);
    throw error;
  }
};

// Get Platform Activity
export const getPlatformActivity = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/activity`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get platform activity error:', error);
    throw error;
  }
};

// Get User Details by ID
export const getUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get user details error:', error);
    throw error;
  }
};

// Delete User
export const deleteUser = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      ...API_CONFIG,
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
