var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../conexion");
var variables = require('../../public/variables')
const { exec } = require('child_process');
moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupborrar");
  } else {
    console.log("no se conecto en presupborrar");
  }
});


router.delete("/?:id", function (req, res, next) {
  indice = req.params.id;

  var q = ["delete", ' from BasePresup.PresupEncab where idPresupEncab = ', indice].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código " });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }

    var q = ['DELETE FROM BasePresup.PresupRenglon WHERE PresupRenglonNroPresup = ', indice].join(" ");
    conexion.query(q, function (err, result) {
      if (err) {
        if (err.errno == 1451) {
          return res
            .status(411)
            .send({ message: "error Código " });
        }
        {
          console.log(err);
        }
      } else {
        res.json(result.rows);
      }
    });
  });
  var nombrepresup = 'Presupuesto\\ nro\\ ' + indice + '*.pdf'
  exec('rm ' + variables.dirpresupdocumento + nombrepresup, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      res.json(error.message)
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.json(stderr)
      return;
    }
    res.json(`${stdout}`)
    console.log(`stdout:\n${stdout}`);
  });
});
conexion.end;
module.exports = router;