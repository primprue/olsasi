import express from "express";
var router = express.Router();
import moment from "moment";
import conexion from "../../conexion.mjs";
import { buscacodigo } from './stkgennrorubro.mjs';

moment.locale("es");



router.all("/", async function (req, res) {
  // let codgrupo
  let codgrupo = req.body.StkRubroCodGrp;
  var d = new Date();
  let finalDate = d.toISOString().split("T")[0];
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

    }
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
  // gencodrubro.buscacodigo(codgrupo);
  buscacodigo(codgrupo);
});

conexion.end;
export default router;
