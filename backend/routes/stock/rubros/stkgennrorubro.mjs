

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