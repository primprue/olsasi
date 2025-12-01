import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");


router.post("/", function (req, res, next) {
  var registro = {
    idStkUbFisica: req.body.idStkUbFisica,
    StkUbFisicaGeo: req.body.StkUbFisicaGeo
  };

  conexion.query("INSERT INTO StkUbFisica SET ?", registro, function (
    err,
    result
  ) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

export default router;
