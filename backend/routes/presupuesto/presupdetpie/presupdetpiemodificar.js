var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupdetpiemodificar");
  } else {
    console.log("no se conecto en presupdetpiemodificar");
  }
});

var router = express();

router.post("/", async function (req, res, next) {
  indice = req.query.id;
  PresupDetPieLeyenda = req.body.PresupDetPieLeyenda
  // PresupDetPieSelec = req.body.PresupDetPieSelec.toUpperCase();
  var q = [
    'UPDATE BasePresup.PresupDetPie SET PresupDetPieLeyenda = "' +
    PresupDetPieLeyenda +
    // '", PresupDetPieSelec = "' +
    // PresupDetPieSelec +
    '" WHERE idPresupDetPie = ' +
    indice
  ];
  // .join(" ");
  conexion.query(q[0], function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Leyenda de Pie de Presupuesto existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
