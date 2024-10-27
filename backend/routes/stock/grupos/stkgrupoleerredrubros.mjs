import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleer");
  } else {
    console.log("no se conecto en stkgrupoleer");
  }
});



router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  // var q = ["SET @numero=0 "].join(" ");
  // conexion.query(q, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // "Select idStkGrupo as StkRubroCodGrp, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
  var q = [
    "Select idStkGrupo as value, StkGrupoDesc as label from StkGrupo order by StkGrupoDesc"
    //"Select @numero:=@numero+1 as StkRubroCodGrp, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
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
