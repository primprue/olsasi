var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleeanexo");
  } else {
    console.log("no se conecto en presupconftipoleeanexo");
  }
});

var router = express();
router.get("/", function (req, res, next) {
  PresupConfTipoAnexoSN = req.query.anexo;
  PresupConfTipoProdelab = req.query.prodelab;
  var q = ["SET @numero=0 "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  if (PresupConfTipoProdelab === 'PAE') {
    var q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'N' and PresupConfTipoBack <> '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
  }
  else {
    var q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc, PresupConfTipoImprime  from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "' and PresupConfTipoPElab = 'S' or PresupConfTipoBack = '/presupunid'  group by PresupConfTipoDesc, PresupConfTipoImprime  order by PresupConfTipoDesc "].join(" ");
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
module.exports = router;
