import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {
  try {
    var q = ["SELECT  PBMesV, PBAnioV, PBImporteV, DATE_FORMAT(PBFechaV, '%d-%m-%Y') AS PBFechaV, PBMesCerV FROM BasePreBalance.PBVtas where PBMesCerV = 'N' and (PBAnioV >= (YEAR(CURDATE()) - 1))"].join(" ");
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
