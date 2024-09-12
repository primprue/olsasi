var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');

// nroot = 0;
moment.locale("es");
var nroot = 0;
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otgraba");
    } else {
        console.log("no se conecto en otgraba");
    }
});

router.all("/", async function (req, res) {

    var d = new Date();
    finalDate = d.toISOString().split("T")[0];
    var cliente = 0; clientenoreg = ''; importtotal = 0.00; importsenia = 0.00
    var i = 0;
    var registro = {}
    console.log('req.body.otdatos  ', req.body.otdatos)
    if (!req.body.otdatos.transporte || req.body.otdatos.transporte === undefined) {
        transporte = '';
    } else {
        transporte = req.body.otdatos.transporte.TransporteDesc;
    }
    if (req.body.otdatos.datosencab.length > 1) {
        cliente = req.body.otdatos.datosencab[1][0].idClientes;
        clientenoreg = '';
    } else {
        cliente = 0;
        clientenoreg = req.body.otdatos.datosencab[0][0].PresupEncabCliente;
    }
    if (req.body.otdatos.TotalPresupuesto === undefined)
        importtotal = 0.00
    else
        importtotal = req.body.otdatos.TotalPresupuesto

    if (req.body.otdatos.OTEncabSenia === undefined)
        importsenia = 0.00
    else
        importsenia = parseFloat(req.body.otdatos.ImporteSenia)

    if (!req.body.otdatos.OTEncabOC || req.body.otdatos.OTEncabOC === undefined) {
        OTEncabOC = '';
    } else {
        OTEncabOC = req.body.otdatos.OTEncabOC;
    }
    if (!req.body.otdatos.OTEncabDetalles || req.body.otdatos.OTEncabDetalles === undefined) {
        OTEncabDetalles = '';
    } else {
        OTEncabDetalles = req.body.otdatos.OTEncabDetalles;
    }
    registro = {
        OTEncabCliente: cliente,
        OTEncabEstado: 1,
        OTEncabClienteNoReg: clientenoreg,
        OTEncabFecha: finalDate,
        OTEncabFechaPromesa: req.body.otdatos.FechaPromesa,
        OTEncabImpTotal: importtotal,
        OTEncabSenia: importsenia,
        OTconIVA: req.body.otdatos.OTconIVA,
        OTEncabTransporte: transporte,
        OTEncabOC: OTEncabOC,
        OTEncabDetalles: OTEncabDetalles
    }
    conexion.query("INSERT INTO BasesOrdenes.OTEncab SET ?", registro, function (err, result) {
        if (err) {
            if (err.errno == 1062) {
                return res.status(409).send({ message: "error clave duplicada" });
            } else {
                console.log("ERROR en INSERT INTO BasesOrdenes.OTEncab");
                console.log(err.errno);
            }
        } else {
            console.log('insertó todo bien en BasesOrdenes.OTEncab')
            res.json(result);
            nroot = result.insertId
        }

        req.body.otdatos.renglonespresup.map(renglon => {
            var registro1 = {
                OTRenglonNro: i + 1,
                idOTRenglonNroOT: nroot,
                OTRenglonCant: renglon[0].PresupRenglonCant,
                OTRenglonDesc: renglon[0].PresupRenglonDesc,
                OTRenglonLargo: renglon[0].PresupRenglonLargo,
                OTRenglonAncho: renglon[0].PresupRenglonAncho,
                OTRenglonImpItem: renglon[0].PresupRenglonImpItem,
                OTRenglonDetalles: JSON.stringify(req.body.otdatos.datosconfec)
            }
            conexion.query("INSERT INTO BasesOrdenes.OTRenglon SET ?", registro1,
                function (err, result) {
                    if (err) {
                        console.log('err en back de otgraba ', err)
                        if (err.errno == 1265) {
                            return res.status(413).send({ message: "Faltan datos para leer información en tabl" });
                        }
                        else {
                            console.log("ERROR en INSERT INTO BasesOrdenes.OTRenglon ");
                            console.log(err.errno);
                        }
                    }
                    else {
                        console.log('insertó todo bien en el renglon de Orden de Trabajo')
                        //   res.json('');
                    }
                });
            i++
        })

    })
})

conexion.end
module.exports = router;