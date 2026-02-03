import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';


var datosenvio = [];


router.get("/", async function (req, res) {
  var indice = req.query.idPresupP;
  var clientepresup = ''
  var q = ["Select * from BasePresup.PresupEncab where idPresupEncab = " + indice].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      datosenvio.unshift(result)
      clientepresup = parseFloat(result[0].PresupEncabCliente); // o parseInt(value, 10) si esperas un número entero
      const isNumeric = !isNaN(clientepresup) && isFinite(clientepresup);
      if (isNumeric) {
        var q1 = ["Select * from BasePresup.PresupEncab join BasesGenerales.Clientes where idPresupEncab = " + indice + " and PresupEncabCliente = idClientes "].join(" ");
        conexion.query(q1, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            datosenvio.unshift(result);
          }
        })


      }

      res.json(datosenvio);
      datosenvio = [];
    }
  });

});
conexion.end;
export default router;