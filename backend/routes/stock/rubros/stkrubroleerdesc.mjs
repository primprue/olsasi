import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerdesc");
  } else {
    console.log("no se conecto en stkrubroleerdesc ");
  }
});



router.get("/?:codgrupo", function (req, res, next) {
  codgrupo = req.params.codgrupo;

  conexion.query("Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroCodGrp < " + codgrupo + "  order by StkRubroCodGrp", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
