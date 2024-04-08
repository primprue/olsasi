var express = require('express');
const { isEmpty } = require('lodash');
var router = express.Router();
var path = require('path');
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
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00
  var enteropanios = 0, decimalpanios = 0.00, altovolado = 0.00, fajade = ''
  var vhebilla = 0.00, vplaca = 0.00, vhebpla = 0.00

  q = ['select * from BasePresup.PresupParam'].join(' ')

  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        console.log('datos  ', datos)
        /*
         StkRubroAbr: 'ST840',
  minmay: 'mn',
  ivasn: 'CIVA',
  cantidad: 1,
  largo: '5',
  ancho: '2',
 cantHeb: '5',
  tipocarro: 'AL012',
  tipoheb: 'AL024',
  colocacion: true,
  tipopresup: 'LATERAL CORREDIZO'
        */

        cantidad = datos.cantidad;

        // tamcristal = datos.tamcristal
        // StkRubroAbrP = datos.StkRubroAbr;
        detallep = datos.detallep
        ivasn = datos.ivasn;
        ancho = datos.ancho * 1
        cantHeb = datos.cantHeb * 1
        tipoheb = datos.tipoheb
        cantCarro = datos.cantCarro * 1
        tipocarro = datos.tipocarro
        largo = datos.largo * 1

        // if (datos.tamfaja === '25P') {
        //   fajade = ' c/faja p/2"1/2 '
        //   largo = largo + 0.10
        // } else { fajade = ' c/faja p/2" ' }


        // q2 = ['Select StkRubroAncho as anchotela from BaseStock.StkRubro where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" '].join(' ')

        // conexion.query(q2,
        //   function (err, result2) {
        //     if (err) {
        //       console.log(err);
        //     }
        //     var anchotela = result2[0].anchotela


        //     enteropanios = Math.trunc(ancho / anchotela)


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

        //     decimalpanios = (ancho / anchotela) - enteropanios
        //     if (decimalpanios < 0.5) {
        //       panios = enteropanios + 0.50
        //     }
        //     else {
        //       panios = enteropanios + 1
        //     }


        //     if (altovolado == 0) {
        //       MOTarmado = ancho * 40 * valorMOTmin
        //       largo = largo + 0.44
        //     }
        //     else {
        //       MOTarmado = ancho * 60 * valorMOTmin
        //       largo = largo + 0.44 + (altovolado / 100)
        //     }



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

          console.log('valorheb  ', valorheb)
          conexion.query(
            valorheb,
            function (err, valorhebillas) {
              if (err) {
                console.log('error en mysql')
                console.log(err)
              }
              else {
                vhebilla= valorhebillas
                console.log('valorhebillas  ', valorhebillas)
                datosenvio.push(valorhebillas);
              }
            });
        }

        if (cantHeb != 0) {
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

          console.log('valorplaheb  ', valorplaheb)
          conexion.query(
            valorplaheb,
            function (err, valorplacaheb) {
              if (err) {
                console.log('error en mysql')
                console.log(err)
              }
              else {
                vplaca = valorplacaheb
                console.log('valorplacaheb adentro ', valorplacaheb)
                datosenvio.push(valorplacaheb);
              }
            });
            vhebpla = vhebilla +  vplaca
            console.log('vplaca afuera  ', vplaca)
            console.log('vhebpla  ', vhebpla)
        }
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


          conexion.query(
            valcarro,
            function (err, valorcarros) {
              if (err) {
                console.log('error en mysql')
                console.log(err)
              }
              else {
                datosenvio.push(valorcarros);
              }
            });
        }

        //     q = ['Select ',
        //       'StkRubroDesc, StkRubroAbr, ',
        //       '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
        //       ' * ', panios,
        //       ' * ', largo, ')',
        //       '+ ', MOTarmado, ')',
        //       ' as ImpUnitario, ',
        //       'StkRubroCosto, ',
        //       'StkMonedasCotizacion ',
        //       'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
        //       'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
        //       'and StkRubro.StkRubroTM = idStkMonedas '
        //     ].join('')

        //     if (detallep == '') {
        //       detalle = "Lona enrollable "
        //     }
        //     else {
        //       detalle = detallep + ''
        //     }
        //     conexion.query(
        //       q,
        //       function (err, result) {
        //         if (err) {
        //           console.log('error en mysql')
        //           console.log(err)
        //         }
        //         else {
        //           if (tamcristal != 'NOPVC') {
        //             result[0].Detalle = detalle + fajade + ", Cristal de " + datosenvio[0][0].StkRubroAncho + ", marco de " + datos.sobrantemarco + " cm. en los costados, y volado de " + altovolado + " cm. en : "
        //             result[0].ImpUnitario = result[0].ImpUnitario + datosenvio[0][0].ArmadoCristal
        //           }
        //           else {
        //             if (altovolado != 0) {
        //               result[0].Detalle = detalle + " con volado de " + altovolado + " cm. en : "
        //             }
        //             else { result[0].Detalle = detalle + " en : " }
        //           }
        //           if (ivasn == 'CIVA') {
        //             result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
        //           }
        //           else {
        //             result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
        //           }
        //           result[0].Largo = (datos.largo * 1).toFixed(2)
        //           result[0].Ancho = (datos.ancho * 1).toFixed(2)
        //           datosenvio = []
        //           datosenvio.push(result)

        //           i++
        //           if (i === totalreg) {
        //             res.json(datosenvio)
        //             datosenvio = []
        //           }
        // }
        // })
        // })
        console.log('datosenvio  ', datosenvio)
      })
    })
});


conexion.end
module.exports = router;