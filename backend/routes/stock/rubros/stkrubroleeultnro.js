var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkleeultnrorubro");
  } else {
    console.log("no se conecto en stkleeultnrorubro");
  }
});
var router = express();

router.get("/", function (req, res) {
  codgrupo = req.query.id;

  var q = [
    "Select StkGrupoContRubro + 1 as CodRubroNuevo ",
    "from StkGrupo where idStkGrupo = ",
    codgrupo
  ].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(
        "Error  Select StkGrupoContRubro as CuentaRubro from StkGrupo"
      );
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

conexion.end;
module.exports = router;
