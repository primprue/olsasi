import express from 'express';
var router = express.Router();
const rutainterna = process.env.RUTA_INTERNA_DOC;

import { execFile } from 'child_process';
import { exec } from 'child_process';

router.get("/", function (req, res, next) {
    execFile(rutainterna + '/copBases.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error de ejecución: ${error}`);
            return res.status(500).json({ status: "error", message: error.message });
        }
        // 2. Analizar la salida del script
        // Ojo: mysqldump a veces tira avisos menores en stderr. 
        // Si tu script .sh termina con "exit 1" ante errores, el 'error' de arriba lo capturará.
        if (stderr) {
            console.warn(`Avisos de sistema (stderr): ${stderr}`);
        }
        return res.json({
            status: "success",
            message: "Backup realizado con éxito en Disco y PenDrive.",
            log: stdout // Por si querés ver en el front los 'echo' que pusimos en el .sh
        });
    });

})
export default router;