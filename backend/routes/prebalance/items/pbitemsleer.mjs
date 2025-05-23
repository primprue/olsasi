import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en pbitemsleer");
    } else {
        console.log("no se conecto en pbitemsleer");
    }
});


router.get("/", function (req, res, next) {
    var q = ["Select concat(PBidItems, PBItemsRubro, PBItemsSubRubro) as id, PBItemsFecha, PBItemsTipoComp, PBItemsNroComp, PBItemsProv, " +
        " PBItemsImp, PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB, PBItemsOtros, PBItemsOtros1, PBItemsOtros2, PBItemsOtros3, PBItemsOtros4 " +
        "from BasePreBalance.PBItems"].join(" ");

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
