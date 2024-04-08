var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupponchorie");
  } else {
    console.log("no se conecto en presupponchorie");
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
        ancho = 0.0;
      // var enteroancho = 0,
      //   decimancho = 0.0;
      datosrec = JSON.parse(req.query.datoscalculo);
      // totalreg = datosrec.length;
      datosrec.map(datos => {
        cantidad = datos.cantidad;
        tipoconf = datos.tipoconf;
        tipoojale = datos.tipoojale;
        detallep = datos.detallep
        StkRubroAbrP = datos.StkRubroAbr;
        ivasn = datos.ivasn;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.08;
        ancho = (datos.ancho * 1) + 0.08;


        if (detallep == '') {
          detalle = "Poncho para riego confeccionado en: "
        }
        else {
          detalle = detallep + ''
        }
        ganancia = result[0].coefgancsoga

        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay;
          tipoojal = result[0].abrojales28;
          sogachicote = result[0].sogachicotemay;
          ganancia = result[0].coefganmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin;
          sogachicote = result[0].sogachicotemin;

        }
        tipoojal = result[0].abrojales3hz
        minutosunion = (datos.ancho + 0.08) * largo * 5;
        sogadobladillo = result[0].sogadobladillo;
        valorflete = result[0].flete;
        valorMOT = result[0].MOTpM2;
        codmoneda = result[0].codmoneda;
        coefimpuesto = result[0].coefimpuestos

        mcuadcob = [
          "Select ",
          "StkRubroDesc, StkRubroAbr, ",
          //      "(StkRubroCosto * StkMonedasCotizacion / 1.50 * 1.02 ) as CostoCobMC, ",
          "(StkRubroCosto * StkMonedasCotizacion / StkRubroAncho * 1.02 ) as CostoCobMC, ",
          "(StkRubroCosto * StkMonedasCotizacion * 0.20 / 11 ) as CostoRefuerzo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          'where StkRubro.StkRubroAbr = "',
          StkRubroAbrP,
          '" ',
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        msogachicote = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion  * 1.65) as CostoMSChicote ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogachicote,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");


        msogadobladillo = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion) as CostoMSDobladillo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogadobladillo,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        ojales = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion / 144) as CostoOjalM2 ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          tipoojal,
          "'",
          " and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        cotizacion = [
          "Select ",
          "StkMonedasCotizacion ",
          "from   BaseStock.StkMonedas ",
          "where  StkMonedas.idStkMonedas = '",
          codmoneda,
          "'"
        ].join("");

        conexion.query(mcuadcob, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });

        conexion.query(msogachicote, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });
        if (tipoconf === 'cs') {
          conexion.query(msogadobladillo, function (err, result) {
            if (err) {
              console.log("error en mysql");
              console.log(err);
            } else {
              datosenvio.push(result);
            }
          });
        }

        conexion.query(cotizacion, function (err, result) {
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

            j = 0;

            while (j < 4) {
              costooriginal =
                datosenvio[j][0].CostoCobMC + datosenvio[j][0].CostoRefuerzo;
              j++;
              costooriginal = costooriginal + datosenvio[j][0].CostoMSChicote;
              if (tipoconf === 'cs') {
                j++;
                costooriginal = costooriginal + datosenvio[j][0].CostoMSDobladillo;
              }

              j++;
              costooriginal =
                costooriginal +
                datosenvio[j][0].StkMonedasCotizacion * valorflete +
                +(datosenvio[j][0].StkMonedasCotizacion * valorMOT);
              j++;
              costooriginal = costooriginal + datosenvio[j][0].CostoOjalM2;
              j++;

              costooriginal = costooriginal * ganancia * coefimpuesto;

              metroscuad = anchoreal * largoreal
              costooriginal = costooriginal * metroscuad

              ciclo = (metroscuad < 12) ? 3 : 0
              ciclo = (metroscuad < 16 && metroscuad >= 12) ? 2 : 0
              ciclo = (metroscuad < 22 && metroscuad >= 16) ? 1 : ciclo = 0
              i = 0
              while (i < ciclo) {
                costooriginal = costooriginal * 1.0325
                i++
              }
              // if (metroscuad < 22 && metroscuad >= 16) {
              //   costooriginal = costooriginal * 1.0325
              // }
              // if (metroscuad < 16 && metroscuad >= 12) {
              //   costooriginal = costooriginal * 1.0325
              //   costooriginal = costooriginal * 1.0325
              // }
              // if (metroscuad < 12) {
              //   costooriginal = costooriginal * 1.0325
              //   costooriginal = costooriginal * 1.0325
              //   costooriginal = costooriginal * 1.0325
              // }

              // datosenvio[0][0]['ImpItem'] = costooriginal
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

              //esto es para que imprima o no la descripción que se pide
              datosenvio[0][0]['MDesc'] = 'S'
              costooriginal = 0;
            }
            res.json(datosenvio);
            datosenvio = [];
          }
          // }
        });
      });
    })
});

conexion.end;
module.exports = router;
