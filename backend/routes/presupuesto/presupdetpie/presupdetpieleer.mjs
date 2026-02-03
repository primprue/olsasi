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



router.get("/", function (req, res, next) {
  let q = `Select idPresupDetPie as id, PresupDetPieLeyenda, PresupDetPieSelec from BasePresup.PresupDetPie order by PresupDetPieLeyenda`;
  try {
    let result = queryAsync(q);
    res.json(result);
  } catch (err) {
    console.log(err);
  }

});
conexion.end;
export default router;
