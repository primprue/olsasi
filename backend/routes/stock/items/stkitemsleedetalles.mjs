import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";
import dateFormat from 'dateformat';
import moment from "moment";
moment.locale("es");
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsleedetalles");
  } else {
    console.log("no se conecto en stkitemsleedetalles");
  }
});



router.get("/", async function (req, res, next) {
  var now = new Date();
  // var q = ["SET @numero=0 "].join(" ");
  // conexion.query(q, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // "select  @numero:=@numero+1 AS id, ",
  // idStkItems, StkItemsGrupo, StkItemsRubroAbr,  StkGrupo.StkGrupoDesc,StkItemsRubro, StkRubro.StkRubroDesc,
  var q = [
    "select concat(idStkItems, StkItemsGrupo, StkItemsRubroAbr) as id, ",
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
  console.log('q  ', q)
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
