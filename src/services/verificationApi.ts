import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitVerification = async (data: any) => {
  const response = await api.post('/verification/submit', data);
  return response.data;
};

export const getUserVerifications = async () => {
  const response = await api.get('/verification/my-verifications');
  return response.data;
};

export const getAllVerifications = async (status?: string) => {
  const response = await api.get('/verification/all', {
    params: { status }
  });
  return response.data;
};

export const approveVerification = async (verificationId: string, comments?: string) => {
  const response = await api.put(`/verification/approve/${verificationId}`, { comments });
  return response.data;
};

export const rejectVerification = async (verificationId: string, comments: string) => {
  const response = await api.put(`/verification/reject/${verificationId}`, { comments });
  return response.data;
};
