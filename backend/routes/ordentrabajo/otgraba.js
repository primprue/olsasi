var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');

nroot = 0;
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
    console.log('req.body  ', req.body)
    console.log('req.bodyrenglonespresup  ', req.body.renglonespresup)
    var cliente = 0; clientenoreg = '';
    var i = 0;
    var registro = {}
    if (req.body.datosencab.length > 1) {
        cliente = req.body.datosencab[1][0].idClientes;
        clientenoreg = '';


    } else {
        cliente = 0;
        clientenoreg = req.body.datosencab[0][0].PresupEncabCliente;
    }
    registro = {
        OTEncabCliente: cliente,
        OTEncabEstado: 1,
        OTEncabClienteNoReg: clientenoreg,
        OTEncabFecha: finalDate,
        OTEncabFechaPromesa: finalDate,
        OTEncabImpTotal: 20.2
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


        req.body.renglonespresup.map(renglon => {
            console.log('renglon  ', renglon)
            console.log('req.body.datosconfec  ', req.body.datosconfec)
            var registro1 = {
                OTRenglonNro: i + 1,
                idOTRenglonNroOT: nroot,
                OTRenglonCant: renglon[i].PresupRenglonCant,
                OTRenglonDesc: renglon[i].PresupRenglonDesc,
                OTRenglonLargo: renglon[i].PresupRenglonLargo,
                OTRenglonAncho: renglon[i].PresupRenglonAncho,
                OTRenglonImpItem: renglon[i].PresupRenglonImpItem,
                OTRenglonDetalles: req.body.datosconfec
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