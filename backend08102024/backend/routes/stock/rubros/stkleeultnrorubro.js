var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

moment.locale("es");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkleeultnrorubro");
  } else {
    console.log("no se conecto en stkleeultnrorubro");
  }
});

 const codigorubronuevo = (codigogen)  => {
  return new Promise((resolve) => {

    var q = [
          "Select StkGrupoContRubro as CuentaRubro",
          " from StkGrupo where idStkGrupo = ",
          codigogen
        ].join(" ");
        conexion.query(q, function(err, result) {
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


// function codigorubronuevo(codigogen) {
//   console.log('en la funcion codigogen  ', codigogen)
//   var q = [
//     "Select StkGrupoContRubro as CuentaRubro",
//     " from StkGrupo where idStkGrupo = ",
//     codigogen
//   ].join(" ");
//   console.log('en la funcion q  ', q)
//   conexion.query(q, function(err, result) {
//     if (err) {
//       console.log(
//         "Error  Select StkGrupoContRubro as CuentaRubro from StkGrupo"
//       );
//       console.log(err);
//     } else {
//       codrubro = result[0].CuentaRubro;
//       console.log('en la funcion   ', codrubro)
//     }
//   });
  
//   return codrubro;
// }

// exports.codigorubronuevo = codigorubronuevo;
