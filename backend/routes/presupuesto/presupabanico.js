var express = require('express');
const { isEmpty } = require('lodash');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupabanico");
  } else {
    console.log("no se conecto en presupabanico");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {

  var q, i = 0
  var coeficiente = 0, largoabanico1 = 0, largoabanico = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00
  var enteropanios = 0, telacubrecaños = 0.00, altovolado = 0.00, telavolado = 0.00, telatapas = 0.00, paniostapas = 0, telatotal = 0.00, paniosfrente = 0.00
  var minMOT1 = 0.00, minMOT2 = 0.00, minMOT3 = 0.00, minMOT4 = 0.00, minMOT5 = 0.00, minMOT6 = 0.00, minMOTtotal = 0.00


  q = ['select * from BasePresup.PresupParam'].join(' ')

  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        cantbrazos = datos.cantbrazos * 1
        largobrazo = datos.largobrazo * 1
        fajabrazo = datos.fajabrazo * 1
        altovolado = datos.altovolado * 1
        voladosd = datos.voladosd
        StkRubroAbrP = datos.StkRubroAbr;
        detallep = datos.detallep
        ivasn = datos.ivasn;
        ancho = datos.ancho * 1
        enteropanios = Math.trunc(ancho / 1.50)


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

        //calculo del largo del abanico

        largoabanico1 = (largobrazo * 2 * 3.1416) / 4
        telacubrecaños = ((((fajabrazo / 10 * 4) + 2) * (cantbrazos + 1)) / 100)
        telavolado = (altovolado / 100) + 0.15
        largoabanico = largoabanico1 + telacubrecaños + telavolado
        telatapas = (largobrazo + 0.07)
        // + (altovolado / 100)
        telatapas < 1.50 ? paniostapas = 1 : paniostapas = 2
        paniosfrente = Math.ceil(ancho / 1.5)

        telatapas = paniostapas * telatapas * 2
        telatotal = telatapas + (paniosfrente * largoabanico)


        // tiempo de cortar paños (2 min / paño)
        minMOT1 = (paniostapas * 2 + paniosfrente) * 2
        //tiempo soldar paños frente (2.5 min / metro)
        minMOT2 = ((paniosfrente - 1) * largoabanico * 2.5)
        // tiempo cortar, marcar y soldar fajas (8 min / metro faja)
        minMOT3 = ((cantbrazos + 1) * ancho) * 8
        // tiempo marcar jas (10 min / metro frente)
        minMOT4 = ancho * 10
        // tiempo hacer tapas marcar sobre el frente y soldar tapas
        minMOT5 = 120
        // tiempo volado soldar y recortar (6 min / metro)
        minMOT6 = (largobrazo * 2 + ancho) * 6
        if (voladosd === 'D') {
          (minMOT6 = minMOT6 * 2)
        }


        MOTarmado = (minMOT1 + minMOT2 + minMOT3 + minMOT4 + minMOT5 + minMOT6) * valorMOTmin

        q = ['Select ',
          'StkRubroDesc, StkRubroAbr, ',
          '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
          ' * ', telatotal, ')',
          '+ ', MOTarmado, ')',
          ' as ImpUnitario, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')

        if (detallep == '') {
          detalle = "Toldo Abanico de " + ancho + " mts. de ancho con " + cantbrazos + " brazos de " + largobrazo + " mts., faja para caño de " + fajabrazo
        }
        else {
          detalle = detallep + ''
        }
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {

              if (altovolado != 0) {
                result[0].Detalle = detalle + " y volado de " + altovolado + " cm. en : "
              }
              else { result[0].Detalle = detalle + " en : " }
            }
            if (ivasn == 'CIVA') {
              result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
            }
            else {
              result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
            }
            result[0].Largo = (datos.largo * 1).toFixed(2)
            result[0].Ancho = (datos.ancho * 1).toFixed(2)
            datosenvio = []
            datosenvio.push(result)

            i++
            if (i === totalreg) {
              res.json(datosenvio)
              datosenvio = []
            }

          })
      })
    })
});


conexion.end
module.exports = router;
