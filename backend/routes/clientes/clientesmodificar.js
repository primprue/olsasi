var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
//var mysql = require('mysql');
var moment = require('moment');
moment.locale('es');

//var router = express();
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en clientesmodificar");
  } else {
    console.log("no se conecto en clientesmodificar");
  }
});
var router = express();

router.post("/?:id", function (req, res) {
  //indice = req.params.id;
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  indice = req.params.id;
  var cliendesc = req.body.ClientesDesc;
  var cliendomicilio = req.body.ClientesDomicilio;
  var cliencodpostal = req.body.ClientesCodPos;
  var clienlocalidad = req.body.ClientesLoc;
  var clienprovincia = req.body.ClientesPcia;
  var clientelefono = req.body.ClientesTel;
  var clienmail = req.body.ClientesMail;
  var clieniva = req.body.ClientesIVA;
  var cliencuit = req.body.ClientesCUIT;
  var clientipo = req.body.ClientesTipo;
  var cliencontacto = req.body.ClientesContacto;
  var cliencategoria = req.body.ClientesCategoria;
  var clienobserv1 = req.body.ClientesObserv1;
  var clienobserv2 = req.body.ClientesObserv2;
  var clienfecha = req.body.ClientesFecha;

  var q = [
    'update BasesGenerales.Clientes set ClientesDesc = "',
    cliendesc,
    '" , ClientesDomicilio = "',
    cliendomicilio,
    '" , ClientesCodPos = "',
    cliencodpostal,
    '" , ClientesLoc = "',
    clienlocalidad,
    '" , ClientesPcia = "',
    clienprovincia,
    '" , ClientesTel = "',
    clientelefono,
    '" , ClientesMail = "',
    clienmail,
    '" , ClientesIVA = "',
    clieniva,
    '" ,  ClientesCUIT = "',
    cliencuit,
    '" , ClientesTipo = "',
    clientipo,
    '" , ClientesContacto = "',
    cliencontacto,
    '" , ClientesCategoria = "',
    cliencategoria,
    '" , ClientesObserv1 = "',
    clienobserv1,
    '" , ClientesObserv2 = "',
    clienobserv2,
    '" , ClientesFecha = "',
    clienfecha,
    '" where idClientes = ',

    indice
  ].join("");
  console.log('q en modifica clientes  ', q)
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
