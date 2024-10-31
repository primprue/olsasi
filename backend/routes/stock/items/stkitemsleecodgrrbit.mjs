import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleecodgrrbit");
  } else {
    console.log("no se conecto en stkitemsleecodgrrbit");
  }
});



router.get("/", async function (req, res, next) {
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;

  var q = [
    "Select * from StkItems where idStkItems  = ",
    idStkItems,
    " and StkItemsGrupo  = ",
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
