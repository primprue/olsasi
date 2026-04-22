import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';


router.get('/', async (req, res) => {
    try {
        const q = `SELECT idCheques as id, ChequesFechaEntrada,
            ChequesLibrador, ChequesNro,
            ChequesBanco, ChequesFechaPago, ChequesImporte, ChequesFechaSalida,
            ChequesDepBanco, ChequesEndosadoA, ChequesOP, ChequesObservacion
            from BaseCaja.Cheques order by idCheques`;
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