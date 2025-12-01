import express from 'express';
var router = express.Router();

import conexion from '../../conexion.mjs';


router.post('/?:id', function (req, res, next) {
    var indice = req.params.id;

    let ParamCompLetra = req.body.ParamCompLetra;
    let ParamCompAbrev = req.body.ParamCompAbrev;
    let ParamCompSuc = req.body.ParamCompSuc;
    let ParamCompNro = req.body.ParamCompNro;
    let ParamCompSR = req.body.ParamCompSR;
    let ParamCompDesc = req.body.ParamCompDesc;
    let ParamCompDisc = req.body.ParamCompDisc;
    let ParamCompIVAAsoc = req.body.ParamCompIVAAsoc;


    var q = ['UPDATE CtaCte.ParamComp SET ',
        'ParamCompLetra = "', ParamCompLetra, '",',
        ' ParamCompAbrev = "', ParamCompAbrev, '",',
        ' ParamCompSuc = ', ParamCompSuc, ',',
        ' ParamCompNro = ', ParamCompNro, ',',
        ' ParamCompSR = "', ParamCompSR, '",',
        ' ParamCompDesc = "', ParamCompDesc, '",',
        ' ParamCompDisc = "', ParamCompDisc, '",',
        ' ParamCompIVAAsoc = ', ParamCompIVAAsoc,
        ' WHERE idParamComp = ', indice,
    ].join('')
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