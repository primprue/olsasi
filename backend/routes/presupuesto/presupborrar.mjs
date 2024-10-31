import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../conexion.mjs";
import variables from '../../public/variables.mjs';
import { exec } from 'child_process';
moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupborrar");
  } else {
    console.log("no se conecto en presupborrar");
  }
});


router.delete("/", function (req, res, next) {
  var errores = []
  var respuesta = []
  var indice = req.query.id;
  var nombrepresup = 'Presupuesto\\ nro\\ ' + indice + '*.pdf'
  var comando = 'rm ' + variables.dirpresupdocumento + nombrepresup
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      console.error(`error: ${error.code}`);
      respuesta.push(error.message)
      return;
    }
    if (error.code === 1) {
      respuesta.push(error.code)
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      respuesta.push(stderr)
      return;
    }
    respuesta.push(`${stdout}`)
  });
  var q = ["delete", ' from BasePresup.PresupEncab where idPresupEncab = ', indice].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código " });
      }
      {
        console.log(err);
      }
    } else {
      respuesta.push(result)
    }

    var q = ['DELETE FROM BasePresup.PresupRenglon WHERE PresupRenglonNroPresup = ', indice].join(" ");
    conexion.query(q, function (err, result) {
      if (err) {
        if (err.errno == 1451) {
          return res
            .status(411)
            .send({ message: "error Código " });
        }
        {
          console.log(err);
        }
      } else {
        respuesta.push(result)
        res.json(respuesta);
        respuesta = [];
      }
    });
  });

});
conexion.end;
export default router;

