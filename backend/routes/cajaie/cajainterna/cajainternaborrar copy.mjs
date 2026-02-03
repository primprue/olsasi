import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.delete("/", function (req, res, next) {
  var indice = req.query.id;
  var q = `delete from BaseCaja.CajaInterna where idCajaInterna = ${indice}`;
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de CajaInterna usado en otra tabla" });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }
  });
});
conexion.end;
export default router;
