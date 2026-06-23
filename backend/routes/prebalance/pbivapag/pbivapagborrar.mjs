import express from "express";
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';

router.delete('/', async function (req, res) {
  let fechat = req.query.id;
  const fecha = fechat.split("T")[0];
  try {
    const q = `delete from BasePreBalance.PBIVAPag where PBidIVAPagFecha = ?`;
    await conexionpool.query(q, [fecha]);

    return res.status(200).json({
      leyenda: 'Items eliminados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores específicos de SQL
    if (err.errno === 1451) {
      return res.status(411).json({ message: "error Código de IVAPAG usado en otra tabla" });
    }
    if (err.errno === 1451) {
      return res.status(411).json({ message: "error Código de IVAPAG usado en otra tabla" });
    }

    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }

});
export default router;
