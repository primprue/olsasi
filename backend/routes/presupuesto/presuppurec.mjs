import express from "express";
import conexion from "../conexion.mjs";

const router = express.Router();

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
      const r2 = await queryAsync(
        `SELECT StkRubroAncho AS anchotela
          FROM BaseStock.StkRubro
          WHERE StkRubroAbr = "${StkRubroAbr}"`
      );
      const anchotela = r2[0].anchotela;

      // cálculos MOT
      const valorMOTmup =
        (p.costoMOT * coefMOT * p.segsolpu) / 3600;

      const valorMOTcorte =
        (p.costoMOT * coefMOT * p.segpurecorte) / 3600;
      // const valorMOTrecorte = valorMOTcorte

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

      const importeMOTtotal = impunion + (impcorte * 2);

      // consulta principal
      const q = `
        SELECT
          StkRubroDesc, StkRubroAbr,
          (
            ((StkRubroCosto * StkMonedasCotizacion * ${coef}) *
              ${cantidad} * ${largo})
            + ${importeMOTtotal}
          ) AS ImpUnitario,
          StkRubroAncho AS Ancho,
          StkRubroCosto,
          StkMonedasCotizacion
        FROM BaseStock.StkRubro
        JOIN BaseStock.StkMonedas
          ON StkRubro.StkRubroTM = idStkMonedas
        WHERE StkRubro.StkRubroAbr = "${StkRubroAbr}"
      `;

      const r = await queryAsync(q);
      const data = r[0];

      // redondeo con o sin IVA
      let impu = Number(data.ImpUnitario);
      ivasncal == 'CIVA' ? impu = impu : impu = impu / 1.21;

      // armado de detalle
      const anchoreal = Number(largo).toFixed(2);
      const callargo = cantidad * data.Ancho;

      const vecestxt = veces > 1 ? " veces) en : " : " vez) en : ";
      const detalleArmado =
        detallep !== ""
          ? detallep
          : `Paños Unidos de ${anchoreal} ( ${callargo.toFixed(
            2
          )} x ${anchoreal} ) (recortados a la medida solicitada) en : ${StkRubroAbr}`;

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
