import express from 'express';
var router = express.Router();
// import { conexionpool } from '../conexion.mjs';
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get('/', async (req, res) => {
    // SET @numero=0;
    try {
        const q = `
        SET @numero:=0;
            SELECT @numero:=@numero+1 as id,
            sum(StkItemsCantDisp) as Cantidad, StkItemsRubroAbr, StkRubroDesc, StkRubroCosto,
            StkRubroTM, sum(StkItemsCantDisp) * StkRubroCosto as TotalItem 
            from BaseStock.StkItems join BaseStock.StkRubro where StkRubroAbr = StkItemsRubroAbr group by StkItemsRubroAbr `
        console.log(q)
        const resultados = await queryAsync(q);
        console.log(resultados)
        // Como son múltiples sentencias, los datos reales están en el segundo índice [1]
        const result = resultados[1];

        res.json(result);
    } catch (error) {
        console.log("Error en /inventario", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
//     const [result] = await conexionpool.query(q);
//     return res.json(result);
// } catch (err) {
//     console.error("Error en el proceso:", err);

//     return res.status(500).json({
//         leyenda: "Error interno del servidor",
//         error: err.message
//     });
// }
// });



export default router;