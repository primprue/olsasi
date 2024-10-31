import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleercod");
    } else {
        console.log("no se conecto en clientesleercod");
    }
});



router.get('/', async function (req, res) {
    var indice = req.query.id;
    console.log('indice clientesleercod  ', indice)
    var q = ['SELECT * FROM BasesGenerales.Clientes where idClientes = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno === 1064) {
                    result = 0
                    res.json(result);
                }
                else {
                    console.log('ingreso al error  ', result)
                    console.log(err);
                }
            }
            else {
                res.json(result);

            }
        });

});
conexion.end;
export default router;