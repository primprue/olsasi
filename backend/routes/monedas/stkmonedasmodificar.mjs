import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';


router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async function (req, res, next) {
    var indice = req.query.id;
    var descr = req.body.StkMonedasDescripcion.toUpperCase();
    var cotiz = req.body.StkMonedasCotizacion;
    var signo = req.body.StkMonedasSigno;
    var q = ['UPDATE StkMonedas SET ',
        'StkMonedasDescripcion = "' + descr + '",',
        'StkMonedasCotizacion = ' + cotiz + ',',
        'StkMonedasSigno = "' + signo + '"',
        ' WHERE idStkMonedas = "' + indice + '"'
    ].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1264) {
                    return res.status(412).send({ message: "El campo numérico más dígitos de los que corresponde" });
                }
                else {
                    if (err.errno == 1406) {
                        return res.status(410).send({ message: "El campo alfanumérico dígitos de los que corresponde" });
                    }
                    else
                        console.log(err);
                }
            }
            else {
                res.json(result);
            }
        });
});


export default router;