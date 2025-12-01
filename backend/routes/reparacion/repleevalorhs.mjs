import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


var datosenvio = []

router.get('/', (req, res, next) => {
  var q
  var costhora = 0.00, coefMOTmay = 0.00, coefMOTmin = 0.00, minlonanues = 0.00, minlonaafuera = 0.00

  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      costhora = result[0].costoMOT / 60
      coefMOTmay = result[0].coefMOTmay
      coefMOTmin = result[0].coefMOTmin

      minlonanues = (costhora + 1) * 60 * coefMOTmay //esto se hizo para que el valor sea el mismo que en el anexo
      minlonaafuera = (costhora + 1) * 60 * coefMOTmin  //esto se hizo para que el valor sea el mismo que en el anexo

      datosenvio.push(minlonanues)
      datosenvio.push(minlonaafuera)

      res.json(datosenvio)
      datosenvio = []
    })
});


conexion.end
export default router;