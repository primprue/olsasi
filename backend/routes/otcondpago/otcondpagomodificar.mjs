import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';



router.post("/?:id", function (req, res) {
  var indice = req.params.id;
  var otcondpagodesc = req.body.OTCondPagoDesc;
  var q = [
    'update BasesOrdenes.OTCondPago set OTCondPagoDesc = "',
    otcondpagodesc,
    '" where idOTCondPago = ',
    indice
  ].join("");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

export default router;
