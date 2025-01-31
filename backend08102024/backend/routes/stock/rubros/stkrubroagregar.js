var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");
var gencodrubro = require("./stkgennrorubro");
var ultnrorubro = require('./stkleeultnrorubro')

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroagregar");
  } else {
    console.log("no se conecto en stkrubroagregar");
  }
});

router.all("/", async function (req, res) {
  //router.post("/", function (req, res) {
  // codgrupo = req.query.id;
  // ultnrorubro.codigorubronuevo(codgrupo)
  codrubro = req.body.StkRubroCodGrp;
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var RubroDesc = req.body.StkRubroDesc === undefined ? '' : req.body.StkRubroDesc.toUpperCase()
  var RubroPresDes = req.body.StkRubroPresDes === undefined ? '' : req.body.StkRubroPresDes.toUpperCase()
  var registro = {
    idStkRubro: req.body.idStkRubro,
    StkRubroCodGrp: req.body.StkRubroCodGrp,
    StkRubroDesc: RubroDesc,
    StkRubroAbr: req.body.StkRubroAbr.toUpperCase(),
    StkRubroProv: req.body.StkRubroProv,
    StkRubroAncho: req.body.StkRubroAncho,
    StkRubroPresDes: RubroPresDes,
    StkRubroPres: req.body.StkRubroPres,
    StkRubroUM: req.body.StkRubroUM,
    StkRubroCosto: req.body.StkRubroCosto,
    StkRubroTM: req.body.StkRubroTM,
    StkRubroConf: req.body.StkRubroConf,
    StkRubroFecha: finalDate,
  };

  conexion.query("INSERT INTO StkRubro SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(460).send({ message: "error clave duplicada" });
      } else if (err.errno == 1406 || err.errno == 1264) {
        console.log(err.errno);
        return res
          .status(410)
          .send({ message: "Abreviatura con más de cinco letras" });
      }
      {
        console.log("en stkrubroagregar err.errno");
        console.log(err.errno);
      }
    } else {
      res.json(result);
      // return res.status(200).send({message : "Todo OK"});
    }
    // if (req.body.ItemsSN === 'N') {
    var registro1 = {
      idStkItems: 1,
      StkItemsGrupo: req.body.StkRubroCodGrp,
      StkItemsRubro: req.body.idStkRubro,
      StkItemsRubroAbr: req.body.StkRubroAbr.toUpperCase(),
      StkItemsDesc: '',
      StkItemsCantidad: 0,
      StkItemsCantDisp: 0,
      StkItemsFAct: finalDate,
      StkItemsMin: 1,
      StkItemsMax: 2
      // StkItemsMin: req.body.StkItemsMin,
      // StkItemsMax: req.body.StkItemsMax
    };
    conexion.query("INSERT INTO StkItems SET ?", registro1, function (
      err,
      result
    ) {
      if (err) {
        console.log("ERROR ");
        console.log(err.errno);
      } else {
        res.json(result.rows);
      }
    });
    //}
  });
  gencodrubro.buscacodigo(codgrupo);
});

conexion.end;
module.exports = router;
