// servidor.js
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
var variables = require('./public/variables');

// Configura el servidor WebSocket
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        const { nombrearch, pdfData } = JSON.parse(message);
        const base64Data = pdfData.split(',')[1];
        const filePath = path.join(variables.dirotdocumento, nombrearch);

        // Guardar el archivo en la ruta especificada
        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                ws.send('Error al guardar el archivo');
            } else {
                console.log('Archivo guardado en', filePath);
                ws.send('Archivo guardado exitosamente');
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket en funcionamiento en ws://localhost:3000');
