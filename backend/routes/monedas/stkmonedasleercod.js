var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkmonedasleercod");
    } else {
        console.log("no se conecto en stkmonedasleercod");
    }
});


var router = express();

router.get('/?:id', function(req, res, next) {
    indice = req.params.id;
    var q = ['Select * from StkMonedas where idStkMonedas = "'  + indice + '"'].join(' ')
    conexion.query(q,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
  

});
conexion.end;
module.exports = router;