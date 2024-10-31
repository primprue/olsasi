import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkleeultnrorubro");
  } else {
    console.log("no se conecto en stkleeultnrorubro");
  }
});

const codigorubronuevo = (codigogen) => {
  return new Promise((resolve) => {
    var codrubro
    var q = [
      "Select StkGrupoContRubro as CuentaRubro",
      " from StkGrupo where idStkGrupo = ",
      codigogen
    ].join(" ");
    conexion.query(q, function (err, result) {
      if (err) {
        console.log(
          "Error  Select StkGrupoContRubro as CuentaRubro from StkGrupo"
        );
        console.log(err);
      } else {
        codrubro = result[0].CuentaRubro;
      }
    });
    resolve(codrubro);


  });
};


