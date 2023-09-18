var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var dateFormat = require('dateformat');
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupencableer");
  } else {
    console.log("no se conecto en presupencableer");
  }
});
var router = express();

router.get("/", function (req, res, next) {

  var fecharecibida = req.query.id;
  var day = dateFormat(new Date(fecharecibida), "yyyy-mm-dd");
  // var q = ["Select * from BasePresup.PresupEncab order by PresupEncabFecha "].join(" ");
  var q = ["Select * from BasePresup.PresupEncab where PresupEncabFecha >= '" + day + "' order by PresupEncabFecha desc"].join(" ");
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