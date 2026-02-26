import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../contexts/AuthContext';

export default function TestOnlineStatus() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const socket = useSocket(token);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20));
    console.log(`[TEST] ${message}`);
  };

  useEffect(() => {
    addLog(`Component mounted. User: ${user?._id || 'Not logged in'}`);
    addLog(`Socket connected: ${socket.isConnected}`);
  }, []);

  useEffect(() => {
    if (!socket.isConnected) {
      addLog('⚠️ Socket not connected');
      return;
    }

    addLog('✅ Socket connected! Setting up listeners...');

    const handleUsersOnline = (data: any) => {
      addLog(`📡 Received users:online event with ${data.userIds?.length || 0} users`);
      addLog(`Users: ${JSON.stringify(data.userIds)}`);
      setOnlineUsers(new Set(data.userIds));
    };

    socket.onUsersOnline?.(handleUsersOnline);

    return () => {
      addLog('🧹 Cleaning up listeners');
      socket.offEvent('users:online');
    };
  }, [socket.isConnected]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">🔍 Online Status Test Page</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-sm text-gray-600">Current User</div>
              <div className="font-bold">{user?.fullname || 'Not logged in'}</div>
              <div className="text-xs text-gray-500">{user?._id}</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <div className="text-sm text-gray-600">Socket Status</div>
              <div className={`font-bold ${socket.isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {socket.isConnected ? '✅ Connected' : '❌ Disconnected'}
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded mb-6">
            <div className="text-sm text-gray-600 mb-2">Online Users ({onlineUsers.size})</div>
            <div className="space-y-1">
              {Array.from(onlineUsers).map(userId => (
                <div key={userId} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-mono">{userId}</span>
                  {userId === user?._id && <span className="text-xs text-blue-600">(You)</span>}
                </div>
              ))}
              {onlineUsers.size === 0 && (
                <div className="text-gray-400 text-sm">No online users detected</div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              addLog('🔄 Manual refresh requested');
              window.location.reload();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📋 Event Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-500">No logs yet...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
