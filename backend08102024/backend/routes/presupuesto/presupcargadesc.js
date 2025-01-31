var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
//var param = require('../parametros')

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupcargadesc");
  } else {
    console.log("no se conecto en presupcargadesc");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = ''
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length
      ivasn = datosrec[0].ivasn;
      datosrec.map((datos) => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        q = ['Select',
          'StkRubroDesc, StkRubroAbr ',
          'from BaseStock.StkRubro ',
          'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
        ].join(' ')
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              // result[0].ImpItem = datos.largo;
              // result[0].ImpUnitario = datos.largo;
              result[0].ImpItem = datos.importe;
              result[0].ImpUnitario = datos.importe;
              if (StkRubroAbrP === 'PUNT') {
                result[0].Detalle = datos.detaller
              } else {
                result[0].Detalle = datos.detaller + ' en: '
              }
              result[0].Largo = 0
              result[0].Ancho = 0
              // result[0].MDesc = 'S'
              datosenvio.push(result)
              i++
              if (i === totalreg) {
                res.json(datosenvio)
                datosenvio = []
              }
              //}
            }
          })
      })
      // })
    })
});


conexion.end
module.exports = router;