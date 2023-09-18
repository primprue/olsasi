var express = require("express");
const { isEmpty } = require("lodash");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuprenglonleer");
  } else {
    console.log("no se conecto en presuprenglonleer");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  var indice = req.query.id;
  var q = ["Select * from BasePresup.PresupRenglon where PresupRenglonNroPresup = ", indice].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
// conexion.end;
module.exports = router;