import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

router.post('/', async (req, res) => {

    try {
        const registro = {
            ProveedoresDesc: req.body.provdesc,
            ProveedoresTipo: parseInt(req.body.provtipo, 10),
            ProveedoresCUIT: req.body.provcuit,
            ProveedoresCalle: req.body.provcalle,
            ProveedoresNroCalle: parseInt(req.body.provnrocalle, 10),
            ProveedoresPiso: req.body.provpiso,
            ProveedoresDto: req.body.provdto,
            ProveedoresCodPos: req.body.provcodpostal,
            ProveedoresLoc: req.body.provlocalidad,
            ProveedoresPcia: req.body.provprovincia,
            ProveedoresTel: req.body.provtelefono,
            ProveedoresContacto: req.body.provcontacto,
            ProveedoresMail: req.body.provmail,
            ProveedoresWeb: req.body.provpagweb,
            ProveedoresCodMon: req.body.provcodmon
        };

        const result = await queryAsync(
            'INSERT INTO BasesGenerales.Proveedores SET ?',
            registro
        );

        return res.status(201).json({
            message: 'Proveedor creado correctamente',
            insertId: result.insertId
        });

    } catch (err) {

        if (err.errno === 1062) {
            return res.status(409).json({ message: 'Error: clave duplicada' });
        }

        if (err.errno === 1406) {
            return res.status(410).json({ message: 'Excede los dígitos permitidos' });
        }

        console.error('Error en proveedores:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
