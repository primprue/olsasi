// import express from "express";
// var router = express.Router();

// import moment from "moment";
// import {conexion} from '../../conexion.mjs';

// var codrubro = 0;
// moment.locale("es");



// function buscacodigo(codgrupo) {
//   var q = [
//     "UPDATE StkGrupo ",
//     " SET StkGrupoContRubro = StkGrupoContRubro + ",
//     1,
//     " where idStkGrupo = ",
//     codgrupo
//   ].join(" ");
//   conexion.query(q, function (err, result) {
//     if (err) {
//       console.log("Error en UPDATE StkGrupo");
//       console.log(err);
//     } else {
//       console.log("actualizado en grupo el codigo de rubros");
//     }
//   });
// }

// // export { buscacodigo };
// import {conexion} from '../../conexion.mjs';

// /**
//  * Actualiza el contador de rubros en un grupo específico.
//  * @param {number|string} codgrupo - El ID del grupo a actualizar.
//  * @returns {Promise<void>}
//  */
// async function buscacodigo(codgrupo) {
//   // 1. Usamos una consulta parametrizada con "?" para evitar Inyección SQL
//   const q = "UPDATE StkGrupo SET StkGrupoContRubro = StkGrupoContRubro + 1 WHERE idStkGrupo = ?";

//   try {
//     // 2. Usamos await para asegurarnos de que termine antes de seguir
//     // Nota: Asegúrate de que 'conexion' tenga un método para promesas o usa util.promisify
//     const result = await conexion.query(q, [codgrupo]);

//     console.log(`Grupo ${codgrupo} actualizado: contador incrementado.`);
//     return result;
//   } catch (err) {
//     console.error("Error en UPDATE StkGrupo:", err);
//     // 3. Lanzamos el error para que el router que llama a esta función pueda atraparlo
//     throw err;
//   }
// }

// export { buscacodigo };


//import express from "express";

import { conexion } from '../../conexion.mjs';

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// stkgennrorubro.mjs
async function buscacodigo(codgrupo) {
  try {
    // 1. Incrementamos el contador
    const updateQ = "UPDATE StkGrupo SET StkGrupoContRubro = StkGrupoContRubro + 1 WHERE idStkGrupo = ?";
    await queryAsync(updateQ, [codgrupo]);

    // 2. Obtenemos el nuevo valor generado
    const selectQ = "SELECT StkGrupoContRubro FROM StkGrupo WHERE idStkGrupo = ?";
    const rows = await queryAsync(selectQ, [codgrupo]);

    if (rows.length === 0) throw new Error("Grupo no encontrado");

    // Devolvemos el nuevo ID
    return rows[0].StkGrupoContRubro;
  } catch (err) {
    console.error("Error al generar ID de rubro:", err);
    throw err;
  }
}
export { buscacodigo };