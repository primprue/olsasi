import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");
//cambié en la tabla de rubros de PreBalance el indice autoincremental 
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en pbsubrubrosagregar");
  } else {
    console.log("no se conecto en pbsubrubrosagregar");
  }
});

router.post("/", function (req, res, next) {

  var RubroElegido = req.body.PBSubRubroIdRubro;
  var q = ['SELECT max(PBidSubRubro) as maxsubrubro FROM BasePreBalance.PBSubRubros where PBSubRubroIdRubro = ', RubroElegido].join(" ");

  conexion.query(q, function (err, result) {
    var maxsubrubro = 0
    if (err) {
      console.log(err);
    } else {
      if (result[0].maxsubrubro === null) {
        maxsubrubro = 0
      } else {
        maxsubrubro = result[0].maxsubrubro
      }


    }
    var detallemayus = req.body.PBSubRubroDetalle.toUpperCase();
    var idsubrubro = maxsubrubro + 1

    var registro = {
      PBidSubRubro: idsubrubro,
      PBSubRubroIdRubro: parseInt(req.body.PBSubRubroIdRubro),
      PBSubRubroDetalle: detallemayus,
    };
    conexion.query("INSERT INTO BasePreBalance.PBSubRubros SET ?", registro,
      function (err, result) {
        if (err) {
          if (err.errno == 1062) {
            return res.status(409).send({ message: "error clave duplicada" });
          } else {
            console.log("ERROR ");
            console.log(err.errno);
          }
        } else {
          res.json(result);
        }
      });
  });
});
conexion.end;
export default router;
