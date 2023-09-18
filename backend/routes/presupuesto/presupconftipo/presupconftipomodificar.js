var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipomodificar");
  } else {
    console.log("no se conecto en presupconftipomodificar");
  }
});

var router = express();

router.post("/", async function (req, res, next) {
  indice = req.query.id;
  PresupConfTipoLargo = req.body.PresupConfTipoLargo.toUpperCase(),
    PresupConfTipoAncho = req.body.PresupConfTipoAncho.toUpperCase(),
    PresupConfTipoAnexo = req.body.PresupConfTipoAnexo.toUpperCase(),
    PresupConfTipoCant = req.body.PresupConfTipoCant,
    PresupConfTipoM2 = req.body.PresupConfTipoM2.toUpperCase(),
    PresupConfTipoDesc = req.body.PresupConfTipoDesc.toUpperCase(),
    PresupConfTipoRubro = req.body.PresupConfTipoRubro.toUpperCase(),
    PresupConfTipoImprime = req.body.PresupConfTipoImprime.toUpperCase(),
    PresupConfTipoMinMOT = req.body.PresupConfTipoMinMOT

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
module.exports = router;
