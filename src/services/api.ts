/**
 * Xperthiring API Service - Main Export
 * 
 * This file centralizes all API exports for easy importing throughout the application.
 * 
 * Backend API Base URL: http://localhost:8000/api/v1
 * 
 * Role Mapping:
 * - Frontend: 'client' / 'freelancer'
 * - Backend: 'client' / 'freelancer'
 * - UI Display: 'Post Projects' / 'Offer Services'
 * 
 * All API calls use credentials: 'include' for cookie-based authentication
 */

// Export API configuration
export { API_BASE_URL, API_CONFIG } from './config';

// Export all authentication APIs
export {
  registerUser,
  loginUser,
  googleSignup,
  logoutUser,
  updateProfile,
  getCurrentUser,
  refreshToken,
  shouldRefreshToken,
  isTokenExpired,
  adminLogin,
  getBankAccount,
  updateBankAccount,
  getActiveSessions,
  revokeSession,
  logoutAllDevices,
  getTokenStats,
  getAllFreelancers,
} from './authApi';

// Export all project APIs
export {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectStats,
  getProjectById,
  updateProject,
  deleteProject,
  submitBid,
  acceptBid,
  rejectBid,
  getMyProposals,
  getMyActiveProjects,
  getMyCompletedProjects,
  getFreelancerStats,
  updateProjectProgress,
  getProgressUpdates,
} from './projectApi';

// Export profile APIs
export {
  updateResearcherProfile,
  getResearcherProfile,
} from './profileApi';

// Export message APIs
export {
  sendMessage,
  getConversation,
  getMyConversations,
  markAsRead,
  uploadFile,
  getUnreadCount,
  reportMessage,
} from './messageApi';
