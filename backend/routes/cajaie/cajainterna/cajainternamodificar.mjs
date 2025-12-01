import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";




function convertirFecha(fechaDDMMYYYY) {
  const [dia, mes, anio] = fechaDDMMYYYY.split('-');
  return `${anio}-${mes}-${dia}`;   // <-- string perfecto para MySQL
}

router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  var CajaInternaFecha = convertirFecha(req.body.CajaInternaFecha);
  var CajaInternaConcepto = req.body.CajaInternaConcepto;
  var CajaInternaMoneda = req.body.CajaInternaMoneda;
  var CajaInternaES = req.body.CajaInternaES;
  var CajaInternaMT = req.body.CajaInternaMT;
  var CajaInternaImporte = parseFloat(req.body.CajaInternaImporte);
  var q = `UPDATE BaseCaja.CajaInterna SET CajaInternaFecha = '${CajaInternaFecha}',
        CajaInternaConcepto = '${CajaInternaConcepto}',
        CajaInternaMoneda = '${CajaInternaMoneda}',
        CajaInternaES = '${CajaInternaES}',
        CajaInternaMT = '${CajaInternaMT}',
        CajaInternaImporte = '${CajaInternaImporte}',
        CajaInternaTotalInstr = '0'
        WHERE idCajaInterna = ${indice}`;
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res
          .status(409)
          .send({ message: "Fecha de Caja existente" });
      } else console.log(err);
    } else {
      res.json(result);
    }
  });
});


conexion.end;
export default router;
