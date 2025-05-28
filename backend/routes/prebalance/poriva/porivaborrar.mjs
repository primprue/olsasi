import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en porivaborrar");
  } else {
    console.log("no se conecto en porivaborrar");
  }
});

router.delete("/", function (req, res, next) {
  var indice = req.query.id;
  var q = ["delete", ' from BasePreBalance.PBPorIVA where PBPorcIVA = "', indice, '"'].join(
    ""
  );
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error PBPorcIVA usado en otra tabla" });
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
