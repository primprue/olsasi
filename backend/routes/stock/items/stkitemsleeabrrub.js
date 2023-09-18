var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleeabrrub");
  } else {
    console.log("no se conecto en stkitemsleeabrrub");
  }
});

var router = express();
router.get("/", async function (req, res) {
  // router.get("/", async function (req, res, next) {

  var StkRubroAbr = req.query.abr;
  var q = [
    "Select idStkItems, StkItemsDesc, StkItemsCantDisp from StkItems where StkItemsRubroAbr = " + StkRubroAbr].join(" ");


  conexion.query(q, function (err, result) {
    if (err) {
      if (err.errno === 1064) {
        result = 0
        res.json(result);
      }
      else {
        console.log('ingreso al error  ', result)
        console.log(err);
      }
    }
    else {
      res.json(result);

    }
  });
})

module.exports = router;
