import express from "express";
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';




router.get("/", async (req, res) => {
  let q = `Select idPresupDetPie as id, PresupDetPieLeyenda, PresupDetPieSelec from BasePresup.PresupDetPie order by PresupDetPieLeyenda`;
  try {
    const [rows] = await conexionpool.query(q);
    res.json(rows);
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({
      error: "Error al obtener los leyendas de pie de presupuesto",
      details: err.message
    });
  }

});
export default router;
