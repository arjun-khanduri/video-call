import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { Col, Row } from 'antd';

const VideoFeed = () => {
  const {
    name,
    callReceived,
    video,
    peerVideo,
    callDisconnected,
    stream,
    call
  } = useContext(SocketContext);

  return (
    <>
      <Row>
        {stream && (
          <Col span={8}>
            <h4>{name || 'Name'}</h4>
            <video
              id="video"
              width="100%"
              autoPlay
              playsInline
              muted
              ref={video}
            />
          </Col>
        )}
        <Col span={8}></Col>
        {
          callReceived && !callDisconnected && (
            <Col span={8}>
              <h4>{call.name || 'Peer Name'}</h4>
              <video
                id="peerVideo"
                width="100%"
                autoPlay
                playsInline
                ref={peerVideo}
              />
            </Col>
          )
        }
      </Row>
    </>
  );
};

export default VideoFeed;
