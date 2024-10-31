import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleeproveedor");
  } else {
    console.log("no se conecto en stkrubroleeproveedor");
  }
});


router.get("/", function (req, res, next) {
  var q = [
    "SELECT idProveedores as value, ProveedoresDesc as label FROM BasesGenerales.Proveedores where ProveedoresTipo = 26 order by ProveedoresDesc"
  ].join(" ");

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
