var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipocalc");
  } else {
    console.log("no se conecto en presupconftipocalc");
  }
});

var importedepaso = 0, vlrMOT = 0, costoValorMinuto = 0, coefgcia = 0
var datosparacalculo = []
var router = express();
var datosenvio = [];
router.get("/", (req, res, next) => {
  tipo = req.query.tipo;

  var minmay = '', vlrMAT = 0, TotalValor = 0, ImpUnitario = 0, costorubro = 0, m2 = '', unmed = ''
  // var PresupConfTipoRubroe = '', PresupConfTipoCante = 0, PresupConfTipoM2e = '',  PresupConfTipoMinMOTe = 0

  datosrec = JSON.parse(req.query.datoscalculo);
  datosrec.map(datos => {
    minmay = datos.minmay
    ivasn = datos.ivasn

  })

  q2 = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q2,
    function (err, result2) {
      if (err) {
        console.log(err);
      }
      else {
        costoValorMinuto = (result2[0].costoMOT / 60)
        if (minmay == 'my') {
          coefgcia = result2[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coefgcia = result2[0].coefMOTmin
        }
      }


      //SELECT PresupConfTipoMinMOT as MinMOT FROM BasePresup.PresupConfTipo where PresupConfTipoDesc = 'MORRAL' and PresupConfTipoMinMOT <> 0;

      var minMOT = ['SELECT PresupConfTipoMinMOT as MinMOT FROM BasePresup.PresupConfTipo where PresupConfTipoDesc = "' + tipo + '" and PresupConfTipoMinMOT <> 0'].join("");


      conexion.query(minMOT, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          datosenvio.push(result)
        }
      })


      // SELECT SUM(BaseStock.StkRubro.StkRubroCosto / BaseStock.StkRubro.StkRubroAncho * PresupConfTipoCant * BaseStock.StkMonedas.StkMonedasCotizacion ) as CostoM2
      //  FROM BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas 
      //     where PresupConfTipoDesc = 'MORRAL' and PresupConfTipoM2 = 'S' and PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas;
      m2 = 'S'
      var costoM2 = ['SELECT SUM(BaseStock.StkRubro.StkRubroCosto / BaseStock.StkRubro.StkRubroAncho * ' +
        'PresupConfTipoCant  * BaseStock.StkMonedas.StkMonedasCotizacion ) as CostoM2 ' +
        'FROM BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas  ' +
        'where PresupConfTipoDesc = "' + tipo + '" and PresupConfTipoM2 = "' + m2 +
        '" and PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and ' +
        'BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas'].join("");


      conexion.query(costoM2, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          datosenvio.push(result)
        }
      })


      //       SELECT SUM(BaseStock.StkRubro.StkRubroCosto * PresupConfTipoCant  * BaseStock.StkMonedas.StkMonedasCotizacion) as CostoLineal
      // FROM BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas
      // where PresupConfTipoDesc = 'MORRAL' and PresupConfTipoM2 = 'N' and PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroUM <> 'GR' and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas;

      m2 = 'N'
      unmed = 'GR'
      var costoLineal = ['SELECT SUM(BaseStock.StkRubro.StkRubroCosto * PresupConfTipoCant * ' +
        'BaseStock.StkMonedas.StkMonedasCotizacion ) as CostoLineal ' +
        'FROM BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas  ' +
        'where PresupConfTipoDesc = "' + tipo + '" and PresupConfTipoM2 = "' + m2 +
        '" and PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroUM <> "' + unmed +
        '" and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas'].join("");


      conexion.query(costoLineal, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          datosenvio.push(result)
        }
      })


      m2 = 'N'
      unmed = 'GR'
      var costoOjal = ['SELECT SUM(BaseStock.StkRubro.StkRubroCosto * PresupConfTipoCant  / 144 * ' +
        'BaseStock.StkMonedas.StkMonedasCotizacion ) as CostoOjal ' +
        'FROM BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas  ' +
        'where PresupConfTipoDesc = "' + tipo + '" and PresupConfTipoM2 = "' + m2 +
        '" and PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and BaseStock.StkRubro.StkRubroUM = "' + unmed +
        '" and BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas'].join("");


      conexion.query(costoOjal, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          datosenvio.push(result)
          var costototal = (datosenvio[0][0].MinMOT * costoValorMinuto) + datosenvio[1][0].CostoM2 +
            datosenvio[2][0].CostoLineal + datosenvio[3][0].CostoOjal;
          costototal = costototal * coefgcia
          if (ivasn == 'SIVA') {
            ImpUnitario = costototal / 1.21
          }
          else {
            ImpUnitario = costototal
          }

          res.json(ImpUnitario)



        }
      })
    })
});
conexion.end;
module.exports = router;
