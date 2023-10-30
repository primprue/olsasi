var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleerselec");
  } else {
    console.log("no se conecto en stkgrupoleerselec");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  var q = ["Select idStkGrupo as value, StkGrupoAbr,  StkGrupoDesc as label, StkGrupoContRubro from StkGrupo "].join(" ");
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
