import express from 'express';
var router = express.Router();
import conexion from '../conexion.mjs';


conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presupenrollables");
  } else {
    console.log("base de datos conectada en presupenrollables");
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
      const anchocal = ancho + 0.12
      let fajade = ''
      let largocal = Number(largo)
      if (tamfaja === '25P') {
        fajade = ' c/faja p/2"1/2 '
        largocal = Number(largo) + 0.10
      } else { fajade = ' c/faja p/2" ' }
      const q = `Select StkRubroAncho as 
          anchotela
          from BaseStock.StkRubro where StkRubro.StkRubroAbr = "${StkRubroAbr}" `

      const datos = await queryAsync(q);
      const d = datos[0]
      let enteropanios = Math.trunc(ancho / d.anchotela)
      let coeficiente = 0
      let coefMOT = 0
      let valorMOTmin = 0

      if (minmay == 'my') {
        coeficiente = p.coeficientemay
        coefMOT = p.coefMOTmay
        ivasn = 'CIVA'
      }
      else {
        coeficiente = p.coeficientemin
        coefMOT = p.coefMOTmin
      }

      valorMOTmin = p.costoMOT * coefMOT / 60

      let decimalpanios = (ancho / d.anchotela) - enteropanios
      let panios = decimalpanios < 0.5 ? enteropanios + 0.50 : enteropanios + 1
      let MOTarmado = altovolado == 0 ? ancho * 40 * valorMOTmin : ancho * 60 * valorMOTmin
      largocal = altovolado == 0 ? largocal + 0.44 : largocal + 0.44 + (altovolado / 100)
      let largocristal = 0
      let q1 = ''
      if (tamcristal != 'NOPVC') {
        largocristal = (ancho * 1 - (sobrantemarco * 2 / 100))
        q1 = `Select  StkRubroAbr, StkRubroAncho as anchocristal, 
        ((StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * ${largocristal}) + ((${largocristal} * 2 ) + ((StkRubroAncho - 0.03 ) * 2))  * 7 * ${valorMOTmin})
        as ArmadoCristal, StkRubroCosto, StkMonedasCotizacion 
        from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
        where StkRubro.StkRubroAbr = "${tamcristal}" 
        and StkRubro.StkRubroTM = idStkMonedas`}

      const q2 = `Select StkRubroDesc, StkRubroAbr, 
      ((StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * ${panios} * ${largocal}) + ${MOTarmado}) as ImpUnitario, 
      StkRubroCosto, StkMonedasCotizacion 
      from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
      where StkRubro.StkRubroAbr = "${StkRubroAbr}" 
      and StkRubro.StkRubroTM = idStkMonedas`

      let dcristal = []
      if (q1 !== '') {
        const datoscristal = await queryAsync(q1);
        dcristal = datoscristal[0]
      }
      const datosimporte = await queryAsync(q2);
      const di = datosimporte[0]

      let impunitario = Number(di.ImpUnitario)
      if (ivasn === 'CIVA') {
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
      if (ivasn === 'CIVA') {
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