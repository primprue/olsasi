import express from 'express';
var router = express.Router();
import conexion from '../conexion.mjs';




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerpresup");
    } else {
        console.log("no se conecto en clientesleerpresup");
    }
});






router.get('/', function (req, res, next) {
    const q = [
        'SELECT',
        ' idClientes as PresupEncabCliente, ClientesDesc ',
        '  FROM BasesGenerales.Clientes ',
        ' order by ClientesDesc',

    ].join(' ');

    conexion.query(
        q,
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