import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.get("/", function (req, res, next) {
  var q = ['Select idStkRubro, StkRubroCodGrp, StkRubroDesc as label , StkRubroAbr as value, StkRubroProv, StkRubroAncho, StkRubroPres, StkRubroPresDes, StkRubroUM, ',
    'StkRubroCosto, StkRubroTM, StkRubroConf from  StkRubro order by StkRubroDesc '].join(" ");

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
