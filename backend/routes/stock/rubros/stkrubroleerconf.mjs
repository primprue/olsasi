import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconf");
  } else {
    console.log("no se conecto en stkrubroleerconf ");
  }
});



router.get("/", async function (req, res, next) {
  var cuallee = req.query.cuallee;
  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc.
  console.log('cuallee', cuallee);
  var q = "";
  if (cuallee === 'T') {
    q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  }
  else {
    q = ["Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = '" + cuallee + "' order by StkRubroDesc"].join("");
  }
  console.log('q', q);
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
