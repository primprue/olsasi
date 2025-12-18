import express from 'express';
var router = express.Router();
import conexion from "../conexion.mjs";

conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presupbrazosextens");
  } else {
    console.log("base de datos conectada en presupbrazosextens");
  }
});

// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
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
        WHERE StkRubro.StkRubroAbr = "${StkRubroAbr}"
      `;

      const r = await queryAsync(q);
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