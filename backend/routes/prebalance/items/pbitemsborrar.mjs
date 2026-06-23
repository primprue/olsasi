import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.delete("/", async (req, res) => {
  const datosParseados = JSON.parse(req.query.datos);
  const { PBidItems, PBItemsRubro, PBItemsSubRubro } = datosParseados;

  const q = `Delete from BasePreBalance.PBItems where PBidItems = ? and PBItemsRubro= ? and PBItemsSubRubro = ?`;
  await conexionpool.query(q, [PBidItems, PBItemsRubro, PBItemsSubRubro]);

  return res.status(200).json({
    leyenda: "PBItems borrada correctamente",
  });
});

export default router;
