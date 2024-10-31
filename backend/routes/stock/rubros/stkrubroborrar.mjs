import express from "express";
var router = express.Router();
import conexion from "../../conexion.mjs";



conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en sktrubroborrar");
  } else {
    console.log("no se conecto en sktrubroborrar");
  }
});

router.all("/", async function (req, res, next) {
  var idStkRubro = req.query.idStkRubro;
  var StkRubroCodGrp = req.query.StkRubroCodGrp;
  var q = [
    "delete from StkRubro where idStkRubro = ",
    idStkRubro,
    " and StkRubroCodGrp = ",
    StkRubroCodGrp
  ].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Rubro usado en otra tabla" });
      }
      {
        console.log(err.errno);
      }
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
