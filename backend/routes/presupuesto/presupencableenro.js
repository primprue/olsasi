var express = require("express");
var router = express.Router();
var conexion = require("../conexion");


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupencableenro");
  } else {
    console.log("no se conecto en presupencableenro");
  }
});


var router = express();

router.get("/", async function (req, res) {
  console.log('presupencableenro  ', req.query)
  var indice = req.query.idClienteP;
  console.log('indice  ', indice)
  var q = ["Select * from BasePresup.PresupEncab where idPresupEncab = " + indice].join(" ");
  console.log('q  ', q)
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('result  ', result)
      res.json(result);
    }
  });
});
conexion.end;
module.exports = router;