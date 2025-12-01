import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";


var datosenvio = [];

router.get("/", (req, res, next) => {
  var q,
    i = 0, j = 0, ciclo = 0;
  let detalle = '', ganancia = 0, coefimpuesto = 0, tipoojal = '', gancho = '', sogachicote = '', sogadobladillo = ''
  let minutosunion = 0
  let valorflete = 0, costomincolchi = 0, costoMOTDren = 0, coefmaymin = 0, valorMOT = 0, costoHMOT = 0, codmoneda = 0, minutosdren, drenajesn
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      var costooriginal = 0.00;
      var coeficiente = 0,
        cantidad = 0,
        metroscuad = 0,
        StkRubroAbrP = "",
        largo = 0,
        ancho = 0.0;
      let datosrec = JSON.parse(req.query.datoscalculo);
      datosrec.map(datos => {
        drenajesn = datos.drenajesn;
        cantidad = datos.cantidad;
        let tipoconf = 'cs';
        let tipoojale = datos.tipoojale;
        let detallep = datos.detallep
        StkRubroAbrP = datos.StkRubroAbr;
        let ivasn = datos.ivasn;
        let largoreal = (datos.largo * 1)
        let anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.08;
        ancho = (datos.ancho * 1) + 0.08;

        costoHMOT = result[0].costoMOT

        costomincolchi = 2 * costoHMOT / 60
        if (tipoconf == 'cs') {
          if (detallep == '') {
            detalle = "Lona con ojales reforzados, soga elástica y gancho rulo y soga en dobladillo"
          }
          else {
            detalle = detallep + ''
          }
          ganancia = result[0].coefgancsoga
        } else {
          if (detallep == '') {
            detalle = "Lona con ojales reforzados, soga elástica y gancho rulo sin soga en dobladillo"
          }
          else {
            detalle = detallep + ''
          }
          ganancia = result[0].coefganssoga
        }
        if (datos.minmay == 'my') {
          coefmaymin = result[0].coeficientemay;
          tipoojal = result[0].abrojales28;
          sogachicote = result[0].sogaelastica;
          ganancia = result[0].coefganmay
          ivasn = 'CIVA'
        }
        else {
          sogachicote = result[0].sogaelastica;
          coefmaymin = result[0].coeficientemin;
        }
        if (tipoojale == 'hz') {
          tipoojal = result[0].abrojales3hz
          detalle = detalle + ' en : '
        }
        else {
          tipoojal = result[0].abrojales3b
          detalle = detalle + ' c/ojales de bronce en : '
        }


        if (drenajesn == 'cd') {
          if (detallep == '') {
            detalle = detalle + " con drenaje "
          }
          else {
            detalle = detallep + ' '
          }
          minutosdren = ((largo / 1.50) * 12)
          costoMOTDren = costoHMOT / 60 * minutosdren * coefmaymin
          //   minutosdren = ((largo / 1.50) + 2) * 12
          /* 12 minutos por drenaje*/
        } else {
          if (detallep == '') {
            detalle = detalle
          }
          else {
            detalle = detallep + ' '
          }
        }


        minutosunion = (datos.ancho + 0.08) * largo * 5;
        sogadobladillo = result[0].sogadobladillo;
        gancho = result[0].ganchorulo;
        valorflete = result[0].flete;
        valorMOT = result[0].MOTpM2;
        codmoneda = result[0].codmoneda;
        coefimpuesto = result[0].coefimpuestos

        let mcuadcob = [
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

        let msogachicote = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion  * 1.65) as CostoMSChicote ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogachicote,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");


        let msogadobladillo = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion) as CostoMSDobladillo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogadobladillo,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");


        let mgancho = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion  * 1) as CostoGancho ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          gancho,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        let ojales = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion / 144) as CostoOjalM2 ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          tipoojal,
          "'",
          " and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        let cotizacion = [
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
        conexion.query(mgancho, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });
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
              costooriginal = costooriginal + datosenvio[j][0].CostoGancho;
              j++;
              costooriginal =
                costooriginal +
                datosenvio[j][0].StkMonedasCotizacion * valorflete +
                +(datosenvio[j][0].StkMonedasCotizacion * valorMOT);
              j++;
              costooriginal = costooriginal + datosenvio[j][0].CostoOjalM2;

              j++;



              costooriginal = costooriginal + costomincolchi
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
              costooriginal = costooriginal + costoMOTDren
              Math.fround(costooriginal)
              if (ivasn == 'CIVA') {
                costooriginal = Math.ceil(Number(costooriginal).toFixed(2) / 10) * 10
              }
              else {
                costooriginal = Math.ceil(Number(costooriginal).toFixed(2) / 1.21 / 10) * 10
              }
              datosenvio[0][0]['ImpUnitario'] = costooriginal
              datosenvio[0][0]['Detalle'] = detalle
              datosenvio[0][0]['Largo'] = (largoreal * 1).toFixed(2)
              datosenvio[0][0]['Ancho'] = (anchoreal * 1).toFixed(2)

              //esto es para que imprima o no la descripción que se pide
              datosenvio[0][0]['MDesc'] = 'S'
              costooriginal = 0;
            }
            console.log('datosenvio confe ', datosenvio)
            res.json(datosenvio);
            datosenvio = [];
          }
          // }
        });
      });
    })
});

conexion.end;
export default router;
