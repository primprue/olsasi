import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", async function (req, res, next) {
  var cuallee = req.query.cuallee;
  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc.
  var q = "";
  if (cuallee === 'T') {
    q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  }
  else {
    q = ["Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = '" + cuallee + "' order by StkRubroDesc"].join("");
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
