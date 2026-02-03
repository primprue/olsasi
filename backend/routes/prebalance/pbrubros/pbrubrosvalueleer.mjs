import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

router.get("/", function (req, res, next) {
  var q = ["Select idPBRubros as value,  PBRubrosDetalle as label from BasePreBalance.PBRubros"].join(" ");
  console.log('q en pbrubrosvalueleer', q);
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
