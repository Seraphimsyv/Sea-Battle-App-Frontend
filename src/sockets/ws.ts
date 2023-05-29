import io from 'socket.io-client';

const socket = io('', { path: "/api/ws/game" });
socket.disconnect();

export default socket;