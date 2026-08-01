import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.get("/", async (req, res) => {
  try {
    const PresupConfTipoAnexoSN = req.query.anexo;
    const PresupConfTipoProdelab = req.query.prodelab;
    const lectura = PresupConfTipoProdelab === 'PAE' ? 'N' : 'S';
    const onand = PresupConfTipoProdelab === 'PAE' ? 'and ' : 'or ';
    const condicion = PresupConfTipoProdelab === 'PAE' ? '<>' : '=';

    const q1 = `SELECT @numero := @numero + 1 AS NroConfTipo,
    PresupConfTipoDesc, PresupConfTipoImprime
    FROM BasePresup.PresupConfTipo,
    (SELECT @numero := 0) AS init
    WHERE PresupConfTipoAnexo = ?
    AND PresupConfTipoPElab = ?
    ${onand}PresupConfTipoBack ${condicion} '/presupunid'
    GROUP BY PresupConfTipoDesc, PresupConfTipoImprime
    ORDER BY PresupConfTipoDesc`;
    const [result] = await conexionpool.query(q1, [PresupConfTipoAnexoSN, lectura]);
    return res.json(result);
  } catch (err) {
    console.error("Error en el proceso:", err);
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});

export default router;
