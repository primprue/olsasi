var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
var mysql = require("mysql");

var router = express();
conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkitemsborrar");
  } else {
    console.log("no se conecto en stkitemsborrar");
  }
});

router.delete("/", async function(req, res, next) {
  var idStkItems = req.query.idStkItems;
  var StkItemsGrupo = req.query.StkItemsGrupo;
  var StkItemsRubro = req.query.StkItemsRubro;
  //DELETE FROM `BasesGenerales`.`StkItems` WHERE `idStkItems`='2' and`StkItemsGrupo`='1' and`StkItemsRubro`='1';
  /*
'delete from StkItems where idStkItems = ',
         idStkItems + ' and StkItemsGrupo = ' + StkItemsGrupo + ' and StkItemsRubro = ' + StkItemsRubro
*/
  var q = [
    "delete from StkItems where idStkItems = ",
    idStkItems,
    " and StkItemsGrupo = ",
    StkItemsGrupo,
    " and StkItemsRubro = ",
    StkItemsRubro
  ].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      if (err.errno == 1451) {
        return res
          .status(411)
          .send({ message: "error Código de Items usado en otra tabla" });
      }
      {
        console.log(err);
      }
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;
