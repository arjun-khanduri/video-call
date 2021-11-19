import React from "react";
import VideoFeed from './components/VideoFeed';
import Panel from './components/Panel';
import Alert from './components/Alert';

const App = () => {
  return (
    <>
      <VideoFeed />
      <Panel>
        <Alert />
      </Panel>
    </>
  )
};

export default App;
