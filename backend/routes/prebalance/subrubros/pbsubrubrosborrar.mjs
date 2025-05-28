import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbsubrubrosborrar");
  } else {
    console.log("no se conecto en pbsubrubrosborrar");
  }
});

router.delete("/?:id", function (req, res, next) {
  var indice = req.params.id;
  var q = ["delete", ' from BasePreBalance.PBSubRubros where PBidSubRubro = "', indice, '"'].join(
    ""
  );
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de PBSubRubros usado en otra tabla" });
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
