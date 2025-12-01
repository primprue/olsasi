
import express from 'express';
var router = express.Router();
import conexion from '../conexion.mjs';



router.get('/', async function (req, res) {
    var q = ['SELECT idOTEstado as value, OTEstadoDesc as label  FROM BasesOrdenes.OTEstado'].join(' ')
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
})

conexion.end
export default router;