import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleerselec");
  } else {
    console.log("no se conecto en stkgrupoleerselec");
  }
});



router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  var q = ["Select idStkGrupo as value, StkGrupoAbr,  StkGrupoDesc as label, StkGrupoContRubro from StkGrupo "].join(" ");
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
