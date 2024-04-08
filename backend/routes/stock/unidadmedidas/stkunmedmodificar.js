var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkunmedmodificar");
  } else {
    console.log("no se conecto en stkunmedmodificar");
  }
});

var router = express();

var router = express();

router.post("/?:id", function(req, res, next) {
  let indice = " ";
  indice = req.params.id;

  descr = req.body.StkUnMedDesc.toUpperCase();

  conexion.query(
    'UPDATE StkUnMed SET StkUnMedDesc = "' +
      descr +
      '" WHERE idStkUnMed = "' +
      indice +
      '"',

    function(err, result) {
      if (err) {
        if (err.errno == 1062) {
          return res.status(409).send({ message: "error clave duplicada" });
        } else if (err.errno == 1406 || err.errno == 1264) {
          return res.status(410).send({ message: "Texto demasiado largo" });
        } else {
          console.log(err.errno);
        }
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
