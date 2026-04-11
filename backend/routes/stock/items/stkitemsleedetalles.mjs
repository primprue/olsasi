import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  try {
    const q = `select concat(idStkItems, StkItemsGrupo, StkItemsRubroAbr) as id,
    idStkItems,StkItemsGrupo, StkItemsRubroAbr, StkItemsDesc,  StkItemsOTD, StkItemsCantidad, StkItemsCantDisp,
    date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct,  StkItemsMin, StkItemsMax
    from StkItems, StkGrupo, StkRubro where
    (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo) and
     (StkItems.StkItemsRubro = StkRubro.idStkRubro) and
     (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)
    order by  StkGrupo.StkGrupoDesc, StkRubro.StkRubroDesc`;
    const [result] = await conexionpool.query(q);
    return res.json(result);
  }
  catch (err) {
    console.error("Error en el proceso:", err);
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});


export default router;
