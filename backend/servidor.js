const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
var variables = require('./public/variables');

// Configura el servidor WebSocket
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (message) => {
        const { action, nombrearch, pdfData } = JSON.parse(message);
        if (action === 'save') {
            // Guardar el archivo PDF en el servidor
            const base64Data = pdfData.split(',')[1];
            const filePath = path.join(variables.dirotdocumento, nombrearch);

            fs.writeFile(filePath, base64Data, 'base64', (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                    ws.send('Error al guardar el archivo');
                } else {
                    console.log('Archivo guardado en', filePath);
                    ws.send('Archivo guardado exitosamente');
                }
            });
        } else if (action === 'read') {
            // Leer el archivo PDF del servidor y enviarlo al cliente
            const filePath = path.join(variables.dirotdocumento, nombrearch);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('Error al leer el archivo:', err);
                    ws.send('Error al leer el archivo');
                } else {
                    const pdfBase64 = Buffer.from(data).toString('base64');
                    ws.send(JSON.stringify({ nombrearch, pdfData: `data:application/pdf;base64,${pdfBase64}` }));
                    console.log('Archivo enviado:', nombrearch);
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket en funcionamiento en ws://localhost:3000');
