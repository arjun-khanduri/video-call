import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:8080");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [name, setName] = useState("");
  const [callReceived, setCallReceived] = useState(false);
  const [callDisconnected, setCallDisconnected] = useState();

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
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const receiveCall = () => {
    setCallReceived(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('callanswered', { signal: data, to: call.from });
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
      socket.emit('calluser', { userToCall: id, signalData: data, from: me });
    });
    peer.on('stream', (currentStream) =>
      peerVideo.current.srcObject = currentStream
    );
    socket.on('callanswered', (signalData) => {
      setCallReceived(true);
      peer.signal(signalData);
    });
    connRef.current = peer;
  };

  const disconnectCall = () => {
    setCallDisconnected(true);
    connRef.current.destroy();
  };
};
