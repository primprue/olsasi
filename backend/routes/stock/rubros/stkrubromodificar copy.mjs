import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.post("/", async function (req, res, next) {
  var idStkRubro = req.query.idStkRubro;
  var StkRubroCodGrp = req.query.StkRubroCodGrp;
  var StkRubroDesc = req.body.StkRubroDesc.toUpperCase();
  var StkRubroAbr = req.body.StkRubroAbr.toUpperCase();
  var StkRubroProv = req.body.StkRubroProv;
  var StkRubroAncho = req.body.StkRubroAncho;
  var StkRubroPresDes = req.body.StkRubroPresDes.toUpperCase();
  var StkRubroPres = req.body.StkRubroPres;
  var StkRubroUM = req.body.StkRubroUM;
  var StkRubroCosto = req.body.StkRubroCosto;
  var StkRubroTM = req.body.StkRubroTM;
  var StkRubroConf = req.body.StkRubroConf;
  var d = new Date();
  var finalDate = d.toISOString().split("T")[0];

  var q = [
    'UPDATE StkRubro SET StkRubroDesc = "',
    StkRubroDesc,
    '", StkRubroAbr = "',
    StkRubroAbr,
    '", StkRubroProv = ',
    StkRubroProv,
    ", StkRubroAncho = ",
    StkRubroAncho,
    ', StkRubroPresDes = "',
    StkRubroPresDes,
    '", StkRubroPres = ',
    StkRubroPres,
    ', StkRubroUM = "',
    StkRubroUM,
    '", StkRubroCosto = ',
    StkRubroCosto,
    ', StkRubroTM = "',
    StkRubroTM,
    '", StkRubroConf = "',
    StkRubroConf,
    '", StkRubroFecha = "',
    finalDate,
    '" WHERE idStkRubro = ',
    idStkRubro,
    " and  StkRubroCodGrp = ",
    StkRubroCodGrp
  ].join("");
  console.log(q);
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(460).send({ message: "error clave duplicada" });
      } else if (err.errno == 1406 || err.errno == 1264) {
        return res.status(410).send({ message: "Texto demasiado largo" });
      }
      {
        err;
      }
    } else {
      res.json(result);
    }
  });
});

conexion.end;
export default router;
