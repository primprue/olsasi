import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";


moment.locale("es");



var datosenv = [];
router.get("/", async function (req, res) {
  var StkItemsRubroAbr = req.query.StkItemsRubroAbr;
  conexion.query('Select max(idStkItems) as UltItem from StkItems where StkItemsRubroAbr = "' + StkItemsRubroAbr + '"', function (err, result) {
    if (err) {
      console.log("error al buscar codigo de items por abreviatura en stkitemscodabr  " + err.errno);
      console.log(err);
    } else {
      datosenv.push(result);
    }
  })
  conexion.query('Select StkRubroCodGrp as StkItemsGrupo, idStkRubro as StkItemsRubro from StkRubro where StkRubroAbr = "' + StkItemsRubroAbr + '"', function (err, result) {
    if (err) {
      console.log("error al buscar codigo de grupo y rubro  en stkitemscodabr  " + err.errno);
      console.log(err);

    } else {
      datosenv.push(result);
      res.json(datosenv)
      datosenv = []
    }
  })
});

conexion.end;
export default router;
