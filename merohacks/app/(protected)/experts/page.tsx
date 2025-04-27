/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MdScreenShare, MdVideoCall, MdPhone,
} from 'react-icons/md';
import {
  FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaShare, FaPhoneSlash,
  FaUsers,
} from 'react-icons/fa';

// Icons for UI elements
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

// Simple classname merger
const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

const Homepage = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchParams, setSearchParams] = useState(new URLSearchParams(''));
  const [router, setRouter] = useState({
    push: (url: string) => {
      console.log('Router push:', url);
      setCurrentPath(url.split('?')[0]);
      setSearchParams(new URLSearchParams(url.split('?')[1] || ''));
      window.history.pushState({}, '', url);
    },
  });

  // Room state
  const [predefinedRooms] = useState(['room-1', 'room-2', 'room-3', 'room-4']);
  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  // User state
  const [myPeerId, setMyPeerId] = useState('');
  const [userName, setUserName] = useState('Guest'); // Initialize with "Guest"
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Media controls
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionsRef = useRef<Map<string, any>>(new Map());

  // Utility function to generate a random user ID
  const generateUserId = () => {
    return `user_${Math.random().toString(36).substring(2, 9)}`;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Initialize PeerJS
  useEffect(() => {
    const initializePeer = async () => {
      try {
        const userId = generateUserId();
        console.log('Initializing PeerJS with ID:', userId);
        const newPeer = new Peer(userId);

        newPeer.on('open', (id) => {
          console.log('PeerJS connected with ID:', id);
          setMyPeerId(id);
          peerRef.current = newPeer;

          // You might want to set the username here, or get it from user input
          // For simplicity, I'll just use the PeerJS ID for now
          setUserName(`User_${id.substring(0, 8)}`);

          const roomFromUrl = new URLSearchParams(window.location.search).get('room');
          if (roomFromUrl) {
            joinRoom(roomFromUrl);
          }
        });

        newPeer.on('error', (err) => {
          console.error('PeerJS error:', err);
          setErrorMessage(`PeerJS error: ${err.message}`);
          setTimeout(() => setErrorMessage(''), 5000);
        });

        newPeer.on('call', (call) => {
          handleIncomingCall(call);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Failed to initialize peer:', error);
        const errorMessage = error.message || 'Unknown error during PeerJS initialization';
        setErrorMessage(`Failed to initialize video call system: ${errorMessage}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    };

    initializePeer();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  // Handle incoming calls
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIncomingCall = async (call: any) => {
    try {
      const callerId = call.peer;
      console.log('Incoming call from:', callerId);

      setNotification(`Incoming call from User ${callerId.substring(0, 8)}`);
      setTimeout(() => setNotification(''), 3000);

      const stream = localStream || await startLocalStream();
      if (!stream) return;

      call.answer(stream);
      setIsCalling(true);

      call.on('stream', (remoteStream: MediaStream) => {
        console.log('Received stream from:', callerId);
        setParticipants((prev) => {
          if (!prev.some((p) => p.id === callerId)) {
            return [
              ...prev,
              {
                id: callerId,
                name: `User ${callerId.substring(0, 8)}`,
                stream: remoteStream,
                videoMuted: false,
                audioMuted: false,
              },
            ];
          }
          return prev.map(p => p.id === callerId ? { ...p, stream: remoteStream } : p); //update stream if participant already exists
        });
      });

      connectionsRef.current.set(callerId, call);

      call.on('close', () => {
        console.log('Call closed with:', callerId);
        setParticipants((prev) => prev.filter((p) => p.id !== callerId));
        connectionsRef.current.delete(callerId);
        setNotification(`User ${callerId.substring(0, 8)} left the call`);
        setTimeout(() => setNotification(''), 3000);
      });

      call.on('error', (err: Error) => {
        console.error('Call error:', err);
        setErrorMessage(`Call error with ${callerId.substring(0, 8)}: ${err.message || 'Unknown call error'}`);
        setTimeout(() => setErrorMessage(''), 5000);
      });

    } catch (error: any) {
      console.error('Error handling incoming call:', error);
      const errorMessage = error.message || 'Unknown error during incoming call handling';
      setErrorMessage(`Failed to connect to the incoming call: ${errorMessage}`);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  // Start the local video and audio stream
  const startLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      return stream;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error starting local stream:', error);
      const errorMessage = error.message || 'Unknown error accessing media devices';
      setErrorMessage(`Failed to access camera and microphone: ${errorMessage}`);
      setTimeout(() => setErrorMessage(''), 5000);
      return null;
    }
  }, []);

  // Create a new room
  const createRoom = async (roomNumber?: string) => {
    try {
      const newRoomId = roomNumber || `room-${Math.random().toString(36).substr(2, 9)}`;
      setRoomId(newRoomId);
      router.push(`?room=${newRoomId}`);

      const stream = await startLocalStream();
      if (!stream) return;

      setIsConnected(true);
      setIsCalling(true);
      setParticipants([{ id: myPeerId, name: 'You', stream, videoMuted: isVideoOff, audioMuted: isMuted }]);
      console.log('Created room with ID:', newRoomId);
      setNotification(`Room ${newRoomId} created successfully`);
      setTimeout(() => setNotification(''), 3000);
    } catch (error: any) {
      console.error('Error creating room:', error);
      const errorMessage = error.message || 'Unknown error during room creation';
      setErrorMessage(`Failed to create room: ${errorMessage}`);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  // Join an existing room
  const joinRoom = async (roomToJoin: string) => {
    if (!roomToJoin || !peerRef.current) {
      setErrorMessage('Please enter a valid room ID');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    try {
      router.push(`?room=${roomToJoin}`);

      const stream = await startLocalStream();
      if (!stream) return;

      setRoomId(roomToJoin);
      setIsConnected(true);
      setIsCalling(true);
      setParticipants([{ id: myPeerId, name: 'You', stream, videoMuted: isVideoOff, audioMuted: isMuted }]);

      // Join the room (attempt connection)
      if (roomToJoin !== myPeerId) {
        try {
          const call = peerRef.current?.call(roomToJoin, stream); // Use optional chaining

          if (!call) {
            throw new Error('Failed to initiate call to peer.'); // Explicit error
          }

          call.on('stream', (remoteStream: MediaStream) => {
            console.log('Received stream from room peer');
            setParticipants((prev) => {
              if (!prev.some((p) => p.id === roomToJoin)) {
                return [
                  ...prev,
                  {
                    id: roomToJoin,
                    name: `Peer ${roomToJoin.substring(0, 8)}`,
                    stream: remoteStream,
                    videoMuted: false,
                    audioMuted: false,
                  },
                ];
              }
              return prev.map(p => p.id === roomToJoin ? { ...p, stream: remoteStream } : p); //update stream if participant already exists
            });
          });

          connectionsRef.current.set(roomToJoin, call);

          call.on('close', () => {
            console.log('Call closed with:', callerId);
            setParticipants((prev) => prev.filter((p) => p.id !== roomToJoin));
            connectionsRef.current.delete(callerId);
            setNotification(`User ${roomToJoin.substring(0, 8)} left the call`);
            setTimeout(() => setNotification(''), 5000);
          });

          call.on('error', (err: Error) => { // Added error handler
            console.error('Call error:', err);
            setErrorMessage(`Call error with peer ${roomToJoin.substring(0, 8)}: ${err.message || 'Unknown call error'}`);
            setTimeout(() => setErrorMessage(''), 5000);
          });
        } catch (error: any) {
          console.error('Error during call setup:', error);
          const errorMessage = error.message || 'Failed to initiate call';
          setErrorMessage(`Failed to join the room: ${errorMessage}`);
          setTimeout(() => setErrorMessage(''), 5000);
          return; // IMPORTANT: Return to prevent further execution
        }
      }

      setNotification(`Joined room ${roomToJoin} successfully`);
      setTimeout(() => setNotification(''), 3000);
    } catch (error: any) {
      console.error('Error joining room:', error);
      const errorMessage = error.message || 'Unknown error during room joining';
      setErrorMessage(`Failed to join the room: ${errorMessage}`);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  // Leave the current room
  const leaveRoom = () => {
    const leavingUserId = myPeerId;

    connectionsRef.current.forEach((connection: any) => {
      try {
        connection.close();
      } catch (e) {
        console.error("Error closing connection", e);
      }
    });
    connectionsRef.current.clear();

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
    }


    if (myVideoRef.current) {
      myVideoRef.current.srcObject = null;
    }

    setRoomId('');
    setIsConnected(false);
    setIsCalling(false);
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.id !== leavingUserId)
    );
    router.push('?');

    setNotification('You left the room');
    setTimeout(() => setNotification(''), 3000);
    console.log('Left the room');
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (localStream) {
      try {
        const audioTracks = localStream.getAudioTracks();
        audioTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsMuted(!isMuted);
        setParticipants((prevParticipants) =>
          prevParticipants.map((p) =>
            p.id === myPeerId ? { ...p, audioMuted: !isMuted } : p
          )
        );
      } catch (error: any) {
        console.error("Error toggling mute", error);
        setErrorMessage(`Error toggling mute: ${error.message || 'Unknown error'}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    if (localStream) {
      try {
        const videoTracks = localStream.getVideoTracks();
        videoTracks.forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsVideoOff(!isVideoOff);
        setParticipants((prevParticipants) =>
          prevParticipants.map((p) =>
            p.id === myPeerId ? { ...p, videoMuted: !isVideoOff } : p
          )
        );
      } catch (error: any) {
        console.error("Error toggling video", error);
        setErrorMessage(`Error toggling video: ${error.message || 'Unknown error'}`);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        if (screenStreamRef.current) {
          screenStreamRef.current.getTracks().forEach((track) => track.stop());
          screenStreamRef.current = null; // Corrected line
        }
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = null;
        }
        setIsScreenSharing(false);
        setNotification('Screen sharing stopped');
        setTimeout(() => setNotification(''), 3000);
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        screenStreamRef.current = screenStream; // Corrected line

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = screenStream;
        }

        connectionsRef.current.forEach((conn: any, peerId) => {
          try {
            // Check if peerRef.current is defined before calling it
            if (peerRef.current) {
              const call = peerRef.current.call(peerId, screenStream);
              if (call) {
                console.log('Sharing screen with', peerId);
              }
            } else {
              console.warn('peerRef.current is undefined.  Cannot call peer.');
            }
          } catch (error: any) {
            console.error('Error sharing screen with peer:', error);
            const errorMessage = error.message || 'Unknown error during screen share call';
            setErrorMessage(`Error sharing screen: ${errorMessage}`);
            setTimeout(() => setErrorMessage(''), 5000);
          }
        });

        setIsScreenSharing(true);

        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          if (screenStreamRef.current) {
            screenStreamRef.current = null;
          }
          if (screenVideoRef.current) {
            screenVideoRef.current.srcObject = null;
          }
        };
        setNotification('Screen sharing started');
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (error: any) {
      console.error('Error toggling screen share:', error);
      const errorMessage = error.message || 'Unknown error during screen sharing';
      setErrorMessage(`Failed to share screen: ${errorMessage}`);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };


  // Copy room ID to clipboard
  const copyRoomLink = () => {
    const roomLink = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard
      .writeText(roomLink)
      .then(() => {
        setCopySuccess('Room link copied!');
        setTimeout(() => setCopySuccess(''), 3000);
      })
      .catch((err: any) => {
        console.error('Could not copy room link: ', err);
        const errorMessage = err.message || 'Unknown error copying link';
        setErrorMessage(`Failed to copy room link: ${errorMessage}`);
        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Video Call Center</h1>
          {isConnected && (
            <div className="flex items-center gap-2">
              <span className="bg-green-500/20 text-green-400 text-sm font-medium px-3 py-1 rounded-full">
                Room: {roomId}
              </span>
              <Button
                onClick={copyRoomLink}
                variant="outline"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 border-blue-500/30 flex items-center"
              >
                <ShareIcon className="mr-1 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-blue-500/90 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-all"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 bg-green-500/90 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-all"
          >
            {copySuccess}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0, y: -20 }} // Corrected initial value
            // eslint-disable-next-line react/jsx-no-duplicate-props
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 bg-red-500/90 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-all flex items-center"
          >
            {errorMessage}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-white hover:text-gray-200"
              onClick={() => setErrorMessage('')}
            >
              &times;
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-700">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Join a Video Call</h2>

              {/* Create Room Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Create a New Room</h3>
                <Button
                  onClick={() => createRoom()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md mr-4 mb-4 transition-colors flex items-center gap-2"
                  disabled={!peerRef.current}
                >
                  <CallIcon className="h-4 w-4" />
                  Create Custom Room
                </Button>

                {/* Self-call button */}
                <Button
                  onClick={() => createRoom(`self-${myPeerId}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md mb-4 transition-colors flex items-center gap-2"
                  disabled={!peerRef.current}
                >
                  <PhoneIcon className="h-4 w-4" />
                  Start Solo Call
                </Button>
              </div>

              {/* Join Room Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Join an Existing Room</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                  <Input
                    type="text"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                    className="flex-grow bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={() => joinRoom(inputRoomId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2"
                    disabled={!peerRef.current || !inputRoomId}
                  >
                    <CallIcon className="h-4 w-4" />
                    Join Room
                  </Button>
                </div>
              </div>

              {/* Predefined Rooms Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-4">Quick Join Numbered Rooms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {predefinedRooms.map((room) => (
                    <Button
                      key={room}
                      onClick={() => joinRoom(room)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                      disabled={!peerRef.current}
                    >
                      <CallIcon className="h-4 w-4" />
                      {room}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Active Call Interface */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg mb-6 border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Active Call</h2>
                <div className="flex space-x-2">
                  {/* Controls */}
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    size="icon"
                    className={classNames(
                      'rounded-full p-2 transition-colors',
                      isMuted
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border-red-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 border-gray-500/30'
                    )}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOffIcon /> : <MicIcon />}
                  </Button>

                  <Button
                    onClick={toggleVideo}
                    variant="outline"
                    size="icon"
                    className={classNames(
                      'rounded-full p-2 transition-colors',
                      isVideoOff
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 border-red-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 border-gray-500/30'
                    )}
                    title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
                  >
                    {isVideoOff ? <VideoOffIcon /> : <VideoIcon />}
                  </Button>

                  <Button
                    onClick={toggleScreenShare}
                    variant="outline"
                    size="icon"
                    className={classNames(
                      'rounded-full p-2 transition-colors',
                      isScreenSharing
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 border-green-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 border-gray-500/30'
                    )}
                    title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                  >
                    <ScreenShareIcon />
                  </Button>

                  <Button
                    onClick={leaveRoom}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors flex items-center"
                  >
                    <PhoneOffIcon className="mr-2 h-4 w-4" />
                    Leave Call
                  </Button>
                </div>
              </div>

              {/* Video Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* My video */}
                  <div className="video-container bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700">
                    <video
                      ref={myVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                      <p className="text-sm font-medium flex items-center gap-1">
                        {userName || 'You'}
                        {isMuted && <MicOffIcon className="h-3 w-3 inline-block" />}
                        {isVideoOff && <VideoOffIcon className="h-3 w-3 inline-block" />}
                      </p>
                    </div>
                  </div>

                  {/* Screen sharing video */}
                  {isScreenSharing && (
                    <div className="video-container bg-gray-900 rounded-lg overflow-hidden relative col-span-full md:col-span-2 border border-gray-700">
                      <video
                        ref={screenVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-96 object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <ScreenShareIcon className="h-3 w-3 inline-block mr-1" />
                          Your Screen
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Participant videos */}
                  {participants
                    .filter((p) => p.id !== myPeerId)
                    .map((participant) => (
                      <div
                        key={participant.id}
                        className="video-container bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700"
                      >
                        <ParticipantVideo participant={participant} />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <UsersIcon className="h-3 w-3 inline-block mr-1" />
                            {participant.name || `User ${participant.id.substring(0, 8)}`}
                            {participant.audioMuted && (
                              <MicOffIcon className="h-3 w-3 inline-block ml-1" />
                            )}
                            {participant.videoMuted && (
                              <VideoOffIcon className="h-3 w-3 inline-block ml-1" />
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Call Information */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-2">Call Information</h3>
              <p className="text-gray-400 mb-2">
                Room ID: <span className="font-semibold text-white">{roomId}</span>
              </p>
              <p className="text-gray-400 mb-2">
                Your ID: <span className="font-semibold text-white">{myPeerId}</span>
              </p>
              <p className="text-gray-400 flex items-center gap-1">
                Participants: <span className="font-semibold text-white">{participants.length}</span>
              </p>

              <div className="mt-4">
                <button
                  onClick={copyRoomLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <ShareIcon className="mr-2 h-4 w-4" />
                  Copy Invitation Link
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Component to render a participant's video
const ParticipantVideo = ({ participant }: { participant: Participant }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant, participant.stream]);

  return <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />;
};

export default Homepage;

