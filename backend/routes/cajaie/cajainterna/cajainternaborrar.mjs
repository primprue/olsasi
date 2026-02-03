import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}

router.delete("/", async (req, res) => {
  try {
    var q = `delete from BaseCaja.CajaInterna where idCajaInterna = ?`;
    const param = [req.query.id];
    const resultados = await queryAsync(q, param);
    res.json(resultados);
  } catch (err) {
    console.log("Error en /cajainternaborrar", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;
