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
    const d = new Date();
    const finalDate = d.toISOString().split("T")[0];
    try {
        const itemdesco = await itemdescripcion(datosmodstock[0].abrevrubroo, datosmodstock[0].indiceitemo)
        let itemdesccambio = ''
        if (datosmodstock[0].cambiatela === 'S') {
            itemdesccambio = await itemdescripcion(datosmodstock[0].abrevrubrocambio, datosmodstock[0].indiceitemocambio)
        }



        var cambioconf = ''
        datosmodstock[0].cambiatela === 'S' ?
            cambioconf = ' Cambio ' : cambioconf = 'Confirma';

        //modifica disponible y stock de la nueva tela y agrega en el disponible de la anterior
        let q = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantidad = StkItemsCantidad - ?,
            StkItemsCantDisp = StkItemsCantDisp - ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
        const paramsq = [
            datosmodstock[0].tingreso,
            datosmodstock[0].tingreso,
            finalDate,
            datosmodstock[0].indiceitemocambio,
            datosmodstock[0].abrevrubrocambio
        ];
        let q1 = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantDisp = StkItemsCantDisp + ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
        const paramsq1 = [
            datosmodstock[0].tingreso,
            finalDate,
            datosmodstock[0].indiceitemo,
            datosmodstock[0].abrevrubroo
        ];


        let q2 = ` INSERT INTO BaseStock.StkMov SET 
            StkMovFecha = ?, StkMovTotal = ?,
            StkMovRubroAbr = ?, StkMovItemDesc = ?,
            StkMovCliente = ?`
        const paramsq2 = [
            finalDate,
            datosmodstock[0].tingreso,
            datosmodstock[0].abrevrubroo,
            itemdesco + " x " + itemdesccambio,
            datosmodstock[0].abrevrubrocambio + " " + cambioconf
        ];

        // }
        // else {
        let q3 = ` UPDATE BaseStock.StkItems SET 
            StkItemsCantidad = StkItemsCantidad - ?,
            StkItemsFAct = ?
            WHERE (idStkItems = ?) and  (StkItemsRubroAbr = ?)`
        const paramsq3 = [
            datosmodstock[0].tingreso,
            finalDate,
            datosmodstock[0].indiceitemo,
            datosmodstock[0].abrevrubroo
        ];
        let q4 = ` INSERT INTO BaseStock.StkMov SET 
            StkMovFecha = ?, StkMovTotal = ?,
            StkMovRubroAbr = ?, StkMovItemDesc = ?,
            StkMovCliente = ?`
        const paramsq4 = [
            finalDate,
            datosmodstock[0].tingreso,
            datosmodstock[0].abrevrubrocambio,
            itemdesco,
            datosmodstock[0].abrevrubrocambio + " " + cambioconf
        ];



        if (datosmodstock[0].cambiatela === 'S') {
            const datos1 = await queryAsync(q, paramsq);
            const datos2 = await queryAsync(q1, paramsq1);
            const datos3 = await queryAsync(q2, paramsq2);
        }
        else {
            const datos4 = await queryAsync(q3, paramsq3);
            const datos5 = await queryAsync(q4, paramsq4);

        }
        res.status(201).json({
            leyenda: 'Movimiento registrado correctamente',
            idGenerado: datosmodstock[0].indiceitemocambio
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
