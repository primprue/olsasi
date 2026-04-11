import express from 'express';

var router = express.Router();
import { conexionpool } from '../../conexion.mjs';




router.get('/', async (req, res) => {

    try {
        const q = `SELECT idCajaInterna as id, 
         date_format(CajaInternaFecha, "%d-%m-%Y") as CajaInternaFecha,
        CajaInternaConcepto, CajaInternaMoneda,
        CajaInternaES, CajaInternaMT, CajaInternaImporte, CajaInternaTotalInstr
        FROM BaseCaja.CajaInterna order by date_format(CajaInternaFecha, "%Y-%m-%d") desc`;
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
//     const q1 = [`SELECT idCajaInterna as id, 
//          date_format(CajaInternaFecha, "%d-%m-%Y") as CajaInternaFecha,
//         CajaInternaConcepto, CajaInternaMoneda,
//         CajaInternaES, CajaInternaMT, CajaInternaImporte, CajaInternaTotalInstr
//         FROM BaseCaja.CajaInterna order by date_format(CajaInternaFecha, "%Y-%m-%d") desc`].join(' ')
//     conexion.query(q1,
//         function (err, result) {
//             if (err) {
//                 console.log(err);

//             } else {
//                 res.json(result);
//             }
//         });
// });

export default router;