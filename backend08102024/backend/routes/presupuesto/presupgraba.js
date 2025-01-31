var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');
const { Console } = require("console");

var nrovta = 1;
nropresup = 0;
var datosenvio = [];
moment.locale("es");
var nropresup = 0;
conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupgraba");
  } else {
    console.log("no se conecto en presupgraba");
  }
});

router.all("/", async function (req, res) {
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var cliente = ''
  var i = 0;

  if (req.body.idClientes != 0) {
    cliente = req.body.idClientes
  }
  else {
    cliente = req.body.nomCliente
  }
  var registro = {
    PresupEncabFecha: finalDate,
    PresupEncabCliente: cliente,
    PresupEncabTotal: req.body.DatosPresup.suma,
    PresupEncabMayMin: req.body.maymin,
    PresupEncabExplic: req.body.explicacionPresup
  }
  conexion.query("INSERT INTO BasePresup.PresupEncab SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR en INSERT INTO BasePresup.PresupEncab");
        console.log(err.errno);
      }
    } else {
      console.log('insertó todo bien en BasePresup.PresupEncab')
      res.json(result);
      nropresup = result.insertId
    }

    req.body.DatosPresup.datos.map(renglon => {
      var registro1 = {
        idPresupRenglon: i + 1,
        PresupRenglonNroPresup: nropresup,
        PresupRenglonCant: renglon.PresupCantidad,
        PresupRenglonDesc: renglon.StkRubroDesc,
        PresupRenglonLargo: renglon.PresupLargo,
        PresupRenglonAncho: renglon.PresupAncho,
        PresupRenglonImpUnit: renglon.ImpUnitario,
        PresupRenglonImpItem: renglon.ImpItem,
        PresupRenglonParamInt: JSON.stringify(renglon.dcalculo[0])
      }
      conexion.query("INSERT INTO BasePresup.PresupRenglon SET ?", registro1,
        function (err, result) {
          if (err) {
            console.log('err en back de presupgraba ', err)
            if (err.errno == 1265) {
              return res.status(413).send({ message: "Faltan datos para leer información en tabl" });
            }
            else {
              console.log("ERROR en INSERT INTO BasePresup.PresupRenglon ");
              console.log(err.errno);
            }
          }
          else {
            console.log('insertó todo bien en el renglon de presupuesto')
            //   res.json('');
          }
        });
      i++
    })
    // })

  });
});
conexion.end;
module.exports = router;
