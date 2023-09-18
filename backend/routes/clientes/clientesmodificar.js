var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
//var mysql = require('mysql');

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
  indice = req.params.id;
  var cliendesc = req.body.ClientesDesc;
  var cliencalle = req.body.ClientesCalle;
  var cliennrocalle = req.body.ClientesNroCalle;
  var clienpiso = req.body.ClientesPiso;
  var cliendto = req.body.ClientesDto;
  var cliencodpostal = req.body.ClientesCodPos;
  var clienlocalidad = req.body.ClientesLoc;
  var clienprovincia = req.body.ClientesPcia;
  var clientelefono = req.body.ClientesTel;
  var clienmail = req.body.ClientesMail;
  var clieniva = req.body.ClientesIVA;
  var cliencuit = req.body.ClientesCUIT;
  var clientipo = req.body.ClientesTipo;


  var q = [
    'update BasesGenerales.Clientes set ClientesDesc = "',
    cliendesc,
    '" , ClientesCalle = "',
    cliencalle,
    '" , ClientesNroCalle = ',
    cliennrocalle,
    ' , ClientesPiso = "',
    clienpiso,
    '" , ClientesDto = "',
    cliendto,
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
    '" , ClientesTipo = 0 ',
    clientipo,
    ' where idClientes = ',

    indice
  ].join("");
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
