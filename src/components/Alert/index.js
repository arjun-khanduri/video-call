import React, { useContext } from 'react'

import { SocketContext } from '../../SocketContext';

const Alert = () => {
    const {
        call,
        callReceived,
        receiveCall,
    } = useContext(SocketContext);
    return (
        <>
            {call.isReceivedCall && !callReceived && (
                <div>
                    <h1>Calling '{call.name}'...</h1>
                    <button onClick={receiveCall}>
                        Receive Call
                    </button>
                </div>
            )}
        </>
    )
}

export default Alert
