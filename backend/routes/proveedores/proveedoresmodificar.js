var express = require("express");
var router = express.Router();
var conexion = require("../conexion");
//var mysql = require('mysql');

//var router = express();
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en proveedoresmodificar");
  } else {
    console.log("no se conecto en proveedoresmodificar");
  }
});
var router = express();

router.post("/?:id", function (req, res) {
  //indice = req.params.id;
  indice = req.params.id;

  var provdesc = req.body.ProveedoresDesc;
  var provtipo = req.body.ProveedoresTipo;
  var provcuit = req.body.ProveedoresCUIT;
  var provcalle = req.body.ProveedoresCalle;

  var provnrocalle = req.body.ProveedoresNroCalle;
  var provpiso = req.body.ProveedoresPiso;
  var provdto = req.body.ProveedoresDto;
  var provcodpostal = req.body.ProveedoresCodPos;
  var provlocalidad = req.body.ProveedoresLoc;
  var provprovincia = req.body.ProveedoresPcia;
  var provtelefono = req.body.ProveedoresTel;
  var provcontacto = req.body.ProveedoresContacto;
  var provmail = req.body.ProveedoresMail;
  var provpagweb = req.body.ProveedoresWeb;
  var provcodmon = req.body.ProveedoresCodMon;
  /*
'update BasesGenerales.Proveedores set ProveedoresDesc = "' + provdesc + 
                                        '" , ProveedoresTipo = ' + provtipo + 
                                        ' ,  ProveedoresCUIT = "' + provcuit + 
                                        '" , ProveedoresCalle = "' + provcalle + 
                                        '" , ProveedoresNroCalle = ' + provnrocalle + 
                                         ' , ProveedoresPiso = "' + provpiso +
                                        '" , ProveedoresDto = "' + provdto +
                                        '" , ProveedoresCodPos = "' + provcodpostal +
                                        '" , ProveedoresLoc = "' + provlocalidad +
                                        '" , ProveedoresPcia = "' + provprovincia +
                                        '" , ProveedoresTel = "' + provtelefono +
                                        '" , ProveedoresContacto = "' + provcontacto +
                                        '" , ProveedoresMail = "' + provmail +
                                        '" , ProveedoresWeb = "' + provpagweb +
                                        '" , ProveedoresCodMon = "' + provcodmon + 
                                         '" where idProveedores = ' + indice
*/
  var q = [
    'update BasesGenerales.Proveedores set ProveedoresDesc = "',
    provdesc,
    '" , ProveedoresTipo = ',
    provtipo,
    ' ,  ProveedoresCUIT = "',
    provcuit,
    '" , ProveedoresCalle = "',
    provcalle,
    '" , ProveedoresNroCalle = ',
    provnrocalle,
    ' , ProveedoresPiso = "',
    provpiso,
    '" , ProveedoresDto = "',
    provdto,
    '" , ProveedoresCodPos = "',
    provcodpostal,
    '" , ProveedoresLoc = "',
    provlocalidad,
    '" , ProveedoresPcia = "',
    provprovincia,
    '" , ProveedoresTel = "',
    provtelefono,
    '" , ProveedoresContacto = "',
    provcontacto,
    '" , ProveedoresMail = "',
    provmail,
    '" , ProveedoresWeb = "',
    provpagweb,
    '" , ProveedoresCodMon = "',
    provcodmon,
    '" where idProveedores = ',
    indice
  ].join("");
  console.log('q en proveeodpres   ', q)
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
