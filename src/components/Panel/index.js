import React, { useContext, useState } from 'react';
import { SocketContext } from '../../SocketContext';

const Panel = ({ children }) => {
    const {
        me,
        callReceived,
        name,
        setName,
        disconnectCall,
        callDisconnected,
        initCall
    } = useContext(SocketContext);
    const [callerID, setCallerID] = useState('');
    return (
        <div>
            <form>
                <h4>Your name</h4>
                <input
                    type="text"
                    value={name}
                    onchange={(e) => setName(e.target.value)} />
                <br />
                <h4>Make a call</h4>
                <input
                    type="text"
                    value={callerID}
                    onchange={(e) => setCallerID(e.target.value)} />
                {callReceived ? (
                    <button onClick={disconnectCall}>
                        Hang up
                    </button>
                ) : (
                    <button onClick={() => initCall(callerID)}>
                        Call
                    </button>
                )}
                {children}
            </form>
        </div>
    )
}

export default Panel
