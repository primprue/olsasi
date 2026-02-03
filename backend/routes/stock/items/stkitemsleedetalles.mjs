import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';
import moment from "moment";
moment.locale("es");


router.get("/", async function (req, res, next) {
  var now = new Date();
  var q = [
    "select concat(idStkItems, StkItemsGrupo, StkItemsRubroAbr) as id, ",
    " idStkItems, ",
    " StkItemsGrupo, StkItemsRubroAbr, ",
    " StkItemsDesc,  StkItemsOTD, StkItemsCantidad, StkItemsCantDisp,",
    ' date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct,  ',
    ' StkItemsMin, StkItemsMax ',
    " from StkItems, StkGrupo, StkRubro where ",
    "(StkItems.StkItemsGrupo = StkGrupo.idStkGrupo) and ",
    "(StkItems.StkItemsRubro = StkRubro.idStkRubro) and ",
    "(StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)",
    "order by  StkGrupo.StkGrupoDesc, StkRubro.StkRubroDesc",
  ].join("");
  conexion.query(
    q,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

export default router;
