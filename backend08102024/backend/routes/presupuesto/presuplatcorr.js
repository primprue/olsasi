var express = require('express');
var router = express.Router();
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuplatcorr");
  } else {
    console.log("no se conecto en presuplatcorr");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00, paniotirasi5070 = 0.00

  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      var costooriginal = 0;
      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length
      datosrec.map(datos => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        detallep = datos.detallep
        ivasn = datos.ivasn;
        ancho = datos.ancho * 1
        cantHeb = datos.cantHeb * 1
        tipoheb = datos.tipoheb
        cantCarro = datos.cantCarro * 1
        cantPlaca = datos.cantPlaca * 1
        tipoplaca = datos.tipoplaca
        tipocarro = datos.tipocarro
        largo = (datos.largo * 1)
        largocalc = (datos.largo * 1) + 0.40
        colocacion = datos.colocacion;


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
        let minutosarmado = 0
        //se calculan 50 minutos por metro de largo para hacer la lona, y 60 minutos para colocacion
        minutosarmado = colocacion ? (largo * 60) + 60 : (largo * 60)
        MOTarmado = minutosarmado * valorMOTmin

        if (detallep == '') {
          detalle = "Confección de lona para lateral corredizo de " + largo + " x " + ancho
          if (cantHeb != 0) {
            detalle = detalle + " con  " + cantHeb + " hebillas "
          }
          if (cantCarro != 0) {
            if (cantHeb != 0) {
              detalle = detalle + " y " + cantCarro + " carros "
            } else {
              detalle = detalle + " con " + cantCarro + " carros "
            }
          }
          if (colocacion) {
            detalle = detalle + " (incluye colocación)"
          }
          detalle = detalle + ' en : '
        }

        else {
          detalle = detallep + ''
        }

        if (cantHeb != 0) {
          valorheb = ['Select ',
            ' StkRubroAbr,  ',
            '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            ' * ', cantHeb, ') as valorhebillas, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
            'where StkRubro.StkRubroAbr = "', tipoheb, '" ',
            'and StkRubro.StkRubroTM = idStkMonedas '
          ].join('')

          valorplaheb = ['Select ',
            ' StkRubroAbr,  ',
            '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            ' * ', cantHeb, ') as valorplacaheb, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
            'where StkRubro.StkRubroAbr = "', 'AL022', '" ',
            'and StkRubro.StkRubroTM = idStkMonedas '
          ].join('')
        }
        // }
        //cinta de refuerzo en I5070
        paniotirasi5070 = Math.ceil(Math.ceil((largo / 0.75) * 2) + largo) / 1.5
        valorind = ['Select ',
          // ' StkRubroAbr,  ',
          '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
          ' * 0.08 * ', paniotirasi5070, ') as valorindust, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', 'I5070', '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')

        if (cantCarro != 0) {
          valcarro = ['Select ',
            ' StkRubroAbr,  ',
            '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            ' * ', cantCarro, ') as valorcarros, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
            'where StkRubro.StkRubroAbr = "', tipocarro, '" ',
            'and StkRubro.StkRubroTM = idStkMonedas '
          ].join('')
        }
        if (cantPlaca != 0) {
          valorplaca = ['Select ',
            ' StkRubroAbr,  ',
            '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            ' * ', cantPlaca, ') as valorplacas, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
            'where StkRubro.StkRubroAbr = "', tipoplaca, '" ',
            'and StkRubro.StkRubroTM = idStkMonedas '
          ].join('')
        }
        valortela = ['Select ',
          'StkRubroDesc, StkRubroAbr, ',
          '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
          ' * ', 2,
          ' * ', largocalc, ')',
          ' + ', MOTarmado, ')',
          ' as ImpUnitario, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')
        /////////////////////////////////////////////////

        conexion.query(
          valortela,
          function (err, result) {
            if (err) {
              console.log('error en mysql valortela')
              console.log(err)
            }
            else {
              costooriginal = costooriginal + result[0].ImpUnitario
              datosenvio.push(result);
            }
          })
        if (cantHeb !== 0) {
          conexion.query(
            valorheb,
            function (err, result) {
              if (err) {
                console.log('error en mysql valorheb')
                console.log(err)
              }
              else {
                costooriginal = costooriginal + result[0].valorhebillas
                datosenvio.push(result);
              }
            });
        }
        conexion.query(
          valorplaheb,
          function (err, result) {
            if (err) {
              console.log('error en mysql valorplaheb')
              console.log(err)
            }
            else {
              costooriginal = costooriginal + result[0].valorplacaheb
              datosenvio.push(result);
            }
          });
        if (cantCarro != 0) {
          conexion.query(
            valcarro,
            function (err, result) {
              if (err) {
                console.log('error en mysql valcarro')
                console.log(err)
              }
              else {
                costooriginal = costooriginal + result[0].valorcarros
                datosenvio.push(result);
              }
            })
        }
        if (cantPlaca != 0) {
          conexion.query(
            valorplaca,
            function (err, result) {
              if (err) {
                console.log('error en mysql valorplaca')
                console.log(err)
              }
              else {
                costooriginal = costooriginal + result[0].valorplacas
                datosenvio.push(result);
              }
            })
        }
        conexion.query(
          valorind,
          function (err, result) {
            if (err) {
              console.log('error en mysql en valorind')
              console.log(err)
            }
            else {
              costooriginal = costooriginal + result[0].valorindust
              datosenvio.push(result);
            }



            if (ivasn == 'CIVA') {
              costooriginal = Math.ceil(costooriginal.toFixed(0) / 10) * 10
            }
            else {
              costooriginal = Math.ceil(costooriginal.toFixed(0) / 1.21 / 10) * 10
            }
            datosenvio[0][0]['ImpUnitario'] = costooriginal
            datosenvio[0][0]['Detalle'] = detalle
            datosenvio[0][0]['Largo'] = (largo * 1).toFixed(2)
            datosenvio[0][0]['Ancho'] = (ancho * 1).toFixed(2)

            datosenvio[0][0]['MDesc'] = 'S'
            costooriginal = 0;
            res.json(datosenvio);
            datosenvio = [];
          })
      })
    })

})



conexion.end
module.exports = router;