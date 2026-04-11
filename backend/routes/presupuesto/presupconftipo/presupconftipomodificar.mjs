import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.post("/", async function (req, res, next) {
  let indice = req.query.id;
  let PresupConfTipoLargo = req.body.PresupConfTipoLargo;
  let PresupConfTipoAncho = req.body.PresupConfTipoAncho;
  let PresupConfTipoAnexo = req.body.PresupConfTipoAnexo.toUpperCase();
  let PresupConfTipoCant = req.body.PresupConfTipoCant;
  let PresupConfTipoM2 = req.body.PresupConfTipoM2.toUpperCase();
  let PresupConfTipoDesc = req.body.PresupConfTipoDesc.toUpperCase();
  let PresupConfTipoRubro = req.body.PresupConfTipoRubro.toUpperCase();
  let PresupConfTipoImprime = req.body.PresupConfTipoImprime.toUpperCase();
  let PresupConfTipoMinMOT = req.body.PresupConfTipoMinMOT
  try {
    const q = `UPDATE BasePresup.PresupConfTipo SET PresupConfTipoAnexo = ?,
                  PresupConfTipoCant = ?, PresupConfTipoM2 = ?,
                  PresupConfTipoDesc = ?, PresupConfTipoRubro = ?, PresupConfTipoLargo = ?,
                  PresupConfTipoAncho = ?, PresupConfTipoImprime = ?, PresupConfTipoMinMOT = ?
                  WHERE idPresupConfTipo = ?`;
    await conexionpool.query(q, [PresupConfTipoAnexo, PresupConfTipoCant,
      PresupConfTipoM2, PresupConfTipoDesc, PresupConfTipoRubro,
      PresupConfTipoLargo, PresupConfTipoAncho, PresupConfTipoImprime,
      PresupConfTipoMinMOT, indice]);
    return res.status(200).json({
      leyenda: 'Datos actualizados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores específicos de SQL
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Clave duplicada" });
    }
    if (err.errno === 1406) {
      return res.status(410).json({ message: "Dato demasiado largo para una columna" });
    }

    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});
export default router;


