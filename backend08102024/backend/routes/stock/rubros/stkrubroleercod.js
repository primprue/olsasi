var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleercod");
  } else {
    console.log("no se conecto en stkrubroleercod");
  }
});

var router = express();

router.get("/?:id", function(req, res, next) {
  indice = req.params.id;

  var q = ["Select * from StkRubro where idStkRubro = ", indice].join(" ");
  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
