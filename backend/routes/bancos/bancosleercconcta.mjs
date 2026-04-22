import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.get('/', async (req, res) => {
    const leertono = req.query.leertono;
    // 1. Definimos la variable fuera para que tenga alcance en todo el bloque
    let q = `Select idBancos as value, BancosNombre as label from BasesGenerales.Bancos`;
    let params = [];

    // 2. Lógica condicional para filtrar o mostrar todo
    if (leertono === 'S') {
        q += ` WHERE BancosSomosCliente = ?`;
        params.push(leertono);
    }
    q += ` order by BancosNombre`;
    // Si es ' ' o 'N', no agregamos el WHERE, por lo que traerá todos los registros.

    try {
        const [result] = await conexionpool.query(q, params);
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