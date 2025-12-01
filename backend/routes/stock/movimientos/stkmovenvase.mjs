import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";






router.post("/", async function (req, res, next) {


  var idStkItems = req.body.idStkItems;
  var StkItemsGrupo = req.body.StkItemsGrupo;
  var StkItemsRubro = req.body.StkItemsRubro;
  var Envase = req.body.Envase;
  var q;
  var cantarestar = req.body.cantarestar;
  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];
  var StkItemsFAct = finalDate;
  // Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1

  q = [
    "UPDATE StkEnvase",
    "SET StkEnvaseCant = (StkEnvaseCant - " + cantarestar,
    '), StkEnvaseFechaAct = "' + StkItemsFAct,
    '", StkEnvaseImprimio = "N"' +
    ' WHERE  idStkEnvase = ' + Envase,
    " and StkEnvaseItem = " + idStkItems,
    " and  StkEnvaseGrupo = " + StkItemsGrupo,
    " and  StkEnvaseRubro = " + StkItemsRubro
  ].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
conexion.end;
export default router;
