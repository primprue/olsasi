import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';



// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------

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
        drenajesn,
        tipoojale,
        detallep,
        StkRubroAbr,
        ivasn,
        largo,
        ancho,
        minmay
      } = item;
      //agregamos el 0.30 para las fajas + 0.40 para las solapas
      let largocal = Number(largo) + 0.3 + 0.4;
      let anchocal = Number(ancho) + 0.08;
      let param = [StkRubroAbr];
      const buscaancho = await queryAsync(
        `Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = ?`,
        param
      );
      const rbuscaancho = buscaancho[0];
      const anchoTela = rbuscaancho.AnchoTela;

      const division = largocal / anchoTela;
      const entero = Math.trunc(division);
      const decimal = division - entero;

      const cantpaños = entero + (decimal < 0.5 ? 0.5 : 1);

      const metroscuad = cantpaños * anchoTela * anchocal;
      const detdrenaje = (drenajesn === 'cd') ? " con drenaje " : " sin drenaje ";
      const minutosdren = (drenajesn === 'cd') ? ((largocal / 1.50) + 2) * 12 : 0;
      const minutossolapainversa = Number(ancho) * 20;


      let coefmaymin = 0;
      let coefMOT = 0;
      let minutospmc = 10;
      const detojal = (tipoojale === "hz") ? " de hierro " : " de bronce ";
      let tipoojal = (tipoojale === "hz") ? p.abrojales3hz : p.abrojales3b;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;
      if (minmay == 'my') {
        coefmaymin = Number(p.coeficientemay) || 0;
        tipoojal = (tipoojale === "hz") ? p.abrojales28 : p.abrojales3b;
        coefMOT = Number(p.coefMOTmay) || 0;
      }
      else {
        coefmaymin = Number(p.coeficientemin) || 0;
        coefMOT = Number(p.coefMOTmin) || 0;
      }

      let cantidadojales = (largo * 2) + 4

      let valorMOT = p.costoMOT * coefMOT / 60 * ((metroscuad * minutospmc) + minutosdren + minutossolapainversa)

      const q = `Select
        StkRubroDesc, StkRubroAbr,
        (StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ? *?) as ImpUnitario,
        StkRubroCosto,
        StkMonedasCotizacion
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ?
        and StkRubro.StkRubroTM = idStkMonedas`

      let paramimp = [coefmaymin, metroscuad, StkRubroAbr];
      const datos = await queryAsync(q, paramimp);
      const mcuadcob = datos[0]

      const q1 = `Select
        (StkRubroCosto * StkMonedasCotizacion / 144) * ? as ValorOjales
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ?
        and StkRubro.StkRubroTM = idStkMonedas`

      let paramojales = [cantidadojales, tipoojal];
      const datos1 = await queryAsync(q1, paramojales);
      const ojales = datos1[0]

      let detalle = detallep !== '' ? `${detallep} en :  ${mcuadcob.StkRubroDesc}` : `Lona para pileta, con cortes para caños de aluminio y solapas, con ojales de ${detojal} reforzados, ${detdrenaje} en :  ${mcuadcob.StkRubroDesc}`;

      let costo = Number(mcuadcob.ImpUnitario) + Number(ojales.ValorOjales) + valorMOT
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
        Largo: Number(largo).toFixed(2),
        Ancho: Number(ancho).toFixed(2),
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presuppiletacadsol", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
