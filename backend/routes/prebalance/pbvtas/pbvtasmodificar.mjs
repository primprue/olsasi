import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.post("/", async function (req, res, next) {
  //da error en fecha
  const id = req.body.PBidVtas;
  const mesmod = req.body.PBMesV;
  const aniomod = req.body.PBAnioV;
  const importemod = req.body.PBImporteV;
  const fechamod = req.body.PBFechaV;
  const cierraabre = req.body.PBMesCerV;
  try {
    const q = `Update BasePreBalance.PBVtas 
                SET PBMesV = ?,
                PBAnioV = ?,
                PBImporteV = ?,
                PBFechaV = ?,
                PBMesCerV = ?
      WHERE PBidVtas = ?`;
    await conexionpool.query(q, [mesmod, aniomod, importemod, fechamod, cierraabre, id]); // Aquí se pasa el valor de la columna que se quiere actualizar
    return res.status(200).json({
      leyenda: 'Items actualizados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
  }

});
export default router;