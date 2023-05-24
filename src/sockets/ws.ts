import io from 'socket.io-client';

const gameSocket = io('', { path: "/api/ws/game" });
gameSocket.disconnect();

export default gameSocket;