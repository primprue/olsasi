var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var dateFormat = require('dateformat');
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuprengleer");
  } else {
    console.log("no se conecto en presuprengleer");
  }
});
var router = express();

router.get("/", function (req, res, next) {

  var detbusca = req.query.id;

  // var q = ["Select * from BasePresup.PresupEncab order by PresupEncabFecha "].join(" ");
  var q = ["SELECT PresupRenglonNroPresup, idPresupEncab, PresupEncabCliente, PresupEncabFecha, PresupEncabMayMin, PresupEncabTotal FROM BasePresup.PresupRenglon join  BasePresup.PresupEncab where PresupRenglonDesc like '%" + detbusca + "%' and PresupRenglonNroPresup = BasePresup.PresupEncab.idPresupEncab order by PresupRenglonNroPresup asc"].join(" ");
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



