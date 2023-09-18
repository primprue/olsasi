var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkitemslistaprecios");
  } else {
    console.log("no se conecto en stkitemslistaprecios");
  }
});

var router = express();

router.get("/", async function(req, res, next) {
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;

  var q = [
    "Select StkItemsDesc, StkItemsCantDisp, StkItemsCantidad from StkItems where StkItemsGrupo  = ",
    StkItemsGrupo,
    " and  StkItemsRubro  = ",
    StkItemsRubro
  ].join(" ");

  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
