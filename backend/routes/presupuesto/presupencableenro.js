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

var datosenvio = [];
var router = express();

router.get("/", async function (req, res) {
  var indice = req.query.idPresupP;
  var clientepresup = ''
  var q = ["Select * from BasePresup.PresupEncab where idPresupEncab = " + indice].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      datosenvio.unshift(result)
      clientepresup = parseFloat(result[0].PresupEncabCliente); // o parseInt(value, 10) si esperas un número entero
      const isNumeric = !isNaN(clientepresup) && isFinite(clientepresup);
      if (isNumeric) {
        var q1 = ["Select * from BasePresup.PresupEncab join BasesGenerales.Clientes where idPresupEncab = " + indice + " and PresupEncabCliente = idClientes "].join(" ");
        conexion.query(q1, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('result en presupencableeenro Clientes ', result)
            datosenvio.unshift(result);
          }
        })


      }
      // else {
      //   // var datocliente = { PresupEncabCliente: result[0].PresupEncabCliente }
      //   console.log('result[0].PresupEncabCliente en presupencableeenro Clientes ', result[0].PresupEncabCliente)
      //   let Clientesindatos = {
      //     ClientesDesc: result[0].PresupEncabCliente
      //   };
      //   // datosenvio.unshift(result[0].PresupEncabCliente);
      //   datosenvio.unshift(Clientesindatos);
      // }
      console.log('datosenvio presupencableenro  ', datosenvio)
      res.json(datosenvio);
      datosenvio = [];
    }
  });

});
conexion.end;
module.exports = router;