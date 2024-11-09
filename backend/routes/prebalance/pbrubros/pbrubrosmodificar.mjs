import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbrubrosmodificar");
  } else {
    console.log("no se conecto en pbrubrosmodificar");
  }
});

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var descr = req.body.PBRubrosDetalle.toUpperCase();


  var q = [
    'UPDATE BasePreBalance.PBRubros SET PBRubrosDetalle = "' +
    descr +

    ' WHERE idPBRubros = "' +
    indice +
    '"',
  ];
  conexion.query(q[0], function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Descripción de PBRubros existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
