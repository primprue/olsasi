import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.delete("/", async (req, res) => {
  // const indice = req.query.id;
  const params = req.query.params;
  // const idStkGrupo = params.idStkGrupo;

  try {
    const q = `delete from StkGrupo where idStkGrupo = ?`;
    await conexionpool.query(q, [params.idStkGrupo]);
    return res.status(200).json({
      leyenda: 'Grupo eliminado correctamente',
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
