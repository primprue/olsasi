var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupfajas");
  } else {
    console.log("no se conecto en presupfajas");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {

  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00
  var enteroancho = 0, decimancho = 0.00
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        StkRubroAbrP = datos.StkRubroAbr;
        detallep = datos.detallep
        ivasn = datos.ivasn;
        largo = datos.largo * 1 + 0.12
        ancho = datos.ancho * 1 + 0.12
        minutosunion = ancho * largo * 5
        enteroancho = Math.trunc(ancho / 1.50)
        decimancho = (ancho / 1.5) - enteroancho
        if (decimancho < 0.50) {
          ancho = enteroancho + 0.50
        }
        else {
          ancho = enteroancho + 1
        }
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
        }
        else {
          coeficiente = result[0].coeficientemin
        }


        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
          coefMOT = result[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin
          coefMOT = result[0].coefMOTmin
        }

        valorMOTmin = result[0].costoMOT * coefMOT / 60
        MOTarmado = valorMOTmin * minutosunion

        q = ['Select ',
          'StkRubroDesc, StkRubroAbr, ',
          '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
          ' * ', ancho,
          ' * ', largo, ')',
          ' + ', MOTarmado,
          ' ) as ImpUnitario, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')

        if (detallep == '') {
          detalle = "Lona con fajas en el perímetro en : "
        }
        else {
          detalle = detallep + ' '
        }
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              result[0].Detalle = detalle
              result[0].Largo = (datos.largo * 1).toFixed(2)
              result[0].Ancho = (datos.ancho * 1).toFixed(2)

              if (ivasn == 'CIVA') {
                result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
                // result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
              }
              else {
                result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
                // result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) / 1.21
              }
              result[0].MDesc = 'S'
              datosenvio.push(result)
              i++
              if (i === totalreg) {
                res.json(datosenvio)
                datosenvio = []
              }
            }
          })
      })
    })
});


conexion.end
module.exports = router;