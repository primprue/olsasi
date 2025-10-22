import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajasaldoefagregar");
    } else {
        console.log("no se conecto en cajasaldoefagregar");
    }
});



router.post("/", async function (req, res) {
    var d = new Date();
    var finalDate = d.toISOString().split("T")[0];

    const datos = req.body.datoagrabar;
    let resultados = [];
    let errores = [];
    console.log('datos', datos);

    datos.forEach((dato, i) => {
        const registro = {
            idCajaSaldoEfFecha: finalDate,
            CajaSaldoEfImporte: dato.saldoqueda,
            CajaSaldoMoneda: dato.monedaId,
            CajaSaldoEfRetiroTotal: dato.retiroManiana + dato.retiroTarde,
            CajaSaldoEfRetiroT: dato.retiroTarde,
            CajaSaldoEfRetiroM: dato.retiroManiana,
            CajaSaldoEfTotalInstr: dato.totalInstrumentos
        };

        conexion.query('INSERT INTO BaseCaja.CajaSaldoEf SET ?', registro, function (err, result) {
            if (err) {
                console.error("Error al insertar fila", i, err); // Log completo
                errores.push({ fila: i, error: err.message });
            } else {
                resultados.push(result);
            }


            // Cuando termina la última query, devolvemos la respuesta
            if (resultados.length + errores.length === datos.length) {
                return res.json({ resultados, errores });
            }

        });
    });
});

export default router;



