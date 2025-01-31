var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupdesfac");
  } else {
    console.log("no se conecto en presupdesfac");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0.00, StkRubroAbrP = '', largo = 0, valorMOTmup = 0.00, impunion = 0.00, imprecorte = 0.00, importeMOTtotal = 0.00, coefMOT = 0.00
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }


      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        largo = datos.largo
        detallep = datos.detallep
        anchoenv = datos.ancho
        ivasn = datos.ivasn;
        cantpanos = (datos.largo / 1.5)
        ancho = (datos.ancho * 1) + 0.28
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
          coefMOT = result[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin
          coefMOT = result[0].coefMOTmin
        }

        valorMOTmup = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segsolpu
        valorMOTrecorte = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segpurecorte
        valorMOTfajas = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segsolfaja
        if ((cantpanos - Math.trunc(cantpanos)) > 0) {
          impunion = ((((Math.trunc(cantpanos))) * ancho + 0.75)) * valorMOTmup
          cantpanos = Math.trunc(cantpanos) + 1
        }
        else {
          impunion = ((cantpanos - 1) * ancho) * valorMOTmup
        }

        imprecorte = ancho * valorMOTrecorte
        impsolfaja = largo * valorMOTfajas * 2
        importeMOTtotal = impunion + imprecorte + impsolfaja
        if (detallep == '') {
          detalle = "Lona enrollable para destape fácil : "
        }
        else {
          detalle = detallep + ' '
        }
        q = ['Select',
          'StkRubroDesc, StkRubroAbr, ',
          '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
          ' * ', cantpanos,
          ' * ', ancho, ' ) + ' + importeMOTtotal + ') as ImpUnitario, ',
          // ' * ', largo, ' ) + ' + importeMOTtotal + ') as ImpItem, ',

          'StkRubroCosto,',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join(' ')
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              result[0].Detalle = detalle
              result[0].Largo = largo
              result[0].Ancho = anchoenv
              result[0].MDesc = 'S'

              if (ivasn == 'CIVA') {
                result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
              }
              else {
                result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
              }
              // if (ivasn == 'CIVA') {
              //   result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
              // }
              // else {
              //   result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) / 1.21
              // }
              datosenvio.push(result)
              i++
              if (i === totalreg) {
                res.json(datosenvio)
                datosenvio = []
              }
            }
          })
      })
    });
});


conexion.end
module.exports = router;