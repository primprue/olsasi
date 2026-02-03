import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';

router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async function (req, res, next) {
  var indice = req.query.id;
  // router.post("/?:id", function (req, res) {
  //   var indice = req.params.id;
  var transdesc = req.body.TransporteDesc;
  var transtel1 = req.body.TransporteTel1;
  var transtel2 = req.body.TransporteTel2;
  var transwa = req.body.TransporteWA;
  var transnromail = req.body.TransporteMail;
  var transdom = req.body.TransporteDom;
  var transloc = req.body.TransporteLoc;
  var transdestino = req.body.TransporteDestino;
  var transobser = req.body.TransporteObser;
  var q = [
    'update BasesGenerales.Transporte set TransporteDesc = "',
    transdesc,
    '" , TransporteTel1 = "',
    transtel1,
    '" ,  TransporteTel2 = "',
    transtel2,
    '" , TransporteWA = "',
    transwa,
    '" , TransporteMail = "',
    transnromail,
    '" , TransporteDom = "',
    transdom,
    '" , TransporteLoc = "',
    transloc,
    '" , TransporteDestino = "',
    transdestino,
    '" , TransporteObser = "',
    transobser,
    '" where idTransporte = ',
    indice
  ].join("");
  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      }
      else {
        if (err.errno == 1406) {
          return res.status(412).send({ message: "el dato numerico más dígitos de los que corresponde" });
        }
        else {
          console.log(err.errno);
        }
      }
    }
    else {
      res.json(result.rows);
    }
  });
});

export default router;
