import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleercod");
  } else {
    console.log("no se conecto en stkgrupoleercod");
  }
});



router.get("/", async function (req, res, next) {
  indice = req.query.id;
  //'Select * from StkGrupo  where idStkGrupo = ' + indice,
  var q = ["Select * from StkGrupo", "where idStkGrupo = ", indice].join(" ");
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
