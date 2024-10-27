import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleeabrrub");
  } else {
    console.log("no se conecto en stkitemsleeabrrub");
  }
});


router.get("/", async function (req, res) {

  var StkRubroAbr = req.query.abr;
  var q = [
    "Select idStkItems, StkItemsDesc, StkItemsCantDisp from StkItems where StkItemsRubroAbr = '" + StkRubroAbr + "'"].join(" ");


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

export default router;
