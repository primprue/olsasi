var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleeproveedor");
  } else {
    console.log("no se conecto en stkrubroleeproveedor");
  }
});

var router = express();

//router.all("/", async function(req, res, next) {
router.get("/", function(req, res, next) {
  var q = [
    "SELECT idProveedores as StkRubroProv, ProveedoresDesc  FROM BasesGenerales.Proveedores where ProveedoresTipo = 26 order by ProveedoresDesc"
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
