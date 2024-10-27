import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleedescabrrub");
  } else {
    console.log("no se conecto en stkitemsleedescabrrub");
  }
});



router.get("/?:StkItemsRubroAbr", function (req, res, next) {
  var StkRubroAbr = req.params.StkItemsRubroAbr;

  var q = [
    "Select idStkItems as value, StkItemsDesc as label from StkItems where StkItemsRubroAbr = '" + StkRubroAbr + "'"].join(" ");
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
      console.log('resul en la lectura  ', result)
      res.json(result);

    }
  });
})

export default router;
