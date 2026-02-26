import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const postProjectFromLanding = async (projectData: any) => {
  try {
    const formData = new FormData();
    
    // Append all project data
    Object.keys(projectData).forEach(key => {
      if (key === 'pdfFile' && projectData[key]) {
        formData.append('files', projectData[key]);
      } else if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else if (projectData[key] !== null && projectData[key] !== undefined) {
        formData.append(key, projectData[key]);
      }
    });

    console.log('Posting to:', `${API_URL}/project/post-from-landing`);
    console.log('Project data:', projectData);

    const response = await axios.post(
      `${API_URL}/project/post-from-landing`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('API Error:', error);
    
    // Check if it's a network error (server not running)
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      throw new Error('Backend server is not running. Please start the backend server first.');
    }
    
    // Check for CORS error
    if (error.message.includes('CORS')) {
      throw new Error('CORS error. Please check backend CORS configuration.');
    }
    
    // Handle axios response errors
    if (error.response) {
      const errorMessage = error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`;
      throw new Error(errorMessage);
    }
    
    // Handle other errors
    throw new Error(error.message || 'Failed to post project');
  }
};
