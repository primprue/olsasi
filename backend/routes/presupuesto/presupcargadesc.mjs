import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';

// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------

async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}
router.get('/', async (req, res, next) => {

  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const resultados = [];

    for (const item of datosrec) {
      const {
        StkRubroAbr,
        importe,
        detallep,
        ancho,
        largo,
      } = item;

      const q = `
        SELECT
          StkRubroDesc, StkRubroAbr
          FROM BaseStock.StkRubro
        WHERE StkRubro.StkRubroAbr = ?
      `;
      const params = [StkRubroAbr];
      const r = await queryAsync(q, params);
      const d = r[0];
      let Detalle = ''

      if (StkRubroAbr === 'PUNT') {
        Detalle = detallep
      } else {
        Detalle = `${detallep} en: ${d.StkRubroDesc}`
      }

      resultados.push({
        ImpUnitario: Number(importe).toFixed(2),
        Detalle: Detalle,
        Largo: Number(largo).toFixed(2),
        Ancho: Number(ancho).toFixed(2),
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presupcargadesc", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;