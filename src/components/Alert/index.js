import React, { useContext } from 'react';
import { SocketContext } from '../../SocketContext';
import { Modal, Button, Space, Typography, Avatar } from 'antd';
import { PhoneOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Alert = () => {
    const {
        receiveCall,
        call,
        callReceived
    } = useContext(SocketContext);

    return (
        <>
            <Modal
                open={call.isReceivingCall && !callReceived}
                footer={null}
                closable={false}
                centered
                width={360}
            >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Avatar
                            size={80}
                            icon={<UserOutlined />}
                            style={{ 
                                backgroundColor: '#1890ff',
                                animation: 'pulse 1.5s infinite'
                            }}
                        />
                        
                        <div>
                            <Title level={4} style={{ margin: 0 }}>
                                Incoming Call
                            </Title>
                            <Text type="secondary">
                                from {call.name || 'Unknown'}
                            </Text>
                        </div>

                        <Space size="middle">
                            <Button
                                type="primary"
                                icon={<PhoneOutlined />}
                                size="large"
                                onClick={receiveCall}
                                style={{ 
                                    backgroundColor: '#52c41a',
                                    borderColor: '#52c41a'
                                }}
                            >
                                Accept
                            </Button>
                            <Button
                                danger
                                icon={<CloseCircleOutlined />}
                                size="large"
                                onClick={() => window.location.reload()}
                            >
                                Decline
                            </Button>
                        </Space>
                    </Space>
                </div>
            </Modal>
        </>
    );
};

export default Alert;
