var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
//creado para Ordenes de Trabajo
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconfgrp");
  } else {
    console.log("no se conecto en stkrubroleerconfgrp ");
  }
});


var router = express();
router.get("/", async function (req, res, next) {
  StkRubroCodGrp = req.query.StkRubroCodGrp;


  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc. por eso trae el grupo
  // if (cuallee === 'T') {
  // var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  // }
  // else {
  //   var q = ["Select StkRubroDesc, StkRubroAbr, StkItemsDesc from StkRubro, StkItems where StkRubroConf = '" + cuallee + "' and StkRubroCodGrp = '" + StkRubroCodGrp + "' and StkItemsRubroAbr = StkRubroAbr  order by StkRubroDesc"].join("");
  // }
  //SELECT * FROM BaseStock.StkItems where StkItemsGrupo = 1 AND StkItemsRubroAbr = 'ST840';
  // if (abr === 'undefined') {
  //   var q = ["Select StkRubroDesc, StkRubroAbr, StkItemsDesc, idStkItems from StkRubro, StkItems where  StkRubroCodGrp = '" + StkRubroCodGrp + "' and StkItemsRubroAbr = StkRubroAbr  order by StkRubroDesc"].join("");
  // }
  // else {
  var q = ["Select StkRubroDesc, StkRubroAbr, StkItemsDesc, idStkItems from StkRubro, StkItems where  StkRubroCodGrp = '" + StkRubroCodGrp + "' and StkItemsOTD = 'S'  and StkItemsRubroAbr = StkRubroAbr  order by StkRubroDesc"].join("");
  // }


  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
