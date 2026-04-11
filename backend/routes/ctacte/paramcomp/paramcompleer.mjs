import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';


router.get('/', async (req, res) => {
    try {
        const q = `SELECT idParamComp as id,  ParamCompLetra, ParamCompAbrev, ParamCompSuc, ParamCompNro, ParamCompSR, ParamCompDesc, ParamCompDisc, ParamCompIVAAsoc FROM CtaCte.ParamComp `;
        const [result] = await conexionpool.query(q);
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