import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';



router.post('/', async (req, res) => {
    const { DetaOpcion, Vpdef, nroid } = req.body.newDatosSelect;

    // 1. Armamos el path dinámico para el JSON de MySQL. Ejemplo: '$."5mm"'
    const jsonPath = `$."${DetaOpcion}"`;

    // 2. Ejecutamos el UPDATE directamente usando JSON_SET
    const updateQuery = `
    UPDATE BasesOrdenes.OTDatos
    SET OTDatosOpciones = JSON_SET(OTDatosOpciones, ?, ?) 
    WHERE idOTDatos  = ?
`;

    await conexionpool.query(updateQuery, [jsonPath, Vpdef, nroid], (err, result) => {
        if (err) {
            if (err.errno == 1062) {
                return res.status(409).send({ message: "error clave duplicada" });
            } else {
                console.log(err.errno);
            }
        } else {
            res.json(result.rows);
        }
    });
});

export default router;

