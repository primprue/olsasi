var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
//var mysql = require('mysql');

//var router = express();
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en transportemodificar");
  } else {
    console.log("no se conecto en transportemodificar");
  }
});
var router = express();



router.post("/?:id", function (req, res) {
  indice = req.params.id;
  var transdesc = req.body.TransporteDesc;
  var transtel1 = req.body.TransporteTel1;
  var transtel2 = req.body.TransporteTel2;
  var transwa = req.body.TransporteWA;
  var transnromail = req.body.TransporteMail;
  var transdom = req.body.TransporteDom;
  var transloc = req.body.TransporteLoc;
  var transdestino = req.body.TransporteDestino;
  var transobser = req.body.TransporteObser;
  var q = [
    'update BasesGenerales.Transporte set TransporteDesc = "',
    transdesc,
    '" , TransporteTel1 = "',
    transtel1,
    '" ,  TransporteTel2 = "',
    transtel2,
    '" , TransporteWA = "',
    transwa,
    '" , TransporteMail = "',
    transnromail,
    '" , TransporteDom = "',
    transdom,
    '" , TransporteLoc = "',
    transloc,
    '" , TransporteDestino = "',
    transdestino,
    '" , TransporteObser = "',
    transobser,
    '" where idTransporte = ',
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
