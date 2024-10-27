import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../conexion.mjs";
//var mysql = require('mysql');

//   
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en otcondpagomodificar");
  } else {
    console.log("no se conecto en otcondpagomodificar");
  }
});




router.post("/?:id", function (req, res) {
  var indice = req.params.id;
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

export default router;
