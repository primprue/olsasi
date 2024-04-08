var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerTBR");
  } else {
    console.log("no se conecto en stkrubroleerTBR ");
  }
});


var router = express();

router.get("/", function (req, res, next) {
  cuallee = req.params.cuallee;

  var q = ["Select StkRubroDesc as StkRubroDescTBR , StkRubroAbr as StkRubroAbrTBR from StkRubro where StkRubroAbr > 'TBR' and StkRubroAbr <= 'TBR99'  order by StkRubroDesc"].join("");

  //  conexion.query("Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = 'S' order by StkRubroCodGrp", function (err, result) {
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log('result  ', result)
    }
  });
});

conexion.end;
module.exports = router;
