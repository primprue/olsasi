
import express from 'express';
import { conexion } from '../conexion.mjs';

const router = express.Router();

router.post("/", async (req, res) => {
    const d = new Date();
    const finalDate = d.toISOString().split("T")[0];
    const datos = req.body.datoagrabar;

    try {
        const resultados = await Promise.all(
            datos.map((dato, i) => {
                const registro = {
                    idCajaSaldoEfFecha: finalDate,
                    CajaSaldoEfImporte: dato.saldoqueda,
                    CajaSaldoEfMoneda: dato.monedaId,
                };


                const registroM = {
                    CajaInternaFecha: finalDate,
                    CajaInternaConcepto: 'Ingreso',
                    CajaInternaMoneda: dato.monedaId,
                    CajaInternaES: 'E',
                    CajaInternaMT: 'M',
                    CajaInternaImporte: dato.retiroManiana,
                    CajaInternaTotalInstr: 0
                };
                const registroT = {
                    CajaInternaFecha: finalDate,
                    CajaInternaConcepto: 'Ingreso',
                    CajaInternaMoneda: dato.monedaId,
                    CajaInternaES: 'E',
                    CajaInternaMT: 'T',
                    CajaInternaImporte: dato.retiroTarde,
                    CajaInternaTotalInstr: dato.totalInstrumentos
                };


                const queryCajaSaldo = new Promise((resolve, reject) => {
                    conexion.query('INSERT INTO BaseCaja.CajaSaldoEf SET ?', registro, (err, result) => {
                        if (err) return reject({ fila: i, error: err.message });
                        resolve(result);
                    });
                });

                const queryCajaInternaM = new Promise((resolve, reject) => {
                    conexion.query('INSERT INTO BaseCaja.CajaInterna SET ?', registroM, (err, result) => {
                        if (err) return reject({ fila: i, error: err.message });
                        resolve(result);
                    });
                });

                const queryCajaInternaT = new Promise((resolve, reject) => {
                    conexion.query('INSERT INTO BaseCaja.CajaInterna SET ?', registroT, (err, result) => {
                        if (err) return reject({ fila: i, error: err.message });
                        resolve(result);
                    });
                });
                return Promise.all([queryCajaSaldo, queryCajaInternaM, queryCajaInternaT]);
            })
        );

        res.json({ ok: true, resultados });

    } catch (err) {
        console.error("Error en inserciones:", err);
        res.status(500).json({ ok: false, error: err });
    }
});

export default router;
