import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbcomprobantesborrar");
  } else {
    console.log("no se conecto en pbcomprobantesborrar");
  }
});

router.delete("/", function (req, res, next) {
  var indice = req.query.id;
  var q = ["delete", ' from BasePreBalance.PBComprobantes where PBCompAbre = "', indice, '"'].join(
    ""
  );
  console.log('q ', q);
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Rubro usado en otra tabla" });
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
