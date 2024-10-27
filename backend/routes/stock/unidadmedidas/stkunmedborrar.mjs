import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";
import mysql from "mysql";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkunmedborrar");
  } else {
    console.log("no se conecto en stkunmedborrar");
  }
});

router.delete("/?:id", function (req, res, next) {
  var indice = req.params.id;

  var q = [
    'delete from StkUnMed where idStkUnMed = "' + indice + '"'
  ].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({
            message: "error Código de Unidad de Medida usado en otra tabla"
          });
      }
      {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  }
  );
});

export default router;
