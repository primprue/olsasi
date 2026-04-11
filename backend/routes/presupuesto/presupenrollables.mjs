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
        tamcristal,
        StkRubroAbr,
        detallep,
        ivasn,
        ancho,
        largo,
        altovolado,
        tamfaja,
        sobrantemarco,
        minmay,
      } = item;
      const anchocal = Number(ancho) + 0.12
      let fajade = ''
      let largocal = Number(largo)
      if (tamfaja === '25P') {
        fajade = ' c/faja p/2"1/2 '
        largocal = Number(largo) + 0.10
      } else { fajade = ' c/faja p/2" ' }
      const q = `Select StkRubroAncho as 
          anchotela
          from BaseStock.StkRubro where StkRubro.StkRubroAbr = ? `

      const params = [
        StkRubroAbr
      ];


      const datos = await queryAsync(q, params);

      //const datos = await queryAsync(q);
      const d = datos[0]
      let enteropanios = Math.trunc(anchocal / d.anchotela)
      let coeficiente = 0
      let coefMOT = 0
      let valorMOTmin = 0
      let ivasncal = ivasn
      if (minmay == 'my') {
        coeficiente = p.coeficientemay
        coefMOT = p.coefMOTmay
        ivasncal = 'CIVA'
      }
      else {
        coeficiente = p.coeficientemin
        coefMOT = p.coefMOTmin
      }

      valorMOTmin = p.costoMOT * coefMOT / 60

      let decimalpanios = (anchocal / d.anchotela) - enteropanios
      let panios = decimalpanios < 0.5 ? enteropanios + 0.50 : enteropanios + 1
      let MOTarmado = altovolado == 0 ? anchocal * 40 * valorMOTmin : anchocal * 60 * valorMOTmin
      largocal = altovolado == 0 ? largocal + 0.44 : largocal + 0.44 + (altovolado / 100)
      let largocristal = 0
      let q1 = ''
      if (tamcristal != 'NOPVC') {
        largocristal = (ancho * 1 - (sobrantemarco * 2 / 100))
        q1 = `Select  StkRubroAbr, StkRubroAncho as anchocristal, 
        ((StkRubroCosto * StkMonedasCotizacion * ? * ?) + ((? * 2 ) + ((StkRubroAncho - 0.03 ) * 2))  * 7 * ?)
        as ArmadoCristal, StkRubroCosto, StkMonedasCotizacion 
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
        where StkRubro.StkRubroAbr = ? 
        and StkRubro.StkRubroTM = idStkMonedas`}

      const paramscristal = [
        coeficiente,
        largocristal,
        largocristal,
        valorMOTmin,
        tamcristal,
      ];

      const q2 = `Select StkRubroDesc, StkRubroAbr, 
      ((StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * ${panios} * ${largocal}) + ${MOTarmado}) as ImpUnitario, 
      StkRubroCosto, StkMonedasCotizacion 
      from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
      where StkRubro.StkRubroAbr = "${StkRubroAbr}" 
      and StkRubro.StkRubroTM = idStkMonedas`

      const paramsimp = [
        coeficiente,            // subquery
        panios,        // r1
        largocal,         // r2
        MOTarmado,    // r3
        StkRubroAbr          // moneda
      ];
      let dcristal = []
      if (q1 !== '') {
        const datoscristal = await queryAsync(q1, paramscristal);

        // const datoscristal = await queryAsync(q1);
        dcristal = datoscristal[0]
      }
      //   const datosimporte = await queryAsync(q2);
      const datosimporte = await queryAsync(q2, paramsimp);

      const di = datosimporte[0]

      let impunitario = Number(di.ImpUnitario)
      if (ivasncal === 'CIVA') {
        impunitario = Math.ceil(impunitario / 10) * 10;
      } else {
        impunitario = Math.ceil(impunitario / 1.21 / 10) * 10;
      }
      let detalle = detallep !== '' ? `${detallep} en :  ${di.StkRubroDesc}` : `Lona enrollable `;
      if (tamcristal != 'NOPVC') {
        detalle = `${detalle} ${fajade} Cristal de ${dcristal.anchocristal}, marco de ${sobrantemarco} cm. en los costados, 
                  y volado de ${altovolado} cm. en : ${di.StkRubroDesc} :`
        impunitario = impunitario + Number(dcristal.ArmadoCristal)
      } else {
        if (altovolado != 0) {
          detalle = `${detalle} con volado de ${altovolado} cm. en :  ${di.StkRubroDesc} `
        }
        else { detalle = `${detalle} en :  ${di.StkRubroDesc} ` }
      }
      if (ivasncal === 'CIVA') {
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
    console.log("Error en /presupenrollables", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;