var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupdetpieborrar");
  } else {
    console.log("no se conecto en presupdetpieborrar");
  }
});


router.delete("/?:id", function (req, res, next) {
  indice = req.params.id;

  var q = ["delete", ' from BasePresup.PresupDetPie where idPresupDetPie = "', indice, '"'].join(
    " "
  );
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Pie de Presupuesto usado en otra tabla" });
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