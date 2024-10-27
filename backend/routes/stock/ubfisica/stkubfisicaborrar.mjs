import express from "express";
var router = express.Router();
import conexion from "../../conexion.mjs";


conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkubfisicaborrar");
  } else {
    console.log("no se conecto en stkubfisicaborrar");
  }
});

router.all("/", async function (req, res, next) {

  idStkUbFisica1 = req.query.idStkUbFisica;
  StkUbFisicaGeo1 = req.query.StkUbFisicaGeo;
  conexion.query(
    'delete from StkUbFisica where idStkUbFisica = "' +
    idStkUbFisica1 +
    '" and StkUbFisicaGeo = "' +
    StkUbFisicaGeo1 +
    '"',
    function (err, result) {
      if (err) {
        if (err.errno == 1451) {
          return res
            .status(411)
            .send({ message: "error Código de UbFisica usado en otra tabla" });
        }
        {
          console.log(err);
        }
      } else {
        res.json(result.rows);
      }
    }
  );
});

export default router;
