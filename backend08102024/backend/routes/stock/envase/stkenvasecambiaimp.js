var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

var http = require("http");
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkenvasecambiaimp");
  } else {
    console.log("no se conecto en stkenvasecambiaimp");
  }
});

/*
idStkItems
*/

var router = express();

router.post("/", async function (req, res, next) {
  //?:id/?:id2
  StkEnvaseUbG = req.query.id;

  //  'UPDATE StkEnvase SET StkEnvaseImprimio = "S"  WHERE StkEnvaseImprimio = "N"' +
  //  ' and StkEnvaseUbG = "' + StkEnvaseUbG + '"'
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
module.exports = router;
