var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsmodstock");
  } else {
    console.log("no se conecto en stkitemsmodstock");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function (req, res, next) {

  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;
  var StkRubroPres = req.body.StkRubroPres;
  var StkEnvaseUbG = req.body.StkEnvaseUbG;
  var cantidad = req.body.cantidad;
  if (StkEnvaseUbG == '') {
    res.status(413).send({ message: "Faltan datos para ingresar información" });
  }
  else {
    var total = Number(cantidad) * Number(StkRubroPres);

    var d = new Date();
    finalDate = d.toISOString().split("T")[0];
    var StkItemsFAct = finalDate;

    conexion.query(
      "UPDATE StkItems SET StkItemsCantDisp = StkItemsCantDisp +  " +
      total +
      ", StkItemsCantidad =  StkItemsCantidad + " +
      total +
      ', StkItemsFAct = "' +
      StkItemsFAct +
      '" WHERE idStkItems = ' +
      idStkItems +
      " and  StkItemsGrupo = " +
      StkItemsGrupo +
      " and  StkItemsRubro = " +
      StkItemsRubro,

      function (err, result) {
        if (err) {
          console.log('err en back ', err)
          if (err.errno == 1054) {
            return res
              .status(414)
              .send({ message: "Faltan datos en sktitemsmodsctock" });
          } else {
            console.log(err.errno);
          }
        } else {
          res.json(result.rows);
        }
      }
    );
  }
});

module.exports = router;
