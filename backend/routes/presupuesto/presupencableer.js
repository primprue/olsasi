var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var dateFormat = require('dateformat');
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupencableer");
  } else {
    console.log("no se conecto en presupencableer");
  }
});
var router = express();

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
module.exports = router;


/* esta sentencia la logre con chatgpt 
SELECT p.idPresupEncab, p.PresupEncabFecha, 
       CASE 
     
          WHEN  (PresupEncabCliente > 0 and PresupEncabCliente < 99999)= 1 THEN c.ClientesDesc 
           ELSE p.PresupEncabCliente 
       END AS NombreCliente,
       p.PresupEncabTotal, p.PresupEncabMayMin, p.PresupEncabExplic
FROM BasePresup.PresupEncab p
LEFT JOIN BasesGenerales.Clientes c ON p.PresupEncabCliente = c.ClientesDesc OR p.PresupEncabCliente = c.idClientes;*/