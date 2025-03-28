import React, { useState } from "react";
import { Layout, Typography } from 'antd';
import VideoFeed from './components/VideoFeed';
import Panel from './components/Panel';
import Alert from './components/Alert';
import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  return (
    <Layout className="app-container">
      <Content>
        <div className="header">
          <Title level={1}>Video Call App</Title>
        </div>
        <VideoFeed onOpenSettings={() => setIsPanelVisible(true)} />
        <Alert />
        <Panel visible={isPanelVisible} onClose={() => setIsPanelVisible(false)} />
      </Content>
    </Layout>
  );
};

export default App;
