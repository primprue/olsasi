import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", function (req, res, next) {
  conexion.query("Select idStkUnMed as id, StkUnMedDesc from StkUnMed ", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
conexion.end;
export default router;
