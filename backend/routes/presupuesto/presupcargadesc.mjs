import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';
//var param = require('../parametros')

var datosenvio = []

router.get('/', (req, res, next) => {
  var q, i = 0
  var cantidad = 0, StkRubroAbrP = '', datosrec, totalreg, ivasn
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
              result[0].ImpItem = datos.importe;
              result[0].ImpUnitario = datos.importe;
              if (StkRubroAbrP === 'PUNT') {
                result[0].Detalle = datos.detaller
              } else {
                result[0].Detalle = datos.detaller + ' en: '
              }
              result[0].Largo = 0
              result[0].Ancho = 0
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
export default router;