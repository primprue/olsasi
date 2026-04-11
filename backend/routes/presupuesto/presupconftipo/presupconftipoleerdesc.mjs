import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  try {
    const PresupConfTipoDesc = req.query.descripcion;
    const q = `Select * from BasePresup.PresupConfTipo where PresupConfTipoDesc = ?`;
    const [result] = await conexionpool.query(q, [PresupConfTipoDesc]);
    return res.json(result);
  } catch (err) {
    console.error("Error en el proceso:", err);
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }

  // var PresupConfTipoDesc = req.query.descripcion;
  // var q = ["Select * from BasePresup.PresupConfTipo where PresupConfTipoDesc = '" + PresupConfTipoDesc + "'"].join("");
  // conexion.query(q, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
});
export default router;
