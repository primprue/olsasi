import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";



// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}

router.get("/", async (req, res) => {

  try {
    const datosRec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];
    const paramrep = await queryAsync(`SELECT * FROM reparacion.parametrosrep`);
    const vhln = paramrep[0].REPValorMOT;
    const vhla = paramrep[0].REPValorMOTLA;
    const resultados = [];

    for (const item of datosRec) {
      const cantidad = Number(item.cantidad);
      const tipoojale = item.tipoojale;
      const detallep = item.detallep;
      const StkRubroAbrP = item.StkRubroAbr;
      const ivasn = item.ivasn;
      const largoreal = Number(item.largo);
      const anchoreal = Number(item.ancho);
      const minmay = item.minmay;
      const largo = Number(item.largo) + 0.08;
      const ancho = Number + 0.08;
      const lna = item.lonanuestraafuera;

      let detalle = "", ganancia = 0, minutosunion = 0;
      let valorhora = 0, coeficiente = 0, tipoojal = "", sogachicote = "", sogadobladillo = "";

      (detallep == "" || detallep == undefined) ? detalle = `Cambio de paño lona` : detalle = detallep;

      lna === 'LN' ? valorhora = vhln : valorhora = vhla


      ganancia = p.coefgancsoga

      if (minmay == 'my') {
        coeficiente = p.coeficientemay;
        tipoojal = p.abrojales28;
        sogachicote = p.sogachicotemay;
        ganancia = p.coefganmay
        ivasn = 'CIVA'
      }
      else {
        coeficiente = p.coeficientemin;
        sogachicote = p.sogachicotemin;

      }
      (tipoojale == 'hz') ? tipoojal = p.abrojales3hz : tipoojal = p.abrojales3b

      minutosunion = (ancho + 0.08) * largo * 5;
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
        StkRubroAbrP,
        StkRubroAbrP,
        sogachicote,
        p.sogadobladillo,
        p.codmoneda,
        tipoojal,
        StkRubroAbrP
      ];
      const datos1 = await queryAsync(sql, params);
      const d = datos1[0];

      (tipoojale == 'hz') ?
        detalle = `${detalle}   en : ${d.StkRubroDesc}`
        :
        detalle = `${detalle} c/ojales de bronce en : ${d.StkRubroDesc}`


      const flete = Number(p.flete) || 0;
      const MOT = Number(p.MOTpM2) || 0;
      const Cotizacion = Number(d.Cotizacion) || 0;
      const CostoCobMC = Number(d.CostoCobMC) || 0;
      const CostoRefuerzo = Number(d.CostoRefuerzo) || 0;
      const CostoMSChicote = Number(d.CostoMSChicote) || 0;
      const CostoMSDobladillo = Number(d.CostoMSDobladillo);
      const costoOjalM2 = Number(d.CostoOjalM2) || 0;
      const costoFleteMot = Cotizacion * (flete + MOT);
      const costohora = (Number(valorhora) / 60 * 21 * anchoreal * 2)
      let costo =
        CostoCobMC +
        CostoRefuerzo +
        CostoMSChicote +
        CostoMSDobladillo +
        costoOjalM2 +
        costoFleteMot;
      console.log('costo  ', costo)

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

      costo = costo + costohora
      // IVA / redondeo
      if (ivasn === "CIVA") {
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
    console.log("Error en /presupcambpanio", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
