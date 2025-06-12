
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Add connection options and error handling
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
    transports: ['websocket', 'polling'],
    forceNew: true
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('disconnect');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;