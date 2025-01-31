var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupcomedero");
  } else {
    console.log("no se conecto en presupcomedero");
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
        StkRubroAbrP = "",
        largo = 0,
        ancho = 0.0,
        metsogadob = 0.0,
        perimetro = 0,
        cantidadcob = 0.0;

      datosrec = JSON.parse(req.query.datoscalculo);
      datosrec.map(datos => {
        cantidad = datos.cantidad;
        tipoojale = datos.tipoojale;
        detallep = datos.detallep;
        ojalescada = datos.presupojalesc / 100;
        StkRubroAbrP = datos.StkRubroAbr;
        ivasn = datos.ivasn;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.anchocomedero * 1)
        perimetro = (datos.largo * 2)
        metsogadob = perimetro + 4
        largo = (datos.largo * 1) + 0.08;
        ancho = (anchoreal * 1) + 0.08;

        cantidadojales = (perimetro / ojalescada) + (largoreal)

        if (detallep == '') {
          detalle = "Comedero "
        }
        else {
          detalle = detallep + ''
        }

        if (anchoreal == 0.68) {
          cantidadcob = largo / 2
        }
        else {
          if (anchoreal == 0.42) {
            cantidadcob = largo / 3
          }

          else {
            cantidadcob = Math.ceil(largo / 1.5) * ancho
          }
        }

        ganancia = result[0].coefgancsoga

        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay;
          coefMOT = result[0].coefMOTmay
          tipoojal = result[0].abrojales28;
          ganancia = result[0].coefganmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin;
          coefMOT = result[0].coefMOTmin
        }



        if (tipoojale == 'hz') {
          tipoojal = 'OHCOL'
          detalle = detalle + ' c/ojales de hierro cada ' + ojalescada + ' cm. en : '
        }
        else {
          tipoojal = 'OBCOL'
          detalle = detalle + ' c/ojales de bronce cada ' + ojalescada + ' cm. en : '
        }
        if (detallep != '') {
          detalle = ''
          detalle = detallep + ' en : '
        }


        sogadobladillo = result[0].sogadobladillo;
        valorflete = result[0].flete;
        valorMOT = result[0].MOTpM2;
        codmoneda = result[0].codmoneda;
        coefimpuesto = result[0].coefimpuestos


        ValorMOTtotal = ((result[0].costoMOT / 60) * 3.5 * largo) * coefMOT


        mlinealcob = [
          "Select ",
          "StkRubroDesc, StkRubroAbr, ",
          "(StkRubroCosto * StkMonedasCotizacion  * " + coeficiente + " ) as ValorCobML ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          'where StkRubro.StkRubroAbr = "',
          StkRubroAbrP,
          '" ',
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");


        msogadobladillo = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion * " + coeficiente + ") as ValorMSDobladillo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogadobladillo,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        ojales = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion * " + coeficiente + ") as ValorGrsOjal ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          tipoojal,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        cotizacion = [
          "Select ",
          "StkMonedasCotizacion ",
          "from   BaseStock.StkMonedas ",
          "where  StkMonedas.idStkMonedas = '",
          codmoneda,
          "'"
        ].join("");

        conexion.query(mlinealcob, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });


        conexion.query(msogadobladillo, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });
        // }

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


            while (j < 3) {
              costooriginal = datosenvio[j][0].ValorCobML * cantidadcob
              j++;


              costooriginal = costooriginal + (datosenvio[j][0].ValorMSDobladillo * metsogadob);

              j++;
              j++;
              costooriginal = costooriginal + (datosenvio[j][0].ValorGrsOjal / 100 * cantidadojales)

              costooriginal = costooriginal * coefimpuesto + ValorMOTtotal
              // costooriginal = costooriginal * ganancia * coefimpuesto;

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
