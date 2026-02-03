import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';



async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}
// ------------------------------------------------------------------
// ENDPOINT
// ------------------------------------------------------------------
router.post("/", async (req, res) => {
    try {

        let fecha = new Date();
        // fecha.setDate(fecha.getDate() - 1);
        fecha.setDate(fecha.getDate());
        let fechahoy = fecha.toISOString().split("T")[0];
        var q = `SELECT  CajaIEFecha, CajaIEMT, sum(CajaIEImporte) as CajaIEImporte,
                CajaIEGrabado  
                FROM BaseCaja.CajaIE where
                BaseCaja.CajaIE.CajaIEFecha = ? group by CajaIEMT`;
        const params = [fechahoy];
        const resultados = await queryAsync(q, params)
        res.json(resultados);

    }
    catch (err) {
        console.log("Error en /cajacierre", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default router;