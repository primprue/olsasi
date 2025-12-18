import express from "express";
import conexion from "../conexion.mjs";

const router = express.Router();

conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presuplonaabolinada");
  } else {
    console.log("base de datos conectada en presuplonaabolinada");
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

// ------------------------------------------------------------------
// ENDPOINT
// ------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const datosRec = JSON.parse(req.query.datoscalculo);
    // 1) Cargo parámetros una sola vez
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosRec) {

      // ------------------------------------------------------------------
      // 2) PREPARO LOS VALORES DEL ITEM
      // ------------------------------------------------------------------
      const cantidad = item.cantidad;
      const tipoojale = item.tipoojale;
      const detallep = item.detallep;
      const ojalescada = item.presupojalesc;
      const StkRubroAbrP = item.StkRubroAbr;
      const largoreal = parseFloat(item.largo);
      const anchoreal = parseFloat(item.ancho);
      const perimetro = largoreal * 2 + anchoreal * 2;

      const largo = largoreal + 0.08;
      const ancho = anchoreal + 0.08;

      // coeficientes
      let coef = p.coeficientemin;
      let sogachicote = p.sogachicotemin;
      let ganancia = p.coefgancsoga;
      let ivasn = item.ivasn;

      if (item.minmay == "my") {
        coef = p.coeficientemay;
        sogachicote = p.sogachicotemay;
        ganancia = p.coefganmay;
        ivasn = "CIVA";
      }

      const tipoojal = (tipoojale === "hz") ? "OHCOL" : "OBCOL";
      const detojal = (tipoojale === "hz") ? " de hierro " : " de bronce ";

      // ------------------------------------------------------------------
      // 3) QUERY PRINCIPAL COMPLETA (todo junto)
      // ------------------------------------------------------------------
      const sql = `
        SELECT
          -- costo lona
          (r1.StkRubroCosto * m1.StkMonedasCotizacion / r1.StkRubroAncho * 1.02)  AS CostoCobMC,

          -- costo soga chicote
          (r2.StkRubroCosto * m2.StkMonedasCotizacion * 3)   AS CostoMSChicote,
          -- soga dobladillo
          (r3.StkRubroCosto * m3.StkMonedasCotizacion)    AS CostoMSDobladillo,
          -- cotización
          m4.StkMonedasCotizacion      AS Cotizacion,
          -- detalle de material
          (r7.StkRubroDesc) AS StkRubroDesc,
          -- costo del ojal
          (SELECT SUM(r5.StkRubroCosto * m5.StkMonedasCotizacion)
            FROM BasePresup.PresupConfTipo t
                JOIN BaseStock.StkRubro r5 ON t.PresupConfTipoRubro = r5.StkRubroAbr
                JOIN BaseStock.StkMonedas m5 ON r5.StkRubroTM = m5.idStkMonedas
            WHERE r5.StkRubroAbr = '${tipoojal}'
          )  AS CostoOjalM2

        FROM BaseStock.StkRubro r1
            JOIN BaseStock.StkMonedas m1 ON r1.StkRubroTM = m1.idStkMonedas,
            BaseStock.StkRubro r2
            JOIN BaseStock.StkMonedas m2 ON r2.StkRubroTM = m2.idStkMonedas,
            BaseStock.StkRubro r3
            JOIN BaseStock.StkMonedas m3 ON r3.StkRubroTM = m3.idStkMonedas,
            BaseStock.StkMonedas m4,
            BaseStock.StkRubro r7

        WHERE r1.StkRubroAbr = '${StkRubroAbrP}'
          AND r2.StkRubroAbr = '${sogachicote}'
          AND r3.StkRubroAbr = '${p.sogadobladillo}'
          AND m4.idStkMonedas = '${p.codmoneda}'
          AND r7.StkRubroAbr = '${StkRubroAbrP}'
      `;
      const datos = await queryAsync(sql);
      const d = datos[0];
      // descripción
      let detalle = detallep
        ? `${detallep} en : ${d.StkRubroDesc} `
        : `Lona con soga en dobladillo, c/ojales ${detojal} cada ${ojalescada} cm. en :  ${d.StkRubroDesc}`;

      // ------------------------------------------------------------------
      // 4) CALCULO COMPLETO
      // ------------------------------------------------------------------
      const flete = Number(p.flete) || 0;
      const MOT = Number(p.MOTpM2) || 0;
      const Cotizacion = Number(d.Cotizacion) || 0;
      const CostoCobMC = Number(d.CostoCobMC) || 0;
      const CostoMSChicote = Number(d.CostoMSChicote) || 0;
      const CostoMSDobladillo = Number(d.CostoMSDobladillo) || 0;
      const costoFleteMot = Cotizacion * (flete + MOT);
      let costo =
        CostoCobMC +
        CostoMSChicote +
        CostoMSDobladillo +
        costoFleteMot;

      const metrosCuad = largoreal * anchoreal;

      let costoOjalUnit = d.CostoOjalM2;

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

      // costo ojales
      const totalOjales = perimetro / (ojalescada / 100);
      const costoOjales = totalOjales * costoOjalUnit;
      costo += costoOjales;

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
    console.log("Error en /presuplonaabolinada", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
