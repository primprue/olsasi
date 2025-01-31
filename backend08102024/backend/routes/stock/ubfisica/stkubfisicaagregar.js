var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

moment.locale("es");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stubfisicaagregar");
  } else {
    console.log("no se conecto en stkubfisicaagregar");
  }
});

router.post("/", function(req, res, next) {
  var registro = {
    idStkUbFisica: req.body.idStkUbFisica,
    StkUbFisicaGeo: req.body.StkUbFisicaGeo
  };

  conexion.query("INSERT INTO StkUbFisica SET ?", registro, function(
    err,
    result
  ) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
