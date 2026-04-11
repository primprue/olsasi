import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.post("/", async (req, res) => {
    const registro = {
        ProveedoresDesc: (req.body.ProveedoresDesc || '').trim().toUpperCase(),
        ProveedoresCUIT: (req.body.ProveedoresCUIT || '').trim(),

        // Números: Evitamos el NaN usando Number() y un valor por defecto
        ProveedoresTipo: Number(req.body.ProveedoresTipo) || 1,
        ProveedoresNroCalle: Number(req.body.ProveedoresNroCalle) || 0,

        // Otros strings
        ProveedoresCalle: (req.body.ProveedoresCalle || '').trim().toUpperCase(),
        ProveedoresPiso: (req.body.ProveedoresPiso || '').trim(),
        ProveedoresDto: (req.body.ProveedoresDto || '').trim().toUpperCase(),
        ProveedoresCodPos: (req.body.ProveedoresCodPos || '').trim(),
        ProveedoresLoc: (req.body.ProveedoresLoc || '').trim().toUpperCase(),
        ProveedoresPcia: (req.body.ProveedoresPcia || '').trim().toUpperCase(),
        ProveedoresTel: (req.body.ProveedoresTel || '').trim(),
        ProveedoresContacto: (req.body.ProveedoresContacto || '').trim().toUpperCase(),
        ProveedoresMail: (req.body.ProveedoresMail || '').trim().toLowerCase(), // Mail siempre en minúscula
        ProveedoresWeb: (req.body.ProveedoresWeb || '').trim().toLowerCase(),
        ProveedoresCodMon: req.body.ProveedoresCodMon
    };
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