import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


router.delete('/', async function (req, res) {
    var indice = req.query.id;
    var q = ['delete from StkMonedas where idStkMonedas = "' + indice + '"'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de moneda usado en otra tabla" });
                }
                {
                    console.log(err);
                }
            }
            else {
                res.json(result.rows);
            }
        });
});

export default router;
