var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkubfisicaleercod");
  } else {
    console.log("no se conecto en stkubfisicaleercod");
  }
});

var router = express();

router.get("/?:StkUbFisicaGeo", function (req, res, next) {
  indice = req.params.StkUbFisicaGeo;

  conexion.query(
    'Select * from StkUbFisica  where StkUbFisicaGeo = "' + indice + '" order by idStkUbFisica ',
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

conexion.end;
module.exports = router;
