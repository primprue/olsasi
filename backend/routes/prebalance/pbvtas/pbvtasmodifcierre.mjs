import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.post("/", async function (req, res, next) {
  // const id = req.body.PBidVtas;
  const mesabre = req.body.PBMesV;
  const anioabre = req.body.PBAnioV;
  const cierraabre = req.body.PBMesCerV;
  try {
    const q = `Update BasePreBalance.PBVtas 
                SET   PBMesCerV = ?
      WHERE PBMesV = ? and PBAnioV = ?`;
    await conexionpool.query(q, [cierraabre, mesabre, anioabre]); // Aquí se pasa el valor de la columna que se quiere actualizar
    return res.status(200).json({
      leyenda: 'Items actualizados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
  }

});
export default router;