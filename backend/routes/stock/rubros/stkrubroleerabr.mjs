import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerabr");
  } else {
    console.log("no se conecto en stkrubroleerabr");
  }
});



router.get("/", function (req, res, next) {
  var indice = req.params.id;

  var q = ["Select  StkRubroAbr, StkRubroDesc from StkRubro order by StkRubroDesc"].join(" ");
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
