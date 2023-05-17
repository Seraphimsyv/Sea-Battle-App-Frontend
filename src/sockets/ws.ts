import io from 'socket.io-client';

const gameSocket = io('', { path: "/api/ws/game" });

export default gameSocket;