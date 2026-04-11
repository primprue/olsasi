import express from "express";
const router = express.Router();

// Tu función auxiliar para Promesas
import { conexionpool } from '../../conexion.mjs';



router.delete("/", async (req, res) => {
  const indice = req.query.id;
  try {
    // 1. Usamos parámetros (?) para evitar Inyección SQL (Seguridad)
    const q = `DELETE FROM BasePresup.PresupDetPie WHERE idPresupDetPie = ?`;
    await conexionpool.query(q, [indice]);
    return res.status(200).json({
      leyenda: 'PresupDetPie eliminado correctamente',
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
