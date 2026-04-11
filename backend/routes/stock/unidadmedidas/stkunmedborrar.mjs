import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.delete("/", async (req, res) => {

  const indice = req.query.id;
  try {
    const q = `delete from StkUnMed where idStkUnMed = ?`;
    await conexionpool.query(q, [indice]);
    return res.status(200).json({
      leyenda: 'Unidad Medida eliminada correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);



    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});

export default router;
