var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
var dateFormat = require('dateformat');
var moment = require("moment");
moment.locale("es");
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsleedetalles");
  } else {
    console.log("no se conecto en stkitemsleedetalles");
  }
});

var router = express();

router.get("/", async function (req, res, next) {
  var now = new Date();
  var q = [
    "select idStkItems, StkItemsGrupo, StkItemsRubroAbr,  StkGrupo.StkGrupoDesc,",
    "StkItemsRubro, StkRubro.StkRubroDesc, StkItemsDesc,  StkItemsOTD, StkItemsCantidad, StkItemsCantDisp,",
    ' date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct,  ',
    ' StkItemsMin, StkItemsMax ',
    // ' StkItemsFAct, StkItemsMin, StkItemsMax ',
    " from StkItems, StkGrupo, StkRubro where ",
    "(StkItems.StkItemsGrupo = StkGrupo.idStkGrupo) and ",
    "(StkItems.StkItemsRubro = StkRubro.idStkRubro) and ",
    "(StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)"
  ].join("");
  conexion.query(
    q,
    //'select idStkItems, StkItemsGrupo, StkItemsRubroAbr,  StkGrupo.StkGrupoDesc,StkItemsRubro, StkRubro.StkRubroDesc, StkItemsDesc, StkItemsCantidad, StkItemsCantDisp, date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct,  StkItemsMin, StkItemsMax  from StkItems, StkGrupo, StkRubro where (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo) and (StkItems.StkItemsRubro = StkRubro.idStkRubro) and (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)',

    //  conexion.query('Select idStkItems, StkGrupo.StkGrupoDesc, StkRubro.StkRubroDesc, StkItemsDesc, StkItemsCantidad, StkItemsFAct, StkItemsMin,StkItemsMax,StkItemsObserv  from StkItems, StkGrupo, StkRubro where StkItemsGrupo = StkGrupo.idStkGrupo and StkItemsRubro = StkRubro.idStkRubro',
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
