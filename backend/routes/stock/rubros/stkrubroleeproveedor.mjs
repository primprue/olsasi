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
  let q = `SELECT idProveedores as value, ProveedoresDesc as label FROM BasesGenerales.Proveedores where ProveedoresTipo = 26 order by ProveedoresDesc`;

  try {
    let result = await queryAsync(q);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
