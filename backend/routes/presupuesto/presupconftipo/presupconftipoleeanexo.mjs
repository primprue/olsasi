import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", function (req, res, next) {
  let PresupConfTipoAnexoSN = req.query.anexo;
  let PresupConfTipoProdelab = req.query.prodelab;


  if (PresupConfTipoProdelab === 'PAE') {
    var q = ["SET @numero=0;", " SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'N' and PresupConfTipoBack <> '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
  }
  else {
    var q = ["SET @numero=0;", " SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'S' or PresupConfTipoBack = '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
  }
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
