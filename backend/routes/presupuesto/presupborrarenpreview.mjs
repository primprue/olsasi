import express from "express";
var router = express.Router();

import moment from "moment";
import { conexion } from '../conexion.mjs';
import variables from '../../public/variables.mjs';
import { exec } from 'child_process';
moment.locale("es");



router.delete("/", function (req, res, next) {
  var respuesta = []
  // var nombrepresup = req.query.nombrepresup;
  // var comando = 'rm ' + variables.caminoynombrearch + nombrepresup
  var comando = 'rm ' + variables.caminoynombrearch + "/Presupuesto*.*"
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      console.error(`error: ${error.code}`);
      respuesta.push(error.message)
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      respuesta.push(stderr)
      return;
    }
    respuesta.push(`${stdout}`)
    res.json(respuesta);
  });


});
conexion.end;
export default router;

