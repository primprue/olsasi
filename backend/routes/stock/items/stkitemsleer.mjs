import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsleer");
  } else {
    console.log("no se conecto en stkitemsleer");
  }
});



router.get("/", function (req, res, next) {
  var q = ["Select * from StkItems "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
