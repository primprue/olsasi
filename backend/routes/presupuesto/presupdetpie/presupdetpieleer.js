var express = require("express");
var router = express.Router();
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

  var q = ["Select idPresupDetPie as id, PresupDetPieLeyenda, PresupDetPieSelec from BasePresup.PresupDetPie order by PresupDetPieLeyenda"].join(" ");

  console.log('q  ', q)
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
