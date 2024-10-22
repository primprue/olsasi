var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en repleevalorhs");
  } else {
    console.log("no se conecto en repleevalorhs");
  }
});

var datosenvio = []

router.get('/', (req, res, next) => {
  var q
  var costhora = 0.00, coefMOTmay = 0.00, coefMOTmin = 0.00, minlonanues = 0.00, minlonaafuera = 0.00

  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      costhora = result[0].costoMOT
      coefMOTmay = result[0].coefMOTmay
      coefMOTmin = result[0].coefMOTmin
      minlonanues = costhora * coefMOTmay
      minlonaafuera = costhora * coefMOTmin
      datosenvio.push(minlonanues)
      datosenvio.push(minlonaafuera)

      res.json(datosenvio)
      datosenvio = []
    })
});


conexion.end
module.exports = router;