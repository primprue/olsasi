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



  let q = `Select idStkRubro as id, StkRubroCodGrp, StkRubroDesc, StkRubroAbr, StkRubroProv, StkRubroAncho, StkRubroPres, StkRubroPresDes, StkRubroUM, ',
    'StkRubroCosto, StkRubroTM, StkRubroConf from  StkRubro order by StkRubroDesc`
  try {
    let result = await queryAsync(q);
    res.json(result);
  } catch (err) {
    console.log(err);
  }


});

export default router;
