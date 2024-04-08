var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

var http = require("http");
conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkenvaseleeimp");
  } else {
    console.log("no se conecto en stkenvaseleeimp");
  }
});

/*
idStkItems
*/

var router = express();

router.get("/", function(req, res, next) {
  StkEnvaseUbG = req.query.id;
  // 'select idStkEnvase, StkEnvaseGrupo, StkEnvaseRubro, StkEnvaseItem, StkGrupo.StkGrupoDesc,  StkRubro.StkRubroDesc, StkItems.StkItemsDesc, StkEnvasePartida, StkEnvaseUbG, StkEnvaseUbF,  date_format(StkEnvaseFechaAct, "%d-%m-%Y") as stkenvasefecha, StkEnvaseCant, StkEnvaseImprimio, StkEnvaseObserv  from StkEnvase, StkItems, StkGrupo, StkRubro' +
  // ' where (StkEnvase.StkEnvaseGrupo = StkGrupo.idStkGrupo)' +
  // ' and (StkEnvase.StkEnvaseRubro = StkRubro.idStkRubro)' +
  // ' and (StkEnvase.StkEnvaseItem = StkItems.idStkItems)' +
  // ' and (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)' +
  // ' and (StkItems.StkItemsRubro = StkRubro.idStkRubro)' +
  // ' and (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo)' +
  // ' and StkEnvaseImprimio = "N"' +
  // ' and StkEnvaseUbG = "' + StkEnvaseUbG + '"',
  var q = [
    "SELECT idStkEnvase,",
    "StkEnvaseGrupo,",
    "StkEnvaseRubro,",
    "StkEnvaseItem,",
    "StkGrupo.StkGrupoDesc,",
    "StkRubro.StkRubroDesc,",
    "StkItems.StkItemsDesc,",
    "StkEnvasePartida,",
    "StkEnvaseUbG,",
    "StkEnvaseUbF,",
    'date_format(StkEnvaseFechaAct, "%d-%m-%Y") as stkenvasefecha,',
    "StkEnvaseCant,",
    "StkEnvaseImprimio,",
    "StkEnvaseObserv",
    "from StkEnvase, StkItems, StkGrupo, StkRubro",
    "where (StkEnvase.StkEnvaseGrupo = StkGrupo.idStkGrupo)",
    "and (StkEnvase.StkEnvaseRubro = StkRubro.idStkRubro)",
    "and (StkEnvase.StkEnvaseItem = StkItems.idStkItems)",
    "and (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)",
    "and (StkItems.StkItemsRubro = StkRubro.idStkRubro)",
    "and (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo)",
    'and StkEnvaseImprimio = "N"',
    'and StkEnvaseUbG = "' + StkEnvaseUbG + '"'
  ].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
conexion.end;
module.exports = router;
