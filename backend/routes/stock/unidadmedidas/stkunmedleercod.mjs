import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


router.get("/?:id", function (req, res, next) {
  var indice = req.params.id;
  conexion.query(
    'Select * from StkUnMed  where idStkUnMed = "' + indice + '"',
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});
conexion.end;
export default router;
