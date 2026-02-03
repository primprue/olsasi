import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get("/", async function (req, res, next) {
  // Desde Postman http://localhost:4000/stkitemsmodificar?id1=1&id2=1&id3=1

  conexion.query(
    "SELECT * FROM medidasclientes.datosclientesdc, BasesGenerales.StkMonedas",
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
        console.log(result);
      }
    }
  );
});

export default router;
