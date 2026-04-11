import express from 'express';
var router = express.Router();
import { conexion } from '../../conexion.mjs';


async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get('/', async (req, res) => {
    const fechad = req.query.fechad;
    const fechah = req.query.fechah;
    // Validación básica
    if (!fechad || !fechah) {
        return res.status(400).json({ error: 'Faltan fechas (fechad y fechah)' });
    }
    try {
        const q = `
            SET @numero=0;
            SELECT @numero:=@numero+1 as id,
            CajaInternaMoneda,
            SUM(CASE WHEN CajaInternaES = 'E' AND CajaInternaMT = 'M' THEN CajaInternaImporte ELSE 0 END) AS TotalEntradaM,
            SUM(CASE WHEN CajaInternaES = 'S' AND CajaInternaMT = 'M' THEN CajaInternaImporte ELSE 0 END) AS TotalSalidaM,
            SUM(CASE WHEN CajaInternaES = 'E' AND CajaInternaMT = 'T' THEN CajaInternaImporte ELSE 0 END) AS TotalEntradaT,
            SUM(CASE WHEN CajaInternaES = 'S' AND CajaInternaMT = 'T' THEN CajaInternaImporte ELSE 0 END) AS TotalSalidaT
        FROM BaseCaja.CajaInterna
        WHERE CajaInternaFecha BETWEEN ? AND ?
        GROUP BY CajaInternaMoneda
    `;
        // Usamos await porque queryAsync es una promesa
        const resultados = await queryAsync(q, [fechad, fechah]);
        // Como son múltiples sentencias, los datos reales están en el segundo índice [1]
        const result = resultados[1];

        res.json(result);
    } catch (error) {
        console.log("Error en /cajainternasumtot", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default router;
