import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", function (req, res, next) {
  var indice = req.query.idStkGrupo;
  var q = [
    "Select idStkRubro, StkRubroDesc, StkRubroAbr, StkRubroProv, ",
    "Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes, StkRubroPres, StkRubroUM, StkRubroCosto, ",
    "StkRubroConf, StkRubroTM, ",
    'date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha ',
    "from StkRubro JOIN BasesGenerales.Proveedores  ",
    "where StkRubroCodGrp = " + indice + " and StkRubroProv = idProveedores order by StkRubroDesc; "].join(" ");

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
