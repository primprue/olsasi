import express from 'express';
import { conexion } from '../conexion.mjs';

const router = express.Router();
async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.post("/", async (req, res) => {
    const d = new Date();
    const finalDate = d.toISOString().split("T")[0];
    const datos = req.body.datoagrabar;

    try {
        const resultados = [];

        for (let i = 0; i < datos.length; i++) {
            const dato = datos[i];

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

            await new Promise((resolve, reject) => {
                conexion.beginTransaction(async err => {
                    if (err) return reject({ fila: i, error: err.message });

                    try {
                        await queryAsync('INSERT INTO BaseCaja.CajaSaldoEf SET ?', registro);
                        await queryAsync('INSERT INTO BaseCaja.CajaInterna SET ?', registroM);
                        await queryAsync('INSERT INTO BaseCaja.CajaInterna SET ?', registroT);

                        conexion.commit(err => {
                            if (err) {
                                return conexion.rollback(() =>
                                    reject({ fila: i, error: err.message })
                                );
                            }
                            resolve();
                        });

                    } catch (e) {
                        conexion.rollback(() =>
                            reject({ fila: i, error: e.message })
                        );
                    }
                });
            });

            resultados.push({ fila: i, ok: true });
        }

        res.json({ ok: true, resultados });

    } catch (err) {
        console.error("Error en inserciones en cajasaldoefagregar:", err);
        res.status(500).json({
            ok: false,
            fila: err.fila,
            mensaje: err.error
        });
    }
});
export default router;