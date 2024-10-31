import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupunid");
  } else {
    console.log("no se conecto en presupunid");
  }
});

var datosenvio = []

router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = ''
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      var datosrec = JSON.parse(req.query.datoscalculo)

      var totalreg = datosrec.length
      var ivasn = datosrec[0].ivasn;
      datosrec.map((datos) => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;

        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin
        }
        q = ['Select',
          'StkRubroDesc, StkRubroAbr, ',
          '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ' ) as ImpUnitario, ',
          '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ' * ', cantidad, ' ) as ImpItem, ',
          'StkRubroCosto,',
          'StkMonedasCotizacion, ',
          'StkRubroUM ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ',
          'reparacion.parametrosrep ',
          'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
          'and StkRubro.StkRubroTM = idStkMonedas',
        ].join(' ')

        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              if (ivasn == 'CIVA') {
                result[0].ImpItem = result[0].ImpItem.toFixed(0)
                result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
              }
              else {
                result[0].ImpItem = result[0].ImpItem.toFixed(0) / 1.21
                result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) / 1.21
              }

              result[0].Detalle = ""
              result[0].Largo = 0
              result[0].Ancho = 0
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
export default router;