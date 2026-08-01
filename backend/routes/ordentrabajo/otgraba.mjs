import express from "express";
var router = express.Router();

import moment from "moment";
import { conexionpool } from '../conexion.mjs';

moment.locale("es");


router.post('/', async (req, res) => {

    const d = new Date();
    let finalDate = d.toISOString().split("T")[0];
    const transporte = req.body.otdatos.transporte ? req.body.otdatos.transporte.TransporteDesc : '';
    const connection = await conexionpool.getConnection();
    const { datosencab } = req.body.otdatos;
    const esRegistrado = datosencab.length > 1;
    const cliente = esRegistrado ? datosencab[1][0].idClientes : 0;
    const clientenoreg = esRegistrado ? '' : datosencab[0][0].PresupEncabCliente;

    const importtotal = req.body.otdatos.TotalPresupuesto ? req.body.otdatos.TotalPresupuesto : 0.00;
    const importsenia = req.body.otdatos.ImporteSenia ? parseFloat(req.body.otdatos.ImporteSenia) : 0.00;
    const OTEncabOC = req.body.otdatos.OTEncabOC ? req.body.otdatos.OTEncabOC : '';
    const OTEncabDetalles = req.body.otdatos.OTEncabDetalles ? req.body.otdatos.OTEncabDetalles : '';


    const registro = {
        OTEncabCliente: cliente,
        OTEncabEstado: 1,
        OTEncabClienteNoReg: clientenoreg,
        OTEncabFecha: finalDate,
        OTEncabFechaPromesa: req.body.otdatos.FechaPromesa,
        OTEncabImpTotal: importtotal,
        OTEncabSenia: importsenia,
        OTEncabconIVA: req.body.otdatos.OTEncabconIVA,
        OTEncabTransporte: transporte,
        OTEncabOC: OTEncabOC,
        OTEncabDetalles: OTEncabDetalles,
        OTEncabNroPresup: req.body.otdatos.datosencab[0][0].idPresupEncab
    }
    try {
        const q = `INSERT INTO BasesOrdenes.OTEncab SET ?`;
        const [resultEncab] = await conexionpool.query(q, [registro]);


        // Manejo de errores específicos de SQL

        const nroot = resultEncab.insertId;
        for (const [index, renglon] of req.body.otdatos.renglonespresup.entries()) {
            const registroRenglon = {
                OTRenglonNro: index + 1,
                idOTRenglonNroOT: nroot,
                OTRenglonCant: renglon[0].PresupRenglonCant,
                OTRenglonDesc: renglon[0].PresupRenglonDesc,
                OTRenglonLargo: renglon[0].PresupRenglonLargo,
                OTRenglonAncho: renglon[0].PresupRenglonAncho,
                OTRenglonImpItem: renglon[0].PresupRenglonImpItem,
                // OTRenglonParamInt: renglon[0].PresupRenglonParamInt,
                OTRenglonDetalles: JSON.stringify(req.body.otdatos.datosconfec)
            };

            await conexionpool.query(
                "INSERT INTO BasesOrdenes.OTRenglon SET ?",
                registroRenglon
            );
        }

        // 5. Si todo salió bien, confirmamos los cambios
        await connection.commit();
        res.json({
            ok: true,
            message: "Presupuesto grabado correctamente",
            nroot,
        });

        // res.status(201).json({
        //     leyenda: "Orden de Trabajo grabada correctamente"
        // });

    } catch (err) {
        // 6. Si hay CUALQUIER error, deshacemos todo
        await connection.rollback();

        console.error("ERROR en la transacción:", err);

        if (err.errno === 1062) {
            res.status(409).send({ message: "Error: clave duplicada" });
        } else if (err.errno === 1265) {
            res.status(413).send({ message: "Faltan datos o formato incorrecto en renglones" });
        } else {
            res.status(500).send({ message: "Error interno del servidor" });
        }

    } finally {
        // 7. SIEMPRE liberar la conexión de vuelta al pool
        connection.release();
    }
});

export default router;