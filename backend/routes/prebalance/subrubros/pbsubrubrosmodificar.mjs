import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbsubrubrosmodificar");
  } else {
    console.log("no se conecto en pbsubrubrosmodificar");
  }
});

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var descr = String(req.body.PBSubRubroDetalle).toUpperCase();
  var codrubro = req.body.PBSubRubroIdRubro;

  var q = [
    'UPDATE BasePreBalance.PBSubRubros SET PBSubRubroDetalle = "' +
    descr +
    '" WHERE PBidSubRubro = ' +
    indice +
    ' and PBSubRubroIdRubro = ' + codrubro,
  ];
  conexion.query(q[0], function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Descripción de PBSubRubros existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
