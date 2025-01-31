var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkmovsalfinal");
  } else {
    console.log("no se conecto en stkmovsalfinal");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function(req, res, next) {
  //?:id/?:id2
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;

  var cantidad = req.body.cantidad;
  var cantidad1 = req.body.cantidad1;
  var cantmod = cantidad * cantidad1 * -1;
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var StkItemsFAct = finalDate;
  // Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1

  conexion.query(
    "UPDATE StkItems SET StkItemsCantidad = (StkItemsCantidad + " +
      cantmod +
      '), StkItemsFAct = "' +
      StkItemsFAct +
      '" WHERE idStkItems = ' +
      idStkItems +
      " and  StkItemsGrupo = " +
      StkItemsGrupo +
      " and  StkItemsRubro = " +
      StkItemsRubro,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
