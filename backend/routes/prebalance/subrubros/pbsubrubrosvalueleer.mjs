import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

router.get("/", function (req, res, next) {
  // var q = ["Select concat (PBidSubRubro, PBSubRubroIdRubro) as  value,  PBSubRubroDetalle as label from BasePreBalance.PBSubRubros"].join(" ");
  var q = ["SELECT PBidSubRubro as value,  PBSubRubroDetalle as label FROM BasePreBalance.PBSubRubros"].join(" ");
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
