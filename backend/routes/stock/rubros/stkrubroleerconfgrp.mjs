import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";
//creado para Ordenes de Trabajo
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconfgrp");
  } else {
    console.log("no se conecto en stkrubroleerconfgrp ");
  }
});



router.get("/", async function (req, res, next) {
  var StkRubroCodGrp = req.query.StkRubroCodGrp;


  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc. por eso trae el grupo

  var q = ["Select StkRubroDesc, StkRubroAbr, StkItemsDesc, idStkItems from StkRubro, StkItems where  StkRubroCodGrp = '" + StkRubroCodGrp + "' and StkItemsOTD = 'S'  and StkItemsRubroAbr = StkRubroAbr  order by StkRubroDesc"].join("");
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
