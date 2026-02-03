// import React from "react";
import Mensaje from "./Mensaje";

/**
 * @param {Object} response - Puede ser el objeto 'res' o 'err'
 * @param {String} leyendaMens - Mensaje personalizado opcional
 */
function MuestraMensaje(response, leyendaMens = "") {
  // 1. Extraemos el status. 
  // Intentamos obtenerlo de response.status (éxito/error directo)
  // o de response.response.status (típico en errores de Axios)
  const status = response?.status || response?.response?.status;
  leyendaMens = leyendaMens || response?.body?.leyenda || response?.response?.body?.leyenda;
  // 2. Definimos el diccionario de mensajes
  const mapaMensajes = {
    409: { tipo: "error", texto: leyendaMens || "Código/Clave ingresado EXISTENTE no se puede duplicar" },
    410: { tipo: "error", texto: leyendaMens || "El Código excede la cantidad de dígitos permitidos" },
    411: { tipo: "error", texto: leyendaMens || "Código usado no se puede borrar" },
    412: { tipo: "error", texto: leyendaMens || "El campo numérico es más grande de lo que corresponde" },
    413: { tipo: "error", texto: leyendaMens || "Faltan datos para ingresar información en tabla" },
    414: { tipo: "error", texto: leyendaMens || "Faltan datos para leer información en tabla" },
    415: { tipo: "error", texto: leyendaMens || "Hay datos erróneos" },
    416: { tipo: "error", texto: leyendaMens || "Clave Errónea" },
    460: { tipo: "error", texto: leyendaMens || "Error: clave duplicada" },
    515: { tipo: "warning", texto: leyendaMens || "Faltan datos" },
    100: { tipo: "success", texto: leyendaMens || "Seleccionados" },
    200: { tipo: "success", texto: leyendaMens || "Operación exitosa" },
    201: { tipo: "success", texto: leyendaMens || "Creado correctamente" },
  };

  // 3. Buscamos el mensaje en el mapa
  const config = mapaMensajes[status];

  if (config) {
    // Si el status existe en nuestro mapa, lo mostramos
    Mensaje(config.tipo, config.texto);
  } else {
    // 4. Caso por defecto (Error desconocido)
    const errorDetalle = response?.err || response?.data?.message || "";
    Mensaje("error", `Error ${status || ""}: ${errorDetalle} ${leyendaMens}`);
  }
}

export default MuestraMensaje;
// if (err.status === 409) => 1062 => cuando se da de alta un código existente
// if (err.status === 410) => 1406 => el campo  alfanumérico más grande de lo que corresponde
// if (err.status === 412) => 1264 => el campo numérico más grande de lo que corresponde
// if (err.status === 411) => 1451 => Código  Usado no se puede borrar
// if (err.status === 413) => 1366 => Faltan datos para ingresar información en tabla
// if (err.status === 414) => 1054 => Faltan datos para leer información en tabla


