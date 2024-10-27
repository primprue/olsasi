import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkubfisicaleercod");
  } else {
    console.log("no se conecto en stkubfisicaleercod");
  }
});



router.get("/?:StkUbFisicaGeo", function (req, res, next) {
  indice = req.params.StkUbFisicaGeo;

  conexion.query(
    'Select * from StkUbFisica  where StkUbFisicaGeo = "' + indice + '" order by idStkUbFisica ',
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

conexion.end;
export default router;
