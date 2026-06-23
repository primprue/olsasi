import express from "express";
import puppeteer from 'puppeteer';
import { conexionpool } from '../conexion.mjs';
import fs from 'fs'; // Ponelo arriba de todo el archivo
import path from 'path';
const router = express.Router();

// --- 1. DECLARAR LA FUNCIÓN PRIMERO ---
// Usamos "function" para asegurar que esté disponible en todo el archivo
function generarHTMLReporte(datosAgrupados, fDesde, fHasta) {
    // Si no hay datos, evitamos que el proceso rompa
    // console.log('daosAr  ', datosAgrupados)
    if (!datosAgrupados || Object.keys(datosAgrupados).length === 0) {
        return `<html><body><h1>No hay datos para el período seleccionado</h1></body></html>`;
    }

    const secciones = Object.keys(datosAgrupados).map(codigo => {
        const grupo = datosAgrupados[codigo];
        const filas = grupo.detalles.map(det => `
            <tr>
                <td>${new Date(det.PBItemsFecha).toLocaleDateString('es-AR')}</td>
                <td>${det.ProveedoresDesc}</td>
                <td>${det.PBItemsTipoComp} ${det.PBItemsNroComp}</td>
                <td style="text-align: right;">$${Number(det.PBItemsImp).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsIVA).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsIIBB).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsOtros).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsOtros1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsOtros2).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsOtros3).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>                
                <td style="text-align: right;">$${Number(det.PBItemsOtros4).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                <td style="text-align: right;">$${Number(det.PBItemsTotal).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
            </tr>
        `).join('');
        // PBItemsImp, PBItemsIVA,
        //     PBItemsIIBB, PBItemsOtros, PBItemsOtros1,
        //     PBItemsOtros2, PBItemsOtros3, PBItemsOtros4,
        return `
            <div style="margin-bottom: 30px; page-break-inside: avoid;">
                <h3 style="background: #1976d2; color: white; padding: 8px; margin: 0;">
                    SUB-RUBRO: ${grupo.titulo} (Cód: ${codigo})
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 5px;" border="1">
                    <thead style="background: #f5f5f5;">
                        <tr>
                            <th style="padding: 5px;">Fecha</th>
                            <th style="padding: 5px;">Proveedor</th>
                            <th style="padding: 5px;">Comprobante</th>
                            <th style="padding: 5px;">Importe</th>
                            <th style="padding: 5px;">IVA</th>
                            <th style="padding: 5px;">IIBB</th>
                            <th style="padding: 5px;">Otros</th>
                            <th style="padding: 5px;">Otros 1</th>
                            <th style="padding: 5px;">Otros 2</th>
                            <th style="padding: 5px;">Otros 3</th>
                            <th style="padding: 5px;">Otros 4</th>
                            <th style="padding: 5px;">Total</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    }).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; font-size: 12px; padding: 20px; }
            h1 { color: #333; text-align: center; }
            table { font-size: 11px; }
            th { text-align: left; }
        </style>
    </head>
    <body>
        <h1>Pre-Balance: Listado de Movimientos</h1>
        <p style="text-align: center;">Desde: <b>${fDesde}</b> Hasta: <b>${fHasta}</b></p>
        <hr>
        ${secciones}
    </body>
    </html>`;
}


// --- 2. USAR LA FUNCIÓN EN LA RUTA ---
router.get("/", async (req, res) => {
    const { fechaDesde, fechaHasta } = req.query;
    const RUTA_INTERNA_DOC = process.env.RUTA_INTERNA_DOC;
    try {
        const q = `SELECT PBidSubRubro, PBSubRubroDetalle, PBItemsFecha, 
                PBItemsTipoComp, PBItemsNroComp, ProveedoresDesc,
                PBItemsImp,  PBItemsIVA,
                PBItemsIIBB, PBItemsOtros, PBItemsOtros1,
                PBItemsOtros2, PBItemsOtros3, PBItemsOtros4,
                PBItemsTotal
                FROM BasePreBalance.PBItems 
                JOIN BasePreBalance.PBSubRubros ON PBItemsSubRubro = PBidSubRubro
                JOIN BasesGenerales.Proveedores ON PBItemsProv = idProveedores
                WHERE PBItemsFecha BETWEEN ? AND ?
                ORDER BY PBItemsSubRubro, PBItemsFecha`;

        const [rows] = await conexionpool.query(q, [fechaDesde, fechaHasta]);

        // Agrupamos
        const listadoAgrupado = rows.reduce((acc, row) => {
            const { PBidSubRubro } = row;
            if (!acc[PBidSubRubro]) {
                acc[PBidSubRubro] = { titulo: row.PBSubRubroDetalle, detalles: [] };
            }
            acc[PBidSubRubro].detalles.push(row);
            return acc;
        }, {});

        // Ahora llamamos a la función
        const htmlContent = generarHTMLReporte(listadoAgrupado, fechaDesde, fechaHasta);

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
        // const nombreArchivo = `reporte_${Date.now()}.pdf`;
        const nombreArchivo = `reporte_pbmovimientos.pdf`;
        const rutaDestino = `${RUTA_INTERNA_DOC}/archivos-pdf/${nombreArchivo}`;

        fs.writeFileSync(rutaDestino, pdfBuffer);

        // 3. Responder con un JSON que contenga el nombre del archivo
        res.json({
            success: true,
            archivo: nombreArchivo
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
