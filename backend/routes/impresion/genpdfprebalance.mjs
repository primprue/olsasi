import e from 'express';
import express from 'express';
import fs from 'fs';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import path from 'path';
var router = express.Router();

Handlebars.registerHelper('formatoMoneda', function (numero) {
    if (isNaN(numero) || numero === null) return "0,00";
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
});
export async function genpdfprebalance(datosMySQL, fechaDesde, fechaHasta) {

    const RUTA_PUBLICOS = path.join(process.env.RUTA_INTERNA_DOC, 'archivos-pdf');
    // 1. Definir orden fiscal
    const ordenMeses = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
    const nombresBase = ["Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar"];

    const [añoInicio, mesInicio, diaInicio] = fechaDesde.split('-');
    // const añoInicio = fechaDesde;
    // const añoFin = fechaHasta;
    // const [añoFin, mesFin, diaFin] = fechaHasta.split('-');
    const añoFin = mesInicio < 4 ? añoInicio + 1 : añoInicio;

    const nombresMeses = ordenMeses.map((mes, index) => {
        // Si el mes es mayor o igual al mes de inicio (Abril), usamos el año inicial.
        // Si el mes es menor (Ene, Feb, Mar), ya pasamos al siguiente año calendario.
        const añoCapa = (mes >= ordenMeses[0]) ? añoInicio : parseInt(añoInicio) + 1;

        return `${nombresBase[index]} ${añoCapa}`;
    });
    const agrupados = datosMySQL.reduce((acc, item) => {

        // 1. Validar que el detalle exista para evitar el error de '.trim()'
        const nombreDetalle = item.detalle ? item.detalle.trim() : "SIN DETALLE";

        // 2. Inicializar el rubro si no existe en el acumulador
        if (!acc[nombreDetalle]) {
            acc[nombreDetalle] = {
                detalle: nombreDetalle,
                valores: {},
                total: 0,
            };
            // Llenar con ceros los 12 meses (Abril a Marzo)
            ordenMeses.forEach(m => acc[nombreDetalle].valores[m] = 0);
        }

        // 2. Mapeamos los meses que ya vienen en tu JSON al formato de 'valores'
        // Como 'item.meses' ya tiene los datos, los traspasamos
        for (const mes in item.meses) {
            const monto = parseFloat(item.meses[mes]) || 0;
            // Solo sumamos si el mes está dentro de nuestro rango esperado (ordenMeses)
            if (acc[nombreDetalle].valores.hasOwnProperty(mes)) {
                acc[nombreDetalle].valores[mes] += monto;

            }
        }

        // 3. Sumamos al total general del rubro
        acc[nombreDetalle].total += parseFloat(item.total) || 0;


        return acc;
    }, {});
    // 3. Convertir los rubros a array para la plantilla
    let filasParaTemplate = Object.values(agrupados).map(fila => ({
        detalle: fila.detalle,
        valoresMeses: ordenMeses.map(m => fila.valores[String(m)] || 0),
        total: fila.total
    }));

    const RUTAPREBALANCE = process.env.RUTA_INTERNA_DOC;

    const htmlSource = fs.readFileSync(`${RUTAPREBALANCE}/vistas/prebalance.hbs`, 'utf8');

    const template = Handlebars.compile(htmlSource);
    const htmlFinal = template({
        mesesEncabezado: nombresMeses,
        filas: filasParaTemplate
    });

    // Nueva lógica con Puppeteer
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    // ... dentro de genpdfprebalance ...
    await page.setContent(htmlFinal, { waitUntil: 'networkidle0' });
    // 1. Construimos la ruta completa usando la variable de entorno
    // const nombreArchivo = `prebalance_${Date.now()}.pdf`; // O el nombre que prefieras
    const nombreArchivo = `prebalance.pdf`; // O el nombre que prefieras
    const rutaCompleta = `${process.env.RUTA_INTERNA_DOC}/archivos-pdf/${nombreArchivo}`;

    // 2. Generamos el PDF y lo guardamos físicamente
    const pdfBuffer = await page.pdf({
        path: rutaCompleta, // <--- Esto lo guarda en el directorio compartido del .env
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });

    await browser.close();

    // 3. Retornamos el buffer para que el controlador pueda enviarlo al navegador
    return nombreArchivo;
}

export default router;

