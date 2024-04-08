var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en presuppisopil");
    } else {
        console.log("no se conecto en presuppisopil");
    }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
    var q, i = 0
    var coeficiente = 0, cantidad = 0.00, StkRubroAbrP = '', largo = 0, ancho = 0, valorMOTmup = 0.00, impunion = 0.00, impcorte = 0.00, coefMOT = 0.00, impsol = 0.00, cuadred = 'REC', cantpa = 0, anchopimp = 0
    q = ['select * from BasePresup.PresupParam'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            }


            datosrec = JSON.parse(req.query.datoscalculo)
            totalreg = datosrec.length

            datosrec.map(datos => {
                cantidad = datos.cantidad;
                detallep = datos.detallep
                StkRubroAbrP = datos.StkRubroAbr;
                ivasn = datos.ivasn;
                largo = datos.largo * 1
                ancho = datos.ancho * 1

                if (ancho === 0) {
                    anchopimp = datos.largo * 1
                    cuadred = "RED"
                }
                else {
                    anchopimp = ancho
                    cuadred = "REC"
                }

                if (datos.minmay == 'my') {
                    coeficiente = result[0].coeficientemay
                    coefMOT = result[0].coefMOTmay
                    ivasn = 'CIVA'
                }
                else {
                    coeficiente = result[0].coeficientemin
                    coefMOT = result[0].coefMOTmin
                }


                //busco el ancho de la tela para calcular medio paño
                q2 = ['Select StkRubroAncho as anchotela from BaseStock.StkRubro where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" '].join(' ')
                conexion.query(q2,
                    function (err, result2) {
                        if (err) {
                            console.log(err);
                        }
                        var anchotela = result2[0].anchotela
                        //corte de la tela 120 segundos por paño independiente del largo

                        //unión de los paños 150 segundos por metro de soldadura
                        // if (datos.minmay == 'my' || StkRubroAbrP == 'PLURI') {


                        var numero = (largo / anchotela);
                        var enteros = Math.floor((largo / anchotela));
                        var decimales = numero - enteros;

                        if (decimales === 0) {
                            cantpa = enteros
                        }
                        else {
                            if (decimales < 0.50) {
                                cantpa = enteros + 0.50
                            }
                            else {
                                cantpa = enteros + 1
                            }
                        }




                        valorMOTmup = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segsolpu
                        valorMOTcorte = result[0].costoMOT * coefMOT / 60 / 60 * result[0].segpurecorte
                        if (decimales > 0) {
                            impunion = (cantpa * largo + (anchotela / 2)) * valorMOTmup
                            impcorte = (largo + 1) * valorMOTcorte
                        }
                        else {
                            impunion = ((cantpa - 1) * largo) * valorMOTmup
                            impcorte = largo * valorMOTcorte
                        }

                        // if ((ancho * 1 - Math.trunc(ancho)) > 0) {
                        //     impunion = ((((Math.trunc(ancho))) * largo + (anchotela / 2))) * valorMOTmup
                        //     impcorte = (ancho + 1) * valorMOTcorte

                        // }
                        // else {
                        //     impunion = ((ancho - 1) * largo) * valorMOTmup
                        //     impcorte = ancho * valorMOTcorte
                        // }

                        if (cuadred === 'REC') {
                            impsol = (result[0].costoMOT * coefMOT / 60 * 5) * (largo * 2 + ancho * 2)

                        }
                        else {
                            impsol = (result[0].costoMOT * coefMOT / 60 * 9) * ancho * 3.1416
                        }
                        importeMOTtotal = impunion + impcorte + impsol


                        q = ['Select',
                            'StkRubroDesc, StkRubroAbr, ',
                            '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
                            ' * ', cantpa,
                            ' * ', anchopimp, ' ) + ' + importeMOTtotal + ') as ImpUnitario, ',
                            'StkRubroAncho as Ancho, ',
                            'StkRubroCosto,',
                            'StkMonedasCotizacion ',
                            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
                            'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
                            'and StkRubro.StkRubroTM = idStkMonedas '
                        ].join(' ')

                        conexion.query(
                            q,
                            function (err, result) {
                                if (err) {
                                    console.log('error en mysql')
                                    console.log(err)
                                }
                                else {

                                    if (ivasn == 'CIVA') {
                                        result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 10) * 10
                                    }
                                    else {
                                        result[0].ImpUnitario = Math.ceil(result[0].ImpUnitario.toFixed(0) / 1.21 / 10) * 10
                                    }
                                    callargo = cantidad * result[0].Ancho
                                    anchoreal = (largo * 1).toFixed(2)
                                    var anchomue = (ancho * 1).toFixed(2)
                                    var largomue = (largo * 1).toFixed(2)

                                    if (detallep == '') {
                                        if (cuadred == 'RED') {
                                            detalle = "Cambio de piso de pileta redonda de " + largomue + ' de diámetro en : '
                                        }
                                        else {
                                            detalle = "Cambio de piso de pileta de " + largomue + ' x ' + anchomue + " en : "
                                        }
                                    }
                                    else {
                                        detalle = detallep + ' '
                                    }
                                    // result[0].Detalle = "Paños Unidos ( " + callargo.toFixed(2) + ' x ' + anchoreal + " ) en : "
                                    result[0].Detalle = detalle
                                    result[0].Largo = 0
                                    result[0].Ancho = 0
                                    result[0].MDesc = 'S'
                                    datosenvio.push(result)
                                    i++
                                    if (i === totalreg) {
                                        res.json(datosenvio)
                                        datosenvio = []
                                    }
                                }
                            })
                    })
            });
        });
});


conexion.end
module.exports = router;