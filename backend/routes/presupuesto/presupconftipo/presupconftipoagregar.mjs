import express from "express";
var router = express.Router();

import moment from "moment";
import { conexionpool } from '../../conexion.mjs';

moment.locale("es");


router.post("/", async (req, res) => {
  const registro = {
    PresupConfTipoDesc: (req.body.PresupConfTipoDesc || '').trim().toUpperCase(),
    PresupConfTipoRubro: (req.body.PresupConfTipoRubro || '').trim().toUpperCase(),
    PresupConfTipoCant: req.body.PresupConfTipoCant,
    PresupConfTipoM2: (req.body.PresupConfTipoM2 || '').trim().toUpperCase(),
    PresupConfTipoAnexo: (req.body.PresupConfTipoAnexo || '').trim().toUpperCase(),
    PresupConfTipoLargo: (req.body.PresupConfTipoLargo || '').trim().toUpperCase(),
    PresupConfTipoAncho: (req.body.PresupConfTipoAncho || '').trim().toUpperCase(),
    PresupConfTipoImprime: (req.body.PresupConfTipoImprime || '').trim().toUpperCase(),
    PresupConfTipoMinMOT: req.body.PresupConfTipoMinMOT,
    PresupConfTipoBack: '',
    PresupConfTipoPElab: 'S'
  };
  try {
    await conexionpool.query("INSERT INTO BasePresup.PresupConfTipo SET ?", [registro]);
    // Respuesta exitosa
    return res.status(201).json({
      leyenda: "PresupConfTipo creado correctamente"
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
