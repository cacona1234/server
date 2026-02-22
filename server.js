const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(msg.toString());
        });
    });
});


console.log("Servidor corriendo en puerto 8080");
