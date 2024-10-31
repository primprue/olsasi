import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupdetpiemodificar");
  } else {
    console.log("no se conecto en presupdetpiemodificar");
  }
});

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var PresupDetPieLeyenda = req.body.PresupDetPieLeyenda
  var q = [
    'UPDATE BasePresup.PresupDetPie SET PresupDetPieLeyenda = "' +
    PresupDetPieLeyenda +
    '" WHERE idPresupDetPie = ' +
    indice
  ];
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
export default router;
