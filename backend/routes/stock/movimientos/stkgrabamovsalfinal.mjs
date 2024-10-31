import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrabamovsalfinal");
  } else {
    console.log("no se conecto en stkgrabamovsalfinal");
  }
});



router.post("/", async function (req, res, next) {
  var StkItemsGrupo = req.body.StkItemsGrupo;
  var StkItemsRubro = req.body.StkItemsRubro;
  var idStkItems = req.body.idStkItems;
  var nuevacantstock = req.body.nuevacantstock;
  var nuevacantdisp = req.body.nuevacantdisp;

  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];
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

});

export default router;
