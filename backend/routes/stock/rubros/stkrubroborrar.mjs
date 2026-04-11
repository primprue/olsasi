import express from "express";
const router = express.Router(); // Cambiado a const
import { conexionpool } from '../../conexion.mjs';

router.delete("/", async (req, res) => {
  // const idUnico = req.query.id;
  const idUnico = req.query.id;
  if (!idUnico) {
    return res.status(400).json({ leyenda: 'No se recibió el identificador para eliminar' });
  }

  try {
    const q = 'DELETE FROM StkRubro WHERE CONCAT(idStkRubro, StkRubroCodGrp, StkRubroAbr) = ?';

    // Con mysql2/promise, usamos destructuring para obtener el resultado [result]
    const [result] = await conexionpool.query(q, [idUnico]);

    // Caso: Consulta exitosa pero no se borró nada (el ID no existía)
    // Esto va aquí, porque NO dispara el catch
    if (result.affectedRows === 0) {
      return res.status(404).json({
        leyenda: 'No se encontró el rubro. Es posible que ya haya sido eliminado.'
      });
    }

    // Respuesta exitosa
    return res.status(200).json({
      leyenda: 'StkRubro borrado correctamente',
      registrosEliminados: result.affectedRows
    });

  } catch (err) {
    // --- MAPEO DE ERRORES DE BASE DE DATOS ---

    // 1. RESTRICCIÓN DE LLAVE FORÁNEA (Error 1451)
    if (err.errno === 1451 || err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        leyenda: 'No se puede eliminar: este rubro tiene items o movimientos asociados.'
      });
    }

    // 2. TIMEOUT O BLOQUEO DE TABLA (Error 1205)
    if (err.errno === 1205) {
      return res.status(503).json({
        leyenda: 'La base de datos está ocupada, intenta de nuevo en unos segundos.'
      });
    }

    // 3. ERROR DE PERMISOS (Error 1142)
    if (err.errno === 1142) {
      return res.status(403).json({
        leyenda: 'No tienes permisos suficientes para eliminar registros.'
      });
    }

    // 4. ERRORES CRÍTICOS (Conexión, sintaxis, etc.)
    console.error('Error crítico al borrar StkRubro:', err);
    return res.status(500).json({
      leyenda: 'Error interno del servidor',
      detalle: err.message
    });
  }
});

export default router;