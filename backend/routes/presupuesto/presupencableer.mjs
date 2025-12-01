import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";
import dateFormat from 'dateformat';



router.get("/", function (req, res, next) {
  var fecharecibida = req.query.id;
  var day = dateFormat(new Date(fecharecibida), "yyyy-mm-dd");
  var q = ["SELECT p.idPresupEncab as id,  ",
    ' date_format( p.PresupEncabFecha, "%d-%m-%Y") as PresupEncabFecha, ',
    " CASE WHEN(PresupEncabCliente > 0 and PresupEncabCliente < 99999) = 1 THEN c.ClientesDesc ",
    "ELSE p.PresupEncabCliente  END AS NombreCliente, ",
    " p.PresupEncabTotal, p.PresupEncabMayMin, p.PresupEncabExplic FROM BasePresup.PresupEncab p ",
    "LEFT JOIN BasesGenerales.Clientes c ON p.PresupEncabCliente = c.ClientesDesc OR p.PresupEncabCliente = c.idClientes ",
    "where p.PresupEncabFecha  >= '" + day + "'",
    "order by p.PresupEncabFecha desc "].join(" ");
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


