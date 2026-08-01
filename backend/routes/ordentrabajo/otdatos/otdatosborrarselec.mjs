import express from 'express';
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.delete('/', async function (req, res) {
    const datos = JSON.parse(req.query.datos);

    // Ahora sí podés extraerlos
    const { nroid, opcion } = datos;

    // 1. Conexión a la base de datos
    const connection = await conexionpool.getConnection();

    // 2. Ejecutamos el query
    try {
        // 1. Armamos el path de MySQL de forma segura.
        const opcionjson = `$."${opcion}"`;
        // 2. Ejecutamos el UPDATE usando JSON_REMOVE
        const query = `
                    UPDATE  BasesOrdenes.OTDatos
                    SET OTDatosOpciones = JSON_REMOVE(OTDatosOpciones, ?)
                    where idOTDatos = ?`;
        await conexionpool.query(query, [opcionjson, nroid]);
        return res.status(200).json({
            leyenda: 'Opción eliminada correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});

export default router;
