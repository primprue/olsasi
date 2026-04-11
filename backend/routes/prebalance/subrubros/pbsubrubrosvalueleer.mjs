import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {
  // var q = ["Select concat (PBidSubRubro, PBSubRubroIdRubro) as  value,  PBSubRubroDetalle as label from BasePreBalance.PBSubRubros"].join(" ");
  try {
    const q = `SELECT PBidSubRubro as value,  PBSubRubroDetalle as label FROM BasePreBalance.PBSubRubros`
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
