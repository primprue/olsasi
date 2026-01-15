import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';

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
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosrec) {
      const {
        StkRubroAbr,
        largo,
        detallep,
        ancho,
        ivasn,
        minmay,
      } = item;

      const coeficiente =
        minmay === "my" ? Number(p.coeficientemay) : Number(p.coeficientemin);
      const coefMOT =
        minmay === "my" ? Number(p.coefMOTmay) : Number(p.coefMOTmin);
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;

      const segcoefMOT = coefMOT / 60 / 60
      const valorMOTmup = p.costoMOT * segcoefMOT * p.segsolpu
      const valorMOTrecorte = p.costoMOT * segcoefMOT * p.segpurecorte
      const valorMOTfajas = p.costoMOT * segcoefMOT * p.segsolfaja

      let anchocal = Number(ancho) + 0.28
      let enteropanios = Math.trunc(anchocal / 1.50)

      const decimalpanios = (anchocal / 1.5) - enteropanios;
      const cantpanos = decimalpanios > 0 ? enteropanios + 1 : enteropanios;
      const impunion = decimalpanios > 0 ? ((cantpanos * Number(ancho)) + 0.75) * valorMOTmup : Number(ancho) * valorMOTmup

      const imprecorte = anchocal * valorMOTrecorte
      const impsolfaja = largo * valorMOTfajas * 2
      let importeMOTtotal = impunion + imprecorte + impsolfaja

      const q = `Select
        StkRubroDesc, StkRubroAbr,
        (((StkRubroCosto * StkMonedasCotizacion * ?) * ? *?) + ?) as ImpUnitario,
        StkRubroCosto,
        StkMonedasCotizacion
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ?
        and StkRubro.StkRubroTM = idStkMonedas`

      const params = [
        coeficiente,
        cantpanos,
        ancho,
        importeMOTtotal,
        StkRubroAbr
      ];
      const datos = await queryAsync(q, params);
      const d = datos[0]

      let detalle = ""

      detalle = detallep !== '' ? `${detallep} en :  ${d.StkRubroDesc}` : `Lona enrollable para destape fácil en :  ${d.StkRubroDesc}`;

      let impunitario = Number(d.ImpUnitario)
      if (ivasncal === "CIVA") {
        impunitario = Math.ceil(impunitario / 10) * 10;
      } else {
        impunitario = Math.ceil(impunitario / 1.21 / 10) * 10;
      }
      // ------------------------------------------------------------------
      // 5) ARMO RESULTADO DEL ÍTEM
      // ------------------------------------------------------------------
      resultados.push({
        ImpUnitario: impunitario,
        Detalle: detalle,
        Largo: Number(largo).toFixed(2),
        Ancho: Number(ancho).toFixed(2),
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presupdesfac", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;