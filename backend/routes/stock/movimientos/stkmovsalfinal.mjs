import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

router.post("/", async function (req, res, next) {
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;

  var cantidad = req.body.cantidad;
  var cantidad1 = req.body.cantidad1;
  var cantmod = cantidad * cantidad1 * -1;
  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];
  var StkItemsFAct = finalDate;
  // Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1

  conexion.query(
    "UPDATE StkItems SET StkItemsCantidad = (StkItemsCantidad + " +
    cantmod +
    '), StkItemsFAct = "' +
    StkItemsFAct +
    '" WHERE idStkItems = ' +
    idStkItems +
    " and  StkItemsGrupo = " +
    StkItemsGrupo +
    " and  StkItemsRubro = " +
    StkItemsRubro,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

export default router;
