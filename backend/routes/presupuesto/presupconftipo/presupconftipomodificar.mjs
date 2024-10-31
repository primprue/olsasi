import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipomodificar");
  } else {
    console.log("no se conecto en presupconftipomodificar");
  }
});



router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var PresupConfTipoLargo = req.body.PresupConfTipoLargo;
  var PresupConfTipoAncho = req.body.PresupConfTipoAncho;
  var PresupConfTipoAnexo = req.body.PresupConfTipoAnexo.toUpperCase();
  var PresupConfTipoCant = req.body.PresupConfTipoCant;
  var PresupConfTipoM2 = req.body.PresupConfTipoM2.toUpperCase();
  var PresupConfTipoDesc = req.body.PresupConfTipoDesc.toUpperCase();
  var PresupConfTipoRubro = req.body.PresupConfTipoRubro.toUpperCase();
  var PresupConfTipoImprime = req.body.PresupConfTipoImprime.toUpperCase();
  var PresupConfTipoMinMOT = req.body.PresupConfTipoMinMOT

  var q = [
    'UPDATE BasePresup.PresupConfTipo SET PresupConfTipoAnexo = "' +
    PresupConfTipoAnexo +
    '", PresupConfTipoCant = ' +
    PresupConfTipoCant +
    ', PresupConfTipoM2 = "' +
    PresupConfTipoM2 +
    '", PresupConfTipoDesc = "' +
    PresupConfTipoDesc +
    '", PresupConfTipoRubro = "' +
    PresupConfTipoRubro +
    '", PresupConfTipoLargo = "' +
    PresupConfTipoLargo +
    '", PresupConfTipoAncho = "' +
    PresupConfTipoAncho +
    '", PresupConfTipoImprime = "' +
    PresupConfTipoImprime +
    '", PresupConfTipoMinMOT = "' +
    PresupConfTipoMinMOT +
    '" WHERE idPresupConfTipo = ' +
    indice
  ];
  // .join(" ");
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
