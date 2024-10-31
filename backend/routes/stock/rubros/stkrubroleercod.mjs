import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleercod");
  } else {
    console.log("no se conecto en stkrubroleercod");
  }
});



router.get("/?:id", function (req, res, next) {
  var indice = req.params.id;

  var q = ["Select * from StkRubro where idStkRubro = ", indice].join(" ");
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
