import express from 'express';
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.get('/', async (req, res) => {
    const paracalculo = req.query.id;
    try {


        const q = `Select PresupParCalTit as value, PresupParCalOpcion as label 
        from BasePresup.PresupParCalc where PresupParCalDesc = ? order by PresupParCalDesc, PresupParCalTit`;
        const [result] = await conexionpool.query(q, [paracalculo]);
        return res.json(result);
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});

export default router;