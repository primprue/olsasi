import express from "express";

const router = express.Router();
import { conexionpool } from '../../conexion.mjs';

router.delete('/', async (req, res) => {
  const indice = req.query.id;
  // 1. Usamos parámetros (?) para evitar Inyección SQL (Seguridad)
  try {
    const q = `DELETE FROM BasePresup.PresupExpCal WHERE idPresupExpCal = ?`;
    await conexionpool.query(q, [indice]);
    return res.status(200).json({
      leyenda: 'Presupuesto Exp Cal eliminado correctamente',
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
