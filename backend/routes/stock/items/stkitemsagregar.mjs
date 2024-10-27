import express from "express";
var router = express.Router();
import path from "path";
import moment from "moment";
import conexion from "../../conexion.mjs";

// var gencodrubro = require("./stkitemscodabr");
// var nroitem = 0;
import dateFormat from 'dateformat';

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsagregar");
  } else {
    console.log("no se conecto en stkitemsagregar");
  }
});


router.post("/", async function (req, res) {
  // var ItemDescripcion = ''
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];

  var ItemDescripcion = req.body.StkItemsDesc === undefined ? '' : req.body.StkItemsDesc.toUpperCase()
  var registro = {
    idStkItems: req.body.idStkItems,
    StkItemsGrupo: req.body.StkItemsGrupo,
    StkItemsRubro: req.body.StkItemsRubro,
    StkItemsRubroAbr: req.body.StkItemsRubroAbr,
    StkItemsDesc: ItemDescripcion,
    StkItemsOTD: req.body.StkItemsOTD,
    StkItemsCantidad: 0,
    StkItemsCantDisp: 0,
    StkItemsFAct: finalDate,
    StkItemsMin: req.body.StkItemsMin,
    StkItemsMax: req.body.StkItemsMax
  };

  console.log('registro altaitem  ', registro)
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
