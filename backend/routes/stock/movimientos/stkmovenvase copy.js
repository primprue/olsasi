var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkmvenvase");
  } else {
    console.log("no se conecto en stkmvenvase");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function(req, res, next) {
  //?:id/?:id2
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;
  var envase = req.query.envase;
  var q;
  var cantidad = req.body.cantidad2;
  var cantidad1 = req.body.cantidad3;
  var cantmod = cantidad * cantidad1 * -1;
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var StkItemsFAct = finalDate;
  // Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1

  q = [
    "UPDATE StkEnvase",
    "SET StkEnvaseCant = (StkEnvaseCant + " + cantmod,
    '), StkEnvaseFechaAct = "' + StkItemsFAct,
    '" WHERE  idStkEnvase = ' + envase,
    " and StkEnvaseItem = " + idStkItems,
    " and  StkEnvaseGrupo = " + StkItemsGrupo,
    " and  StkEnvaseRubro = " + StkItemsRubro
  ].join(" ");

  // 'UPDATE StkEnvase SET StkEnvaseCant = (StkEnvaseCant + ' + cantmod +
  //                                  '), StkEnvaseFechaAct = "'+ StkItemsFAct +
  //                                   '" WHERE  idStkEnvase = ' + envase + ' and StkEnvaseItem = ' + idStkItems + ' and  StkEnvaseGrupo = ' + StkItemsGrupo + ' and  StkEnvaseRubro = ' + StkItemsRubro,
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
