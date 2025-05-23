import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en pbcomprobantesleer");
    } else {
        console.log("no se conecto en pbcomprobantesleer");
    }
});


router.get("/", function (req, res, next) {
    var q = ["Select PBCompAbre as id, PBCompDesc, PBCompSumaResta " +
        "from BasePreBalance.PBComprobantes"].join(" ");
    conexion.query(q, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});
conexion.end;
export default router;
