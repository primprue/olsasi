import express from "express";
import { conexion } from '../../conexion.mjs';

const router = express.Router();

// Tu función auxiliar para Promesas
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.delete("/:id", async (req, res) => {
  const indice = req.params.id;

  // 1. Usamos parámetros (?) para evitar Inyección SQL (Seguridad)
  const q = `DELETE FROM BasePresup.PresupDetPie WHERE idPresupDetPie = ?`;

  try {
    // 2. Ejecutamos la query con await
    const result = await queryAsync(q, [indice]);

    // 3. Respuesta de éxito
    // Enviamos un objeto que MuestraMensaje pueda leer (status + leyenda)
    return res.status(200).json({
      status: 200,
      leyenda: "Pie de Presupuesto eliminado correctamente",
      data: result.rows
    });

  } catch (err) {
    // 4. Manejo de errores específicos
    if (err.errno === 1451) {
      return res.status(411).json({
        status: 411,
        leyenda: "error: Código de Pie de Presupuesto usado en otra tabla"
      });
    }

    // 5. Error genérico del servidor
    console.error("Error en DELETE:", err);
    return res.status(500).json({
      status: 500,
      leyenda: "Error interno del servidor Pie de Presupuesto",
      err: err.message
    });
  }
});

export default router;