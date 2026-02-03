import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';
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
  let tipo = req.query.tipo;
  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosrec) {
      const {
        minmay,
        ivasn
      } = item;


      const coefgcia =
        minmay === "my" ? p.coefMOTmay : p.coefMOTmin;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;

      const q1 = await queryAsync(`SELECT (PresupConfTipoMinMOT * costoMOT / 60) as CostoMotCon
        FROM BasePresup.PresupConfTipo, BasePresup.PresupParam
        where PresupConfTipoDesc = "${tipo}" and PresupConfTipoMinMOT <> 0`);


      let vlrMOT = 0
      q1.length === 0 ? vlrMOT = 0 : vlrMOT = Number(q1[0].CostoMotCon);

      const q2 = await queryAsync(
        `SELECT PresupConfTipoImprime as PresupConfTipoImprime
        FROM BasePresup.PresupConfTipo
        where PresupConfTipoDesc = "${tipo}"`);
      const ImprimeSN = q2[0].PresupConfTipoImprime;


      const q = await queryAsync(
        `select sum(BaseStock.StkRubro.StkRubroCosto * BaseStock.StkMonedas.StkMonedasCotizacion * BasePresup.PresupConfTipo.PresupConfTipoCant)
          as ImpUnitario from BasePresup.PresupConfTipo, BaseStock.StkRubro, BaseStock.StkMonedas
          where  PresupConfTipoRubro = BaseStock.StkRubro.StkRubroAbr and
          BaseStock.StkRubro.StkRubroTM = BaseStock.StkMonedas.idStkMonedas and
          PresupConfTipoDesc = "${tipo}"`);
      const vlrMAT = Number(q[0].ImpUnitario);
      let ImpUnitario = 0
      vlrMOT === 0 ? ImpUnitario = vlrMAT : ImpUnitario = (vlrMOT + vlrMAT) * coefgcia;

      let impu = Number(ImpUnitario);
      ivasncal == 'CIVA' ? impu = impu : impu = impu / 1.21;

      resultados.push({
        ImpUnitario: impu.toFixed(2),
        ImprimeSN: ImprimeSN,

      });

    }

    res.json(resultados);

  } catch (error) {
    console.log("Error en /presupconftipocalc", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
