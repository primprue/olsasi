import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';



// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
async function queryAsync(sql) {
  const [rows] = await conexion.promise().query(sql);
  return rows;
}

router.get("/", async (req, res) => {
  try {
    let q1 = `SET @numero=0; SELECT @numero:=@numero+1 as id, idPresupRenglon, PresupRenglonNroPresup,
      PresupRenglonCant, PresupRenglonDesc, PresupRenglonLargo, PresupRenglonAncho, PresupRenglonImpUnit,
      PresupRenglonImpItem, PresupRenglonParamInt from BasePresup.PresupRenglon
      where PresupRenglonNroPresup like '%${req.query.id}%' order by PresupRenglonNroPresup asc`;
    const resultados = await queryAsync(q1);
    res.json(resultados[1]);
  } catch (err) {
    console.log("Error en /presuprenglonleer", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }

});

export default router;