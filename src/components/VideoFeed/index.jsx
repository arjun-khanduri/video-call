import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import { Button, Space, Badge, Tooltip } from 'antd';
import {
  AudioOutlined,
  AudioMutedOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const VideoFeed = ({ onOpenSettings }) => {
  const {
    name,
    callReceived,
    video,
    peerVideo,
    callDisconnected,
    stream,
    call,
    disconnectCall
  } = useContext(SocketContext);

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      
      if (audioTrack) {
        setIsAudioMuted(!audioTrack.enabled);
      }
      if (videoTrack) {
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  }, [stream]);

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isAudioMuted;
        setIsAudioMuted(!isAudioMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoOff;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  return (
    <div className="video-container">
      <div className={`video-layout ${callReceived && !callDisconnected ? 'in-call' : ''}`}>
        {/* Peer Video */}
        {callReceived && !callDisconnected && (
          <div className="main-video-wrapper">
            <div className="name-tag">
              <Badge status="success" text={call.name || 'Peer'} />
            </div>
            <video
              id="peerVideo"
              autoPlay
              playsInline
              ref={peerVideo}
            />
            {call.isVideoOff && (
              <div className="waiting-overlay">
                <Space direction="vertical" align="center">
                  <VideoCameraAddOutlined style={{ fontSize: '48px' }} />
                  <span>Peer's camera is off</span>
                </Space>
              </div>
            )}
          </div>
        )}

        {/* Local Video */}
        {stream && (
          <div className={`local-video-wrapper ${callReceived && !callDisconnected ? 'pip-mode' : ''}`}>
            <div className="name-tag">
              <Badge status="processing" text={name || 'You'} />
            </div>
            <video
              id="video"
              autoPlay
              playsInline
              muted
              ref={video}
            />
            {isVideoOff && (
              <div className="waiting-overlay">
                <Space direction="vertical" align="center">
                  <VideoCameraAddOutlined style={{ fontSize: '48px' }} />
                  <span>Camera is off</span>
                </Space>
              </div>
            )}
          </div>
        )}

        {/* Centralized Controls */}
        <div className="central-controls">
          <Space size="middle">
            <Button
              type={isAudioMuted ? "default" : "primary"}
              shape="circle"
              size="large"
              icon={isAudioMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
              onClick={toggleAudio}
              className={isAudioMuted ? 'muted' : ''}
            />
            <Button
              type={isVideoOff ? "default" : "primary"}
              shape="circle"
              size="large"
              icon={isVideoOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
              onClick={toggleVideo}
              className={isVideoOff ? 'muted' : ''}
            />
            <Tooltip title={callReceived && !callDisconnected ? "End Call" : "Call Settings"}>
              <Button
                type="primary"
                danger={callReceived && !callDisconnected}
                shape="circle"
                size="large"
                icon={<PhoneOutlined />}
                onClick={callReceived && !callDisconnected ? () => disconnectCall() : onOpenSettings}
              />
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
