const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
const historial = [];

function clearChat() {
    historial.length = 0;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN)
            client.send('__CLEAR__');
    });
}

setInterval(clearChat, 24 * 60 * 60 * 1000);

wss.on('connection', (ws) => {
    historial.forEach(msg => ws.send(msg));
    ws.on('message', (msg) => {
        const text = msg.toString();
        if (text === '__CLEAR__') {
            clearChat();
        } else {
            historial.push(text);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN)
                    client.send(text);
            });
        }
    });
});
