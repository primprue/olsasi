var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerdesc");
  } else {
    console.log("no se conecto en stkrubroleerdesc ");
  }
});

var router = express();

router.get("/?:codgrupo", function (req, res, next) {
  codgrupo = req.params.codgrupo;

  conexion.query("Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroCodGrp < " + codgrupo + "  order by StkRubroCodGrp", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
