import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/:codgrupo", function (req, res, next) {
  var codgrupo = req.params.codgrupo;

  conexion.query("Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroCodGrp < " + codgrupo + "  order by StkRubroCodGrp", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
