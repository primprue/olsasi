import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

function convertirFecha(fechaDDMMYYYY) {
  const [dia, mes, anio] = fechaDDMMYYYY.split('/');
  return new Date(`${anio}-${mes}-${dia}`);
}

router.post("/", function (req, res, next) {
  var registro = {
    CajaInternaFecha: req.body.CajaInternaFecha,
    CajaInternaConcepto: req.body.CajaInternaConcepto,
    CajaInternaMoneda: req.body.CajaInternaMoneda,
    CajaInternaES: req.body.CajaInternaES,
    CajaInternaMT: req.body.CajaInternaMT,
    CajaInternaImporte: parseFloat(req.body.CajaInternaImporte),
    CajaInternaTotalInstr: 0
  };
  registro.CajaInternaFecha = convertirFecha(registro.CajaInternaFecha);
  let q1 = `INSERT INTO BaseCaja.CajaInterna SET ?`;
  conexion.query(q1, registro, function (err, result) {
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
conexion.end;
export default router;
