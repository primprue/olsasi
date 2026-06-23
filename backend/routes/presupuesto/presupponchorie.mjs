import express from "express";
var router = express.Router();

import { conexion } from '../conexion.mjs';


async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}
router.get("/", async (req, res) => {
  try {
    const datosRec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosRec) {
      const StkRubroAbrP = item.StkRubroAbr;
      const tipoconf = item.tipoconf;
      const tipoojale = item.tipoojale;
      const detallep = item.detallep;
      const ivasn = item.ivasn;
      const minmay = item.minmay;
      let largoreal = (item.largo * 1)
      let anchoreal = (item.ancho * 1)
      let detalle = "", ganancia = 0, tipoojal = "", sogachicote = "", sogadobladillo = "";

      // definimos variables locales

      ganancia = p.coefgancsoga;
      if (minmay === "my") {
        tipoojal = p.abrojales28;
        sogachicote = p.sogachicotemay;
        ganancia = p.coefganmay;
      } else {
        coeficiente = result[0].coeficientemin;
        sogachicote = p.sogachicotemin;
      }
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;

      tipoojal = p.abrojales3h;
      sogadobladillo = p.sogadobladillo;
      const sql = `
                SELECT
                    -- costo lona
                    (r1.StkRubroCosto * m1.StkMonedasCotizacion / r1.StkRubroAncho * 1.02)  AS CostoCobMC,
                    -- costo refuerzo
                    (r2.StkRubroCosto * m2.StkMonedasCotizacion * 0.20 / 11) AS CostoRefuerzo,
                    -- costo chicote
                    (r3.StkRubroCosto * m3.StkMonedasCotizacion * 1.65)    AS CostoMSChicote,
                    -- costo dobladillo
                    (r4.StkRubroCosto * m4.StkMonedasCotizacion)    AS CostoMSDobladillo,
                    -- cotización
                    m5.StkMonedasCotizacion      AS Cotizacion,
                    -- costo del ojal
                    (r6.StkRubroCosto * m6.StkMonedasCotizacion / 144) AS CostoOjalM2,
                    -- detalle de material
                    (r7.StkRubroDesc) AS StkRubroDesc
                FROM BaseStock.StkRubro r1
                    JOIN BaseStock.StkMonedas m1 ON r1.StkRubroTM = m1.idStkMonedas,
                    BaseStock.StkRubro r2
                    JOIN BaseStock.StkMonedas m2 ON r2.StkRubroTM = m2.idStkMonedas,
                    BaseStock.StkRubro r3
                    JOIN BaseStock.StkMonedas m3 ON r3.StkRubroTM = m3.idStkMonedas,
                    BaseStock.StkRubro r4
                    JOIN BaseStock.StkMonedas m4 ON r4.StkRubroTM = m4.idStkMonedas,
                    BaseStock.StkMonedas m5,
                    BaseStock.StkRubro r6
                    JOIN BaseStock.StkMonedas m6 ON r6.StkRubroTM = m6.idStkMonedas,
                    BaseStock.StkRubro r7

                WHERE r1.StkRubroAbr = ?
                    AND r2.StkRubroAbr = ?
                    AND r3.StkRubroAbr = ?
                    AND r4.StkRubroAbr = ?
                    AND m5.idStkMonedas = ?
                    AND r6.StkRubroAbr = ?
                    AND r7.StkRubroAbr = ?
                `;
      const params = [
        StkRubroAbrP,            // subquery
        StkRubroAbrP,        // r1
        sogachicote,         // r2
        p.sogadobladillo,    // r3
        p.codmoneda,          // moneda
        tipoojal,            // subquery
        StkRubroAbrP       // r1
      ];
      const datos1 = await queryAsync(sql, params);

      //const datos1 = await queryAsync(sql);
      const d = datos1[0];
      detalle = detallep !== '' ? `${detallep} en :  ${d.StkRubroDesc}` : `Poncho para riego confeccionado en:  ${d.StkRubroDesc}`;

      const flete = Number(p.flete) || 0;
      const MOT = Number(p.MOTpM2) || 0;
      const Cotizacion = Number(d.Cotizacion) || 0;
      const CostoCobMC = Number(d.CostoCobMC) || 0;
      const CostoRefuerzo = Number(d.CostoRefuerzo) || 0;
      const CostoMSChicote = Number(d.CostoMSChicote) || 0;
      const CostoMSDobladillo = tipoconf === "cs" ? Number(d.CostoMSDobladillo) || 0 : 0;
      const costoOjalM2 = Number(d.CostoOjalM2) || 0;
      const costoFleteMot = Cotizacion * (flete + MOT);




      let costo =
        CostoCobMC +
        CostoRefuerzo +
        CostoMSChicote +
        CostoMSDobladillo +
        costoOjalM2 +
        costoFleteMot;

      const metrosCuad = largoreal * anchoreal;

      costo = costo * ganancia * p.coefimpuestos;
      costo = costo * metrosCuad;

      // soga para abolinar (ciclos)
      let ciclo = 0;
      if (metrosCuad < 12) ciclo = 3;
      else if (metrosCuad < 16) ciclo = 2;
      else if (metrosCuad < 22) ciclo = 1;

      for (let i = 0; i < ciclo; i++) {
        costo *= 1.0325;
      }


      // IVA / redondeo
      if (ivasncal === "CIVA") {
        costo = Math.ceil(costo / 10) * 10;
      } else {
        costo = Math.ceil(costo / 1.21 / 10) * 10;
      }


      // ------------------------------------------------------------------
      // 5) ARMO RESULTADO DEL ÍTEM
      // ------------------------------------------------------------------
      resultados.push({
        ImpUnitario: costo,
        Detalle: detalle,
        Largo: largoreal.toFixed(2),
        Ancho: anchoreal.toFixed(2),
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presuplonaconf", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;