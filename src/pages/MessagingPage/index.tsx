import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Download, FileText, Shield, AlertTriangle, X, CheckCheck, Check, Crown, Info, Menu, MoreVertical, Trash2, Archive, Palette, Video, Phone, Mic, MicOff, PhoneOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../hooks/useSocket';
import { useWebRTC } from '../../hooks/useWebRTC';
import * as messageApi from '../../services/messageApi';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import ChatBackground from '../../components/ChatBackground';

interface Message {
  _id: string;
  senderId: { _id: string; fullname: string; profilePhoto?: string };
  receiverId: { _id: string; fullname: string; profilePhoto?: string };
  message: string;
  messageType: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  _id: string;
  projectId: { _id: string; title: string; status: string; category: string };
  participants: Array<{ _id: string; fullname: string; profilePhoto?: string; role: string }>;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: Map<string, number>;
}

export default function MessagingPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [uploading, setUploading] = useState(false);
  const [warning, setWarning] = useState('');
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatBg, setChatBg] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem('token');
  const socket = useSocket(token);
  
  const webRTC = useWebRTC({
    socket,
    userId: user?._id || '',
    onCallEnded: () => {},
  });

  const chatBackgrounds = [
    { bg: 'bg-gradient-to-br from-yellow-50/80 via-amber-50/80 to-orange-50/80' },
    { bg: 'bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80' },
    { bg: 'bg-gradient-to-br from-pink-50/80 via-rose-50/80 to-red-50/80' },
    { bg: 'bg-gradient-to-br from-orange-50/80 via-red-50/80 to-rose-50/80' },
    { bg: 'bg-gradient-to-br from-cyan-50/80 via-sky-50/80 to-blue-50/80' },
  ];

  const changeChatBackground = () => {
    setChatBg((prev) => (prev + 1) % chatBackgrounds.length);
  };

  const initiateCall = (type: 'voice' | 'video') => {
    if (!selectedConversation) return;
    const otherUser = getOtherParticipant(selectedConversation);
    if (!otherUser) return;
    
    if (!isUserOnline(otherUser._id)) {
      toast.error('User is offline');
      return;
    }
    
    // Show pricing modal before call
    setShowPricingModal(true);
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const proceedWithCall = () => {
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }
    
    setShowPricingModal(false);
    const otherUser = getOtherParticipant(selectedConversation!);
    if (otherUser) {
      webRTC.startCall(otherUser._id, otherUser.fullname);
      toast.success(`Call started with ${selectedPlan} plan!`);
    }
    setSelectedPlan(null);
  };

  const startTestCall = () => {
    setShowPricingModal(false);
    const otherUser = getOtherParticipant(selectedConversation!);
    if (otherUser) {
      webRTC.startCall(otherUser._id, otherUser.fullname);
      toast.success('Test call started - Free for demo!');
    }
    setSelectedPlan(null);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedConversation) {
      setShowSidebar(true);
    }
  }, [selectedConversation]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load conversations
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await messageApi.getMyConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.projectId._id);
      socket.joinProject(selectedConversation.projectId._id);
      markMessagesAsRead(selectedConversation.projectId._id);
    }
  }, [selectedConversation]);

  const loadMessages = async (projectId: string) => {
    try {
      const response = await messageApi.getConversation(projectId);
      if (response.success) {
        setMessages(response.data);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const markMessagesAsRead = async (projectId: string) => {
    try {
      await messageApi.markAsRead(projectId);
      // Update local conversation unread count
      setConversations(prev =>
        prev.map(conv =>
          conv.projectId._id === projectId
            ? { ...conv, unreadCount: new Map() }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  // Socket event listeners
  useEffect(() => {
    if (!socket.isConnected) return;

    socket.onUsersOnline?.((data: any) => {
      setOnlineUsers(new Set(data.userIds));
    });

    socket.onNewMessage((data: any) => {
      if (selectedConversation && data.projectId === selectedConversation.projectId._id) {
        setMessages(prev => [...prev, data]);
        scrollToBottom();
        markMessagesAsRead(data.projectId);
      }
      loadConversations();
    });

    socket.onTypingStart((data: any) => {
      if (selectedConversation && data.userId !== user?._id) {
        setIsTyping(true);
        setTypingUser(data.userName);
      }
    });

    socket.onTypingStop(() => {
      setIsTyping(false);
      setTypingUser('');
    });

    socket.onUserOnline((data: any) => {
      setOnlineUsers(prev => new Set(prev).add(data.userId));
    });

    socket.onUserOffline((data: any) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    return () => {
      socket.offEvent('message:new');
      socket.offEvent('typing:start');
      socket.offEvent('typing:stop');
      socket.offEvent('user:online');
      socket.offEvent('user:offline');
      socket.offEvent('users:online');
    };
  }, [socket.isConnected, selectedConversation, user]);

  // Content validation
  const validateMessage = (text: string) => {
    const patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
      phone: /(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
      whatsapp: /whatsapp|wa\.me/gi,
      social: /facebook|instagram|twitter|linkedin|telegram/gi,
      link: /(https?:\/\/)|(www\.)|(\.[a-z]{2,})/gi,
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        return `⚠️ ${key.toUpperCase()} detected! External contact info is not allowed.`;
      }
    }
    return '';
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessageInput(text);

    // Real-time validation
    const validationWarning = validateMessage(text);
    setWarning(validationWarning);

    // Typing indicator
    if (selectedConversation && text.trim()) {
      socket.startTyping(selectedConversation.projectId._id, user?.fullname || 'User');
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.stopTyping(selectedConversation.projectId._id);
      }, 1000);
    }
  };

  // Send message
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedConversation || !user) return;

    const validationWarning = validateMessage(messageInput);
    if (validationWarning) {
      toast.error('Message blocked: Contains prohibited content');
      return;
    }

    const otherParticipant = selectedConversation.participants.find(p => p._id !== user._id);
    if (!otherParticipant) {
      toast.error('Cannot find receiver');
      return;
    }

    try {
      const response = await messageApi.sendMessage({
        projectId: selectedConversation.projectId._id,
        receiverId: otherParticipant._id,
        message: messageInput,
        messageType: 'text',
      });

      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        setMessageInput('');
        setWarning('');
        socket.sendMessage({
          ...response.data,
          projectId: selectedConversation.projectId._id,
          receiverId: otherParticipant._id,
        });
        socket.stopTyping(selectedConversation.projectId._id);
        scrollToBottom();
        loadConversations();
      } else if (response.violations) {
        toast.error(`Message blocked: ${response.violations[0].message}`);
        if (response.strikes >= 3) {
          toast.error(`Warning: You have ${response.strikes} strikes. Account may be suspended.`);
        }
      } else {
        toast.error(response.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  // File upload
  const onDrop = async (acceptedFiles: File[]) => {
    if (!selectedConversation || !user) return;

    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('File type not allowed. Only PDF, DOCX, XLSX, PNG, JPG are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const otherParticipant = selectedConversation.participants.find(p => p._id !== user._id);
    if (!otherParticipant) return;

    setUploading(true);
    try {
      const response = await messageApi.uploadFile({
        projectId: selectedConversation.projectId._id,
        receiverId: otherParticipant._id,
        file,
      });

      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        socket.sendMessage({
          ...response.data,
          projectId: selectedConversation.projectId._id,
          receiverId: otherParticipant._id,
        });
        scrollToBottom();
        loadConversations();
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
  });

  const getOtherParticipant = (conv: Conversation) => {
    return conv.participants.find(p => p._id !== user?._id);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isUserOnline = (userId: string) => {
    return onlineUsers.has(userId);
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const handleDeleteConversation = async (conv: Conversation) => {
    try {
      const response = await messageApi.deleteConversation(conv.projectId._id);
      if (response.success) {
        setConversations(prev => prev.filter(c => c._id !== conv._id));
        if (selectedConversation?._id === conv._id) {
          setSelectedConversation(null);
        }
        setOpenMenuId(null);
        toast.success('Conversation deleted permanently');
      } else {
        toast.error(response.message || 'Failed to delete conversation');
      }
    } catch (error) {
      toast.error('Failed to delete conversation');
    }
  };

  const handleArchiveConversation = (convId: string) => {
    setConversations(prev => prev.filter(c => c._id !== convId));
    if (selectedConversation?._id === convId) {
      setSelectedConversation(null);
    }
    setOpenMenuId(null);
    toast.success('Conversation archived');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 pt-20 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-200">
          <Crown className="mx-auto mb-4 text-amber-500" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access secure messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 pt-20 pb-0">
      <div className="max-w-[1800px] mx-auto px-6 h-[calc(100vh-80px)]">
        {/* Security Info - Show on click */}
        {showSecurityInfo && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm">
            <Shield className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-amber-900">
              <span className="font-bold">Secure Platform Messaging:</span> All communications are monitored and encrypted. 
              External contact information (email, telephone, social media) is strictly prohibited and will be automatically blocked.
            </div>
            <button
              onClick={() => setShowSecurityInfo(false)}
              className="text-amber-600 hover:text-amber-800 ml-auto flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-[calc(100%-60px)]">
          {/* Conversations List - Mobile Responsive */}
          <div className={`${selectedConversation ? 'hidden lg:block' : 'block'} lg:col-span-4 bg-white border border-gray-200 rounded-xl lg:rounded-2xl shadow-xl overflow-hidden flex flex-col`}>
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Messages</h2>
                <button
                  onClick={() => setShowSecurityInfo(true)}
                  className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                  title="Security Information"
                >
                  <Info size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <Crown className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="font-semibold text-gray-700">No conversations yet</p>
                  <p className="text-sm mt-2">Start by accepting a project proposal</p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const other = getOtherParticipant(conv);
                  const unread = conv.unreadCount?.get?.(user._id) || 0;
                  
                  return (
                    <div
                      key={conv._id}
                      className={`p-3 lg:p-4 border-b border-gray-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 relative ${
                        selectedConversation?._id === conv._id
                          ? 'bg-slate-100 border-l-4 border-l-slate-700'
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div 
                          onClick={() => {
                            setSelectedConversation(conv);
                            setShowSidebar(false);
                          }}
                          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="relative group">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md transition-transform group-hover:scale-110">
                              {other?.profilePhoto ? (
                                <img src={other.profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                              ) : (
                                getInitials(other?.fullname || 'U')
                              )}
                            </div>
                            {other && isUserOnline(other._id) && (
                              <span className="absolute bottom-0 right-0 inline-flex">
                                <span className="w-3 h-3 lg:w-3.5 lg:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                <span className="absolute inset-0 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="font-bold text-gray-900 truncate">
                                {other?.fullname || 'Unknown'}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {conv.projectId.title}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {unread > 0 && (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                              {unread}
                            </div>
                          )}
                          <div className="relative" ref={openMenuId === conv._id ? menuRef : null}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === conv._id ? null : conv._id);
                              }}
                              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <MoreVertical size={18} className="text-gray-600" />
                            </button>
                            {openMenuId === conv._id && (
                              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[140px] py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleArchiveConversation(conv._id);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 text-gray-700 transition-colors"
                                >
                                  <Archive size={16} />
                                  Archive
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteConversation(conv);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors"
                                >
                                  <Trash2 size={16} />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={() => {
                          setSelectedConversation(conv);
                          setShowSidebar(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="text-sm text-gray-600 truncate">{conv.lastMessage}</div>
                        <div className="text-xs text-gray-400 mt-1">{formatTime(conv.lastMessageAt)}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area - Mobile Responsive */}
          <div className={`${selectedConversation ? 'block' : 'hidden lg:block'} lg:col-span-8 bg-white border border-gray-200 rounded-xl lg:rounded-2xl shadow-xl overflow-hidden flex flex-col`}>
            {selectedConversation ? (
              <>
                <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
                        title="Back to conversations"
                      >
                        <X size={20} />
                      </button>
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {getInitials(getOtherParticipant(selectedConversation)?.fullname || 'U')}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 text-sm lg:text-base truncate">
                          {getOtherParticipant(selectedConversation)?.fullname || 'Unknown'}
                        </div>
                        <div className="text-xs lg:text-sm flex items-center gap-2">
                          {getOtherParticipant(selectedConversation) && isUserOnline(getOtherParticipant(selectedConversation)!._id) ? (
                            <span className="px-2 py-0.5 text-green-600 text-xs font-semibold bg-green-50 rounded-md flex items-center gap-1">
                              <span className="relative inline-flex">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                <span className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
                              </span>
                              Online
                            </span>
                          ) : (
                            <span className="text-gray-500 text-xs">Offline</span>
                          )}
                          <span className="text-gray-400 hidden lg:inline">•</span>
                          <span className="text-gray-500 truncate hidden lg:inline">{selectedConversation.projectId.title}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                      <button
                        onClick={() => initiateCall('video')}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                        title="Video Call"
                      >
                        <Video size={16} className="lg:w-5 lg:h-5" />
                      </button>
                      <button
                        onClick={() => initiateCall('voice')}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                        title="Voice Call"
                      >
                        <Phone size={16} className="lg:w-5 lg:h-5" />
                      </button>
                      <button
                        onClick={changeChatBackground}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
                        title="Change Background Theme"
                      >
                        <Palette size={16} className="lg:w-5 lg:h-5" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
                        title="More Options"
                      >
                        <MoreVertical size={16} className="lg:w-5 lg:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area - Mobile Responsive */}
                <div {...getRootProps()} className={`flex-1 overflow-y-auto p-3 lg:p-6 space-y-2 lg:space-y-4 ${chatBackgrounds[chatBg].bg} pb-4 lg:pb-16 relative transition-all duration-700`}>
                  <ChatBackground themeIndex={chatBg} key={chatBg} />
                  <input {...getInputProps()} />
                  {isDragActive && (
                    <div className="absolute inset-0 bg-slate-500/20 border-4 border-dashed border-slate-500 rounded-2xl flex items-center justify-center z-50">
                      <p className="text-slate-700 font-bold text-xl">Drop file here</p>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                  {messages.map((msg) => {
                    const isMe = msg.senderId._id === user._id;
                    return (
                      <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[70%]`}>
                          {msg.messageType === 'text' ? (
                            <div
                              className={`rounded-2xl px-4 py-3 shadow-sm ${
                                isMe
                                  ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'
                                  : 'bg-white text-gray-800 border border-gray-200'
                              }`}
                            >
                              <p className="leading-relaxed break-words">{msg.message}</p>
                            </div>
                          ) : (
                            <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white hover:border-slate-400 transition-colors shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <FileText className="text-slate-600" size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 truncate">{msg.fileName}</div>
                                </div>
                                <a
                                  href={msg.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                  <Download size={20} />
                                </a>
                              </div>
                            </div>
                          )}
                          <div className={`flex items-center gap-1 text-xs text-gray-400 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <span>{formatTime(msg.createdAt)}</span>
                            {isMe && (
                              msg.isRead ? <CheckCheck size={14} className="text-slate-500" /> : <Check size={14} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span className="text-xs text-gray-600">{typingUser} is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-3 lg:p-4 border-t border-gray-200 bg-white">
                  {warning && (
                    <div className="mb-2 lg:mb-3 p-2 lg:p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs lg:text-sm text-red-800">
                      <AlertTriangle size={14} className="lg:w-4 lg:h-4" />
                      <span>{warning}</span>
                    </div>
                  )}
                  
                  <div className="bg-slate-50 rounded-lg lg:rounded-xl border-2 border-gray-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200 transition-all">
                    <div className="flex items-end gap-2 p-2 lg:p-3">
                      <label className="text-gray-400 hover:text-slate-600 transition-colors p-1.5 lg:p-2 cursor-pointer flex-shrink-0">
                        <Paperclip size={18} className="lg:w-5 lg:h-5" />
                        <input {...getInputProps()} className="hidden" />
                      </label>
                      <textarea
                        value={messageInput}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 resize-none focus:outline-none text-gray-900 bg-transparent placeholder-gray-400 max-h-32 text-sm lg:text-base"
                        disabled={uploading}
                      />
                      <button
                        onClick={handleSend}
                        disabled={!messageInput.trim() || uploading || !!warning}
                        className={`p-1.5 lg:p-2 rounded-lg transition-all flex-shrink-0 ${
                          messageInput.trim() && !warning
                            ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:from-slate-600 hover:to-slate-800 shadow-md'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send size={18} className="lg:w-5 lg:h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Shield size={12} className="lg:w-3.5 lg:h-3.5" />
                    <span className="text-xs lg:text-sm">All messages are monitored. External contact sharing is prohibited.</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 bg-slate-50">
                <div className="text-center">
                  <Crown className="mx-auto mb-4 text-gray-300" size={64} />
                  <p className="text-xl font-semibold mb-2 text-gray-700">Select a conversation</p>
                  <p className="text-sm text-gray-500">Choose a conversation from the list to begin messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Choose Your Talk Time
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Select a plan to start your voice call</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
              {/* Starter Plan */}
              <div
                onClick={() => handlePlanSelect('starter')}
                className={`relative cursor-pointer rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === 'starter'
                    ? 'border-blue-500 bg-blue-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {selectedPlan === 'starter' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1.5">
                    <Check size={16} />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🥉</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Starter</h3>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">50</span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">Coins</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">15 Min</div>
                  <p className="text-xs sm:text-sm text-gray-600">Quick consultations</p>
                </div>
              </div>

              {/* Popular Plan */}
              <div
                onClick={() => handlePlanSelect('popular')}
                className={`relative cursor-pointer rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === 'popular'
                    ? 'border-green-500 bg-green-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg'
                }`}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                  POPULAR
                </div>
                {selectedPlan === 'popular' && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5">
                    <Check size={16} />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🥈</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Popular</h3>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">100</span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">Coins</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">30 Min</div>
                  <p className="text-xs sm:text-sm text-gray-600">Best value</p>
                </div>
              </div>

              {/* Premium Plan */}
              <div
                onClick={() => handlePlanSelect('premium')}
                className={`relative cursor-pointer rounded-2xl p-4 sm:p-6 border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === 'premium'
                    ? 'border-purple-500 bg-purple-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                {selectedPlan === 'premium' && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1.5">
                    <Check size={16} />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🥇</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Premium</h3>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-600">180</span>
                    <span className="text-sm sm:text-base text-gray-600 ml-1">Coins</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">60 Min</div>
                  <p className="text-xs sm:text-sm text-gray-600">Extended time</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => {
                  setShowPricingModal(false);
                  setSelectedPlan(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={startTestCall}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <Phone size={16} />
                Test Call (Free)
              </button>
              <button
                onClick={proceedWithCall}
                disabled={!selectedPlan}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base ${
                  selectedPlan
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Phone size={18} />
                Start Call
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4 sm:mt-6">
              💡 Payment integration coming soon!
            </p>
          </div>
        </div>
      )}

      {/* Incoming Call Modal */}
      {webRTC.isReceivingCall && webRTC.caller && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">
            <div className="mb-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-3xl lg:text-4xl mx-auto mb-4 animate-pulse">
                {getInitials(webRTC.caller.callerName || 'U')}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {webRTC.caller.callerName || 'Unknown'}
              </h3>
              <p className="text-green-100 text-lg">
                📞 Incoming Voice Call
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={webRTC.rejectCall}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <PhoneOff size={20} />
                Decline
              </button>
              <button
                onClick={webRTC.acceptCall}
                className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Phone size={20} />
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Call Modal */}
      {(webRTC.isCalling || webRTC.callAccepted) && selectedConversation && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            {/* User Avatar */}
            <div className="mb-8">
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-5xl lg:text-6xl mx-auto mb-6 shadow-2xl animate-pulse">
                {getInitials(getOtherParticipant(selectedConversation)?.fullname || 'U')}
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                {getOtherParticipant(selectedConversation)?.fullname || 'Unknown'}
              </h3>
              <p className="text-gray-300 text-lg">
                {webRTC.callAccepted ? 'Connected' : 'Ringing...'}
              </p>
            </div>
            
            {/* Calling Animation */}
            {!webRTC.callAccepted && (
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            
            {/* Call Controls */}
            <div className="flex gap-6 justify-center items-center mt-12">
              <button
                onClick={webRTC.toggleMute}
                className={`w-16 h-16 rounded-full font-semibold transition-all duration-200 shadow-2xl transform hover:scale-110 active:scale-95 flex items-center justify-center ${
                  webRTC.isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={webRTC.isMuted ? 'Unmute' : 'Mute'}
              >
                {webRTC.isMuted ? <MicOff size={28} className="text-white" /> : <Mic size={28} className="text-white" />}
              </button>
              <button
                onClick={webRTC.endCall}
                className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all duration-200 shadow-2xl transform hover:scale-110 active:scale-95 flex items-center justify-center"
              >
                <PhoneOff size={32} />
              </button>
            </div>
            
            {/* Hidden audio elements */}
            <audio ref={webRTC.localAudioRef} autoPlay muted playsInline />
            <audio ref={webRTC.remoteAudioRef} autoPlay playsInline volume={1.0} />
            
            {/* Debug Info */}
            {webRTC.callAccepted && (
              <div className="mt-8 text-gray-400 text-xs space-y-2">
                <p>Local: {webRTC.localStream ? '✅' : '❌'}</p>
                <p>Remote: {webRTC.remoteStream ? '✅' : '❌'}</p>
                {webRTC.remoteStream && (
                  <button
                    onClick={() => {
                      const audio = webRTC.remoteAudioRef.current;
                      if (audio) {
                        audio.play().then(() => alert('Playing!')).catch(e => alert('Error: ' + e.message));
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Test Audio
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #e0f2fe;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
        }
      `}</style>
    </div>
  );
}
