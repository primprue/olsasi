import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

//cambié en la tabla de IVAPag de PreBalance el indice autoincremental 

router.post("/", async (req, res) => {
  var registro = {
    PBidIVAPagFecha: req.body.id,
    PBIVAPagIMP: req.body.PBIVAPagIMP,
  };
  try {
    const q = `Insert into BasePreBalance.PBIVAPag SET ?`;
    await conexionpool.query(q, [registro]);

    return res.status(201).json({
      leyenda: 'Items creados correctamente',
    });

  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores específicos de SQL
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Clave duplicada" });
    }
  }
});


export default router;
