import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupomodificar");
  } else {
    console.log("no se conecto en stkgrupomodificar");
  }
});

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var descr = req.body.StkGrupoDesc.toUpperCase();
  var abrev = req.body.StkGrupoAbr;
  var contRubro = req.body.StkGrupoContRubro;

  var q = [
    'UPDATE StkGrupo SET StkGrupoDesc = "' +
    descr +
    '", StkGrupoAbr = "' +
    abrev +
    '", StkGrupoContRubro = ' +
    contRubro +
    ' WHERE idStkGrupo = "' +
    indice +
    '"',
  ];
  conexion.query(q[0], function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Abreviatura de Grupo existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
