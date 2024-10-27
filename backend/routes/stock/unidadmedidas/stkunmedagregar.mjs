import express from "express";
var router = express.Router();
import path from "path";
import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

//router = express();
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkunmedagregar");
  } else {
    console.log("no se conecto en stkunmedagregar");
  }
});

router.post("/", function (req, res, next) {
  var registro = {
    idStkUnMed: req.body.idStkUnMed,
    StkUnMedDesc: req.body.StkUnMedDesc.toUpperCase()
  };
  var saludo = "";

  conexion.query("INSERT INTO StkUnMed SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(460).send({ message: "error clave duplicada" });
      } else if (err.errno == 1406 || err.errno == 1264) {
        return res.status(410).send({ message: "Texto demasiado largo" });
      }
      {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

export default router;
