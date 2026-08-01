import express from 'express';
var router = express.Router();
import { rename } from 'node:fs/promises';

import { conexionpool } from '../conexion.mjs';


router.post('/', async (req, res) => {

    const ruta = process.env.RUTA_EXTERNA_MEDCLI;
    const nombreorigen = `${ruta}/${req.body.imagenUrl}`;
    let nroclientestring = req.body.NumeroClienteDC.toString();
    while (nroclientestring.length < 4) {
        nroclientestring = '0' + nroclientestring;
    }
    let nroordentrabajostring = req.body.NumeroOrdenDC.toString();
    while (nroordentrabajostring.length < 4) {
        nroordentrabajostring = '0' + nroordentrabajostring;
    }
    const nomarchnuevo = `${ruta}/${req.body.FrenteDorso}${nroclientestring}${nroordentrabajostring}.jpg`;
    try {
        await rename(nombreorigen, nomarchnuevo);
    } catch (error) {
        console.error('Error al mover el archivo:', error);
    }


    var registro = {
        NroClienteMC: req.body.NumeroClienteDC,
        NroOrdenTrabajoMC: req.body.NumeroOrdenDC,
        FechaMedidaMC: req.body.FechaMedida,
        DetalleMC: req.body.DetalleMedida,
        FrenteDorsoMC: req.body.FrenteDorso,
        PatenteMC: req.body.PatenteMedida,
        IdentificacionMC: req.body.IdentificacionMedida,
    }
    try {

        const q = `INSERT INTO medidasclientes.datosordenesmc SET ?`;
        await conexionpool.query(q, [registro]);
        return res.status(201).json({
            leyenda: "Medida creada correctamente"
        });
    } catch (err) {
        console.error("Error en el proceso:", err);

        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return res.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return res.status(410).json({ message: "Dato demasiado largo para una columna" });
        }

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});


export default router;