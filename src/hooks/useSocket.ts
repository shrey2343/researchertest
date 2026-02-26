import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Dynamic socket URL based on environment
const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

export const useSocket = (token: string | null) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) {
      console.log('⚠️ No token available for socket connection');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    console.log('🔌 Initializing socket connection...');
    console.log('Token available:', !!token);
    console.log('Socket URL:', SOCKET_URL);

    // Initialize socket connection with production-ready config
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: true
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected successfully');
      console.log('Socket ID:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      console.log('🔌 Cleaning up socket connection');
      socket.disconnect();
    };
  }, [token]);

  const joinProject = (projectId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('join:project', projectId);
    }
  };

  const sendMessage = (data: any) => {
    if (socketRef.current) {
      socketRef.current.emit('message:send', data);
    }
  };

  const startTyping = (projectId: string, userName: string) => {
    if (socketRef.current) {
      socketRef.current.emit('typing:start', { projectId, userName });
    }
  };

  const stopTyping = (projectId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('typing:stop', { projectId });
    }
  };

  const markAsRead = (projectId: string, messageIds: string[]) => {
    if (socketRef.current) {
      socketRef.current.emit('message:read', { projectId, messageIds });
    }
  };

  const onNewMessage = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('message:new', callback);
    }
  };

  const onTypingStart = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('typing:start', callback);
    }
  };

  const onTypingStop = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('typing:stop', callback);
    }
  };

  const onMessageRead = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('message:read', callback);
    }
  };

  const onUserOnline = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('user:online', callback);
    }
  };

  const onUserOffline = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('user:offline', callback);
    }
  };

  const onUsersOnline = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('users:online', callback);
    }
  };

  const onMessageDeleted = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('message:deleted', callback);
    }
  };

  const onMessageEdited = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('message:edited', callback);
    }
  };

  const emitDeleteMessage = (data: any) => {
    if (socketRef.current) {
      socketRef.current.emit('message:delete', data);
    }
  };

  const emitEditMessage = (data: any) => {
    if (socketRef.current) {
      socketRef.current.emit('message:edit', data);
    }
  };

  const offEvent = (eventName: string) => {
    if (socketRef.current) {
      socketRef.current.off(eventName);
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    joinProject,
    sendMessage,
    startTyping,
    stopTyping,
    markAsRead,
    onNewMessage,
    onTypingStart,
    onTypingStop,
    onMessageRead,
    onUserOnline,
    onUserOffline,
    onUsersOnline,
    onMessageDeleted,
    onMessageEdited,
    emitDeleteMessage,
    emitEditMessage,
    offEvent,
  };
};
