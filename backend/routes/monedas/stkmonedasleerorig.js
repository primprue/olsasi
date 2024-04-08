var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stkmonedasleerorig");
    } else {
        console.log("no se conecto en stkmonedasleerorig");
    }
});


var router = express();

router.get('/', function (req, res, next) {
    // var q = ['Select * from StkMonedas ' ].join(' ')
    var q = ['Select * from StkMonedas '].join('')

    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err.errno);
            } else {
                res.json(result);

            }
        });


});
conexion.end;
module.exports = router;