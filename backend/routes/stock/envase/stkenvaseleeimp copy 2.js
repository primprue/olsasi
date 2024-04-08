var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");
var http = require("http");
const fs = require("fs");
const exec = require("child_process").exec;

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkenvaseleeimp");
  } else {
    console.log("no se conecto en stkenvaseleeimp");
  }
});

/*
idStkItems
*/

var router = express();

router.get("/", function (req, res, next) {
  // StkEnvaseUbG = req.query.stkenvaseubg;
  StkEnvaseUbG = req.query.id;
  var datos, info;
  var q = [
    "SELECT idStkEnvase,",
    "StkEnvaseGrupo,",
    "StkEnvaseRubro,",
    "StkEnvaseItem,",
    "StkGrupo.StkGrupoDesc,",
    "StkRubro.StkRubroDesc,",
    "StkRubro.StkRubroAbr,",
    "StkRubro.StkRubroUM,",
    "StkItems.StkItemsDesc,",
    "StkEnvasePartida,",
    "StkEnvaseUbG,",
    "StkEnvaseUbF,",
    'date_format(StkEnvaseFechaAct, "%d-%m-%Y") as stkenvasefecha,',
    "StkEnvaseCant,",
    "StkEnvaseImprimio,",
    "StkEnvaseObserv",
    "from StkEnvase, StkItems, StkGrupo, StkRubro",
    "where (StkEnvase.StkEnvaseGrupo = StkGrupo.idStkGrupo)",
    "and (StkEnvase.StkEnvaseRubro = StkRubro.idStkRubro)",
    "and (StkEnvase.StkEnvaseItem = StkItems.idStkItems)",
    "and (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)",
    "and (StkItems.StkItemsRubro = StkRubro.idStkRubro)",
    "and (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo)",
    'and StkEnvaseImprimio = "N"',
    "and StkEnvaseUbG = '" + StkEnvaseUbG + "'",
  ].join(" ");
  conexion.query(q, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
    a = 0;

    while (a < result.length) {
      info = "";
      info =
        result[a].idStkEnvase +
        "_0D_0A" + //para que en el código QR tome un <enter>
        result[a].StkRubroDesc +
        "_0D_0A" +
        result[a].StkItemsDesc +
        "_0D_0A" +
        result[a].StkEnvaseUbG +
        "_0D_0A" +
        result[a].StkEnvaseUbF +
        "_0D_0A" +
        result[a].StkEnvaseObserv +
        "_0D_0A" +
        result[a].stkenvasefecha +
        "_0D_0A" +
        result[a].StkEnvaseCant;
      datos = "";
      datos =
        "^XA" +
        "^FO100,10" +
        "^BQ,2,4,H,5" + // 2 uso recomendado, tamaño, calidad High, valor de máscara
        "^FH" +
        "^FDQA, " +
        info +
        " ^FS" +
        "^CFf" +
        "^CF0,50" + // tipo de letra, tamaño de letra
        "^FO400,25" + //ubicación en el ancho y en el alto
        "^FB150,5,2,C^FD" +
        result[a].StkRubroAbr +
        "^FS" +
        "^CF0,50" + // tipo de letra, tamaño de letra
        "^FO600,25" + //ubicación en el ancho y en el alto
        // "^FB150,5,2,C^FD" +
        "^FD" +
        "Env. : " +
        result[a].idStkEnvase +
        "^FS" +
        "^CF0,40" + // tipo de letra, tamaño de letra
        "^FO330,85" + //ubicación en el ancho y en el alto
        "^FB500,5,2,C^FD" +
        result[a].StkItemsDesc +
        "^FS" +
        "^CF0,85" + // tipo de letra, tamaño de letra
        "^FO350,150" + //ubicación en el ancho y en el alto
        "^FB150,5,2,C^FD" +
        result[a].StkEnvaseCant +
        "^FS" +
        "^CF0,30" + // tipo de letra, tamaño de letra
        "^FO510,200" + //ubicación en el ancho y en el alto
        "^FB150,5,2,C^FD" +
        result[a].StkRubroUM +
        "^FS" +
        // command that IS\&preceded by an FB \&command.^FS" +
        // "^FO450,55" +
        // "^FH_ " +
        "^XZ";
      if (a == 0) {
        fs.writeFile("./codigoqr", datos, (error) => {
          if (error) console.log(error);
          else {
            console.log("El archivo fue creado");
          }
        });
      } else {
        fs.appendFile("./codigoqr", datos, (error) => {
          if (error) console.log(error);
          else {
            console.log("El archivo fue creado");
          }
        });
      }
      // exec("cat ./codigoqr", (err, stdout, stderr) => {

      a++;

      if (a >= result.length) {
        exec("lpr ./codigoqr", (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
        });
      }
    }
  });
});
conexion.end;
//lpr -P ZTC-GK420t codigoqr
module.exports = router;
