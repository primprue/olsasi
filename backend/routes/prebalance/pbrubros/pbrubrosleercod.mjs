import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbrubrosleercod");
  } else {
    console.log("no se conecto en pbrubrosleercod");
  }
});



router.get("/", async function (req, res, next) {
  var indice = req.query.id;
  var q = ["Select * from BasePreBalance.PBRubros where idPBRubros = ", indice].join(" ");
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
