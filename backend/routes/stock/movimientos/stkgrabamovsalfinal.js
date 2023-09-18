var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrabamovsalfinal");
  } else {
    console.log("no se conecto en stkgrabamovsalfinal");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function (req, res, next) {
  //?:id/?:id2

  var StkItemsGrupo = req.body.StkItemsGrupo;
  var StkItemsRubro = req.body.StkItemsRubro;
  var idStkItems = req.body.idStkItems;
  var nuevacantstock = req.body.nuevacantstock;
  var nuevacantdisp = req.body.nuevacantdisp;

  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var StkItemsFAct = finalDate;
  // Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1
  var q = ["UPDATE StkItems SET StkItemsCantidad =  " +
    nuevacantstock +
    ', StkItemsCantDisp =  ' +
    nuevacantdisp +
    ', StkItemsFAct = "' +
    StkItemsFAct +
    '" WHERE idStkItems = ' +
    idStkItems +
    " and  StkItemsGrupo = " +
    StkItemsGrupo +
    " and  StkItemsRubro = " +
    StkItemsRubro].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
  // conexion.query(
  //   // "UPDATE StkItems SET StkItemsCantidad = (StkItemsCantidad + " +
  //   "UPDATE StkItems SET StkItemsCantidad =  " +
  //   cantmod +
  //   '), StkItemsFAct = "' +
  //   StkItemsFAct +
  //   '" WHERE idStkItems = ' +
  //   idStkItems +
  //   " and  StkItemsGrupo = " +
  //   StkItemsGrupo +
  //   " and  StkItemsRubro = " +
  //   StkItemsRubro,
  //   function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.json(result);
  //     }
  //   }
  // );
});

module.exports = router;
