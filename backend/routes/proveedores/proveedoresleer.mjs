import express from 'express';

import { conexionpool } from '../conexion.mjs';

var router = express.Router();

router.get("/", async (req, res) => {
    const q = `SELECT idProveedores as id, ProveedoresDesc, SubRubros.SubRubroDetalle,
    ProveedoresTipo, ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle,
    ProveedoresPiso, ProveedoresDto, ProveedoresCodPos,
    ProveedoresLoc, ProveedoresPcia, ProveedoresTel,
    ProveedoresContacto, ProveedoresMail, ProveedoresWeb,
    ProveedoresCodMon FROM BasesGenerales.Proveedores JOIN BasesGenerales.SubRubros
    where BasesGenerales.Proveedores.ProveedoresTipo = BasesGenerales.SubRubros.idSubRubro
    order by ProveedoresDesc`;
    try {
        const [rows] = await conexionpool.query(q);

        res.json(rows);
    } catch (err) {
        console.error("Error en la DB:", err);
        res.status(500).json({
            error: "Error al obtener los proveedores",
            details: err.message
        });
    }
});

export default router;