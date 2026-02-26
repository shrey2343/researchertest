import { useEffect, useRef, useState } from 'react';

interface UseWebRTCProps {
  socket: any;
  userId: string;
  onCallEnded?: () => void;
}

export const useWebRTC = ({ socket, userId, onCallEnded }: UseWebRTCProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [caller, setCaller] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  useEffect(() => {
    if (!socket.isConnected) return;

    socket.socket?.on('call:incoming', handleIncomingCall);
    socket.socket?.on('call:accepted', handleCallAccepted);
    socket.socket?.on('call:rejected', handleCallRejected);
    socket.socket?.on('call:ended', handleCallEnded);
    socket.socket?.on('webrtc:offer', handleOffer);
    socket.socket?.on('webrtc:answer', handleAnswer);
    socket.socket?.on('webrtc:ice-candidate', handleIceCandidate);

    return () => {
      socket.socket?.off('call:incoming');
      socket.socket?.off('call:accepted');
      socket.socket?.off('call:rejected');
      socket.socket?.off('call:ended');
      socket.socket?.off('webrtc:offer');
      socket.socket?.off('webrtc:answer');
      socket.socket?.off('webrtc:ice-candidate');
    };
  }, [socket.isConnected]);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate && caller) {
        const targetUserId = caller.from || caller.userId;
        socket.socket?.emit('webrtc:ice-candidate', {
          candidate: event.candidate,
          to: targetUserId,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log('🎵 Remote track received:', event.streams[0]);
      console.log('Track kind:', event.track.kind);
      console.log('Track enabled:', event.track.enabled);
      setRemoteStream(event.streams[0]);
      if (remoteAudioRef.current && event.streams[0]) {
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.volume = 1.0;
        remoteAudioRef.current.play()
          .then(() => console.log('✅ Remote audio playing'))
          .catch(e => {
            console.error('Error playing remote audio:', e);
            // Try to play again after user interaction
            setTimeout(() => {
              remoteAudioRef.current?.play().catch(err => console.error('Retry failed:', err));
            }, 1000);
          });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
    };

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState);
    };

    return pc;
  };

  const startCall = async (receiverId: string, receiverName: string) => {
    try {
      console.log('📞 Starting call to:', receiverId);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }, 
        video: false 
      });
      console.log('🎵 Local stream obtained:', stream.getAudioTracks());
      setLocalStream(stream);
      setIsCalling(true);
      setCaller({ userId: receiverId, callerName: receiverName });

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        localAudioRef.current.muted = true;
      }

      socket.socket?.emit('call:initiate', {
        to: receiverId,
        from: userId,
        callerName: receiverName,
        callType: 'voice',
      });

      peerConnection.current = createPeerConnection();
      stream.getTracks().forEach((track) => {
        console.log('➕ Adding local track:', track.kind);
        peerConnection.current?.addTrack(track, stream);
      });

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      console.log('📤 Sending offer');

      socket.socket?.emit('webrtc:offer', {
        offer,
        to: receiverId,
      });
    } catch (error) {
      console.error('Error starting call:', error);
      alert('Could not access microphone. Please check permissions.');
      endCall();
    }
  };

  const handleIncomingCall = (data: any) => {
    console.log('📞 Incoming call from:', data.from);
    setIsReceivingCall(true);
    setCaller(data);
    
    // Create peer connection immediately when call comes
    peerConnection.current = createPeerConnection();
  };

  const acceptCall = async () => {
    try {
      console.log('✅ Accepting call');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }, 
        video: false 
      });
      console.log('🎵 Local stream obtained:', stream.getAudioTracks());
      setLocalStream(stream);
      setCallAccepted(true);
      setIsReceivingCall(false);

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        localAudioRef.current.muted = true;
      }

      socket.socket?.emit('call:accept', {
        to: caller.from,
      });

      // Peer connection already created in handleIncomingCall
      if (peerConnection.current) {
        stream.getTracks().forEach((track) => {
          console.log('➕ Adding local track:', track.kind);
          peerConnection.current?.addTrack(track, stream);
        });
      }
      
      console.log('✅ Call accepted, peer connection ready');
    } catch (error) {
      console.error('Error accepting call:', error);
      alert('Could not access microphone. Please check permissions.');
      rejectCall();
    }
  };

  const rejectCall = () => {
    socket.socket?.emit('call:reject', {
      to: caller?.from,
    });
    setIsReceivingCall(false);
    setCaller(null);
  };

  const handleCallAccepted = () => {
    setCallAccepted(true);
  };

  const handleCallRejected = () => {
    endCall();
  };

  const handleOffer = async (data: any) => {
    console.log('🔄 Received WebRTC offer');
    if (!peerConnection.current) {
      console.error('Peer connection not initialized');
      return;
    }

    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.socket?.emit('webrtc:answer', {
        answer,
        to: data.from,
      });
      console.log('✅ WebRTC answer sent');
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (data: any) => {
    console.log('🔄 Received WebRTC answer');
    if (!peerConnection.current) {
      console.error('Peer connection not initialized');
      return;
    }
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      console.log('✅ Remote description set');
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async (data: any) => {
    if (!peerConnection.current) return;
    try {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    const targetUserId = caller?.from || caller?.userId;
    if (targetUserId && socket.socket) {
      socket.socket.emit('call:end', {
        to: targetUserId,
      });
    }

    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setIsReceivingCall(false);
    setCallAccepted(false);
    setCaller(null);
    peerConnection.current = null;

    if (onCallEnded) {
      onCallEnded();
    }
  };

  const handleCallEnded = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setIsReceivingCall(false);
    setCallAccepted(false);
    setCaller(null);
    peerConnection.current = null;

    if (onCallEnded) {
      onCallEnded();
    }
  };

  return {
    localStream,
    remoteStream,
    isCalling,
    isReceivingCall,
    caller,
    callAccepted,
    isMuted,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    localAudioRef,
    remoteAudioRef,
  };
};
