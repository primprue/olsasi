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

      let largocal = Number(largo) + 0.12
      let anchocal = Number(ancho) + 0.12
      let minutosunion = anchocal * largocal * 5


      const enteroancho = Math.trunc(anchocal / 1.50)
      const decimancho = (anchocal / 1.5) - enteroancho;
      const anchotot = decimancho < 0.5 ? enteroancho + 0.5 : enteroancho + 1;



      const valorMOTmin = p.costoMOT * coefMOT / 60
      const MOTarmado = valorMOTmin * minutosunion
      const sql = `Select
        StkRubroDesc, StkRubroAbr,
        (((StkRubroCosto * StkMonedasCotizacion * ?) * ? * ?) + ? ) as ImpUnitario,
        StkRubroCosto,
        StkMonedasCotizacion
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ?
        and StkRubro.StkRubroTM = idStkMonedas`

      const params = [
        coeficiente,            // subquery
        anchotot,        // r1
        largocal,         // r2
        MOTarmado,    // r3
        StkRubroAbr          // moneda
      ];


      const datos = await queryAsync(sql, params);

      // const datos = await queryAsync(q);
      const d = datos[0]
      let detalle = ""

      detalle = detallep !== '' ? `${detallep} en :  ${d.StkRubroDesc}` : `Lona con fajas en el perímetro en :  ${d.StkRubroDesc}`;
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
    console.log("Error en /presupfajas", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;