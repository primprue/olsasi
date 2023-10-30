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
    "select concat(idStkItems, StkItemsGrupo, StkItemsRubroAbr)as id, idStkItems, StkItemsGrupo, StkItemsRubroAbr,  StkGrupo.StkGrupoDesc,",
    "StkItemsRubro, StkRubro.StkRubroDesc, StkItemsDesc,  StkItemsOTD, StkItemsCantidad, StkItemsCantDisp,",
    ' date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct,  ',
    ' StkItemsMin, StkItemsMax ',
    " from StkItems, StkGrupo, StkRubro where ",
    "(StkItems.StkItemsGrupo = StkGrupo.idStkGrupo) and ",
    "(StkItems.StkItemsRubro = StkRubro.idStkRubro) and ",
    "(StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)"
  ].join("");
  console.log('q stkitemsleedetalles  ', q)
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

module.exports = router;
