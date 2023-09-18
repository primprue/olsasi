var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleer");
  } else {
    console.log("no se conecto en stkgrupoleer");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  // var q = ["SET @numero=0 "].join(" ");
  // conexion.query(q, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  var q = [
    "Select idStkGrupo as StkRubroCodGrp, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
    //"Select @numero:=@numero+1 as StkRubroCodGrp, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
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
