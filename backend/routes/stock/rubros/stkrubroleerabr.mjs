import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  let q = `Select StkRubroAbr, StkRubroDesc from  StkRubro order by StkRubroDesc`
  try {
    const [rows] = await conexionpool.query(q);

    res.json(rows);
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({
      error: "Error al obtener los StkRubro",
      details: err.message
    });
  }
});


export default router;
