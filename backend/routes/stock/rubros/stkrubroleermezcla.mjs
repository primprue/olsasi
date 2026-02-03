import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}



router.get("/", async (req, res) => {
  let q = `Select concat(idStkRubro, StkRubroCodGrp, StkRubroAbr) as id, idStkRubro, StkRubroCodGrp, StkRubroDesc,
  StkGrupo.StkGrupoDesc, StkRubroAbr, StkRubroProv,
  Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes,
  StkRubroPres, StkRubroUM, StkRubroCosto, StkRubroConf, StkRubroTM,
  date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha
  from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores
  where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores`;
  try {
    let result = await queryAsync(q);
    res.json(result);
  } catch (err) {
    console.log(err);
  }


});

export default router;
