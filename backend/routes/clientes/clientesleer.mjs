import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';

router.get('/', async (req, res) => {

    try {
        const q = `SELECT  idClientes as id, ClientesDesc, ClientesDomicilio, ClientesCodPos,
    ClientesLoc, ClientesPcia, ClientesTel, ClientesMail, ClientesIVA, ClientesCUIT,
    ClientesTipo, ClientesContacto, ClientesCategoria, ClientesObserv1, ClientesObserv2,
    ClientesFecha FROM BasesGenerales.Clientes `;
        const [result] = await conexionpool.query(q);
        return res.json(result);
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});


export default router;