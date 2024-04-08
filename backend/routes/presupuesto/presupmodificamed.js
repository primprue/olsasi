var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupmodificamed");
  } else {
    console.log("no se conecto en presupmodificamed");
  }
});

var datosenvio = [];
var valorhora = 0;

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

      var costooriginal = 0.00;
      var costodiflona = 0.00;
      var costoMOTa = 0.00, costoMOTb = 0.00, costoMOTc = 0.00, costoMOTd = 0.00, costoMOTe = 0.00, costoMOTf = 0.00;
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
        largorealn = (datos.largon * 1)
        anchorealn = (datos.anchon * 1)
        largo = (datos.largo * 1) + 0.08;
        ancho = (datos.ancho * 1) + 0.08;
        largon = (datos.largon * 1) + 0.08;
        anchon = (datos.anchon * 1) + 0.08;
        lna = datos.lonanuestraafuera;

        // if (tipoconf == 'cs') {
        if (detallep == '') {
          detalle = "Modificación de lona de : " + largoreal + " x " + anchoreal + " a => " + largorealn + " x " + anchorealn
        }
        else {
          detalle = detallep + ''
        }
        if (tipoconf == 'cs') {
          ganancia = result[0].coefgancsoga
        } else {
          ganancia = result[0].coefganssoga
        }

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
        if (tipoojale == 'hz') {
          tipoojal = result[0].abrojales3hz
          detalle = detalle + ' en : '
        }
        else {
          tipoojal = result[0].abrojales3b
          detalle = detalle + ' c/ojales de bronce en : '
        }

        minutosunion = (datos.ancho + 0.08) * largo * 5;
        sogadobladillo = result[0].sogadobladillo;
        valorflete = result[0].flete;
        valorMOT = result[0].MOTpM2;
        codmoneda = result[0].codmoneda;
        coefimpuesto = result[0].coefimpuestos

        vhln = ["SELECT REPValorMOT FROM reparacion.parametrosrep"].join("");
        vhla = ["SELECT REPValorMOTLA FROM reparacion.parametrosrep"].join("");
        mcuadcob = [
          "Select ",
          "StkRubroDesc, StkRubroAbr, ",
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

        if (lna === 'LN') {
          conexion.query(vhln, function (err, result) {
            if (err) {
              console.log("error en mysql");
              console.log(err);
            } else {
              valorhora = result[0].REPValorMOT
            }
          });
        }
        else {
          conexion.query(vhla, function (err, result) {
            if (err) {
              console.log("error en mysql");
              console.log(err);
            } else {
              valorhora = result[0].REPValorMOTLA
            }
          });
        }
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
              /* hasta acá es para calcular el metro cuadrado de tela */

              /* Esto lo pongo primero para no agregar una variable para costo original */
              metroscuadn = anchorealn * largorealn
              costooriginaln = costooriginal * metroscuadn

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



              ciclo = (metroscuadn < 12) ? 3 : 0
              ciclo = (metroscuadn < 16 && metroscuadn >= 12) ? 2 : 0
              ciclo = (metroscuadn < 22 && metroscuadn >= 16) ? 1 : ciclo = 0
              i = 0
              while (i < ciclo) {
                costooriginaln = costooriginaln * 1.0325
                i++
              }



              if ((largorealn > largoreal) || (anchorealn > anchoreal)) {
                costodiflona = costooriginaln - costooriginal
              }


              //esto calculamos el 10-11-2022 con Cecilia, con distintas ordenes de lonas ya modificadas, luego lo desmembré y funcionó
              // if ((largorealn < largoreal) && (anchorealn < anchoreal)) {
              //   costoMOTe = (valorhora / 60 * ((22 * largorealn) + (44 * anchorealn)))
              // }

              // //es mas ancha y más larga
              // if ((largorealn > largoreal) && (anchorealn > anchoreal)) {
              //   costoMOTf = (valorhora / 60 * 22 * ((largoreal * 2) + (anchorealn * 2)))
              // }
              if (largorealn < largoreal) {
                costoMOTa = (valorhora / 60 * (15 * anchorealn * 2))
              }

              if (anchorealn < anchoreal) {
                costoMOTb = (valorhora / 60 * (15 * largorealn))
              }

              if ((largorealn > largoreal)) {
                costoMOTc = (valorhora / 60 * 16 * ((anchorealn * 2)))
              }

              if ((anchorealn > anchoreal)) {
                costoMOTd = (valorhora / 60 * 16 * ((largoreal * 2)))
                if (costoMOTc === 0) {
                  costoMOTc = (valorhora / 60 * 16 * ((anchorealn * 2)))
                }
              }

              costooriginal = costodiflona + costoMOTa + costoMOTb + costoMOTc + costoMOTd
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
