import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en transporteleercod");
    } else {
        console.log("no se conecto en transporteleercod");
    }
});



router.get('/', async function (req, res) {
    var indice = req.query.id;
    var q = ['SELECT * FROM BasesGenerales.Transporte where idTransporte = ' + indice].join(' ')
    console.log('q transporteleercod ', q)
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });

});
conexion.end;
export default router;