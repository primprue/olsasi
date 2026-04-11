import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode';
import express from 'express';
import cors from 'cors'; // Necesario para que React pueda consultar al backend
const router = express.Router();

const app = express();
app.use(cors());

let lastQr = ""; // Aquí guardaremos el QR actual

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Estas líneas son la clave:
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- Esto ayuda mucho en servidores con poca RAM
            '--disable-gpu'
        ],
    }
});

client.on('qr', async (qr) => {
    // Convertimos el texto del QR en una imagen Base64
    lastQr = await qrcode.toDataURL(qr);
    console.log("Nuevo QR generado, listo para el frontend.");
});

client.on('ready', () => {
    lastQr = "CONNECTED"; // Avisamos que ya no hace falta QR
    console.log('WhatsApp conectado');
});

// Endpoint para que React consulte el estado del QR
app.get('/enviowa', async (req, res) => {
    console.log("Estoy en el endpoint")
    res.json({ qr: lastQr });
});

client.initialize();
// app.listen(4001);
export default router;