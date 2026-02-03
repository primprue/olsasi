import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", async function (req, res, next) {
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;

  var q = [
    "Select * from StkItems where StkItemsGrupo  = ",
    StkItemsGrupo,
    " and  StkItemsRubro  = ",
    StkItemsRubro,
    " order by StkItemsDesc "
  ].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
conexion.end
export default router;
