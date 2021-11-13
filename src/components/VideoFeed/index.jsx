import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";

const VideoFeed = () => {
  const {
    name,
    callReceived,
    video,
    peerVideo,
    stream,
    callDisconnected,
    call,
  } = useContext(SocketContext);
  return (
    <div>
      {stream && (
        <div>
          <h4>{name || 'Name'}</h4>
          <video
            id="video"
            autoPlay
            playsInline
            muted
            ref={video}
          />
        </div>
      )}
      {
        callReceived && !callDisconnected && (
          <div>
            <h4>{call.name || 'Peer Name'}</h4>
            <video
              id="video"
              autoPlay
              playsInline
              muted
              ref={peerVideo}
            />
          </div>
        )
      }
    </div>
  );
};

export default VideoFeed;
