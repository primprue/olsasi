import express from 'express';
var router = express.Router();
import { conexion } from '../../conexion.mjs';


router.get('/', async function (req, res) {
    let indice = req.query.id;
    var q = ['SELECT idOTDatos, OTDatosOrdenAparicion, OTDatosDesc,  OTDatosOpciones,OTDatosTipoPed, OTDatosRequerido FROM BasesOrdenes.OTDatos where OTDatosTipoConf = "' + indice + '" order by OTDatosOrdenAparicion'].join(' ')


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