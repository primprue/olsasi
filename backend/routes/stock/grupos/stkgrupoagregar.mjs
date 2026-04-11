import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.post("/", async (req, res) => {
  try {
    const registro = {
      StkGrupoDesc: req.body.StkGrupoDesc.toUpperCase(),
      StkGrupoAbr: req.body.StkGrupoAbr.toUpperCase(),
      StkGrupoContRubro: 0
    };
    const q = `INSERT INTO StkGrupo SET ?`;
    await conexionpool.query(q, [registro]);

    return res.status(201).json({
      leyenda: 'Grupo creados correctamente',
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