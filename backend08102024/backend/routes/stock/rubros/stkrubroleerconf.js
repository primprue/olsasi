var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconf");
  } else {
    console.log("no se conecto en stkrubroleerconf ");
  }
});


var router = express();

router.get("/?:cuallee", function (req, res, next) {
  cuallee = req.params.cuallee;
  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc.
  if (cuallee === 'T') {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  }
  else {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = '" + cuallee + "' order by StkRubroDesc"].join("");
  }
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
