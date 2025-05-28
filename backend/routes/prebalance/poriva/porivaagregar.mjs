import express from "express";
var router = express.Router();

import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");
//cambié en la tabla de rubros de PreBalance el indice autoincremental 
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en porivaagregar");
    } else {
        console.log("no se conecto en porivaagregar");
    }
});

router.post("/", function (req, res, next) {
    var registro = {
        PBPorcIVA: req.body.PBPorcIVA,
    };
    conexion.query("INSERT INTO BasePreBalance.PBPorIVA SET ?", registro, function (err, result) {
        if (err) {
            if (err.errno == 1062) {
                return res.status(409).send({ message: "error clave duplicada" });
            } else {
                console.log("ERROR ");
                console.log(err.errno);
            }
        } else {
            res.json(result);
        }
    });
});
conexion.end;
export default router;
