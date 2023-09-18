var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
var mysql = require("mysql");

var router = express();
conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoborrar");
  } else {
    console.log("no se conecto en stkgrupoborrar");
  }
});

router.delete("/?:id", function(req, res, next) {
  indice = req.params.id;
  //'delete from StkGrupo where idStkGrupo = "' + indice + '"',
  var q = ["delete", ' from StkGrupo where idStkGrupo = "', indice, '"'].join(
    " "
  );
  conexion.query(q, function(err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Grupo usado en otra tabla" });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }
  });
});
conexion.end;
module.exports = router;
