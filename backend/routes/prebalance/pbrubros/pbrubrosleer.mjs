import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbrubrosleer");
  } else {
    console.log("no se conecto en pbrubrosleer");
  }
});



router.get("/", function (req, res, next) {
  var q = ["Select idPBRubros as id,  PBRubrosDetalle from BasePreBalance.PBRubros"].join(" ");
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
