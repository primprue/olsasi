import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}


router.get("/", async (req, res) => {
  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosrec) {
      const {
        cantidad,
        StkRubroAbr,
        ivasn,
        minmay,
      } = item;
      let coeficiente = 0;
      let ivasnvar = ivasn
      if (minmay == 'my') {
        coeficiente = Number(p.coeficientemay) || 0;
        ivasnvar = 'CIVA'
      }
      else {
        coeficiente = Number(p.coeficientemin) || 0;
      }
      const q = `
          SELECT 
            StkRubroDesc,   StkRubroAbr,
            (StkRubroCosto * StkMonedasCotizacion * ${coeficiente})       AS ImpUnitario,
            (StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * ${cantidad})   AS ImpItem,
            StkRubroCosto,
            StkMonedasCotizacion,
            StkRubroDesc,
            StkRubroUM
          FROM BaseStock.StkRubro
          JOIN BaseStock.StkMonedas
            ON StkRubro.StkRubroTM = idStkMonedas
          WHERE StkRubro.StkRubroAbr = '${StkRubroAbr}'
          `;

      let param = [coeficiente, coeficiente, cantidad, StkRubroAbr];

      const result = await queryAsync(q, param);
      const data = result[0];
      let impu = 0
      let detalle = `${data.StkRubroUM}  en :  ${data.StkRubroDesc}`
      if (ivasnvar == 'CIVA') {
        data.ImpItem = Number(data.ImpItem).toFixed(0)
        impu = Number(data.ImpUnitario).toFixed(0)
      }
      else {
        data.ImpItem = Number(data.ImpItem).toFixed(0) / 1.21
        impu = Number(data.ImpUnitario).toFixed(0) / 1.21
      }

      resultados.push({
        ImpUnitario: impu,
        Detalle: detalle,
        Largo: 0,
        Ancho: 0,
        MDesc: "S",
      });
    }

    res.json(resultados);

  } catch (error) {
    console.log("Error en /presupunid", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;