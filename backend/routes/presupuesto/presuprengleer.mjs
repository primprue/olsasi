import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";


router.get("/", function (req, res, next) {

  var detbusca = req.query.id;

  var q = ["SELECT PresupRenglonNroPresup, idPresupEncab, PresupEncabCliente, PresupEncabFecha, PresupEncabMayMin, PresupEncabTotal FROM BasePresup.PresupRenglon join  BasePresup.PresupEncab where PresupRenglonDesc like '%" + detbusca + "%' and PresupRenglonNroPresup = BasePresup.PresupEncab.idPresupEncab order by PresupRenglonNroPresup asc"].join(" ");
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



