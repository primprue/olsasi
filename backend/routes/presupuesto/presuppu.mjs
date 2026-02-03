import express from "express";
import { conexion } from '../conexion.mjs';

const router = express.Router();

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
        detallep,
        StkRubroAbr,
        ivasn,
        largo,
        veces,
        minmay,
      } = item;

      // coeficientes
      const coef =
        minmay === "my" ? p.coeficientemay : p.coeficientemin;
      const coefMOT =
        minmay === "my" ? p.coefMOTmay : p.coefMOTmin;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;
      // ancho de tela
      let param = [StkRubroAbr];
      const r2 = await queryAsync(
        `SELECT StkRubroAncho AS anchotela
          FROM BaseStock.StkRubro
          WHERE StkRubroAbr = ?`,
        param
      );

      const anchotela = r2[0].anchotela;

      // cálculos MOT
      const valorMOTmup =
        (p.costoMOT * coefMOT * p.segsolpu) / 3600;
      const valorMOTcorte =
        (p.costoMOT * coefMOT * p.segpurecorte) / 3600;

      let impunion = 0;
      let impcorte = 0;

      if (cantidad % 1 > 0) {
        impunion =
          Math.trunc(cantidad) * largo * valorMOTmup +
          anchotela / 2 * valorMOTmup;
        impcorte = (cantidad + 1) * valorMOTcorte;
      } else {
        impunion = (cantidad - 1) * largo * valorMOTmup;
        impcorte = cantidad * valorMOTcorte;
      }

      const importeMOTtotal = impunion + impcorte;

      // consulta principal
      const q = `
        SELECT
          StkRubroDesc, StkRubroAbr,
          (
            ((StkRubroCosto * StkMonedasCotizacion * ?) *
              ? * ?)
            + ?
          ) AS ImpUnitario,
          StkRubroAncho AS Ancho,
          StkRubroCosto,
          StkMonedasCotizacion
        FROM BaseStock.StkRubro
        JOIN BaseStock.StkMonedas
          ON StkRubro.StkRubroTM = idStkMonedas
        WHERE StkRubro.StkRubroAbr = ?
        `;
      let paramimp = [coef, cantidad, largo, importeMOTtotal, StkRubroAbr];
      const r = await queryAsync(q, paramimp);
      const data = r[0];

      // redondeo con o sin IVA
      let impu = Number(data.ImpUnitario);
      console.log('impu ', impu);
      console.log('ivasncal ', ivasncal);
      ivasncal == 'CIVA' ? impu = impu : impu = impu / 1.21;

      // armado de detalle
      const anchoreal = Number(largo).toFixed(2);
      const callargo = cantidad * data.Ancho;

      const vecestxt = veces > 1 ? " veces  " : " vez  ";
      const detalleArmado =
        detallep !== ""
          ? detallep
          : `Paños Unidos de ${anchoreal} ( ${callargo.toFixed(
            2
          )} x ${anchoreal} )  (${veces}${vecestxt})  en : ${data.StkRubroDesc}`;

      resultados.push({
        ImpUnitario: impu,
        Detalle: detalleArmado,
        Largo: anchoreal,
        Ancho: 0,
        MDesc: "S",
      });
    }

    res.json(resultados);

  } catch (error) {
    console.log("Error en /presuppu", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
