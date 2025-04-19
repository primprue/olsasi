import express from 'express';
var router = express.Router();
import conexion from '../../conexion.mjs';
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otdatoslee");
    } else {
        console.log("no se conecto en otdatoslee");
    }
});

router.get('/', async function (req, res) {
    let indice = req.query.id;
    //JSON_KEYS(OTDatosOpciones) AS claves,
    //var q = ['SELECT *, JSON_KEYS(OTDatosOpciones) AS claves,  JSON_UNQUOTE(JSON_EXTRACT(OTDatosOpciones,' + "'$'" + ')) AS valores, idOTDatos as id FROM BasesOrdenes.OTDatos where OTDatosTipoConf = "' + indice + '" order by OTDatosOrdenAparicion'].join(' ')
    var q = ['  SELECT idOTDatos, OTDatosOrdenAparicion, OTDatosDesc, OTDatosConfCod, OTDatosOpciones,OTDatosTipoPed, OTDatosRequerido FROM BasesOrdenes.OTDatos where OTDatosTipoConf = "' + indice + '" order by OTDatosOrdenAparicion'].join(' ')
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