import express from "express";
var router = express.Router();
import { conexion } from '../../conexion.mjs';

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


router.delete("/", async (req, res) => {
  const idUnico = req.query.id;

  if (!idUnico) {
    return res.status(400).json({ leyenda: 'No se recibió el identificador para eliminar' });
  }

  try {
    // Usamos CONCAT en el WHERE ya que no podemos desarmar el string
    const q = 'DELETE FROM StkRubro WHERE CONCAT(idStkRubro, StkRubroCodGrp, StkRubroAbr) = ?';
    const result = await queryAsync(q, [idUnico]);


    return res.status(200).json({
      leyenda: 'StkRubro borrado correctamente',
      registrosEliminados: result.affectedRows
    });

  } catch (err) {
    // --- MAPEO DE ERRORES DE BASE DE DATOS ---

    // 1. RESTRICCIÓN DE LLAVE FORÁNEA (El más importante en DELETE)
    // Error 1451: No se puede borrar porque este rubro está siendo usado en otra tabla (ej. Productos)
    if (err.errno === 1451 || err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        leyenda: 'No se puede eliminar: este rubro  tiene items o movimientos asociados.'
      });
    }

    // 2. TIMEOUT O BLOQUEO DE TABLA
    // Error 1205: La tabla está bloqueada por otra transacción
    if (err.errno === 1205) {
      return res.status(503).json({ leyenda: 'La base de datos está ocupada, intenta de nuevo en unos segundos.' });
    }

    // 3. ERROR DE PERMISOS
    // Error 1142: El usuario de la base de datos no tiene permiso de DELETE
    if (err.errno === 1142) {
      return res.status(403).json({ leyenda: 'No tienes permisos suficientes para eliminar registros.' });
    }

    // Caso: No hubo error, pero no se borró nada (el ID no existía)
    if (result.affectedRows === 0) {
      return res.status(404).json({
        leyenda: 'No se encontró el rubro. Es posible que ya haya sido eliminado.'
      });
    }

    // 4. ERRORES DE CONEXIÓN O SINTAXIS
    console.error('Error crítico al borrar StkRubro:', err);
    return res.status(500).json({
      leyenda: 'Error interno del servidor',
      detalle: err.message
    });
  }
});
export default router;