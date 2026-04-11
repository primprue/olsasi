import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ruta: Preparar Vista Previa
router.get('/preparar-vista-previa/:nombrePresupuesto', (req, res) => {
    try {
        const nombreLimpiado = decodeURIComponent(req.params.nombrePresupuesto).trim().replace(/[\n\r]/g, "");
        const pathOrigen = path.join(process.env.RUTA_EXTRENA_PRESUP, nombreLimpiado);
        const RUTA_PUBLICOS = path.join(process.env.RUTA_INTERNA_DOC, 'public');
        const pathDestino = path.join(RUTA_PUBLICOS, 'vista_previa.pdf');

        if (!fs.existsSync(pathOrigen)) {
            return res.status(404).json({ error: 'Archivo original no encontrado' });
        }
        // debo crear la carpeta documentos a la misma altura que dist
        fs.copyFileSync(pathOrigen, pathDestino);
        //esto estaba cuando está compilado en production
        // res.json({ urlFinal: `/documentos/vista_previa.pdf?t=${Date.now()}` });
        //cuando está en producción tengo que ver porque servidor.mjs creo que crea publico/public y después lo manda a /documentos
        // http://localhost:5173/public/vista_previa.pdf?t=1775498360985
        //esto estaba cuando estoy en desarrollo, porque va a copiarlo a /home/sandra/SistOLSA/olsasi/public
        res.json({ urlFinal: `/public/vista_previa.pdf?t=${Date.now()}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar el PDF' });
    }
});

// Podés agregar aquí más rutas relacionadas (generar, borrar, etc.)
// router.post('/generar-pdf', ...);

export default router;