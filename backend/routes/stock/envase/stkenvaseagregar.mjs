import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.post("/", async function (req, res, next) {
  var q, q1;
  var idStkEnvase = 0;
  var StkEnvaseGrupo = 0
  var StkEnvaseRubro = 0
  var StkEnvaseItem = req.query.idStkItems === '' ? 1 : req.query.idStkItems
  StkEnvaseGrupo = parseInt(req.query.idStkGrupo)
  StkEnvaseRubro = parseInt(req.query.idStkRubro);

  q = [
    "Select ",
    "max(idStkEnvase) as UltEnvase",
    "from StkEnvase where StkEnvaseGrupo = ",
    StkEnvaseGrupo,
    "and StkEnvaseRubro = ",
    StkEnvaseRubro,
    " and StkEnvaseItem = ",
    StkEnvaseItem
  ].join(" ");

  var nroenvase
  conexion.query(q, function (err, result) {
    if (err) {
      console.log('err.errno  ', err.errno)
      if (err.errno === 1054) {
        nroenvase = 1;
      } else {
        console.log("error al buscar el último envase  " + err.errno);
        console.log(err);
      }
    } else {
      nroenvase = result[0].UltEnvase + 1;
    }


    // tengo que hacer esto req.body.cantidad veces que es la cantidad de envases que ingresaron con req.body.StkRubroPres de contenido
    var cantenvases = req.body.cantidad;

    var d = new Date();
    var finalDate = d.toISOString().split("T")[0];
    for (var i = 0; i < cantenvases; i++) {
      var registro = {
        idStkEnvase: nroenvase,
        StkEnvaseGrupo: StkEnvaseGrupo,
        StkEnvaseRubro: StkEnvaseRubro,
        StkEnvaseItem: StkEnvaseItem,
        StkEnvaseCant: req.body.StkRubroPres,
        StkEnvaseFechaAct: finalDate,
        StkEnvasePartida: req.body.StkEnvasePartida,
        StkEnvaseUbG: req.body.StkEnvaseUbG,
        StkEnvaseUbF: req.body.StkEnvaseUbF,
        StkEnvaseObserv: req.body.StkEnvaseObserv,
        StkEnvaseImprimio: "N"
      };
      conexion.query("INSERT INTO StkEnvase SET ?", registro,
        function (err, result) {
          if (err) {
            console.log('err en back ', err)
            if (err.errno == 1265) {
              return res.status(413).send({ message: "Faltan datos para leer información en tabl" });
            }
            else {
              console.log(err.errno);
            }
          }

        });
      nroenvase++;
    }
    res.json(result);
  });
});
conexion.end;
export default router;
