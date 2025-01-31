var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleecodgr");
  } else {
    console.log("no se conecto en stkitemsleecodgr");
  }
});

var router = express();

router.get("/", async function (req, res, next) {

  var StkItemsGrupo = req.query.idStkGrupo;

  /*
 'Select * from StkItems where idStkItems  = ' + idStkItems  + ' and StkItemsGrupo  = ' + StkItemsGrupo  + ' and  StkItemsRubro  = ' + StkItemsRubro
 */
  var q = [
    "Select * from StkItems where StkItemsGrupo  = ",
    StkItemsGrupo,
    " order by StkItemsRubroAbr asc "
  ].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
