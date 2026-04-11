import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


var datosenvio = []

router.get("/", async (req, res) => {
  let q = `select * from BasePresup.PresupParam`
  try {
    const [rows] = await conexionpool.query(q);
    let costminuto = (Number(rows[0].costoMOT) / 60)
    let coefMOTmay = (Number(rows[0].coefMOTmay))
    let coefMOTmin = Number(rows[0].coefMOTmin)
    console.log(costminuto)
    console.log(coefMOTmay)
    console.log(coefMOTmin)
    let horalonanues = (parseInt((costminuto + 1) * coefMOTmay) * 60) //esto se hizo para que el valor sea el mismo que en el anexo
    let horalonaafuera = (parseInt((costminuto + 1) * coefMOTmin) * 60) //esto se hizo para que el valor sea el mismo que en el anexo
    datosenvio.push(horalonanues)
    datosenvio.push(horalonaafuera)
    res.json(datosenvio)
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({
      error: "Error al obtener los Valor de Hora",
      details: err.message
    });
  }
});

export default router;