var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
var mysql = require("mysql");

var router = express();
conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkunmedborrar");
  } else {
    console.log("no se conecto en stkunmedborrar");
  }
});

router.delete("/?:id", function(req, res, next) {
  indice = req.params.id;

  conexion.query(
    'delete from StkUnMed where idStkUnMed = "' + indice + '"',
    function(err, result) {
      if (err) {
        if (err.errno == 1451) {
          return res
            .status(411)
            .send({
              message: "error Código de Unidad de Medida usado en otra tabla"
            });
        }
        {
          console.log(err.errno);
        }
      } else {
        res.json(result.rows);
      }
    }
  );
});

module.exports = router;
