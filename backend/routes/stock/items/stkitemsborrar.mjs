import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.delete("/", async function (req, res, next) {

  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubroAbr = req.query.StkItemsRubroAbr;

  var q = [
    "delete from StkItems where idStkItems = ",
    idStkItems,
    " and StkItemsGrupo = ",
    StkItemsGrupo,
    " and StkItemsRubroAbr = '",
    StkItemsRubroAbr,
    "'"
  ].join("");
  console.log('q', q);
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Items usado en otra tabla" });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }
  });
});

export default router;
