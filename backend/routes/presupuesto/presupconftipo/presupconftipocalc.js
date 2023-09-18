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


var router = express();

var datosenvio = [];
router.get("/", function (req, res, next) {
  tipo = req.query.tipo;

  var minmay = '', coefgcia = 0, vlrMOT = 0, vlrMAT = 0, TotalValor = 0, ImpUnitario = 0
  var ImprimeSN = ''
  datosrec = JSON.parse(req.query.datoscalculo);
  datosrec.map(datos => {
    minmay = datos.minmay
    ivasn = datos.ivasn
  })

  //para sacar el costo de MOT
  //SELECT (PresupConfMinMOT * costoMOT / 60) as CostoMotCon FROM BasePresup.PresupConfTipo, BasePresup.PresupParam where PresupConfTipoDesc ='MORRAL' and PresupConfMinMOT <> 0;
  q2 = ['select * from BasePresup.PresupParam'].join(' ')


  conexion.query(q2,
    function (err, result2) {
      if (err) {
        console.log(err);
      }
      else {
        if (minmay == 'my') {
          coefgcia = result2[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coefgcia = result2[0].coefMOTmin
        }
      }

      var q1 = ['SELECT (PresupConfTipoMinMOT * costoMOT / 60) as CostoMotCon FROM BasePresup.PresupConfTipo, BasePresup.PresupParam where PresupConfTipoDesc = "' + tipo + '" and PresupConfTipoMinMOT <> 0'].join("");

      conexion.query(q1, function (err, result1) {
        var CostoMotCon = 0
        if (err) {
          console.log(err);

        } else {
          //    res.json(result1);
          if (result1 == '') {
            vlrMOT = 0
          }
          else {
            vlrMOT = result1[0].CostoMotCon
          }
        }

        var q2 = ['SELECT PresupConfTipoImprime as PresupConfTipoImprime FROM BasePresup.PresupConfTipo where PresupConfTipoDesc = "' + tipo + '"'].join("");

        conexion.query(q2, function (err, result1) {

          if (err) {
            console.log(err);
          } else {
            ImprimeSN = result1[0].PresupConfTipoImprime
          }

          var q = ['select sum(BaseStock.StkRubro.StkRubroCosto * BaseStock.StkMonedas.StkMonedasCotizacion * BasePresup.PresupConfTipo.PresupConfTipoCant) ' +
            'as ImpUnitario from BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas ' +
            'where  PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and ' +
            'BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas and ' +
            'PresupConfTipoDesc = "' + tipo + '"'].join("");

          conexion.query(q, function (err, result) {
            if (err) {
              console.log(err);
            } else {

              vlrMAT = result[0].ImpUnitario

              if (vlrMOT === 0) {
                ImpUnitario = parseInt(vlrMAT)
                //vlrMAT.toFixed(0)
              }
              else {
                //     ImpUnitario = ((vlrMOT + vlrMAT) * coefgcia).toFixed(0)
                ImpUnitario = parseInt((vlrMOT + vlrMAT) * coefgcia)
              }

              if (ivasn == 'CIVA') {
                ImpUnitario = Math.ceil((ImpUnitario / 10) * 10)
              }
              else {
                ImpUnitario = Math.ceil(((ImpUnitario / 1.21) / 10) * 10)
              }

              // if (ivasn == 'CIVA') {
              //   ImpUnitario
              // }
              // else {
              //   ImpUnitario = ImpUnitario / 1.21
              // }
              datosenvio.push(ImpUnitario)
              datosenvio.push(ImprimeSN)
              res.json(datosenvio)
              datosenvio = []
              // res.json(ImpUnitario)
            }
          });
        });
      });
    });
})
conexion.end;
module.exports = router;
