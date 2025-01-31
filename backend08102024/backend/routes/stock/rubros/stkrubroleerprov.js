var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerprov");
  } else {
    console.log("no se conecto en stkrubroleerprov ");
  }
});

var router = express();

router.get("/?:idStkGrupo", function (req, res, next) {
  indice = req.params.idStkGrupo;
  var q = [
    "Select idStkRubro, StkRubroDesc, StkRubroAbr, StkRubroProv, ",
    "Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes, StkRubroPres, StkRubroUM, StkRubroCosto, ",
    "StkRubroConf, StkRubroTM, ",
    'date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha ',
    "from StkRubro JOIN BasesGenerales.Proveedores  ",
    "where StkRubroCodGrp = " + indice + " and StkRubroProv = idProveedores order by StkRubroDesc; "].join(" ");
  console.log('q  ', q)

  // conexion.query("Select * from StkRubro order by StkRubroDesc", function (err, result) {

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
