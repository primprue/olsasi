import express from "express";
const router = express.Router();

import { conexion } from '../../conexion.mjs';
import { itemdescripcion } from './leeitemdesc.mjs';

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

router.post("/", async (req, res) => {
    const datosmodstock = req.body.infingreso
    const indicemodStkMov = req.body.indicemodStkMov
    const d = new Date();
    let agregadifdisp = 0
    let totalvendido = 0
    const finalDate = d.toISOString().split("T")[0];
    for (let i = 0; i < datosmodstock.length; i++) {
        totalvendido = totalvendido + datosmodstock[i].tingreso
    }
    let agregadifvtadisp = totalvendido - datosmodstock[0].vendido
    let regmovvendido = `V ${totalvendido}`
    try {
        for (let i = 0; i < datosmodstock.length; i++) {
            const itemdesco = await itemdescripcion(datosmodstock[i].abrevrubroo, datosmodstock[i].indiceitemo)
            let itemdesccambio = ''
            if (datosmodstock[i].cambiatela === 'S') {
                itemdesccambio = await itemdescripcion(datosmodstock[i].abrevrubrocambio, datosmodstock[i].indiceitemocambio)
            }

            // datosmodstock[i].cambiatela === 'N' ?
            //     agregadifdisp = datosmodstock[i].vendido - datosmodstock[i].tingreso : agregadifdisp = 0

            var cambioconf = ''
            datosmodstock[i].cambiatela === 'S' ?
                cambioconf = ' Cambio ' : cambioconf = 'Confirma';

            //modifica disponible y stock de la nueva tela y agrega en el disponible de la anterior
            let q = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantidad = StkItemsCantidad - ?,
            StkItemsCantDisp = StkItemsCantDisp - ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
            const paramsq = [
                datosmodstock[i].tingreso,
                datosmodstock[i].tingreso,
                finalDate,
                datosmodstock[i].indiceitemocambio,
                datosmodstock[i].abrevrubrocambio
            ];
            let q1 = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantDisp = StkItemsCantDisp + ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
            const paramsq1 = [
                //datosmodstock[i].vendido,
                datosmodstock[i].tingreso,
                finalDate,
                datosmodstock[i].indiceitemo,
                datosmodstock[i].abrevrubroo
            ];


            let q2 = ` INSERT INTO BaseStock.StkMov SET 
            StkMovFecha = ?, StkMovTotal = ?,
            StkMovRubroAbr = ?, StkMovItemDesc = ?,
            StkMovCliente = ?`
            const paramsq2 = [
                finalDate,
                datosmodstock[i].tingreso,
                datosmodstock[i].abrevrubroo,
                itemdesco + " x " + itemdesccambio,
                datosmodstock[i].abrevrubrocambio + " " + cambioconf
            ];

            // }
            // else {
            let q3 = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantidad = StkItemsCantidad - ?,
            StkItemsCantDisp = StkItemsCantDisp + ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
            const paramsq3 = [
                datosmodstock[i].tingreso,
                agregadifvtadisp,
                finalDate,
                datosmodstock[i].indiceitemo,
                datosmodstock[i].abrevrubroo
            ];
            let q4 = ` INSERT INTO BaseStock.StkMov SET 
            StkMovFecha = ?, StkMovTotal = ?,
            StkMovRubroAbr = ?, StkMovItemDesc = ?,
            StkMovCliente = ?`
            const paramsq4 = [
                finalDate,
                datosmodstock[i].tingreso,
                datosmodstock[i].abrevrubrocambio,
                itemdesco,
                datosmodstock[i].abrevrubrocambio + " " + cambioconf
            ];



            if (datosmodstock[i].cambiatela === 'S') {
                const datos1 = await queryAsync(q, paramsq);
                const datos2 = await queryAsync(q1, paramsq1);
                const datos3 = await queryAsync(q2, paramsq2);
            }
            else {
                const datos4 = await queryAsync(q3, paramsq3);
                const datos5 = await queryAsync(q4, paramsq4);

            }
        }

        let q6 = `UPDATE BaseStock.StkMov SET 
            StkMovNroRef = ?
            WHERE (idStkMov = ?)`

        const paramsq6 = [
            regmovvendido,
            indicemodStkMov,
        ];
        const datos6 = await queryAsync(q6, paramsq6);
        console.log('datos6', datos6)

        res.status(201).json({
            leyenda: 'Movimiento registrado correctamente',
            // idGenerado: datosmodstock[i].indiceitemocambio
        });
    } catch (err) {
        console.error("Error en el proceso:", err);

        // Manejo de errores de duplicados o longitud
        if (err.errno === 1062) return res.status(460).json({ message: "Clave duplicada" });
        if (err.errno === 1406) return res.status(410).json({ message: "Dato demasiado largo" });

        return res.status(500).json({ leyenda: "Error interno del servidor" });
    }
});
export default router;
