import express from "express";

var router = express.Router();

import conexion from "../conexion.mjs";



router.get("/", function (req, res, next) {

  var q1 = [
    'SET @numero=0; ',
    "SELECT @numero:=@numero+1 as id, idPresupRenglon, PresupRenglonNroPresup, PresupRenglonCant, PresupRenglonDesc, ",
    "PresupRenglonLargo, PresupRenglonAncho, ",
    "PresupRenglonImpUnit, PresupRenglonImpItem, ",
    "PresupRenglonParamInt from BasePresup.PresupRenglon ",
    "where PresupRenglonNroPresup = ", indice].join(" ");
  conexion.query(q1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result[1]);
    }
  });
});

export default router;