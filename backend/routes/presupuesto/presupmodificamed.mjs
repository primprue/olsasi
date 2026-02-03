import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';



// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
async function queryAsync(sql) {
  const [rows] = await conexion.promise().query(sql);
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
        tipoconf,
        tipoojale,
        detallep,
        StkRubroAbr,
        ivasn,
        largo,
        ancho,
        largon,
        anchon,
        minmay,
        lonanuestraafuera
      } = item;
      let largoreal = largo
      let anchoreal = ancho
      let largorealn = largon
      let anchorealn = anchon
      let largocal = largo + 0.08;
      let anchocal = ancho + 0.08;
      let largoncal = largon + 0.08;
      let anchoncal = anchon + 0.08;
      let lna = p.lonanuestraafuera;

      let coeficiente = 0
      let tipoojal = ''
      let sogachicote = ''



      let ganancia = tipoconf === 'cs' ? p.coefgancsoga : p.coefganssoga
      tipoojal = (tipoojale === "hz") ? p.abrojales3hz : p.abrojales3b;
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


      const detojal = (tipoojale === "hz") ? " de hierro " : " de bronce ";


      let minutosunion = (ancho + 0.08) * largocal * 5;
      let sogadobladillo = p.sogadobladillo;
      let valorflete = p.flete;
      let valorMOT = p.MOTpM2;
      let codmoneda = p.codmoneda;
      let coefimpuesto = p.coefimpuestos
      // const vhlnl = await queryAsync(`SELECT REPValorMOT FROM reparacion.parametrosrep`);
      // const vhln = vhlnl[0];
      // const vhlal = await queryAsync(`SELECT REPValorMOTLA FROM reparacion.parametrosrep`);
      // const vhla = vhlal[0];

      // vhln = ["SELECT REPValorMOT FROM reparacion.parametrosrep"].join("");
      // vhla = ["SELECT REPValorMOTLA FROM reparacion.parametrosrep"].join("");
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

                WHERE r1.StkRubroAbr = '${StkRubroAbr}'
                    AND r2.StkRubroAbr = '${StkRubroAbr}'
                    AND r3.StkRubroAbr = '${sogachicote}'
                    AND r4.StkRubroAbr = '${p.sogadobladillo}'
                    AND m5.idStkMonedas = '${p.codmoneda}'
                    AND r6.StkRubroAbr = '${tipoojal}'
                    AND r7.StkRubroAbr = '${StkRubroAbr}'
                `;
      const datos1 = await queryAsync(sql);
      const d = datos1[0];


      let detalle = detallep !== '' ? `${detallep} en :  ${d.StkRubroDesc}` :
        `Modificación de lona de : ${largoreal} x ${anchoreal} a =>  ${largorealn} x ${anchorealn} con ojales de ${detojal} reforzados en :  ${d.StkRubroDesc}`;

      let valorhora = lna === 'LN' ? p.costoMOT * p.coefMOTmay : p.costoMOT * p.coefMOTmin
      const CostoCobMC = Number(d.CostoCobMC) || 0;
      const CostoRefuerzo = Number(d.CostoRefuerzo) || 0;
      const CostoMSChicote = Number(d.CostoMSChicote) || 0;
      const CostoMSDobladillo = tipoconf === "cs" ? Number(d.CostoMSDobladillo) || 0 : 0;
      const costoOjalM2 = Number(d.CostoOjalM2) || 0;
      const costoFleteMot = Number(d.CostoFleteMot) || 0;
      let costooriginal =
        CostoCobMC +
        CostoRefuerzo +
        CostoMSChicote +
        CostoMSDobladillo +
        costoOjalM2 +
        costoFleteMot;

      const metrosCuad = largoreal * anchoreal;

      costooriginal = costooriginal * ganancia * p.coefimpuestos;
      /* hasta acá es para calcular el metro cuadrado de tela */

      /* Esto lo pongo primero para no agregar una variable para costo original */
      let metroscuadn = anchorealn * largorealn
      let costooriginaln = costooriginal * metroscuadn

      let metroscuad = anchoreal * largoreal
      costooriginal = costooriginal * metroscuad

      // soga para abolinar (ciclos)
      let ciclo = 0;
      if (metrosCuad < 12) ciclo = 3;
      else if (metrosCuad < 16) ciclo = 2;
      else if (metrosCuad < 22) ciclo = 1;

      for (let i = 0; i < ciclo; i++) {
        costooriginal *= 1.0325;
      }


      let costodiflona = 0
      let costoMOTa = 0
      let costoMOTb = 0
      let costoMOTc = 0
      let costoMOTd = 0

      if ((largorealn > largoreal) || (anchorealn > anchoreal)) {
        costodiflona = costooriginaln - costooriginal
      }

      if (largorealn < largoreal) {
        costoMOTa = (valorhora / 60 * (15 * anchorealn * 2))
      }

      if (anchorealn < anchoreal) {
        costoMOTb = (valorhora / 60 * (15 * largorealn))
      }

      if ((largorealn > largoreal)) {
        costoMOTc = (valorhora / 60 * 16 * ((anchorealn * 2)))
      }

      if ((anchorealn > anchoreal)) {
        costoMOTd = (valorhora / 60 * 16 * ((largoreal * 2)))
        if (costoMOTc === 0) {
          costoMOTc = (valorhora / 60 * 16 * ((anchorealn * 2)))
        }
      }

      costooriginal = costodiflona + costoMOTa + costoMOTb + costoMOTc + costoMOTd
      if (ivasn == 'CIVA') {
        costooriginal = Math.ceil(Number(costooriginal).toFixed(0))
      }
      else {
        costooriginal = Math.ceil(Number(costooriginal).toFixed(0) / 1.21)
      }



      // ------------------------------------------------------------------
      // 5) ARMO RESULTADO DEL ÍTEM
      // ------------------------------------------------------------------
      resultados.push({
        ImpUnitario: costooriginal,
        Detalle: detalle,
        Largo: largoreal,
        Ancho: anchoreal,
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presupmodificamed", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
