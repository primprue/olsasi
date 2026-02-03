import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';


async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}


router.get('/', async function (req, res, next) { // Añadimos async
    try {
        const { FechaDesde, FechaHasta } = req.query;

        let q1 = `
            SET @numero=0; 
            SELECT @numero:=@numero+1 as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha, 
            CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT,
            CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado 
            FROM BaseCaja.CajaIE 
            LEFT JOIN BaseCaja.CajaCP ON BaseCaja.CajaIE.CajaIECodIP = BaseCaja.CajaCP.idCajaCP
            WHERE DATE(BaseCaja.CajaIE.CajaIEFecha) BETWEEN ? AND ? order by BaseCaja.CajaIE.CajaIEFecha desc`;

        // Usamos await porque queryAsync es una promesa
        const resultados = await queryAsync(q1, [FechaDesde, FechaHasta]);

        // Como son múltiples sentencias, los datos reales están en el segundo índice [1]
        const result = resultados[1];

        res.json(result);
    } catch (error) {
        console.error("Error en la consulta buscaie:", error);
        res.status(500).send("Error del servidor");
    }
});
export default router;