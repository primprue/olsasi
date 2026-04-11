import express from "express";
var router = express.Router();

import moment from "moment";
import { conexionpool } from '../../conexion.mjs';


moment.locale("es");



let datosenv = [];
router.get("/", async (req, res) => {
  let StkItemsRubroAbr = req.query.StkItemsRubroAbr;
  try {
    const NROULTITEM = `Select  max(idStkItems) as UltItem from StkItems where StkItemsRubroAbr = ?`;
    const NGRUPO = `Select StkRubroCodGrp as StkItemsGrupo, idStkRubro as StkItemsRubro from StkRubro where StkRubroAbr = ?`;
    const [datos] = await conexionpool.query(NROULTITEM, StkItemsRubroAbr);
    datosenv.push(datos[0].UltItem);
    const [datos2] = await conexionpool.query(NGRUPO, StkItemsRubroAbr);
    datosenv.push(datos2[0].StkItemsGrupo);
    datosenv.push(datos2[0].StkItemsRubro);
    return res.status(201).json({
      leyenda: 'Código de Itemscreados correctamente',
      idGenerado: datosenv // Antes decía req.body.idStkRubro
    });

  } catch (err) {
    console.log("error al buscar codigo de items por abreviatura en stkitemscodabr  " + err.errno);
    console.log(err);
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }
});
export default router;
