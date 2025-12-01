import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';



router.delete('/?:id', async function (req, res) {
    var indice = req.params.id;
    var q = ['delete from BasesGenerales.Proveedores where idProveedores = ' + indice].join(' ')
    console.log('q en borrar ', q)
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de proveedor usado en otra tabla" });
                }
                {
                    console.log(err);
                }
            }
            else {
                res.json(result.rows);
            }
        });
});

export default router;
