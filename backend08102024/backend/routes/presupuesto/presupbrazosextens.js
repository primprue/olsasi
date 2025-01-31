var express = require('express');
const { isEmpty } = require('lodash');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupbrazosextens");
  } else {
    console.log("no se conecto en presupbrazosextens");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {

  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00
  var enteropanios = 0, decimalpanios = 0.00, altovolado = 0.00, abrevmotor = '', detallemotor = ''
  var stkrubroabrtbr = ''
  q = ['select * from BasePresup.PresupParam'].join(' ')

  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        //  cantidad = datos.cantidad;
        tipomecanismo = datos.tipomecanismo;
        stkrubroabrtbr = datos.stkrubroabrtbr;
        StkRubroAbrP = datos.StkRubroAbr;
        detallep = datos.detallep;
        ivasn = datos.ivasn;
        largo = datos.largo * 1
        ancho = datos.ancho * 1 + 0.08
        altovolado = datos.altovolado * 1
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

        if (largo <= 1.60) {
          MOTarmado = 44 * ancho

        }
        else if (largo > 1.60 && largo <= 2.60) {
          MOTarmado = 55 * ancho
        }
        else {
          MOTarmado = 65 * ancho
        }

        if (altovolado === 0) {
          //   MOTarmado = MOTarmado - 15
          largo = largo + 0.5
        }
        else {
          largo = largo + 0.70 + (altovolado / 100) //agrego .5 del toldo + .2 del volado para doblar
          MOTarmado = MOTarmado + (17 * ancho)
        }

        valorMOTmin = result[0].costoMOT * coefMOT / 60


        decimalpanios = (ancho / 1.5) - enteropanios
        if (decimalpanios > 0) {

          panios = enteropanios + 1
        }



        /*El valor de los brazos y caños correspondientes, por abreviatura  */
        /*decidir si tiene compensador o no, como es*/
        /*decidir cantidad de brazos */
        /*
                MOTOR 30 NW S/AYUDA MANUAL		AT047		
                MOTOR 50 NW S/AYUDA MANUAL		AT048		
                MOTOR 30 NW C/AYUDA MANUAL		AT049		
                MOTOR 50 NW C/AYUDA MANUAL		AT050		
                MOTOR 30 NW C/CONTROL REMOTO		AT051	
                MOTOR 50 NW C/CONTROL REMOTO		AT052
        */


        valortoldobarrac = ['Select ',
          ' StkRubroAbr,  ',
          '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
          ' * 1 )',
          ' as ValorToldoBarrac, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', stkrubroabrtbr, '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')



        conexion.query(
          valortoldobarrac,
          function (err, resulttbr) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              // datosenvio.push(resulttbr);
              importetbr = resulttbr[0].ValorToldoBarrac
            }

            switch (tipomecanismo) {
              case "MotorCT":
                abrevmotor = 'AT048'
                detallemotor = 'con tecla'
                break;
              case "MotorCC":
                abrevmotor = 'AT052'
                detallemotor = 'con control remoto'
                break;
              default:
                abrevmotor = ''
            }



            if (abrevmotor != '') {

              valormotor = ['Select ',
                ' StkRubroAbr,  ',
                '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
                ' * 1 )',
                ' as ValorMotor, ',
                'StkRubroCosto, ',
                'StkMonedasCotizacion ',
                'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
                'where StkRubro.StkRubroAbr = "', abrevmotor, '" ',
                'and StkRubro.StkRubroTM = idStkMonedas '
              ].join('')


              conexion.query(
                valormotor,
                function (err, resultmecanismo) {
                  if (err) {
                    console.log('error en mysql')
                    console.log(err)
                  }
                  else {
                    importemecanismo = resultmecanismo[0].ValorMotor
                  }
                });
            }

            /* busca valor de toldo barracuadra */



            q = ['Select ',
              'StkRubroDesc, StkRubroAbr, ',
              '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
              ' * ', panios,
              ' * ', largo, ')',
              // '+ ', MOTarmado, ')',
              ' as ImpUnitario, ',
              'StkRubroCosto, ',
              'StkMonedasCotizacion ',
              'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
              'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
              'and StkRubro.StkRubroTM = idStkMonedas '
            ].join('')



            if (detallep == '') {
              detalle = "Toldo Barracuadra "
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


                  result[0].ImpUnitario = result[0].ImpUnitario + importetbr
                  result[0].ImpUnitario = result[0].ImpUnitario + (valorMOTmin * MOTarmado)



                  if (tipomecanismo != 'Manual') {
                    result[0].Detalle = detalle + " con Motor  " + detallemotor + "  y volado de " + altovolado + " cm. en : "
                    result[0].ImpUnitario = result[0].ImpUnitario + importemecanismo
                  }
                  else {
                    if (altovolado != 0) {
                      result[0].Detalle = detalle + " con volado de " + altovolado + " cm. en : "
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
                }
              })
          })
      })
    })
});


conexion.end
module.exports = router;