import express from 'express';

var router = express.Router();

import conexion from '../conexion.mjs';

// Helper para usar MySQL en modo promesa
function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.get("/", async (req, res) => {
  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];
    for (const item of datosrec) {
      const {
        cantbrazos,
        largobrazo,
        fajabrazo,
        altovolado,
        voladosd,
        minmay,
        StkRubroAbr,
        detallep,
        ivasn,
        ancho,
      } = item;

      const enteropanios = Math.trunc(ancho / 1.50)

      // coeficientes
      const coeficiente =
        minmay === "my" ? p.coeficientemay : p.coeficientemin;
      const coefMOT =
        minmay === "my" ? p.coefMOTmay : p.coefMOTmin;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;


      const valorMOTmin = p.costoMOT * coefMOT / 60

      //calculo del largo del abanico

      let largoabanico1 = (largobrazo * 2 * 3.1416) / 4
      let telacubrecaños = ((((fajabrazo / 10 * 4) + 2) * (cantbrazos + 1)) / 100)
      let telavolado = (altovolado / 100) + 0.15
      let largoabanico = largoabanico1 + telacubrecaños + telavolado
      let telatapas = (largobrazo + 0.07)
      // + (altovolado / 100)
      let paniostapas
      telatapas < 1.50 ? paniostapas = 1 : paniostapas = 2
      let paniosfrente = Math.ceil(ancho / 1.5)
      telatapas = paniostapas * telatapas * 2
      let telatotal = telatapas + (paniosfrente * largoabanico)


      // tiempo de cortar paños (2 min / paño)
      let minMOT1 = (paniostapas * 2 + paniosfrente) * 2
      //tiempo soldar paños frente (2.5 min / metro)
      let minMOT2 = ((paniosfrente - 1) * largoabanico * 2.5)
      // tiempo cortar, marcar y soldar fajas (8 min / metro faja)
      let minMOT3 = ((cantbrazos + 1) * ancho) * 8
      // tiempo marcar jas (10 min / metro frente)
      let minMOT4 = ancho * 10
      // tiempo hacer tapas marcar sobre el frente y soldar tapas
      let minMOT5 = 120
      // tiempo volado soldar y recortar (6 min / metro)
      let minMOT6 = (largobrazo * 2 + ancho) * 6
      if (voladosd === 'D') {
        (minMOT6 = minMOT6 * 2)
      }


      let MOTarmado = (minMOT1 + minMOT2 + minMOT3 + minMOT4 + minMOT5 + minMOT6) * valorMOTmin


      const q = `
          SELECT
            StkRubroDesc,
            StkRubroAbr,
            (
              (StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * ${telatotal})
              + ${MOTarmado}
            ) AS ImpUnitario,
            StkRubroCosto,
            StkMonedasCotizacion
          FROM BaseStock.StkRubro
          JOIN BaseStock.StkMonedas
            ON StkRubro.StkRubroTM = idStkMonedas
          WHERE StkRubro.StkRubroAbr = "${StkRubroAbr}"
        `;
      let detvol = ''
      let detalle = ''
      altovolado != 0 ? detvol = `y volado de ${altovolado} cm.` : detvol = ''
      if (detallep == '') {
        detalle = `Toldo Abanico de ${ancho}  mts. de ancho con ${cantbrazos} brazos de ${largobrazo} mts., faja para caño de ${fajabrazo} ${detvol} en : ${StkRubroAbr}`
      }
      else {
        detalle = `${detallep} en : ${StkRubroAbr}`
      }

      const r = await queryAsync(q);
      const data = r[0];
      let impu = Number(data.ImpUnitario);
      ivasncal == 'CIVA' ? impu = impu : impu = impu / 1.21;

      resultados.push({
        ImpUnitario: impu,
        Detalle: detalle,
        Largo: 0,
        Ancho: 0,
        MDesc: "N",
      });

    }

    res.json(resultados);

  } catch (error) {
    console.log("Error en /presuppu", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
