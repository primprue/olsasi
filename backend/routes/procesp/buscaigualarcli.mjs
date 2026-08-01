import express from 'express';
var router = express.Router();

import { conpoolserv } from '../conexion.mjs';

router.get('/', async (req, res) => {

    try {
        const q = `SELECT idClientes as id, ClientesDesc, ClientesCUIT, NumeroClienteDC, NombreClienteDC, NroClienteFacDC 
FROM BasesGenerales.Clientes 
JOIN medidasclientes.datosclientesdc 
  ON ClientesDesc like CONCAT(medidasclientes.datosclientesdc.NombreClienteDC, '%')
WHERE (NroClienteFacDC = 0 or NroClienteFacDC is null)
  AND medidasclientes.datosclientesdc.NombreClienteDC > ''
ORDER BY ClientesDesc`;
        const [result] = await conpoolserv.query(q);
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

/* const q = `SELECT idClientes as id, ClientesDesc, ClientesCUIT, NumeroClienteDC, NombreClienteDC, NroClienteFacDC 
        FROM BasesGenerales.Clientes join medidasclientes.datosclientesdc where
        ClientesDesc like CONCAT(medidasclientes.datosclientesdc.NombreClienteDC, '%')
         and (NroClienteFacDC = 0 or NroClienteFacDC is null)
        order by ClientesDesc`;*/