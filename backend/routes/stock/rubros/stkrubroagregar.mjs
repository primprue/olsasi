import express from "express";
const router = express.Router();
import { conexionpool } from '../../conexion.mjs';
import { buscacodigo } from './stkgennrorubro.mjs';

router.post("/", async (req, res) => {
  const {
    StkRubroCodGrp, StkRubroDesc, StkRubroAbr, StkRubroProv,
    StkRubroAncho, StkRubroPresDes, StkRubroPres, StkRubroUM,
    StkRubroCosto, StkRubroTM, StkRubroConf
  } = req.body;

  const codgrupo = Number(StkRubroCodGrp);
  const finalDate = new Date().toISOString().slice(0, 10);

  try {
    // PASO 1: Generar el nuevo ID de Rubro
    // (Asegúrate que buscacodigo también esté usando promesas internamente)
    const nuevoIdRubro = await buscacodigo(codgrupo);

    // PASO 2: Insertar en StkRubro
    const registroRubro = {
      idStkRubro: nuevoIdRubro,
      StkRubroCodGrp: codgrupo,
      StkRubroDesc: (StkRubroDesc || '').toUpperCase(),
      StkRubroAbr: (StkRubroAbr || '').toUpperCase(),
      StkRubroProv: Number(StkRubroProv || 0),
      StkRubroAncho: Number(StkRubroAncho || 0),
      StkRubroPresDes: (StkRubroPresDes || '').toUpperCase(),
      StkRubroPres: Number(StkRubroPres || 0),
      StkRubroUM: StkRubroUM,
      StkRubroCosto: Number(StkRubroCosto || 0),
      StkRubroTM: StkRubroTM,
      StkRubroConf: StkRubroConf,
      StkRubroFecha: finalDate,
    };

    // Usamos conexion.query directamente (gracias a mysql2/promise)
    await conexionpool.query("INSERT INTO StkRubro SET ?", [registroRubro]);

    // PASO 3: Insertar en StkItems
    const registroItems = {
      idStkItems: 1, // ¿Este ID es fijo o autoincremental?
      StkItemsGrupo: codgrupo,
      StkItemsRubro: nuevoIdRubro,
      StkItemsRubroAbr: (StkRubroAbr || '').toUpperCase(),
      StkItemsDesc: '',
      StkItemsOTD: 'S',
      StkItemsCantidad: 0,
      StkItemsCantDisp: 0,
      StkItemsFAct: finalDate,
      StkItemsMin: 1,
      StkItemsMax: 2
    };

    await conexionpool.query("INSERT INTO StkItems SET ?", [registroItems]);

    // Respuesta exitosa
    return res.status(201).json({
      leyenda: 'Rubro e Item creados correctamente',
      idGenerado: nuevoIdRubro // Antes decía req.body.idStkRubro
    });

  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores específicos de SQL
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Clave duplicada" });
    }
    if (err.errno === 1406) {
      return res.status(410).json({ message: "Dato demasiado largo para una columna" });
    }

    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});

export default router;