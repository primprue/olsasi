import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en movstockleetipoconf");
  } else {
    console.log("no se conecto en movstockleetipoconf");
  }
});

router.get("/", function (req, res, next) {
  var q = ["SET @numero=0 "].join(" ");
  var sindato = " "
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });

  var q = ["SELECT @numero:=@numero+1 as NroConfTipo, PresupConfTipoDesc, PresupConfTipoImprime FROM BasePresup.PresupConfTipo where PresupConfTipoBack <> '" + " " + "' group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");

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
