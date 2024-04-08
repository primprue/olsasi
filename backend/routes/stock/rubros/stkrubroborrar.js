var express = require("express");
var router = express.Router();
var conexion = require("../../conexion");

var router = express();

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en sktrubroborrar");
  } else {
    console.log("no se conecto en sktrubroborrar");
  }
});

router.all("/", async function (req, res, next) {
  idStkRubro = req.query.idStkRubro;
  StkRubroCodGrp = req.query.StkRubroCodGrp;
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
module.exports = router;
