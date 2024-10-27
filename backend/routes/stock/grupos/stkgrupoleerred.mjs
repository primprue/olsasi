import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleerred");
  } else {
    console.log("no se conecto en stkgrupoleerred");
  }
});



router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  var q = [
    //  "Select idStkGrupo, StkGrupoDesc from StkGrupo order by idStkGrupo"
    "Select idStkGrupo, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
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
