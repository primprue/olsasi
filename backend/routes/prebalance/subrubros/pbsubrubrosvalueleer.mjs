import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbsubrubrosvalueleer");
  } else {
    console.log("no se conecto en pbsubrubrosvalueleer");
  }
});



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
