var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupomodificar");
  } else {
    console.log("no se conecto en stkgrupomodificar");
  }
});

var router = express();

router.post("/", async function(req, res, next) {
  indice = req.query.id;

  descr = req.body.StkGrupoDesc.toUpperCase();
  abrev = req.body.StkGrupoAbr;
  contRubro = req.body.StkGrupoContRubro;

  //  'UPDATE StkGrupo SET StkGrupoDesc = "' + descr + '", StkGrupoAbr = "' + abrev + '", StkGrupoContRubro = '+ contRubro + ' WHERE idStkGrupo = "' + indice + '"',
  console.log("Estoy en BAckend de grupo");
  var q = [
    // "UPDATE StkGrupo SET",
    // 'StkGrupoDesc = "',
    // descr,
    // '",',
    // 'StkGrupoAbr = "',
    // abrev,
    // '",',
    // "StkGrupoContRubro = ",
    // contRubro,
    // ' WHERE idStkGrupo = "',
    // indice,
    // '"'
    'UPDATE StkGrupo SET StkGrupoDesc = "' +
      descr +
      '", StkGrupoAbr = "' +
      abrev +
      '", StkGrupoContRubro = ' +
      contRubro +
      ' WHERE idStkGrupo = "' +
      indice +
      '"',
  ];
  // .join(" ");
  console.log(q);
  conexion.query(q[0], function(err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Abreviatura de Grupo existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
