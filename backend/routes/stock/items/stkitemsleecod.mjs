import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";



router.get("/", async function (req, res, next) {
  var idStkItems = req.query.id1;
  var StkItemsGrupo = req.query.id2;
  var StkItemsRubro = req.query.id3;

  var q = [
    "Select * from StkItems where idStkItems = ",
    idStkItems,
    " and  StkItemsGrupo  = ",
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
