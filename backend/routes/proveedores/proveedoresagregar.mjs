import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.post("/", async (req, res) => {
    console.log('esta en agrega pro  ', req.body)
    const registro = {
        ProveedoresDesc: (req.body.provdesc || '').trim().toUpperCase(),
        ProveedoresCUIT: (req.body.provcuit || '').trim(),

        // Números: Evitamos el NaN usando Number() y un valor por defecto
        ProveedoresTipo: Number(req.body.provtipo) || 1,
        ProveedoresNroCalle: Number(req.body.provnrocalle) || 0,

        // Otros strings
        ProveedoresCalle: (req.body.provcalle || '').trim().toUpperCase(),
        ProveedoresPiso: (req.body.provpiso || '').trim(),
        ProveedoresDto: (req.body.provdto || '').trim().toUpperCase(),
        ProveedoresCodPos: (req.body.provcodpostal || '').trim(),
        ProveedoresLoc: (req.body.provlocalidad || '').trim().toUpperCase(),
        ProveedoresPcia: (req.body.provprovincia || '').trim().toUpperCase(),
        ProveedoresTel: (req.body.provtelefono || '').trim(),
        ProveedoresContacto: (req.body.provcontacto || '').trim().toUpperCase(),
        ProveedoresMail: (req.body.provmail || '').trim().toLowerCase(), // Mail siempre en minúscula
        ProveedoresWeb: (req.body.provpagweb || '').trim().toLowerCase(),
        ProveedoresCodMon: req.body.provcodmon
    };
    console.log('registro', registro)
    try {
        await conexionpool.query("INSERT INTO BasesGenerales.Proveedores SET ?", [registro]);
        // Respuesta exitosa
        return res.status(201).json({
            leyenda: 'Proveedor creado correctamente'
        });
    }

    catch (err) {
        console.error("Error en el proceso:", err);

        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return res.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return res.status(410).json({ message: "Dato demasiado largo para una columna" });
        }

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});




export default router;