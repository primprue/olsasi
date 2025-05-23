import express from 'express';
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en pbcomprobantesmodificar");
    } else {
        console.log("no se conecto en pbcomprobantesmodificar");
    }
});

router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
// router.post('/?:id', function (req, res, next) {
router.post("/", async function (req, res, next) {

    var indice = req.query.id;
    var descr = req.body.PBCompDesc.toUpperCase();
    var sumrest = req.body.PBCompSumaResta;
    var q = ['UPDATE BasePreBalance.PBComprobantes SET ',
        'PBCompDesc = "' + descr + '",',
        'PBCompSumaResta = "' + sumrest + '"',
        ' WHERE PBCompAbre = "' + indice + '"'
    ].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1264) {
                    return res.status(412).send({ message: "El campo tiene más dígitos de los que corresponde" });
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