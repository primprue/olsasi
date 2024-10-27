// servidor.mjs
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import variables from './public/variables.mjs'; // Verifica que la ruta sea correcta

// Configura el servidor WebSocket
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    // Manejar mensajes recibidos
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        // Responde al cliente
        ws.send(`Echo: ${message}`);
    });

    // Enviar un mensaje al nuevo cliente
    ws.send('Hola desde el servidor WebSocket');
});

console.log('Servidor WebSocket está escuchando en ws://localhost:3000');
