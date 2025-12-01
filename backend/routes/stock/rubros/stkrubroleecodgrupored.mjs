import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


router.get("/?:idStkGrupo", function (req, res, next) {
  var indice = req.params.idStkGrupo;
  var q = [
    "Select idStkRubro , StkRubroDesc from StkRubro where StkRubroCodGrp = ",
    indice,
    " order by StkRubroDesc "
  ].join(" ");

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
