import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

//cambié en la tabla de rubros de PreBalance el indice autoincremental 

router.post("/", function (req, res, next) {
  var registro = {
    PBRubrosDetalle: req.body.PBRubrosDetalle.toUpperCase(),
  };
  conexion.query("INSERT INTO BasePreBalance.PBRubros SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result);
    }
  });
});
conexion.end;
export default router;
