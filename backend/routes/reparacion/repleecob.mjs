import express from 'express';
var router = express.Router();


import { conexionpool } from '../conexion.mjs';




router.get('/', async (req, res) => {
    let q1 = `select * from BasePresup.PresupParam`
    try {
        const [rows] = await conexionpool.query(q1);

        let coefmin = Number(rows[0].coeficientemin)
        let q = `Select round((StkRubroCosto * StkMonedasCotizacion * ? / 1.5), 0) as ValorMCC 
        from StkRubro JOIN  StkMonedas  where StkRubroCodGrp = 1 and idStkRubro = 5  and StkRubroTM = idStkMonedas `
        let params = [coefmin]
        const preccob = await conexionpool.query(q, params)
        res.json(Number(preccob[0][0].ValorMCC))

    } catch (err) {
        console.error("Error en la DB:", err);
        res.status(500).json({
            error: "Error al obtener los Valor de la cobertura para los parches",
            details: err.message
        });
    }

});

export default router;