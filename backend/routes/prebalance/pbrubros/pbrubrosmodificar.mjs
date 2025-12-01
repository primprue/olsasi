import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var descr = req.body.PBRubrosDetalle.toUpperCase();


  var q = [
    'UPDATE BasePreBalance.PBRubros SET PBRubrosDetalle = "' +
    descr +
    '" WHERE idPBRubros = ' +
    indice
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
