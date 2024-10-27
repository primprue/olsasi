import express from 'express';
var router = express.Router();
import moment from 'moment';
import conexion from '../conexion.mjs';




moment.locale('es');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otorigenpresupagregar");
    } else {
        console.log("no se conecto en otorigenpresupagregar");
    }
});

router.post('/', function (req, res) {


    datosrec = JSON.parse(req.query.renglonelegido);
    // var i = 0

    registro = {
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
    // datosrec.map(datos => {
    //     registro = {
    //         OTOrigenNroPresup: datos.PresupRenglonNroPresup,
    //         OTOrigenNroReng: datos.idPresupRenglon
    //     }

    //     conexion.query("INSERT INTO BasesOrdenes.OTOrigen SET ?", registro, function (err, result) {
    //         if (err) {
    //             console.log("ERROR ");
    //             console.log(err.errno);
    //         }
    //         else {
    //             console.log('result otorigenpresupagregar ', result)
    //             res.json(result);
    //         }
    //     });
    // });
});

conexion.end;
export default router;