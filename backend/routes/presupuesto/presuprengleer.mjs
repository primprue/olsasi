import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../conexion.mjs";
import dateFormat from 'dateformat';
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuprengleer");
  } else {
    console.log("no se conecto en presuprengleer");
  }
});


router.get("/", function (req, res, next) {

  var detbusca = req.query.id;

  // var q = ["Select * from BasePresup.PresupEncab order by PresupEncabFecha "].join(" ");
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



