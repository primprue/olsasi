import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkubfisicaleer");
  } else {
    console.log("no se conecto en stkubfisicaleer");
  }
});



router.get("/", function (req, res, next) {
  conexion.query("Select idStkUbFisica as id, StkUbFisicaGeo from StkUbFisica ", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
