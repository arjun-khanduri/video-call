import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:8080");

const ContextProvider = ({ children }) => {
  const [callReceived, setCallReceived] = useState(false);
  const [callDisconnected, setCallDisconnected] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const video = useRef();
  const peerVideo = useRef();
  const connRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        video.current.srcObject = stream;
      });
    socket.on("me", (id) => setMe(id));
    socket.on("initCall", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const receiveCall = () => {
    setCallReceived(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });
    peer.on('signal', (data) => {
      socket.emit('receiveCall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) =>
      peerVideo.current.srcObject = currentStream
    );
    peer.signal(call.signal)
    connRef.current = peer;
  };

  const initCall = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('initCall', { userToCall: id, signalData: data, from: me, name });
    });
    peer.on('stream', (currentStream) =>
      peerVideo.current.srcObject = currentStream
    );
    socket.on('callReceived', (signalData) => {
      setCallReceived(true);
      peer.signal(signalData);
    });
    connRef.current = peer;
  };

  const disconnectCall = () => {
    setCallDisconnected(true);
    connRef.current.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callReceived,
        video,
        peerVideo,
        stream,
        name,
        setName,
        callDisconnected,
        me,
        initCall,
        disconnectCall,
        receiveCall,
      }}>
      {children}
    </SocketContext.Provider>
  )
};

export { ContextProvider, SocketContext }