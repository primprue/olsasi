/*No podía detectar el scanner entonces
El escáner está en otra PC/Servidor y querés usarlo desde este Linux

Si la multifunción está conectada por USB a otra máquina (otra PC de la red o un servidor central) y esa máquina está "compartiendo" el escáner a través de la red usando el demonio saned:

    En el Linux donde estás tirando los comandos, edita el archivo de configuración de red de SANE:
    Bash

    sudo nano /etc/sane.d/net.conf

    Agrega la dirección IP de la computadora que tiene el escáner conectado físicamente al final del archivo:
    Plaintext

    # Al final del archivo, agregás la IP del servidor que "comparte"
    192.168.1.10

    Guarda (Ctrl+O, Enter) y sal (Ctrl+X).

    Luego, asegúrate de que el backend net esté activo editando /etc/sane.d/dll.conf y verificando que la línea net no tenga un # adelante.

Para dar el siguiente paso:

¿Cómo está conectada la multifunción a la red? ¿Tiene una IP propia en la oficina, o está conectada por USB a otra máquina que la está compartiendo? Y clave: ¿qué marca y modelo es? */

import { Router } from 'express'; // Importamos Router en vez de express completo
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import obtenerIpLocal from '../../buscaiplocal.mjs'
const router = Router();
const execAsync = promisify(exec);
// Importa path si no lo tenías importado en el archivo principal:

// Forzamos a Express a buscar la ruta absoluta real en el disco

// Al estar colgado de "/api/scans" en el archivo principal, 
// este endpoint de abajo se convierte automáticamente en "GET /api/scans"
const MAPA_ESCANERES = {
   // "192.168.2.110": "net:192.168.2.103:brother4:bus1;dev2", //  Notebook de Sandra en scaner de Fanny
    "192.168.2.103": "net:192.168.2.103:brother4:bus1;dev2", // PC de Fanny en scaner de Fanny
    "192.168.2.11": "net:192.168.2.11:brother4:bus2;dev3", // PC de Sandra en scaner de Sandra
    "192.168.2.106": "net:192.168.2.11:brother4:bus2;dev3", // PC de Flavia en scaner de Sandra
    "192.168.2.110": "net:192.168.2.11:brother4:bus2;dev3", // Notebook de Sandra
    "192.168.2.108": "net:192.168.2.11:brother4:bus2;dev3", // Notebook servidor en scaner de Sandra
};
router.get('/', async (req, res) => {
    
    const miIp = obtenerIpLocal();
   
    const ipCliente = req.ip;
   
    const primerPunto = ipCliente.lastIndexOf(".");
    const segundoPunto = ipCliente.lastIndexOf(".", primerPunto - 1);
    // 2. Extraemos desde el segundo punto hasta el final del string
    const resultado = ipCliente.slice(segundoPunto);
    const ipspgen = resultado.replaceAll(".", "");
    const datos = req.query.datos
    const ruta = process.env.RUTA_EXTERNA_MEDCLI;
    try {
        let dispositivoSeleccionado = MAPA_ESCANERES[ipCliente];

        if (!dispositivoSeleccionado) {
            // Si la IP no tiene un escáner asignado, usamos el de red por defecto
            console.log(`IP ${ipCliente} no registrada. Usando escáner de red por defecto.`);
            dispositivoSeleccionado = MAPA_ESCANERES["DEFAULT_RED"];
        }
   
        const nombreArchivo = `preview${ipspgen}.jpg`;
        const rutaCompleta = path.join(ruta, nombreArchivo);
        const comando = `scanimage -d "${dispositivoSeleccionado}" --resolution 150 --format=jpeg > "${rutaCompleta}"`;
    
        await execAsync(comando);
        // // 1. Detectar el escáner
        // const { stdout: deviceList } = await execAsync('scanimage -L');
        // const match = deviceList.match(/device `([^']+)'/);

        // if (!match) {
        //     return res.status(404).json({ error: 'No se detectó la multifunción Brother.' });
        // }
        // const dispositivo = match[1];


        // const rutaCompleta = path.join(ruta, nombreArchivo);
        // 3. Ejecutar escaneo
        // const comando = `scanimage -d "${dispositivo}" --resolution 150 --format=jpeg > "${rutaCompleta}"`;

        // await execAsync(comando);

        // 4. Responder (Ajusta el puerto si tu servidor principal usa otro que no sea el 3000)
        res.json({
            mensaje: 'Escaneo exitoso',
            nombreArchivo: nombreArchivo,
            urlPantalla: `${nombreArchivo}`,
            rutaLocal: rutaCompleta
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el escáner', detalle: error.message });
    }
});

// Exportamos el router para que el archivo principal lo pueda importar
export default router;
