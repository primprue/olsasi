import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.get("/", async (req, res) => {

  let q = `Select idStkRubro as id, StkRubroCodGrp, StkRubroDesc, StkRubroAbr, 
    StkRubroProv, StkRubroAncho, StkRubroPres, StkRubroPresDes, StkRubroUM,
    'StkRubroCosto, StkRubroTM, StkRubroConf from  StkRubro order by StkRubroDesc`
  try {
    const [rows] = await conexion.query(q);

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
