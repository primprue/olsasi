import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";



router.get("/", function (req, res, next) {

  var q = ["SET @numero=0;", "SELECT @numero:=@numero+1 as NroConfTipo, PresupConfTipoDesc, PresupConfTipoImprime FROM BasePresup.PresupConfTipo where PresupConfTipoBack <> '" + " " + "' group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result[1]);
    }
  });
});
conexion.end;
export default router;
