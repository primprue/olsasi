
import { conexionpool } from '../../conexion.mjs';
import express from "express";
import puppeteer from 'puppeteer';
import fs from 'fs'; // Ponelo arriba de todo el archivo
import path from 'path';
const router = express.Router();
function generarHTMLReporte(datosAgrupados) {
    // Si no hay datos, evitamos que el proceso rompa
    if (!datosAgrupados || Object.keys(datosAgrupados).length === 0) {
        return `<html><body><h1>No hay cheques en cartera</h1></body></html>`;
    }
    // 1. Calculamos los totales primero
    const cantidadCheques = Object.values(datosAgrupados).length;

    const importeTotal = Object.values(datosAgrupados).reduce((suma, det) => {
        return suma + Number(det.ChequesImporte || 0);
    }, 0);
    const filas = Object.values(datosAgrupados).map(det => `
        <tr>
            <td>${det.idCheques}</td>
             <td style="text-align: right;">${new Date(det.ChequesFechaEntrada).toLocaleDateString('es-AR')}</td>
            <td>${det.ChequesLibrador}</td>
            <td>${det.ChequesNro}</td>
            <td>${det.BancoNombre}</td>
            <td style="text-align: right;">${new Date(det.ChequesFechaPago).toLocaleDateString('es-AR')}</td>
            <td style="text-align: right;">$${Number(det.ChequesImporte).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
        </tr>
         `).join('');

    return `
            <div div style = "margin-bottom: 30px; page-break-inside: avoid;" >
             <h3 style="background: #1976d2; color: white; padding: 8px; margin: 0;">
                    Cheques en Cartera al ${new Date(Date.now()).toLocaleDateString('es-AR')}
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 5px;" border="1">
                    <thead style="background: #f5f5f5;">
                        <tr>
                            <th style="padding: 5px;">ID</th>
                            <th style="padding: 5px;">Fecha Entrada</th>
                            <th style="padding: 5px;">Librerador</th>
                            <th style="padding: 5px;">Nro</th>
                            <th style="padding: 5px;">Banco</th>
                            <th style="padding: 5px;">Fecha Pago</th>
                            <th style="padding: 5px;">Importe</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                    <tfoot style="background: #e9e9e9; font-weight: bold;">
                <tr>
                    <td colspan="3" style="padding: 5px; text-align: left;">
                        Total Cheques: ${cantidadCheques}
                    </td>
                    <td colspan="3" style="padding: 5px; text-align: right;">
                        TOTAL:
                    </td>
                    <td style="padding: 5px; text-align: right;">
                        $${importeTotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                </tr>
            </tfoot>
                </table>
            </div > `;


    return `
        < !DOCTYPE html >
            <html>
                <head>
                    <meta charset="UTF-8">
                        <style>
                            body {font - family: Arial, sans-serif; font-size: 12px; padding: 20px; }
                            h1 {color: #333; text-align: center; }
                            table {font - size: 11px; }
                            th {text - align: left; }
                        </style>
                </head>
                <body>
                    <h1>Cheques en Cartera</h1>
                    <p style="text-align: center;">Desde: <b>${fDesde}</b> Hasta: <b>${fHasta}</b></p>
                    <hr>
                        ${filas}
                </body>
            </html>`;
}

router.get('/', async (req, res) => {
    const RUTA_INTERNA_DOC = process.env.RUTA_INTERNA_DOC;
    try {
        const q = ` SELECT idCheques, ChequesFechaEntrada, ChequesLibrador, ChequesNro, 
        BasesGenerales.Bancos.BancosNombre as BancoNombre, ChequesFechaPago, ChequesImporte
        FROM BaseCaja.Cheques join BasesGenerales.Bancos where ChequesFechaSalida is null
        and ChequesBanco = BasesGenerales.Bancos.idBancos order by ChequesFechaPago`;
        const [result] = await conexionpool.query(q);
        // return res.json(result);
        const [rows] = await conexionpool.query(q);
        const htmlContent = generarHTMLReporte(rows);

        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Importante para servidores Linux
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
        });

        await browser.close();
        // ... código anterior de puppeteer ...
        // 2. Guardar físicamente en el disco
        // Asegúrate de que la carpeta 'archivos-pdf' exista
        // const nombreArchivo = `reporte_${ Date.now() }.pdf`;
        const nombreArchivo = `chequesencartera.pdf`;
        const rutaDestino = `${RUTA_INTERNA_DOC}/archivos-pdf/${nombreArchivo}`;

        fs.writeFileSync(rutaDestino, pdfBuffer);

        // 3. Responder con un JSON que contenga el nombre del archivo
        res.json({
            success: true,
            archivo: nombreArchivo
        })
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});

export default router;