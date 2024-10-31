import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsmodificar");
  } else {
    console.log("no se conecto en stkitemsmodificar");
  }
});


router.post("/", async function (req, res, next) {
  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;
  var StkItemsRubroAbr = req.body.StkItemsRubroAbr;
  var StkItemsDesc = req.body.StkItemsDesc;
  var StkItemsOTD = req.body.StkItemsOTD
  var StkItemsCantidad = req.body.StkItemsCantidad;
  var StkItemsCantDisp = req.body.StkItemsCantDisp;
  var StkItemsFAct = finalDate;
  var StkItemsMin = req.body.StkItemsMin;
  var StkItemsMax = req.body.StkItemsMax;

  var q = [
    'UPDATE StkItems SET StkItemsDesc = "',
    StkItemsDesc,
    '", StkItemsOTD = "',
    StkItemsOTD,
    '", StkItemsRubroAbr = "',
    StkItemsRubroAbr,
    '", StkItemsCantidad = ',
    StkItemsCantidad,
    ", StkItemsCantDisp = ",
    StkItemsCantDisp,
    ', StkItemsFAct = "',
    StkItemsFAct,
    '", StkItemsMin = ',
    StkItemsMin,
    ", StkItemsMax = ",
    StkItemsMax,
    " WHERE idStkItems = ",
    idStkItems,
    " and StkItemsGrupo = ",
    StkItemsGrupo,
    " and  StkItemsRubro = ",
    StkItemsRubro
  ].join("");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
