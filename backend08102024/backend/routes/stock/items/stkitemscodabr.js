var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

var nroitem = 0;

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemscodabr");
  } else {
    console.log("no se conecto en stkitemscodabr");
  }
});

var datosenv = [];
router.get("/", async function (req, res) {
  var StkItemsRubroAbr = req.query.StkItemsRubroAbr;
  conexion.query('Select max(idStkItems) as UltItem from StkItems where StkItemsRubroAbr = "' + StkItemsRubroAbr + '"', function (err, result) {
    if (err) {
      console.log("error al buscar codigo de items por abreviatura en stkitemscodabr  " + err.errno);
      console.log(err);
    } else {
      datosenv.push(result);
    }
  })
  conexion.query('Select StkRubroCodGrp as StkItemsGrupo, idStkRubro as StkItemsRubro from StkRubro where StkRubroAbr = "' + StkItemsRubroAbr + '"', function (err, result) {
    if (err) {
      console.log("error al buscar codigo de grupo y rubro  en stkitemscodabr  " + err.errno);
      console.log(err);

    } else {
      datosenv.push(result);
      res.json(datosenv)
      datosenv = []
    }
  })
});

conexion.end;
module.exports = router;
