import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

import moment from 'moment';

moment.locale('es');

//   
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en otdatosmodificar");
  } else {
    console.log("no se conecto en otdatosmodificar");
  }
});

router.post("/", async function (req, res, next) {
  var q = [
    'UPDATE BasesOrdenes.OTDatos SET  ',

    ' OTDatosDesc =  "', req.body.OTDatosDesc,
    '" OTDatosOpciones = "', req.body.OTDatosOpciones,
    '" OTDatosTipoPed = "', req.body.OTDatosTipoPed,
    '" OTDatosRequerido = "', req.body.OTDatosRequerido,
    '" OTDatosOrdenAparicion = ', req.body.OTDatosOrdenAparicion,
    ' OTDatosAncho = ', req.body.OTDatosAncho,
    ' WHERE idOTDatos  =  ', req.query.id,

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
