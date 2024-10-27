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
    console.log("base de datos conectada en stkitemsagregarderubro");
  } else {
    console.log("no se conecto en stkitemsagregarderubro");
  }
});


router.post("/", async function (req, res) {
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];

  var registro = {
    idStkItems: 1,
    StkItemsGrupo: req.body.StkItemsGrupo,
    StkItemsRubro: req.body.StkItemsRubro,
    StkItemsRubroAbr: req.body.StkItemsRubroAbr,
    // StkItemsDesc: req.body.StkItemsDesc.toUpperCase(),
    StkItemsDesc: '',
    StkItemsOTD: req.body.StkItemsOTD,
    // StkItemsCantidad: req.body.StkItemsCantidad,
    // StkItemsCantDisp: req.body.StkItemsCantidad,
    StkItemsCantidad: 0,
    StkItemsCantDisp: 0,
    StkItemsFAct: finalDate,
    StkItemsMin: req.body.StkItemsMin,
    StkItemsMax: req.body.StkItemsMax
  };
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
