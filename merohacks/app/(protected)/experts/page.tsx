/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MdScreenShare, MdVideoCall, MdPhone } from 'react-icons/md';
import {
  FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash,
  FaShare, FaPhoneSlash, FaUsers,
} from 'react-icons/fa';

const MicIcon = (props: React.SVGProps<SVGSVGElement>) => <FaMicrophone {...props} />;
const MicOffIcon = (props: React.SVGProps<SVGSVGElement>) => <FaMicrophoneSlash {...props} />;
const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => <FaVideo {...props} />;
const VideoOffIcon = (props: React.SVGProps<SVGSVGElement>) => <FaVideoSlash {...props} />;
const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => <FaShare {...props} />;
const ScreenShareIcon = (props: React.SVGProps<SVGSVGElement>) => <MdScreenShare {...props} />;
const PhoneOffIcon = (props: React.SVGProps<SVGSVGElement>) => <FaPhoneSlash {...props} />;
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => <FaUsers {...props} />;
const CallIcon = (props: React.SVGProps<SVGSVGElement>) => <MdVideoCall {...props} />;
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => <MdPhone {...props} />;

interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
  videoMuted: boolean;
  audioMuted: boolean;
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function Homepage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Room & user state
  const [roomId, setRoomId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [myPeerId, setMyPeerId] = useState<string>('');
  const [userName, setUserName] = useState('Guest');
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Media & control state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // UI state
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // Refs
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const connectionsRef = useRef<Map<string, any>>(new Map());

  // Initialize PeerJS
  useEffect(() => {
    const peer = new Peer(); // Let PeerJS generate a unique ID
    peerRef.current = peer;

    peer.on('open', (id) => {
      setMyPeerId(id);
      setUserName(`User_${id.substring(0, 8)}`);

      const urlRoom = searchParams.get('room');
      if (urlRoom) {
        joinRoom(urlRoom);
      }
    });

    peer.on('error', (err) => {
      console.error(err);
      showError(`PeerJS error: ${err?.message || 'unknown'}`);
    });

    peer.on('call', handleIncomingCall);

    return () => {
      peer.destroy();
      localStream?.getTracks().forEach(t => t.stop());
      screenStreamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Helpers
  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 5000);
  };
  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Start local camera/mic
  const startLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (myVideoRef.current) myVideoRef.current.srcObject = stream;
      return stream;
    } catch (e: any) {
      console.error(e);
      showError(`Media error: ${e.message || 'access denied'}`);
      return null;
    }
  }, []);

  // Incoming call handler (for host)
  const handleIncomingCall = async (call: any) => {
    try {
      const callerId = call.peer;
      showNotice(`Incoming call from ${callerId.substring(0, 8)}`);
      const stream = localStream || await startLocalStream();
      if (!stream) return;
      call.answer(stream);
      setIsCalling(true);

      call.on('stream', (remoteStream: MediaStream) => {
        setParticipants(prev =>
          prev.some(p => p.id === callerId)
            ? prev.map(p => p.id === callerId ? { ...p, stream: remoteStream } : p)
            : [...prev, { id: callerId, name: `User_${callerId.substring(0, 8)}`, stream: remoteStream, videoMuted: false, audioMuted: false }]
        );
      });

      connectionsRef.current.set(callerId, call);
      call.on('close', () => {
        setParticipants(prev => prev.filter(p => p.id !== callerId));
      });
      call.on('error', (err: any) => {
        console.error(err);
        showError(`Call error with ${callerId.substring(0, 8)}`);
      });
    } catch (e: any) {
      console.error(e);
      showError(`Incoming call failed: ${e.message || 'unknown'}`);
    }
  };

  // Create room (host uses their own peer ID)
  const createRoom = async () => {
    if (!myPeerId) return;
    await startLocalStream();
    setRoomId(myPeerId);
    setIsConnected(true);
    setIsCalling(true);
    setParticipants([{ id: myPeerId, name: 'You', stream: localStream, videoMuted: isVideoOff, audioMuted: isMuted }]);
    router.push(`?room=${myPeerId}`);
    showNotice(`Room ${myPeerId} created`);
  };

  // Join existing room (call host)
  const joinRoom = async (roomToJoin: string) => {
    if (!roomToJoin || !peerRef.current) {
      return showError('Enter a valid room ID');
    }
    const stream = await startLocalStream();
    if (!stream) return;

    setRoomId(roomToJoin);
    setIsConnected(true);
    setIsCalling(true);
    setParticipants([{ id: myPeerId, name: 'You', stream, videoMuted: isVideoOff, audioMuted: isMuted }]);

    try {
      const call = peerRef.current.call(roomToJoin, stream);
      connectionsRef.current.set(roomToJoin, call);

      call.on('stream', (remoteStream: MediaStream) => {
        setParticipants(prev =>
          prev.some(p => p.id === roomToJoin)
            ? prev.map(p => p.id === roomToJoin ? { ...p, stream: remoteStream } : p)
            : [...prev, { id: roomToJoin, name: `Peer_${roomToJoin.substring(0, 8)}`, stream: remoteStream, videoMuted: false, audioMuted: false }]
        );
      });

      call.on('close', () => {
        setParticipants(prev => prev.filter(p => p.id !== roomToJoin));
      });

      call.on('error', (err: any) => {
        console.error(err);
        showError(`Call error with ${roomToJoin.substring(0, 8)}`);
      });

      router.push(`?room=${roomToJoin}`);
      showNotice(`Joined room ${roomToJoin}`);
    } catch (e: any) {
      console.error(e);
      showError(`Join failed: ${e.message || 'unknown'}`);
    }
  };

  // Leave room
  const leaveRoom = () => {
    connectionsRef.current.forEach(conn => conn.close());
    connectionsRef.current.clear();
    localStream?.getTracks().forEach(t => t.stop());
    screenStreamRef.current?.getTracks().forEach(t => t.stop());
    setLocalStream(null);
    setRoomId('');
    setIsConnected(false);
    setIsCalling(false);
    setParticipants([]);
    router.push('/');
    showNotice('You left the room');
  };

  // Toggles
  const toggleMute = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach(t => t.enabled = !t.enabled);
    setIsMuted(!isMuted);
  };
  const toggleVideo = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(t => t.enabled = !t.enabled);
    setIsVideoOff(!isVideoOff);
  };
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
      showNotice('Screen sharing stopped');
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = screenStream;
        if (screenVideoRef.current) screenVideoRef.current.srcObject = screenStream;
        connectionsRef.current.forEach((_, peerId) => {
          const call = peerRef.current?.call(peerId, screenStream);
          if (call) console.log('Sharing screen with', peerId);
        });
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
        setIsScreenSharing(true);
        showNotice('Screen sharing started');
      } catch (e: any) {
        console.error(e);
        showError(`Screen share failed: ${e.message || 'unknown'}`);
      }
    }
  };

  // Copy link
  const copyRoomLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard.writeText(link)
      .then(() => showNotice('Link copied'))
      .catch(err => showError(`Copy failed: ${err.message}`));
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold text-white">Video Call Center</h1>
          {isConnected && (
            <div className="flex items-center gap-2">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                Room: {roomId}
              </span>
              <Button onClick={copyRoomLink} variant="outline" size="sm" className="flex items-center gap-1">
                <ShareIcon className="h-4 w-4" /> Copy Link
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}
            className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow">
            {notification}
          </motion.div>
        )}
        {copySuccess && (
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}
            className="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
            {copySuccess}
          </motion.div>
        )}
        {errorMessage && (
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} exit={{ y: -20 }}
            className="fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded shadow">
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {!isConnected ? (
          <div className="bg-gray-800/50 rounded-xl p-8 space-y-6">
            <h2 className="text-2xl text-white">Join or Create a Room</h2>
            <div className="space-x-4">
              <Button onClick={createRoom} className="bg-blue-600">Create Room</Button>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter Room ID"
                value={roomId || ''}
                onChange={e => setRoomId(e.target.value)}
                className="bg-gray-700 text-white"
              />
              <Button onClick={() => joinRoom(roomId)} className="bg-green-600">Join Room</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex space-x-2">
              <Button onClick={toggleMute} variant="outline" size="icon" title={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? <MicOffIcon /> : <MicIcon />}
              </Button>
              <Button onClick={toggleVideo} variant="outline" size="icon" title={isVideoOff ? 'Video On' : 'Video Off'}>
                {isVideoOff ? <VideoOffIcon /> : <VideoIcon />}
              </Button>
              <Button onClick={toggleScreenShare} variant="outline" size="icon" title="Share Screen">
                <ScreenShareIcon />
              </Button>
              <Button onClick={leaveRoom} className="bg-red-600 flex items-center gap-1">
                <PhoneOffIcon /> Leave
              </Button>
            </div>

            {/* Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative bg-gray-900 rounded overflow-hidden">
                <video ref={myVideoRef} autoPlay muted playsInline className="w-full h-64 object-cover" />
                <div className="absolute bottom-0 bg-black/50 w-full text-white p-2">
                  You {isMuted && <MicOffIcon />} {isVideoOff && <VideoOffIcon />}
                </div>
              </div>
              {isScreenSharing && (
                <div className="relative bg-gray-900 rounded overflow-hidden md:col-span-2">
                  <video ref={screenVideoRef} autoPlay playsInline className="w-full h-96 object-contain" />
                  <div className="absolute bottom-0 bg-black/50 w-full text-white p-2">
                    Screen
                  </div>
                </div>
              )}
              {participants.filter(p => p.id !== myPeerId).map(p => (
                <div key={p.id} className="relative bg-gray-900 rounded overflow-hidden">
                  <ParticipantVideo participant={p} />
                  <div className="absolute bottom-0 bg-black/50 w-full text-white p-2">
                    <UsersIcon /> {p.name} {p.audioMuted && <MicOffIcon />} {p.videoMuted && <VideoOffIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const ParticipantVideo = ({ participant }: { participant: Participant }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);
  return <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />;
};
