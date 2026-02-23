const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

const historial = [];

wss.on('connection', (ws) => {
    historial.forEach(msg => ws.send(msg));

    ws.on('message', (msg) => {
        historial.push(msg.toString());
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(msg.toString());
        });
    });
});
