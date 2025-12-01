import express from 'express';
var router = express.Router();
import moment from 'moment';
import conexion from '../../conexion.mjs';
moment.locale('es');

router.post('/', function (req, res) {
    const nuevoValor = { "": 0 };
    var registro = {
        OTDatosTipoConf: req.body.OTDatosTipoConf,
        OTDatosDesc: req.body.OTDatosDesc,
        OTDatosOpciones: JSON.stringify(nuevoValor),
        OTDatosTipoPed: req.body.OTDatosTipoPed,
        OTDatosRequerido: req.body.OTDatosRequerido,
        OTDatosOrdenAparicion: req.body.OTDatosOrdenAparicion,
        OTDatosAncho: req.body.OTDatosAncho
    }
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