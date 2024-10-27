import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleecodgrupo");
  } else {
    console.log("no se conecto en stkrubroleecodgrupo");
  }
});



//router.all("/", async function(req, res, next) {
router.get("/?:idStkGrupo", function (req, res, next) {
  indice = req.params.idStkGrupo;

  var q = ["Select * from StkRubro where StkRubroCodGrp = ", indice].join(" ");

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
