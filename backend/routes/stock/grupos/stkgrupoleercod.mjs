import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", async function (req, res, next) {
  var indice = req.query.id;
  var q = ["Select * from StkGrupo", "where idStkGrupo = ", indice].join(" ");
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
