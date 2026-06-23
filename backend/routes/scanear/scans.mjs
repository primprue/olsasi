import { Router } from 'express'; // Importamos Router en vez de express completo
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const router = Router();
const execAsync = promisify(exec);
// Importa path si no lo tenías importado en el archivo principal:

// Forzamos a Express a buscar la ruta absoluta real en el disco

// Al estar colgado de "/api/scans" en el archivo principal, 
// este endpoint de abajo se convierte automáticamente en "GET /api/scans"
router.get('/', async (req, res) => {
    const ruta = process.env.RUTA_EXTERNA_MEDCLI;
    try {
        // 1. Detectar el escáner
        const { stdout: deviceList } = await execAsync('scanimage -L');
        const match = deviceList.match(/device `([^']+)'/);

        if (!match) {
            return res.status(404).json({ error: 'No se detectó la multifunción Brother.' });
        }
        const dispositivo = match[1];

        // 2. Generar nombre de archivo
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const randomId = '125';
        const nombreArchivo = `brother_${timestamp}_${randomId}.jpg`;
        const rutaCompleta = path.join(ruta, nombreArchivo);

        // 3. Ejecutar escaneo
        // const comando = `scanimage -d "${dispositivo}" --mode Color --resolution 150 --format=jpeg > "${rutaCompleta}"`;
        const comando = `scanimage -d "${dispositivo}" --resolution 150 --format=jpeg > "${rutaCompleta}"`;

        await execAsync(comando);

        // 4. Responder (Ajusta el puerto si tu servidor principal usa otro que no sea el 3000)
        res.json({
            mensaje: 'Escaneo exitoso',
            nombreArchivo: nombreArchivo,
            urlPantalla: `http://localhost:4000/archivos/${nombreArchivo}`,
            rutaLocal: rutaCompleta
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el escáner', detalle: error.message });
    }
});

// Exportamos el router para que el archivo principal lo pueda importar
export default router;