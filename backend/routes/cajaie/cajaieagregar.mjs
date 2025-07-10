import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../conexion.mjs";

moment.locale("es");

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajaieagregar");
    } else {
        console.log("no se conecto en cajaieagregar");
    }
});

router.post("/", function (req, res, next) {
    for (let i = 0; i < req.body.rows.length; i++) {
        console.log('req.body.rows[i] ', req.body.rows[i]);
        // const registro = req.body.rows[i];
        // registro.CajaIEFecha = new Date().toISOString().split("T")[0];
        // registro.CajaIECliente = registro.CajaIECliente.toUpperCase();
        // registro.CajaIEConcepto = registro.CajaIEConcepto.toUpperCase();
        // registro.CajaIEPunto = registro.CajaIEPunto.toUpperCase();
        // registro.CajaIEImporte = registro.CajaIEImporte;
        // registro.CajaIECodIP = registro.CajaIECodIP.toUpperCase();
        // registro.CajaIEImpIP = registro.CajaIEImpIP;
        // registro.parentId = registro.parentId || null;
        // registro.esSubfila = registro.esSubfila || false;
        var registro = {
            idCajaIE: req.body.rows[i].id,
            CajaIEFecha: new Date().toISOString().split("T")[0],
            CajaIECliente: req.body.rows[i].CajaIECliente.toUpperCase(),
            CajaIEConcepto: req.body.rows[i].CajaIEConcepto,
            CajaIEPunto: req.body.rows[i].CajaIEPunto,
            CajaIEImporte: parseFloat(req.body.rows[i].CajaIEImporte) || 0,
            CajaIECodIP: req.body.rows[i].CajaIECodIP,
            CajaIEImpIP: parseFloat(req.body.rows[i].CajaIEImpIP) || 0,

        };
        console.log('registro  ', registro);
        conexion.query("INSERT INTO BaseCaja.CajaIE SET ?", registro, function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return
                    // res.status(409).send({ message: "error clave duplicada" });
                } else {
                    console.log("ERROR ");
                    console.log(err.errno);
                }
            } else {
                res.json(result);
            }
        });
    }
});
conexion.end;
export default router;
