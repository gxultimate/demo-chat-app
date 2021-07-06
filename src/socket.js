import React from 'react';
import socketIOClient from 'socket.io-client';

export const socket = socketIOClient.connect('http://localhost:3600/')
export const SocketContext = React.createContext()