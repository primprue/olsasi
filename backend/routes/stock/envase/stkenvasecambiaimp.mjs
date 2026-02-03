import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.post("/", async function (req, res, next) {
  var StkEnvaseUbG = req.query.id;

  var q = [
    "UPDATE StkEnvase",
    'SET StkEnvaseImprimio = "S"  WHERE StkEnvaseImprimio = "N"',
    ' and StkEnvaseUbG = "' + StkEnvaseUbG + '"'
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
