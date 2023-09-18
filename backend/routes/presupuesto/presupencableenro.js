var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var dateFormat = require('dateformat');
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupencableenro");
  } else {
    console.log("no se conecto en presupencableenro");
  }
});
var router = express();

router.get("/", function (req, res, next) {
  var indice = req.query.id;
  // var q = ["Select * from BasePresup.PresupEncab order by PresupEncabFecha "].join(" ");
  var q = ["Select * from BasePresup.PresupEncab where idPresupEncab = " + indice].join(" ");

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