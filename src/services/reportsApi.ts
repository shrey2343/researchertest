import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAnalyticsReport = async (filters?: { startDate?: string; endDate?: string; category?: string }) => {
  const response = await api.get('/reports/analytics', { params: filters });
  return response.data;
};
