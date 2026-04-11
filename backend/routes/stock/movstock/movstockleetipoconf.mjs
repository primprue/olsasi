import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  try {
    //SET @numero=0; 
    const q = `
    SELECT @numero:=@numero+1 as NroConfTipo, 
    PresupConfTipoDesc, PresupConfTipoImprime FROM BasePresup.PresupConfTipo,
    (SELECT @numero := 0) AS init
    where PresupConfTipoBack <> \'\' group by PresupConfTipoDesc, PresupConfTipoImprime 
     order by PresupConfTipoDesc`
    const [result] = await conexionpool.query(q);
    return res.json(result);
  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores específicos de SQL
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Clave duplicada" });
    }
    if (err.errno === 1406) {
      return res.status(410).json({ message: "Dato demasiado largo para una columna" });
    }

    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});

export default router;
