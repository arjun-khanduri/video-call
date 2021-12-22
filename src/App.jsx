import React from "react";
import VideoFeed from './components/VideoFeed';
import Panel from './components/Panel';
import Alert from './components/Alert';
import 'antd/dist/antd.css';

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
