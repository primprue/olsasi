import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en en en en stkrubroleecodgryrb");
  } else {
    console.log("no se conecto en en stkrubroleecodgryrb");
  }
});



router.get("/", async function (req, res, next) {
  idStkRubro = req.query.idStkRubro;
  StkRubroCodGrp = req.query.idStkGrupo;

  var q = [
    "Select * from StkRubro where idStkRubro = ",
    idStkRubro,
    " and  StkRubroCodGrp  = ",
    StkRubroCodGrp
  ].join(" ");

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
