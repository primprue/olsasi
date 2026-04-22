var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppiletafca");
  } else {
    console.log("no se conecto en presuppiletafca");
  }
});

var datosenvio = [];

var router = express();
router.get("/", (req, res, next) => {
  var q,
    i = 0;
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      var costooriginal = 0;
      var coeficiente = 0,
        cantidad = 0,
        metroscuad = 0,
        StkRubroAbrP = "",
        largo = 0,
        //cantidad de minutos a cambiar hasta llegar al importe correcto de mano de obra
        minutospmc = 10,
        ancho = 0.0;
      minutosdren = 0.0;
      datosrec = JSON.parse(req.query.datoscalculo);

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        drenajesn = datos.drenajesn;
        tipoojale = datos.tipoojale;
        detallep = datos.detallep
        StkRubroAbrP = datos.StkRubroAbr;
        ivasn = datos.ivasn;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.3;
        ancho = (datos.ancho * 1) + 0.08;

        buscaancho = ['Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" '].join('')
        conexion.query(buscaancho,
          function (err, rbuscaancho) {
            if (err) {
              console.log(err);
            }

            rbuscaancho[0].AnchoTela
            calpaños = (largo / rbuscaancho[0].AnchoTela) - Math.trunc(largo / rbuscaancho[0].AnchoTela)
            if (calpaños < .50) {
              cantpaños = Math.trunc(largo / rbuscaancho[0].AnchoTela) + .5
            }
            else {
              cantpaños = Math.trunc(largo / rbuscaancho[0].AnchoTela) + 1
            }
            metroscuad = cantpaños * rbuscaancho[0].AnchoTela * ancho



            if (drenajesn == 'cd') {
              if (detallep == '') {
                detalle = "Lona para pileta, con cortes para caños de aluminio, con drenaje "
              }
              else {
                detalle = detallep + ''
              }
              minutosdren = ((largo / 1.50) + 2) * 12

              /* 12 minutos por drenaje*/
            } else {
              if (detallep == '') {
                detalle = "Lona para pileta, con cortes para caños de aluminio "
              }
              else {
                detalle = detallep + ''
              }
              minutosdren = 0
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

            if (tipoojale == 'hz') {
              tipoojal = result[0].abrojales3hz
              detalle = detalle + ' c/ojales de HZ en : '
            }
            else {
              tipoojal = result[0].abrojales3b
              detalle = detalle + ' c/ojales de bronce en : '
            }

            cantidadojales = datos.largo * 2
            valorMOT = result[0].costoMOT * coefMOT / 60 * ((metroscuad * minutospmc) + minutosdren)


            mcuadcob = ['Select ',
              'StkRubroDesc, StkRubroAbr, ',
              '((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ', coeficiente,
              ' * ', metroscuad, ')',
              ' ) as ImpUnitario, ',
              'StkRubroCosto, ',
              'StkMonedasCotizacion ',
              'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
              'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
              'and StkRubro.StkRubroTM = idStkMonedas '
            ].join('')


            ojales = [
              "Select ",
              "(StkRubroCosto * StkMonedasCotizacion / 144) * ", cantidadojales,
              " as ValorOjales from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
              "where StkRubro.StkRubroAbr = '",
              tipoojal,
              "'",
              " and StkRubro.StkRubroTM = idStkMonedas"
            ].join("");


            conexion.query(mcuadcob, function (err, result) {
              if (err) {
                console.log("error en mysql");
                console.log(err);
              } else {
                datosenvio.push(result);

              }
            });


            conexion.query(ojales, function (err, result) {
              if (err) {
                console.log("error en mysql");
                console.log(err);
              } else {
                datosenvio.push(result);
              }
              console.log('datosenvio[0][0].ImpUnitario   ', datosenvio[0][0].ImpUnitario)
              console.log('datosenvio[1][0].ValorOjales  ', datosenvio[1][0].ValorOjales)
              console.log('valorMOT  ', valorMOT)

              costooriginal = datosenvio[0][0].ImpUnitario + datosenvio[1][0].ValorOjales + valorMOT
              if (ivasn == 'CIVA') {
                costooriginal = Math.ceil(costooriginal.toFixed(0) / 10) * 10
              }
              else {
                costooriginal = Math.ceil(costooriginal.toFixed(0) / 1.21 / 10) * 10
              }

              datosenvio[0][0]['ImpUnitario'] = costooriginal
              datosenvio[0][0]['Detalle'] = detalle
              datosenvio[0][0]['Largo'] = (largoreal * 1).toFixed(2)
              datosenvio[0][0]['Ancho'] = (anchoreal * 1).toFixed(2)
              datosenvio[0][0]['MDesc'] = 'S'
              res.json(datosenvio);
              datosenvio = [];
            });


          });
      })
    })
});

conexion.end;
module.exports = router;
