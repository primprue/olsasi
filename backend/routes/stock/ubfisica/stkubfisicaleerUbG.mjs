import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/:StkUbFisicaGeo", async (req, res) => {
  const indice = req.params.StkUbFisicaGeo;
  try {
    const q = `Select * from StkUbFisica  where StkUbFisicaGeo =  ?  order by idStkUbFisica`;
    const [result] = await conexionpool.query(q, [indice]);
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
