import { API_BASE_URL } from './config';

const API_CONFIG = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const sendMessage = async (data: {
  projectId: string;
  receiverId: string;
  message: string;
  messageType?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/messages/send`, {
    method: 'POST',
    ...API_CONFIG,
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getConversation = async (projectId: string, page = 1, limit = 50) => {
  const response = await fetch(
    `${API_BASE_URL}/messages/conversation/${projectId}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      ...API_CONFIG,
    }
  );
  return response.json();
};

export const getMyConversations = async () => {
  const response = await fetch(`${API_BASE_URL}/messages/conversations`, {
    method: 'GET',
    ...API_CONFIG,
  });
  return response.json();
};

export const markAsRead = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/messages/read/${projectId}`, {
    method: 'PUT',
    ...API_CONFIG,
  });
  return response.json();
};

export const uploadFile = async (data: {
  projectId: string;
  receiverId: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append('projectId', data.projectId);
  formData.append('receiverId', data.receiverId);
  formData.append('file', data.file);

  const response = await fetch(`${API_BASE_URL}/messages/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return response.json();
};

export const getUnreadCount = async () => {
  const response = await fetch(`${API_BASE_URL}/messages/unread-count`, {
    method: 'GET',
    ...API_CONFIG,
  });
  return response.json();
};

export const reportMessage = async (messageId: string, reason: string) => {
  const response = await fetch(`${API_BASE_URL}/messages/report/${messageId}`, {
    method: 'POST',
    ...API_CONFIG,
    body: JSON.stringify({ reason }),
  });
  return response.json();
};


// Delete message
export const deleteMessage = async (messageId: string) => {
  const response = await fetch(`${API_BASE_URL}/messages/delete/${messageId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete message');
  return data;
};

// Edit message
export const editMessage = async (messageId: string, message: string) => {
  const response = await fetch(`${API_BASE_URL}/messages/edit/${messageId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to edit message');
  return data;
};

// Delete conversation
export const deleteConversation = async (projectId: string) => {
  const response = await fetch(`${API_BASE_URL}/messages/conversation/${projectId}`, {
    method: 'DELETE',
    ...API_CONFIG,
  });
  return response.json();
};
