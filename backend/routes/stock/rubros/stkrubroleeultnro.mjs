import express from "express";
var router = express.Router();
import path from "path";
import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkleeultnrorubro");
  } else {
    console.log("no se conecto en stkleeultnrorubro");
  }
});


router.get("/", function (req, res) {
  codgrupo = req.query.id;

  var q = [
    "Select StkGrupoContRubro + 1 as CodRubroNuevo ",
    "from StkGrupo where idStkGrupo = ",
    codgrupo
  ].join(" ");

  conexion.query(q, function (err, result) {
    if (err) {
      console.log(
        "Error  Select StkGrupoContRubro as CuentaRubro from StkGrupo"
      );
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

conexion.end;
export default router;
