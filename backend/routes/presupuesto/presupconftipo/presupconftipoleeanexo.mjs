import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleeanexo");
  } else {
    console.log("no se conecto en presupconftipoleeanexo");
  }
});

router.get("/", function (req, res, next) {
  let PresupConfTipoAnexoSN = req.query.anexo;
  let PresupConfTipoProdelab = req.query.prodelab;
  var q = ["SET @numero=0 "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  if (PresupConfTipoProdelab === 'PAE') {
    q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'N' and PresupConfTipoBack <> '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
  }
  else {
    q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'S' or PresupConfTipoBack = '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
  }

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
