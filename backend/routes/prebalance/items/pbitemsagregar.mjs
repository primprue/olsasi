import express from "express";
var router = express.Router();

import moment from "moment";
import { conexion } from '../../conexion.mjs';

moment.locale("es");
//cambié en la tabla de rubros de PreBalance el indice autoincremental 
router.post("/", function (req, res, next) {
    var registro = {
        PBItemsRubro: req.body.PBItemsRubro,
        PBItemsSubRubro: req.body.PBItemsSubRubro,
        PBItemsFecha: req.body.PBItemsFecha,
        PBItemsTipoComp: req.body.PBItemsTipoComp,
        PBItemsNroComp: req.body.PBItemsNroComp,
        PBItemsProv: req.body.PBItemsProv,
        PBItemsImp: req.body.PBItemsImp,
        PBItemsPorcIVA: req.body.PBItemsPorcIVA,
        PBItemsIVA: req.body.PBItemsIVA,
        PBItemsIIBB: req.body.PBItemsIIBB,
        PBItemsOtros: req.body.PBItemsOtros,
        PBItemsOtros1: req.body.PBItemsOtros1,
        PBItemsOtros2: req.body.PBItemsOtros2,
        PBItemsOtros3: req.body.PBItemsOtros3,
        PBItemsOtros4: req.body.PBItemsOtros4
    };

    conexion.query("INSERT INTO BasePreBalance.PBItems SET ?", registro, function (err, result) {
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
