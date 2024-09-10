var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var dateFormat = require('dateformat');
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en otrengleerpot");
  } else {
    console.log("no se conecto en otrengleerpot");
  }
});
var router = express();

router.get("/", function (req, res, next) {

  var nrobusca = req.query.id;
  var q = ["SELECT OTRenglonNro as id,  idOTRenglonNroOT, OTRenglonNro, OTRenglonCant, ",
    "OTRenglonDesc, OTRenglonLargo, OTRenglonAncho, OTRenglonImpItem, OTRenglonDetalles ",
    "FROM BasesOrdenes.OTRenglon where idOTRenglonNroOT = " + nrobusca].join(" ");

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



