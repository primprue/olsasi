var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en en en en stkrubroleecodgryrb");
  } else {
    console.log("no se conecto en en stkrubroleecodgryrb");
  }
});

var router = express();

router.get("/", async function(req, res, next) {
  idStkRubro = req.query.idStkRubro;
  StkRubroCodGrp = req.query.idStkGrupo;

  var q = [
    "Select * from StkRubro where idStkRubro = ",
    idStkRubro,
    " and  StkRubroCodGrp  = ",
    StkRubroCodGrp
  ].join(" ");

  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
