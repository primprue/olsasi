import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");


router.post("/", function (req, res, next) {

  var registro = {
    PresupConfTipoDesc: req.body.PresupConfTipoDesc.toUpperCase(),
    PresupConfTipoRubro: req.body.PresupConfTipoRubro.toUpperCase(),
    PresupConfTipoCant: req.body.PresupConfTipoCant,
    PresupConfTipoM2: req.body.PresupConfTipoM2,
    PresupConfTipoAnexo: req.body.PresupConfTipoAnexo.toUpperCase(),
    PresupConfTipoLargo: req.body.PresupConfTipoLargo,
    PresupConfTipoAncho: req.body.PresupConfTipoAncho,
    PresupConfTipoImprime: req.body.PresupConfTipoImprime.toUpperCase(),
    PresupConfTipoMinMOT: req.body.PresupConfTipoMinMOT,
    PresupConfTipoBack: '',
    PresupConfTipoPElab: 'S'
  };
  conexion.query("INSERT INTO BasePresup.PresupConfTipo SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result);
    }
  });
});
conexion.end;
export default router;
