var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

var nrovta = 1;

moment.locale("es");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkmovvtaagregar");
  } else {
    console.log("no se conecto en stkmovvtaagregar");
  }
});

router.post("/", async function(req, res) {
  var d = new Date();
  var q1;
  finalDate = d.toISOString().split("T")[0];
  //'Select max(idStkMovVta) as UltMovVta from StkMovVta where StkMovVtaFecha = "' + finalDate + '"' ,
  var q = [
    'Select max(idStkMovVta) as UltMovVta from StkMovVta where StkMovVtaFecha = "' +
      finalDate +
      '"'
  ].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      if (err.errno === 1054) {
        nrovta = 1;
      } else {
        console.log("error al buscar el último  " + err.errno);
        console.log(err);
      }
    } else {
      res.json(result);
      nrovta = result[0].UltMovVta + 1;
    }

    var registro = {
      idStkMovVta: nrovta,
      StkMovVtaFecha: finalDate,
      StkMovVtaGrupo: req.body.StkMovVtaGrupo,
      StkMovVtaRubro: req.body.StkMovVtaRubro,
      StkMovVtaItem: req.body.StkMovVtaItem,
      StkMovVtaCantidad: Number(req.body.StkMovVtaCantidad)
    };
    // 'INSERT INTO StkMovVta SET ?', registro,
    //   q1 = ["INSERT", "INTO StkMovVta SET ?", registro].join(" ");
    //q1 = ["INSERT", "INTO StkMovVta SET ", registro].join(" ");
    conexion.query("INSERT INTO StkMovVta SET ?", registro, function(
      err,
      result
    ) {
      if (err) {
        console.log("ERROR en Insert en stkmovvtaagregar");
        console.log(err.errno);
      } else {
        res.json(result.rows);
      }
    });
  });
});

conexion.end;
module.exports = router;
