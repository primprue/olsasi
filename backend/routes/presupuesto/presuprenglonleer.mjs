import express from "express";

var router = express.Router();
import path from "path";
import conexion from "../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuprenglonleer");
  } else {
    console.log("no se conecto en presuprenglonleer");
  }
});


router.get("/", function (req, res, next) {
  var indice = req.query.id;
  var q = ["SET @numero=0 "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  var q1 = ["SELECT @numero:=@numero+1 as id, idPresupRenglon, PresupRenglonNroPresup, PresupRenglonCant, PresupRenglonDesc, ",
    "PresupRenglonLargo, PresupRenglonAncho, ",
    "PresupRenglonImpUnit, PresupRenglonImpItem, ",
    "PresupRenglonParamInt from BasePresup.PresupRenglon ",
    "where PresupRenglonNroPresup = ", indice].join(" ");
  conexion.query(q1, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// conexion.end;
export default router;