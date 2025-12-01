import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";


moment.locale("es");


router.post("/", async function (req, res) {
  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];

  var ItemDescripcion = req.body.StkItemsDesc === undefined ? '' : req.body.StkItemsDesc.toUpperCase()
  var registro = {
    idStkItems: req.body.idStkItems,
    StkItemsGrupo: req.body.StkItemsGrupo,
    StkItemsRubro: req.body.StkItemsRubro,
    StkItemsRubroAbr: req.body.StkItemsRubroAbr,
    StkItemsDesc: ItemDescripcion,
    StkItemsOTD: req.body.StkItemsOTD,
    StkItemsCantidad: req.body.StkItemsCantidad,
    StkItemsCantDisp: req.body.StkItemsCantDisp,
    StkItemsFAct: finalDate,
    StkItemsMin: req.body.StkItemsMin,
    StkItemsMax: req.body.StkItemsMax
  };
  console.log('registro StkItems ', registro)
  conexion.query("INSERT INTO StkItems SET ?", registro, function (
    err,
    result
  ) {
    if (err) {
      console.log("ERROR ");
      console.log(err.errno);
    } else {
      res.json(result.rows);
    }
  });
});

export default router;
