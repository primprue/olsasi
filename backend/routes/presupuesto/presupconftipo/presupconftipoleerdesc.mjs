import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleerdesc");
  } else {
    console.log("no se conecto en presupconftipoleerdesc");
  }
});



router.get("/", function (req, res, next) {

  var PresupConfTipoDesc = req.query.descripcion;
  console.log('PresupConfTipoDesc presupconftipoleerdesc ', PresupConfTipoDesc)
  var q = ["Select * from BasePresup.PresupConfTipo where PresupConfTipoDesc = '" + PresupConfTipoDesc + "'"].join("");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('presupconftipoleerdesc result ', result)
      res.json(result);
    }
  });
});
conexion.end;
export default router;
