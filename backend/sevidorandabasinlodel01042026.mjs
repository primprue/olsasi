import 'dotenv/config'; // Esto carga todas las variables automáticamente
import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
// import variables from './public/variables.mjs';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';



const app = express();
// 1. Configuración básica de rutas (para archivos locales si los necesitas)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//esto lo agregué cuando hice la nueva instalación en el servidor el 01/04/2026
// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));


//hasta acá es lo que agregué para que funcione la nueva instalación el 01/04/2026


//curl - X POST http://localhost:3001/generarpdf -H "Content-Type: application/json" -d '{"informacion": "test.html"}'
app.use(cors()); // Importante para que React no sea bloqueado
app.use(express.json());

const RUTAPRESUP = process.env.RUTA_EXTRENA_PRESUP;
const PORT = process.env.PORT || 3001;
const RUTA_ORIGINALES = process.env.RUTA_EXTRENA_PRESUP; // ej: /home/sandra/Documentos/OLSAFrecuentes
// const RUTA_PUBLICOS = path.join(process.env.RUTA_EXTERNA, 'publicos'); // Una subcarpeta para los temporales
const RUTA_PUBLICOS = path.join(process.env.RUTA_INTERNA_DOC, 'publicos');

// 2. Asegurarnos de que la carpeta 'publicos' exista al arrancar
if (!fs.existsSync(RUTA_PUBLICOS)) {
    fs.mkdirSync(RUTA_PUBLICOS, { recursive: true });
}
// 3. Servir la carpeta 'publicos' de forma estática
app.use('/documentos', express.static(RUTA_PUBLICOS));

// 4. NUEVA RUTA: Preparar Vista Previa
app.get('/api/preparar-vista-previa/:nombrePresupuesto', (req, res) => {
    // 1. Decodificamos y limpiamos espacios locos
    let nombreLimpiado = decodeURIComponent(req.params.nombrePresupuesto).trim();

    // 2. Eliminamos posibles saltos de línea o retornos de carro invisibles (\n o \r)
    nombreLimpiado = nombreLimpiado.replace(/[\n\r]/g, "");

    try {


        // El nombre original en tu disco (ej: Presupuesto_123.pdf)
        // const pathOrigen = path.join(RUTA_ORIGINALES, `${nombrePresupuesto}.pdf`);
        console.log('✅ Nombre original:', nombreLimpiado);
        const pathOrigen = path.join(RUTA_ORIGINALES, nombreLimpiado);
        // El nombre FIJO para la vista previa (ej: vista_previa.pdf)
        const nombreFijo = 'vista_previa.pdf';
        const pathDestino = path.join(RUTA_PUBLICOS, nombreFijo);
        // A. Verificamos que el archivo original exista

        if (!fs.existsSync(pathOrigen)) {
            // Si falla, vamos a listar qué hay en la carpeta para comparar
            // const archivosEnCarpeta = fs.readdirSync(path.dirname(pathOrigen));
            // console.log("📂 Archivos encontrados en esa carpeta:", archivosEnCarpeta);

            return res.status(404).json({ error: 'El presupuesto original no se encuentra.' });
        }

        // B. COPIAMOS Y SOBRESCRIBIMOS (fs.copyFileSync lo hace automáticamente)
        fs.copyFileSync(pathOrigen, pathDestino);
        console.log(`✅ Archivo ${nombreLimpiado}.pdf copiado como ${nombreFijo}`);

        // C. Devolvemos solo el nombre fijo para armar la URL en el front
        // Agregamos un timestamp (?t=...) para "engañar" al caché del navegador
        res.json({ urlFinal: `/documentos/${nombreFijo}?t=${Date.now()}` });

    } catch (error) {
        console.error("Error al copiar archivo:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Agregamos '0.0.0.0' para que escuche cualquier IP que le llegue
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor accesible en PORT:${PORT}`);
    // console.log(`📂 Carpeta: ${RUTA_EXTERNA}`);
});

import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
// PASO CRUCIAL: Middleware para leer datos de formularios estándar
app.use(express.urlencoded({ extended: true }));
// ... (tus imports anteriores)

app.post('/generarpdf', async (req, res) => {
    let browser;
    try {
        const datos = req.body;

        // Parseo de seguridad para productos y condiciones
        if (datos.productos && typeof datos.productos === 'string') {
            try { datos.productos = JSON.parse(datos.productos); } catch (e) { }
        }
        if (datos.condiciones && typeof datos.condiciones === 'string') {
            try { datos.condiciones = JSON.parse(datos.condiciones); } catch (e) { }
        }

        // 1. Cargar imagen y template
        const imagePath = path.join(__dirname, 'routes', 'impresion', 'encabpresup.jpg');
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        datos.logoBase64 = `data:image/jpeg;base64,${imageBase64}`;

        const htmlTemplate = fs.readFileSync(path.join(__dirname, 'routes', 'impresion', datos.informacion), 'utf8');
        const template = Handlebars.compile(htmlTemplate);
        const htmlFinal = template(datos);

        // 2. Puppeteer
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Seteamos el contenido antes de agregar el CSS
        await page.setContent(htmlFinal, { waitUntil: 'networkidle0' });

        // Inyectamos el CSS
        await page.addStyleTag({
            path: path.join(__dirname, 'routes', 'impresion', 'estilopresup.css')
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
        });
        // const pathDestino = path.join(variables.caminoolsafrecuente, datos.nombrepresup + '.pdf');
        const pathDestino = path.join(RUTAPRESUP, datos.nombrepresup + '.pdf');

        try {
            fs.writeFileSync(pathDestino, pdfBuffer);
            console.log("Archivo guardado correctamente en:", pathDestino);
        } catch (error) {
            console.error("Error detallado de escritura FS:", error);
            // Si falla la escritura, quizás quieras avisar, pero podés seguir 
            // enviando el PDF al navegador desde la memoria (buffer).
        }

        await browser.close();
        // ... (después de generar el pdfBuffer y guardar en disco si corresponde)
        // ... justo después de fs.writeFileSync(pathDestino, pdfBuffer);
        await browser.close();

        console.log("Enviando PDF al navegador...");

        // 1. Limpiamos cualquier header previo por seguridad
        res.removeHeader('Content-Type');
        if (datos.nroPresupuesto == 0) {
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline;  filename="Vista_Previa.pdf"`,
                'Content-Length': pdfBuffer.length // Le decimos al navegador cuánto pesa exactamente
            });
        }
        else { // 2. Establecemos los headers exactos
            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="${datos.nombrepresup}.pdf"`,
                'Content-Length': pdfBuffer.length // Le decimos al navegador cuánto pesa exactamente
            });
        }

        // 3. Enviamos el buffer y terminamos la respuesta con end()
        return res.end(pdfBuffer);


    } catch (error) {
        if (browser) await browser.close();
        console.error("❌ Error en generarpdf:", error);

        // Solo enviamos error si no se enviaron headers todavía
        if (!res.headersSent) {
            return res.status(500).send("Error interno al generar el PDF");
        }
    }

});
// Manejar cualquier otra ruta para que React/Frontend funcione (SPA)
//esto lo agregué cuando hice la nueva instalación en el servidor el 01/04/2026
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
//hasta acá es lo que agregué para que funcione la nueva instalación el 01/04/2026