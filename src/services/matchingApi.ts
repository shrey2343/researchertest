import { API_BASE_URL } from './config';

const API_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get Recommended Projects for Freelancer
export const getRecommendedProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matching/recommended-projects`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get recommended projects error:', error);
    throw error;
  }
};

// Get Suggested Freelancers for Project
export const getSuggestedFreelancers = async (projectId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/matching/project/${projectId}/suggested-freelancers`,
      API_CONFIG
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get suggested freelancers error:', error);
    throw error;
  }
};

// Send Invitation to Freelancer
export const sendInvitation = async (projectId: string, freelancerId: string, message?: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/matching/project/${projectId}/invite/${freelancerId}`,
      {
        ...API_CONFIG,
        method: 'POST',
        body: JSON.stringify({ message }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Send invitation error:', error);
    throw error;
  }
};

// Get My Invitations (Freelancer)
export const getMyInvitations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matching/my-invitations`, API_CONFIG);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get my invitations error:', error);
    throw error;
  }
};

// Update Invitation Status
export const updateInvitationStatus = async (invitationId: string, status: 'accepted' | 'declined') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/matching/invitations/${invitationId}`,
      {
        ...API_CONFIG,
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update invitation status error:', error);
    throw error;
  }
};
