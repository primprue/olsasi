import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkunmedleercod");
  } else {
    console.log("no se conecto en stkunmedleercod");
  }
});




router.get("/?:id", function (req, res, next) {
  var indice = req.params.id;
  conexion.query(
    'Select * from StkUnMed  where idStkUnMed = "' + indice + '"',
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
