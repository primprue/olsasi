import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

function convertirFecha(fechaDDMMYYYY) {
  const [dia, mes, anio] = fechaDDMMYYYY.split('-');
  return `${anio}-${mes}-${dia}`;   // <-- string perfecto para MySQL
}
async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}
// ------------------------------------------------------------------
// ENDPOINT
// ------------------------------------------------------------------
router.post("/", async (req, res) => {
  try {

    var CajaInternaFecha = convertirFecha(req.body.CajaInternaFecha);

    var CajaInternaImporte = parseFloat(req.body.CajaInternaImporte);

    var q = `UPDATE BaseCaja.CajaInterna SET CajaInternaFecha = ?,
        CajaInternaConcepto = ?,
        CajaInternaMoneda = ?,
        CajaInternaES = ?,
        CajaInternaMT = ?,
        CajaInternaImporte = ?,
        CajaInternaTotalInstr = '0'
        WHERE idCajaInterna = ? `;
    const params = [
      CajaInternaFecha,
      req.body.CajaInternaConcepto,
      req.body.CajaInternaMoneda,
      req.body.CajaInternaES,
      req.body.CajaInternaMT,
      CajaInternaImporte,
      req.query.id,
    ];

    const resultados = await queryAsync(q, params)
    res.json(resultados);

  }
  catch (err) {
    console.log("Error en /cajainternamodificar", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;

