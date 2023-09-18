var express = require('express');
var router = express.Router();
var path = require('path');

/*
idStkItems
*/

var router = express();



router.post('/', async function (req, res, next) {
  //?:id/?:id2

  var cant = req.body.cant;
  var larg = req.body.larg;
  var anch = req.body.anch;
  var StkItemsCantDisp = req.body.StkItemsCantDisp;
  var TConfec = req.body.TConfec;
  var total = 0.00;
  var faltante = 0.00;
  var pasador = [];

  if (TConfec == 1) {
    total = (((larg + 0.08) / 1.49) * (anch + 0.08)) * cant
  }
  if (TConfec == 2) {
    total = (((larg + .12) / 1.49) * (anch + 0.12)) * cant
  }
  if (TConfec == 3) {
    total = larg * cant
  }
  if (TConfec == 4) {
    total = (((larg + 0.08) / 1.49) * (anch + 0.24)) * cant
  }
  pasador.push(total);
  if (total > StkItemsCantDisp) {
    faltante = total - StkItemsCantDisp
  }
  pasador.unshift(faltante)
  res.json(pasador)
});
module.exports = router;