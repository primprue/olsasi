import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.post("/", async (req, res) => {
  const indice = req.query.id;

  let descr = req.body.StkUnMedDesc.toUpperCase();
  try {
    const q = `UPDATE StkUnMed SET StkUnMedDesc = ? WHERE idStkUnMed = ?`;
    await conexionpool.query(q, [descr, indice]);
    return res.status(200).json({
      leyenda: 'Unidad Medida modificada correctamente',
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
