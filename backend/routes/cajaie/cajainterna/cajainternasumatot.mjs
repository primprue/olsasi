import express from 'express';
var router = express.Router();
import conexion from '../../conexion.mjs';

router.get('/', function (req, res) {
    console.log('cajainternarsumatot');

    const fechad = req.query.fechad;
    const fechah = req.query.fechah;

    // Validación básica
    if (!fechad || !fechah) {
        return res.status(400).json({ error: 'Faltan fechas (fechad y fechah)' });
    }

    const q1 = `
        SELECT
            CajaInternaMoneda,
            SUM(CASE WHEN CajaInternaES = 'E' AND CajaInternaMT = 'M' THEN CajaInternaImporte ELSE 0 END) AS TotalEntradaM,
            SUM(CASE WHEN CajaInternaES = 'S' AND CajaInternaMT = 'M' THEN CajaInternaImporte ELSE 0 END) AS TotalSalidaM,
            SUM(CASE WHEN CajaInternaES = 'E' AND CajaInternaMT = 'T' THEN CajaInternaImporte ELSE 0 END) AS TotalEntradaT,
            SUM(CASE WHEN CajaInternaES = 'S' AND CajaInternaMT = 'T' THEN CajaInternaImporte ELSE 0 END) AS TotalSalidaT
        FROM BaseCaja.CajaInterna
        WHERE CajaInternaFecha BETWEEN ? AND ?
        GROUP BY CajaInternaMoneda
    `;

    conexion.query(q1, [fechad, fechah], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }
        res.json(result);
    });
});

export default router;
