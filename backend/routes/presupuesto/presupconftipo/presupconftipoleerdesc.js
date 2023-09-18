var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleerdesc");
  } else {
    console.log("no se conecto en presupconftipoleerdesc");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  PresupConfTipoDesc = req.query.descripcion;
  var q = ["Select * from BasePresup.PresupConfTipo where PresupConfTipoDesc = '" + PresupConfTipoDesc + "'"].join("");
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
