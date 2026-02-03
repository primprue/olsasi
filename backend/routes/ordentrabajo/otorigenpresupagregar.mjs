import express from 'express';
var router = express.Router();
import moment from 'moment';
import { conexion } from '../conexion.mjs';

moment.locale('es');

router.post('/', function (req, res) {


    let datosrec = JSON.parse(req.query.renglonelegido);
    let registro = {
        OTOrigenNroPresup: datosrec.PresupRenglonNroPresup,
        OTOrigenNroReng: datosrec.idPresupRenglon,
        OTOrigenGen: false // 0 es lo que carga en el campo cuando es false sino 1
    }

    conexion.query("INSERT INTO BasesOrdenes.OTOrigen SET ?", registro, function (err, result) {
        if (err) {
            console.log("ERROR ");
            console.log(err.errno);
        }
        else {
            res.json(result);
        }
    });

});

conexion.end;
export default router;