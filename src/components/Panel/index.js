import React, { useContext, useState } from "react";
import { SocketContext } from "../../SocketContext";
import { Form, Input, Button, Typography, Modal, Space, Tooltip } from 'antd';
import { UserOutlined, PhoneOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Panel = ({ visible, onClose }) => {
    const {
        me,
        callReceived,
        name,
        setName,
        callDisconnected,
        disconnectCall,
        initCall
    } = useContext(SocketContext);
    const [callerID, setCallerID] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(me);
    };

    const handleCall = (e) => {
        e.preventDefault();
        initCall(callerID);
        onClose(); // Close the modal when call is initiated
        setCallerID(""); // Clear the caller ID input
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
            closeIcon={<CloseOutlined />}
            title={<Title level={3} style={{ margin: 0 }}>Call Settings</Title>}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                    <Title level={4}>Your Information</Title>
                    <Form layout="vertical">
                        <Form.Item
                            label="Your Name"
                            tooltip="This is how others will see you"
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Your ID"
                            tooltip="Share this ID with others so they can call you"
                        >
                            <Input.Group compact>
                                <Input
                                    style={{ width: 'calc(100% - 32px)' }}
                                    value={me}
                                    readOnly
                                />
                                <Tooltip title="Copy ID">
                                    <Button icon={<CopyOutlined />} onClick={copyToClipboard} />
                                </Tooltip>
                            </Input.Group>
                        </Form.Item>
                    </Form>
                </div>

                <div>
                    <Title level={4}>Make a Call</Title>
                    <Form layout="vertical">
                        <Form.Item
                            label="Peer ID"
                            tooltip="Enter the ID of the person you want to call"
                        >
                            <Input.Group compact>
                                <Input
                                    style={{ width: 'calc(100% - 88px)' }}
                                    prefix={<PhoneOutlined />}
                                    placeholder="Enter peer ID"
                                    value={callerID}
                                    onChange={(e) => setCallerID(e.target.value)}
                                />
                                {callReceived && !callDisconnected ? (
                                    <Button 
                                        danger
                                        onClick={() => {
                                            disconnectCall();
                                            onClose();
                                        }}
                                        style={{ width: '88px' }}
                                    >
                                        Hang Up
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        onClick={handleCall}
                                        disabled={!callerID.trim()}
                                        style={{ width: '88px' }}
                                    >
                                        Call
                                    </Button>
                                )}
                            </Input.Group>
                        </Form.Item>
                    </Form>
                </div>
            </Space>
        </Modal>
    );
};

export default Panel;
