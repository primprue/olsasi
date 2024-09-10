var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
//var mysql = require('mysql');

//var router = express();
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en otcondpagomodificar");
  } else {
    console.log("no se conecto en otcondpagomodificar");
  }
});
var router = express();



router.post("/?:id", function (req, res) {
  indice = req.params.id;
  var otcondpagodesc = req.body.OTCondPagoDesc;

  var q = [
    'update BasesOrdenes.OTCondPago set OTCondPagoDesc = "',
    otcondpagodesc,

    '" where idOTCondPago = ',
    indice
  ].join("");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
