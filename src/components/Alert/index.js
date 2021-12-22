import React, { useContext } from 'react'

import { SocketContext } from '../../SocketContext';
import { Card, Button, Row, Col } from 'antd';
// import './index.css';

const Alert = () => {
    const {
        receiveCall,
        call,
        callReceived
    } = useContext(SocketContext);

    console.log(call)

    return (
        <>
            <Row>
                <Col span={10}></Col>
                {call.isReceivingCall && !callReceived && (
                    <Col span={12}>
                        <Card class="alert" style={{ width: '50%', textAlign: 'center' }}>
                            <h1>Calling '{call.name}'...</h1>
                            <Button type="primary" onClick={receiveCall}>
                                Receive Call
                            </Button>
                            <Button type="danger" onClick={() => window.location.reload()}>
                                Reject Call
                            </Button>
                        </Card>
                    </Col>
                )}

            </Row>
        </>
    )
}

export default Alert
