import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerdescmayigual");
    } else {
        console.log("no se conecto en clientesleerdescmayigual");
    }
});



router.get('/', async function (req, res) {
    var clientenuevo = req.query.clientenuevo;
    var q = [`SELECT * FROM BasesGenerales.Clientes where ClientesDesc >= "${clientenuevo}"`].join(' ')
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