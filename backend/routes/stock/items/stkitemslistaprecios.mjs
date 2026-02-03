import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.get("/", async function (req, res, next) {
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;

  var q = [
    "Select idStkItems as id, StkItemsDesc, StkItemsCantDisp, StkItemsCantidad from StkItems where StkItemsGrupo  = ",
    StkItemsGrupo,
    " and  StkItemsRubro  = ",
    StkItemsRubro
  ].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
