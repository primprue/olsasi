var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupdetpieleer");
  } else {
    console.log("no se conecto en presupdetpieleer");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  //var q = ["Select sPresupDetPieLeyenda, PresupDetPieSelec from BasePresup.PresupDetPie order by PresupDetPieLeyenda"].join(" ");

  var q = ["Select idPresupDetPie as id, PresupDetPieLeyenda, PresupDetPieSelec from BasePresup.PresupDetPie order by PresupDetPieLeyenda"].join(" ");

  console.log('q  ', q)
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log('resul  ', result)
    }
  });
});
conexion.end;
module.exports = router;
