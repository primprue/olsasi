var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppurec");
  } else {
    console.log("no se conecto en presuppurec");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0.00, StkRubroAbrP = '', largo = 0, valorMOTmup = 0.00, impunion = 0.00, imprecorte = 0.00, impcorte = 0.00, importeMOTtotal = 0.00, coefMOT = 0.00
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
        detallep = datos.detallep
        ivasn = datos.ivasn;
        largo = datos.largo
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
          coefMOT = result[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin
          coefMOT = result[0].coefMOTmin
        }


        q2 = ['Select StkRubroAncho as anchotela from BaseStock.StkRubro where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" '].join(' ')
        conexion.query(q2,
          function (err, result2) {
            if (err) {
              console.log(err);
            }
            var anchotela = result2[0].anchotela

            // if (datos.minmay == 'my' || StkRubroAbrP == 'PLURI') {
            valorMOTmup = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segsolpu
            valorMOTrecorte = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segpurecorte
            valorMOTcorte = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segpurecorte
            if ((cantidad - Math.trunc(cantidad)) > 0) {
              // impunion = ((((Math.trunc(cantidad))) * largo + 0.75)) * valorMOTmup
              impunion = ((((Math.trunc(cantidad))) * largo + (anchotela / 2))) * valorMOTmup
              impcorte = (cantidad + 1) * valorMOTcorte
            }
            else {
              impunion = ((cantidad - 1) * largo) * valorMOTmup
              impcorte = cantidad * valorMOTcorte
            }


            imprecorte = largo * valorMOTrecorte
            importeMOTtotal = impunion + imprecorte + impcorte
            // }
            // if (datos.minmay == 'mn')
            // else {

            //   importeMOTtotal = 0
            // }
            q = ['Select',
              'StkRubroDesc, StkRubroAbr, ',
              '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
              ' * ', cantidad,
              ' * ', largo, ' ) + ' + importeMOTtotal + ') as ImpUnitario, ',
              // ' * ', largo, ' ) + ' + importeMOTtotal + ') as ImpItem, ',
              'StkRubroAncho as Ancho, ',
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
                  // if (ivasn == 'CIVA') {
                  //   result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
                  // }
                  // else {
                  //   result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) / 1.21
                  // }
                  if (ivasn == 'CIVA') {
                    result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
                  }
                  else {
                    result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
                  }
                  // result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
                  callargo = cantidad * result[0].Ancho
                  anchoreal = (largo * 1).toFixed(2)
                  if (detallep == '') {
                    detalle = "Paños Unidos de ( " + callargo.toFixed(2) + ' x ' + anchoreal + " )  Recortados en : "
                  }
                  else {
                    detalle = detallep + ' '
                  }

                  // result[0].Detalle = "Paños Unidos de ( " + callargo.toFixed(2) + ' x ' + anchoreal + " )  Recortados en : "
                  result[0].Detalle = detalle
                  result[0].Largo = largo
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

      });
    });
});


conexion.end
module.exports = router;