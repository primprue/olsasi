import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrupoagregar");
  } else {
    console.log("no se conecto en stkrupoagregar");
  }
});

router.post("/", function (req, res, next) {
  var registro = {
    StkGrupoDesc: req.body.StkGrupoDesc.toUpperCase(),
    StkGrupoAbr: req.body.StkGrupoAbr.toUpperCase(),
    StkGrupoContRubro: 0
  };

  conexion.query("INSERT INTO StkGrupo SET ?", registro, function (err, result) {
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
