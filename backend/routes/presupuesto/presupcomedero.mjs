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
        cantidad,
        tipoojale,
        detallep,
        presupojalesc,
        StkRubroAbr,
        ivasn,
        largo,
        anchocomedero,
        minmay,
      } = item;

      let perimetro = Number(largo * 2)
      let metsogadob = perimetro + 4
      let largocal = Number(largo) + 0.08;
      let anchoreal = Number(anchocomedero)
      let ancho = anchoreal + 0.08;


      let ojalescada = Number(presupojalesc) / 100;
      let cantidadojales = (perimetro / ojalescada) + Number(largo)

      let detalle = ''
      if (detallep == '') {
        detalle = "Comedero "
      }
      else {
        detalle = detallep + ''
      }
      let cantidadcob = 0;
      if (anchoreal == 0.68) {
        cantidadcob = largocal / 2
      }
      else {
        if (anchoreal == 0.42) {
          cantidadcob = largocal / 3
        }

        else {
          cantidadcob = Math.ceil(largocal / 1.5) * ancho
        }
      }

      let ganancia = p.coefgancsoga
      let coeficiente = 0;
      let coefMOT = 0;
      let tipoojal = '';
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;
      if (minmay == 'my') {
        coeficiente = p.coeficientemay;
        coefMOT = p.coefMOTmay
        tipoojal = p.abrojales28;
        ganancia = p.coefganmay
      }
      else {
        coeficiente = p.coeficientemin;
        coefMOT = p.coefMOTmin
      }



      if (tipoojale == 'hz') {
        tipoojal = 'OHCOL'
      }
      else {
        tipoojal = 'OBCOL'
      }



      let sogadobladillo = p.sogadobladillo;
      let valorflete = p.flete;
      let valorMOT = p.MOTpM2;
      let codmoneda = p.codmoneda;
      let coefimpuesto = p.coefimpuestos


      let ValorMOTtotal = ((p.costoMOT / 60) * 3.5 * largocal) * coefMOT
      let costoMOTHs = p.costoMOT

      const sql = `
        SELECT
            -- cobertor lineal
            (r1.StkRubroCosto * m1.StkMonedasCotizacion * ?) AS ValorCobML,

            -- soga dobladillo
            (r2.StkRubroCosto * m2.StkMonedasCotizacion * ?) AS ValorMSDobladillo,

            -- ojales
            (r3.StkRubroCosto * m3.StkMonedasCotizacion * ?) AS ValorGrsOjal,

            -- cotización
            m4.StkMonedasCotizacion AS Cotizacion,
            -- descripción material
            (r5.StkRubroDesc) AS StkRubroDesc
        FROM BaseStock.StkRubro r1
            JOIN BaseStock.StkMonedas m1 ON r1.StkRubroTM = m1.idStkMonedas,

            BaseStock.StkRubro r2
            JOIN BaseStock.StkMonedas m2 ON r2.StkRubroTM = m2.idStkMonedas,

            BaseStock.StkRubro r3
            JOIN BaseStock.StkMonedas m3 ON r3.StkRubroTM = m3.idStkMonedas,

            BaseStock.StkMonedas m4,
            BaseStock.StkRubro r5

        WHERE r1.StkRubroAbr = ?
          AND r2.StkRubroAbr = ?
          AND r3.StkRubroAbr = ?
          AND m4.idStkMonedas = ?
          AND r5.StkRubroAbr = ?
          `;

      const params = [
        coeficiente,
        coeficiente,
        coeficiente,
        StkRubroAbr,
        sogadobladillo,
        tipoojal,
        codmoneda,
        StkRubroAbr
      ];
      const datos = await queryAsync(sql, params);
      const d = datos[0];

      if (tipoojale == 'hz') {
        detalle = `${detalle} c/ojales de hierro cada ${ojalescada} mts. en : ${d.StkRubroDesc}`
      }
      else {
        detalle = `${detalle} c/ojales de bronce cada ${ojalescada} mts. en : ${d.StkRubroDesc}`
      }
      if (detallep != '') {
        detalle = ''
        detalle = `${detallep} en : ${d.StkRubroDesc}`
      }
      let costo = 0;
      costo = Number(d.ValorCobML) * cantidadcob

      costo = costo + (Number(d.ValorMSDobladillo) * metsogadob);

      costo = costo + (Number(d.ValorGrsOjal) / 100 * cantidadojales)

      costo = costo + (((costoMOTHs * coeficiente) / 60 / 60 * 30) * cantidadojales)

      costo = costo * coefimpuesto + ValorMOTtotal
      // al dividirlo por 10 se redondea a la derecha, en los 10 no en las unidades pe. 306632 pasa a 306640
      if (ivasncal === "CIVA") {
        costo = Math.ceil(costo / 10) * 10;
      } else {
        costo = Math.ceil(costo / 1.21 / 10) * 10;
      }

      // ------------------------------------------------------------------
      // 5) ARMO RESULTADO DEL ÍTEM
      // ------------------------------------------------------------------
      let Largo = Number(largo).toFixed(2)
      let Ancho = Number(anchoreal).toFixed(2)
      resultados.push({
        ImpUnitario: costo,
        Detalle: detalle,
        Largo: Largo,
        Ancho: Ancho,
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
