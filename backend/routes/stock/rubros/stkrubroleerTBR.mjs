import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {
  try {
    const q = `Select StkRubroDesc as StkRubroDescTBR , StkRubroAbr as StkRubroAbrTBR from StkRubro where StkRubroAbr > 'TBR' and StkRubroAbr <= 'TBR99'  order by StkRubroDesc`
    const [result] = await conexionpool.query(q);
    res.json(result)
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});
export default router;
