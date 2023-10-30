var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleeselec");
  } else {
    console.log("no se conecto en stkrubroleeselec ");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  var q = ['Select idStkRubro as value, StkRubroCodGrp, StkRubroDesc as label, StkRubroAbr, StkRubroProv, StkRubroAncho, StkRubroPres, StkRubroPresDes, StkRubroUM, ',
    'StkRubroCosto, StkRubroTM, StkRubroConf from  StkRubro order by StkRubroDesc '].join(" ");

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
