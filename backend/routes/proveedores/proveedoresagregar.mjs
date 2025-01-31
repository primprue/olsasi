import express from 'express';
var router = express.Router();

import moment from 'moment';
import conexion from '../conexion.mjs';




moment.locale('es');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresagregar");
    } else {
        console.log("no se conecto en proveedoresagregar");
    }
});


router.post('/', function (req, res) {
    var registro = {
        ProveedoresDesc: req.body.provdesc,
        ProveedoresTipo: parseInt(req.body.provtipo),
        ProveedoresCUIT: req.body.provcuit,
        ProveedoresCalle: req.body.provcalle,
        ProveedoresNroCalle: parseInt(req.body.provnrocalle),
        ProveedoresPiso: req.body.provpiso,
        ProveedoresDto: req.body.provdto,
        ProveedoresCodPos: req.body.provcodpostal,
        ProveedoresLoc: req.body.provlocalidad,
        ProveedoresPcia: req.body.provprovincia,
        ProveedoresTel: req.body.provtelefono,
        ProveedoresContacto: req.body.provcontacto,
        ProveedoresMail: req.body.provmail,
        ProveedoresWeb: req.body.provpagweb,
        ProveedoresCodMon: req.body.provcodmon
    }

    conexion.query('INSERT INTO BasesGenerales.Proveedores SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else
                    if (err.errno == 1406) {
                        return res.status(410).send({ message: "excede los digitos permitidos" });
                    }
                    else {
                        console.log('error en proveedores ', err.errno);
                    }
            } else {
                res.json(result.rows);

            }
        });
});




export default router;