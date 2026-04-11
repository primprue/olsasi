import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const RUTAPRESUP = process.env.RUTA_EXTRENA_PRESUP;
/* en desarrollo 
acá busca el encabpresup.jpg, el html y el css
__dirname   /home/sandra/SistOLSA/olsasi/backend/routes/impresion 
__filename   /home/sandra/SistOLSA/olsasi/backend/routes/impresion/generarpdfpresup.mjs
*/
router.post('/generarpdf', async (req, res) => {
    let browser;
    try {
        let datos = JSON.parse(JSON.stringify(req.body));
        // Parseo de seguridad para productos y condiciones
        if (datos.condiciones && typeof datos.condiciones === 'string') {
            try {
                datos.condiciones = JSON.parse(datos.condiciones);
            } catch (e) {
                datos.condiciones = [];
            }
        }
        if (datos.productos && typeof datos.productos === 'string') {
            try {
                datos.productos = JSON.parse(datos.productos);
            } catch (e) {
                datos.productos = [];
            }
        }
        // 1. Cargar imagen y template
        // const imagePath = path.join(__dirname, 'routes', 'impresion', 'encabpresup.jpg');
        const imagePath = path.join(__dirname, 'encabpresup.jpg');
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
        datos.logoBase64 = `data:image/jpeg;base64,${imageBase64}`;

        // const htmlTemplate = fs.readFileSync(path.join(__dirname, 'routes', 'impresion', datos.informacion), 'utf8');

        // --- REGISTRO DE HELPERS PARA HANDLEBARS ---
        Handlebars.registerHelper('eq', function (a, b) {
            return a === b;
        });

        // Podés agregar otros si los necesitás en el HTML
        Handlebars.registerHelper('notEq', function (a, b) {
            return a !== b;
        });

        const htmlTemplate = fs.readFileSync(path.join(__dirname, datos.informacion), 'utf8');
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
            // path: path.join(__dirname, 'routes', 'impresion', 'estilopresup.css')
            path: path.join(__dirname, 'estilopresup.css')
        });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
        });
        // const pathDestino = path.join(variables.caminoolsafrecuente, datos.nombrepresup + '.pdf'); y es OLSAFrecuentes, ahí crea 
        //si es vista previa un Vista_PREVIA_Presupuesto.pdf nombre que viene desde GeneradorPresup o
        // sino el nombre del presupuesto final
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
export default router;