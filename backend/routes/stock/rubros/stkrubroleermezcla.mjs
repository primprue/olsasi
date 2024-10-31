import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleermezcla");
  } else {
    console.log("no se conecto en stkrubroleermezcla");
  }
});



router.get("/", function (req, res, next) {
  var q = [
    "Select concat(idStkRubro, StkRubroCodGrp, StkRubroAbr) as id, idStkRubro, StkRubroCodGrp, StkRubroDesc,",
    " StkGrupo.StkGrupoDesc, StkRubroAbr, StkRubroProv, ",
    " Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes,",
    " StkRubroPres, StkRubroUM, StkRubroCosto, StkRubroConf, StkRubroTM,",
    ' date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha  ',
    " from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores ",
    " where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores "
  ].join(" ");
  console.log('q stkrubrollermezcla  ', q)
  /*
  esto estaba así, tenía en el último renglón antes del where StkItems, y repetía todos los rubros
  se lo saqué y dió resultado
   var q = [
    "Select idStkRubro, StkRubroCodGrp, StkRubroDesc,",
    " StkGrupo.StkGrupoDesc, StkRubroAbr, StkRubroProv, ",
    " Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes,",
    " StkRubroPres, StkRubroUM, StkRubroCosto, StkRubroTM,",
    ' StkRubroFecha ',
    " from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkItems ",
    " where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores "
  ].join(" ");
  */
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
