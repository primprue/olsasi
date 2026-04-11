import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';

router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async (req, rest) => {

    const indice = req.query.id;
    const PBPorcIVA = req.body.PBPorcIVA;
    try {
        const q = `Update BasePreBalance.PBPorIVA SET PBPorcIVA = ?
                    where PBPorcIVA = ?`;
        await conexionpool.query(q, [PBPorcIVA, indice]);
        return rest.status(200).json({
            leyenda: 'Poriva modificado correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);
        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return rest.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return rest.status(410).json({ message: "Dato demasiado largo para una columna" });
        }
        return rest.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});
export default router;