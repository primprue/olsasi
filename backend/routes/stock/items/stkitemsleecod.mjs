import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  try {
    const idStkItems = req.query.id1;
    const StkItemsGrupo = req.query.id2;
    const StkItemsRubro = req.query.id3;
    const q = `Select * from StkItems where idStkItems = ? and  StkItemsGrupo  = ? and  StkItemsRubro  = ?`;
    const [result] = await conexionpool.query(q, [idStkItems, StkItemsGrupo, StkItemsRubro]);
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
