
const router = express.Router();
import express from 'express';
import { conexionpool } from '../conexion.mjs';

router.post("/", async (req, res) => {
    const finalDate = new Date().toISOString().split("T")[0];
    const datos = req.body.datoagrabar;

    // Obtenemos una conexión del conexionpool para esta petición
    const connection = await conexionpool.getConnection();

    try {
        await connection.beginTransaction();

        for (const dato of datos) {
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

            // Ejecutamos los inserts usando la conexión específica
            await connection.query('INSERT INTO BaseCaja.CajaSaldoEf SET ?', registro);
            await connection.query('INSERT INTO BaseCaja.CajaInterna SET ?', registroM);
            await connection.query('INSERT INTO BaseCaja.CajaInterna SET ?', registroT);
        }

        // Si todo salió bien en el bucle, confirmamos
        await connection.commit();
        res.json({ ok: true });

    } catch (err) {
        // Si algo falló, deshacemos todo
        await connection.rollback();
        console.error("Error en la transacción:", err);
        res.status(500).json({ ok: false, error: err.message });

    } finally {
        // IMPORTANTÍSIMO: Liberar la conexión de vuelta al conexionpool
        connection.release();
    }
});

export default router;