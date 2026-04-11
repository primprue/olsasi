import express from "express";
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';


router.delete("/", async (req, res) => {

  const idUnico = req.query.id;
  console.log('idUnico', idUnico)
  try {
    const q = `delete from StkUbFisica where Concat(idStkUbFisica) = ?`;
    const [result] = await conexionpool.query(q, [idUnico]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        leyenda: 'No se encontró el StkUbFisica. Es posible que ya haya sido eliminado.'
      });
    }
    return res.status(200).json({
      leyenda: 'Ubicacion fisica eliminada correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);

    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});


export default router;
