import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get("/", async (req, res) => {
    try {

        const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
        const p = parametros[0];

        var q = `Select  concat(idStkRubro, StkRubroCodGrp, StkRubroAbr ) as id, idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc as GrupoDesc,
        StkRubroAncho, StkRubroPres,
        date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha,  
        round((StkRubroCosto * StkMonedasCotizacion * ? ),0) as PPub,
        round((StkRubroCosto * StkMonedasCotizacion / 1.21 * ? ),0) as PPubSIVA,
        round((StkRubroCosto * StkMonedasCotizacion * ? ),0) as PMay 
        from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas 
        where StkRubroCodGrp = idStkGrupo
        and StkRubroProv = idProveedores 
        and StkRubroTM = idStkMonedas 
        and StkRubroCodGrp = idStkGrupo 
        order by StkRubroCodGrp, idStkRubro`;
        const params = [Number(p.coeficientemin), Number(p.coeficientemin), Number(p.coeficientemay)];

        const r = await queryAsync(q, params);
        res.json(r);
    } catch (error) {
        console.log("Error en /listaprecios", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;