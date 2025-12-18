import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presupdesfac");
  } else {
    console.log("base de datos conectada en presupdesfac");
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
        minmay === "my" ? p.coeficientemay : p.coeficientemin;
      const coefMOT =
        minmay === "my" ? p.coefMOTmay : p.coefMOTmin;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;

      const segcoefMOT = coefMOT / 60 / 60
      const valorMOTmup = p.costoMOT * segcoefMOT * p.segsolpu
      const valorMOTrecorte = p.costoMOT * segcoefMOT * p.segpurecorte
      const valorMOTfajas = p.costoMOT * segcoefMOT * p.segsolfaja

      let anchocal = ancho + 0.28
      let enteropanios = Math.trunc(anchocal / 1.50)

      const decimalpanios = (anchocal / 1.5) - enteropanios;
      const cantpanos = decimalpanios > 0 ? enteropanios + 1 : enteropanios;
      const impunion = decimalpanios > 0 ? ((cantpanos * ancho) + 0.75) * valorMOTmup : ancho * valorMOTmup

      const imprecorte = anchocal * valorMOTrecorte
      const impsolfaja = largo * valorMOTfajas * 2
      let importeMOTtotal = impunion + imprecorte + impsolfaja

      const q = `Select
        StkRubroDesc, StkRubroAbr,
        (((StkRubroCosto * StkMonedasCotizacion * ${coeficiente}) * ${cantpanos} * ${ancho}) + ${importeMOTtotal}) as ImpUnitario,
        StkRubroCosto,
        StkMonedasCotizacion
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = "${StkRubroAbr}"
        and StkRubro.StkRubroTM = idStkMonedas`

      const datos = await queryAsync(q);
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