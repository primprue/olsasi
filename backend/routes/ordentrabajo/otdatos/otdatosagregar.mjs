import express from 'express';
var router = express.Router();
import moment from 'moment';
import conexion from '../../conexion.mjs';
moment.locale('es');
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otdatosagregar");
    } else {
        console.log("no se conecto en otdatosagregar");
    }
});

const rows = []
router.post('/', function (req, res) {
    const nuevoValor = { "": 0 };
    var registro = {
        OTDatosTipoConf: req.body.OTDatosTipoConf,
        // OTDatosConfCod: req.body.OTDatosConfCod,
        OTDatosDesc: req.body.OTDatosDesc,
        // OTDatosOpciones: req.body.OTDatosOpciones,
        OTDatosOpciones: JSON.stringify(nuevoValor),
        OTDatosTipoPed: req.body.OTDatosTipoPed,
        OTDatosRequerido: req.body.OTDatosRequerido,
        OTDatosOrdenAparicion: req.body.OTDatosOrdenAparicion,
        OTDatosAncho: req.body.OTDatosAncho
    }
    console.log('registro   ', registro)
    conexion.query('INSERT INTO BasesOrdenes.OTDatos SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log(err.errno);
                }
            }


            else {
                res.json(result.rows);
            }
        });
});
export default router;