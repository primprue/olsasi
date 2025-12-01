import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

router.get("/", function (req, res, next) {
    var q = ["Select concat(PBidItems, PBItemsRubro, PBItemsSubRubro) as id, concat(  PBItemsSubRubro, PBidItems)  as codsubrubro, PBidItems, PBItemsRubro,  PBItemsSubRubro, PBItemsFecha, PBItemsTipoComp, PBItemsNroComp, PBItemsProv, " +
        " PBItemsImp, PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB, PBItemsOtros, PBItemsOtros1, PBItemsOtros2, PBItemsOtros3, PBItemsOtros4 " +
        "from BasePreBalance.PBItems"].join(" ");
    console.log('q en pbitemsleer', q);
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
