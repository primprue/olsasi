import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.post("/", async function (req, res, next) {

  let fechat = req.query.id;
  const fecha = fechat.split("T")[0];
  let importenuevo = req.body.PBIVAPagIMP;

  try {
    const q = `Update BasePreBalance.PBIVAPag SET PBIVAPagIMP = ? WHERE PBidIVAPagFecha = ?`;
    await conexionpool.query(q, [importenuevo, fecha]); // Aquí se pasa el valor de la columna que se quiere actualizar
    return res.status(200).json({
      leyenda: 'Items actualizados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
  }

});
export default router;