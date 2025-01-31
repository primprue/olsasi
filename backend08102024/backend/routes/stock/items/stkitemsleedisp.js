var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos en stkitemsleedisp");
  } else {
    console.log("no se conecto en stkitemsleedisp");
  }
});

var router = express();

router.get("/", async function(req, res, next) {
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.idStkGrupo;
  var StkItemsRubro = req.query.idStkRubro;
  /*
 'Select * from StkItems where idStkItems  = ' + idStkItems  + ' and StkItemsGrupo  = ' + StkItemsGrupo  + ' and  StkItemsRubro  = ' + StkItemsRubro
 */
  var q = [
    "Select StkItemsCantDisp from StkItems where idStkItems  = ",
    idStkItems,
    " and StkItemsGrupo  = ",
    StkItemsGrupo,
    " and  StkItemsRubro  = ",
    StkItemsRubro
  ].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
