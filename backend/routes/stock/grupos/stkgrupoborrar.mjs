import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";
import mysql from "mysql";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoborrar");
  } else {
    console.log("no se conecto en stkgrupoborrar");
  }
});

router.delete("/?:id", function (req, res, next) {
  var indice = req.params.id;
  var q = ["delete", ' from StkGrupo where idStkGrupo = "', indice, '"'].join(
    ""
  );
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Grupo usado en otra tabla" });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }
  });
});
conexion.end;
export default router;
