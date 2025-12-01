import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";


router.get("/", function (req, res, next) {

  var nrobusca = req.query.id;
  var q = ["SELECT OTRenglonNro as id,  idOTRenglonNroOT, OTRenglonNro, OTRenglonCant, ",
    "OTRenglonDesc, OTRenglonLargo, OTRenglonAncho, OTRenglonImpItem, OTRenglonDetalles ",
    "FROM BasesOrdenes.OTRenglon where idOTRenglonNroOT = " + nrobusca].join(" ");

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



