import express from "express";
var router = express.Router();
import conexion from "../conexion.mjs";


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
        drenajesn,
        cantidad,
        tipoojale,
        detallep,
        StkRubroAbr,
        ivasn,
        minmay,
        largo,
        ancho,
      } = item;

      let largoreal = Number(largo)
      let anchoreal = Number(ancho)
      let largocal = largoreal + 0.08;
      let anchocal = anchoreal + 0.08;

      let costoHMOT = p.costoMOT
      let tipoconf = 'cs';
      let ganancia = p.coefgancsoga;
      let tipoojal = '';
      let sogachicote = '';
      let ivareal = ''
      let coefmaymin = 0;
      let costomincolchi = 2 * costoHMOT / 60

      const detojal = (tipoojale === "hz") ? " de hierro " : " de bronce ";
      tipoojal = (tipoojale === "hz") ? p.abrojales3hz : p.abrojales3b;
      sogachicote = p.sogaelastica;
      if (minmay == 'my') {
        coefmaymin = Number(p.coeficientemay) || 0;
        tipoojal = p.abrojales28;
        ganancia = Number(p.coefganmay) || 0;
        ivareal = 'CIVA'
      }
      else {
        coefmaymin = Number(p.coeficientemin) || 0;
        ivareal = ivasn
      }

      let minutosdren = 0
      let costoMOTDren = 0
      const detdrenaje = (drenajesn === 'cd') ? " con drenaje " : " sin drenaje ";
      if (drenajesn == 'cd') {
        minutosdren = ((largocal / 1.50) * 12)
        costoMOTDren = Number(costoHMOT) / 60 * minutosdren
        //* coefmaymin
        /* 12 minutos por drenaje*/
      }


      let minutosunion = anchocal * largocal * 5;
      // let sogadobladillo = Number(p.sogadobladillo) || 0;
      let gancho = Number(p.ganchorulo) || 0;
      const flete = Number(p.flete) || 0;
      const MOT = Number(p.MOTpM2) || 0;
      // let codmoneda = Number(p.codmoneda) || 0;
      let coefimpuesto = Number(p.coefimpuestos) || 0;
      const sql = `
              SELECT
                (r1.StkRubroCosto * m1.StkMonedasCotizacion / r1.StkRubroAncho * 1.02) AS CostoCobMC,
                (r2.StkRubroCosto * m2.StkMonedasCotizacion * 1.65) AS CostoMSChicote,
                (r3.StkRubroCosto * m3.StkMonedasCotizacion) AS CostoMSDobladillo,
                (r4.StkRubroCosto * m4.StkMonedasCotizacion) AS CostoGancho,
                (r5.StkRubroCosto * m5.StkMonedasCotizacion / 144) AS CostoOjalM2,
                (m6.StkMonedasCotizacion) AS Cotizacion,
                (r7.StkRubroDesc) AS StkRubroDesc

                FROM BaseStock.StkRubro r1
                JOIN BaseStock.StkMonedas m1 ON r1.StkRubroTM = m1.idStkMonedas

                JOIN BaseStock.StkRubro r2
                JOIN BaseStock.StkMonedas m2 ON r2.StkRubroTM = m2.idStkMonedas

                JOIN BaseStock.StkRubro r3
                JOIN BaseStock.StkMonedas m3 ON r3.StkRubroTM = m3.idStkMonedas

                JOIN BaseStock.StkRubro r4
                JOIN BaseStock.StkMonedas m4 ON r4.StkRubroTM = m4.idStkMonedas

                JOIN BaseStock.StkRubro r5
                JOIN BaseStock.StkMonedas m5 ON r5.StkRubroTM = m5.idStkMonedas

                JOIN BaseStock.StkMonedas m6 ON m6.idStkMonedas = '${p.codmoneda}'
                JOIN BaseStock.StkRubro r7 ON r7.StkRubroAbr = '${StkRubroAbr}'

                WHERE
                r1.StkRubroAbr = '${StkRubroAbr}'
                AND r2.StkRubroAbr = '${sogachicote}'
                AND r3.StkRubroAbr = '${p.sogadobladillo}'
                AND r4.StkRubroAbr = '${p.ganchorulo}'
                AND r5.StkRubroAbr = '${tipoojal}';
                      `;

      const datos1 = await queryAsync(sql);
      const d = datos1[0];


      let detalle = detallep !== '' ? `${detallep} en :  ${d.StkRubroDesc}` : `Lona con ojales de ${detojal} reforzados, soga elástica y gancho rulo y soga en dobladillo ${detdrenaje} en :  ${d.StkRubroDesc}`;

      const Cotizacion = Number(d.Cotizacion) || 0;
      const CostoCobMC = Number(d.CostoCobMC) || 0;
      const CostoRefuerzo = Number(d.CostoRefuerzo) || 0;
      const CostoGancho = Number(d.CostoGancho) || 0;
      const CostoMSChicote = Number(d.CostoMSChicote) || 0;
      const CostoMSDobladillo = tipoconf === "cs" ? Number(d.CostoMSDobladillo) || 0 : 0;
      const costoOjalM2 = Number(d.CostoOjalM2) || 0;
      const costoFleteMot = Cotizacion * (flete + MOT);


      let costo =
        CostoCobMC +
        CostoRefuerzo +
        CostoGancho +
        CostoMSChicote +
        CostoMSDobladillo +
        costoOjalM2 +
        costoMOTDren +
        costomincolchi +
        costoFleteMot;

      const metrosCuad = largoreal * anchoreal;
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


      // IVA / redondeo
      if (ivasn === "CIVA") {
        costo = Math.ceil(costo);
      } else {
        costo = Math.ceil(costo / 1.21);
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
    console.log("Error en /presuplonaconf", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;
