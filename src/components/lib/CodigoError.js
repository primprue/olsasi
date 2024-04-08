// import React from "react";
import Mensaje from "./Mensaje";
function CodigoError(err) {
  console.log('en CodigoError err.status  ', err.status)
  console.log('en CodigoError err.err  ', err.err)
  console.log('en CodigoError err  ', err)
  switch (err.status) {
    case 409:
      Mensaje("error", "Código/Clave ingresado EXISTENTE no se puede duplicar ");
      break;
    case 410:
      Mensaje("error", "El Código excede la cantidad de dígitos permitidos ");
      break;
    case 411:
      Mensaje("error", "Código  Usado no se puede borrar ");
      break;
    case 412:
      Mensaje(
        "error",
        "El campo numérico es más grande de lo que corresponde "
      );
      break;
    case 413:
      Mensaje("error", "Faltan datos para ingresar información en tabla");
      break;
    case 414:
      Mensaje("error", "Faltan datos para leer información en tabla");
      break;
    case 460:
      Mensaje("error", "error clave duplicada");
      break;
    case 100:
      Mensaje("success", "seleccionados ");
      break;
    default:
      Mensaje("error", "Error ", err.status, " ", err.err);
  }
}
export default CodigoError;

// Mensaje(<tipo>,<Mensaje>)

// if (err.status === 409) => 1062 => cuando se da de alta un código existente
// if (err.status === 410) => 1406 => el campo  alfanumérico más grande de lo que corresponde
// if (err.status === 412) => 1264 => el campo numérico más grande de lo que corresponde
// if (err.status === 411) => 1451 => Código  Usado no se puede borrar
// if (err.status === 413) => 1366 => Faltan datos para ingresar información en tabla
// if (err.status === 414) => 1054 => Faltan datos para leer información en tabla
