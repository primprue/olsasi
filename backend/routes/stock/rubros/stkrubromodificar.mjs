import express from "express";
const router = express.Router(); // Siempre usa const para el router
import { conexion } from '../../conexion.mjs';

router.post("/", async (req, res) => {
  // 1. Extraemos los IDs de la URL (query) y los datos del cuerpo (body)
  const { idStkRubro, StkRubroCodGrp } = req.query;

  // 2. Extraemos y formateamos los datos del cuerpo
  const {
    StkRubroDesc, StkRubroAbr, StkRubroProv, StkRubroAncho,
    StkRubroPresDes, StkRubroPres, StkRubroUM, StkRubroCosto,
    StkRubroTM, StkRubroConf
  } = req.body;

  const finalDate = new Date().toISOString().split("T")[0];

  // 3. Preparamos el objeto con los campos a actualizar
  // Usar un objeto es mucho más limpio que concatenar strings
  const valoresActualizar = {
    StkRubroDesc: (StkRubroDesc || '').toUpperCase(),
    StkRubroAbr: (StkRubroAbr || '').toUpperCase(),
    StkRubroProv: Number(StkRubroProv),
    StkRubroAncho: Number(StkRubroAncho),
    StkRubroPresDes: (StkRubroPresDes || '').toUpperCase(),
    StkRubroPres: Number(StkRubroPres),
    StkRubroUM: StkRubroUM,
    StkRubroCosto: Number(StkRubroCosto),
    StkRubroTM: StkRubroTM,
    StkRubroConf: StkRubroConf,
    StkRubroFecha: finalDate
  };

  try {
    // 4. Ejecutamos la consulta usando placeholders (?) para seguridad total
    const q = 'UPDATE StkRubro SET ? WHERE idStkRubro = ? AND StkRubroCodGrp = ?';

    const [result] = await conexion.query(q, [
      valoresActualizar,
      idStkRubro,
      StkRubroCodGrp
    ]);

    // 5. Verificamos si realmente se encontró y actualizó algo
    if (result.affectedRows === 0) {
      return res.status(404).json({ leyenda: "No se encontró el registro para actualizar" });
    }

    res.json({
      leyenda: "Registro actualizado con éxito",
      result
    });

  } catch (err) {
    console.error("Error al actualizar:", err);

    // Mapeo de errores específicos
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Error: clave duplicada" });
    }
    if (err.errno === 1406 || err.errno === 1264) {
      return res.status(410).json({ message: "Dato demasiado largo o fuera de rango" });
    }

    res.status(500).json({
      leyenda: "Error interno del servidor",
      detalle: err.message
    });
  }
});

export default router;