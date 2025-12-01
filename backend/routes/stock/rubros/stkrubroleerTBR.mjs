import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";



router.get("/", function (req, res, next) {

  var q = ["Select StkRubroDesc as StkRubroDescTBR , StkRubroAbr as StkRubroAbrTBR from StkRubro where StkRubroAbr > 'TBR' and StkRubroAbr <= 'TBR99'  order by StkRubroDesc"].join("");

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
