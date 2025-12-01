import express from "express";
var router = express.Router();
import conexion from "../conexion.mjs";

router.get("/", async (req, res) => {
    try {
        const [paramResult] = await queryPromise("SELECT * FROM BasePresup.PresupParam");
        const datosrec = JSON.parse(req.query.datoscalculo);
        console.log('datosrec  ', datosrec)
        console.log('paramResult  ', paramResult)
        const resultados = [];
        const StkRubroAbrP = datosrec.StkRubroAbr;
        const tipoconf = datosrec.tipoconf;
        const tipoojale = datosrec.tipoojale;
        const detallep = datosrec.detallep;
        const ivasn = datosrec.ivasn;
        const minmay = datosrec.minmay;
        let largoreal = (datosrec.largo * 1)
        let anchoreal = (datosrec.ancho * 1)
        let detalle = "", ganancia = 0, tipoojal = "", sogachicote = "", sogadobladillo = "";
        for (const datos of datosrec) {
            const StkRubroAbrP = datos.StkRubroAbr;
            const tipoconf = datos.tipoconf;
            const tipoojale = datos.tipoojale;
            const detallep = datos.detallep;
            const ivasn = datos.ivasn;

            const minmay = datos.minmay;

            // definimos variables locales


            if (tipoconf === "cs") {
                detalle = detallep || "Lona con ojales reforzados, chicotes y soga en dobladillo";
                ganancia = paramResult.coefgancsoga;
            } else {
                detalle = detallep || "Lona con ojales reforzados, chicotes sin soga en dobladillo";
                ganancia = paramResult.coefganssoga;
            }

            if (minmay === "my") {
                tipoojal = paramResult.abrojales28;
                sogachicote = paramResult.sogachicotemay;
                ganancia = paramResult.coefganmay;
            } else {
                sogachicote = paramResult.sogachicotemin;
            }

            tipoojal = tipoojale === "hz" ? paramResult.abrojales3hz : paramResult.abrojales3b;
            sogadobladillo = paramResult.sogadobladillo;

            const queries = [
                `SELECT StkRubroDesc, StkRubroAbr,
            (StkRubroCosto * StkMonedasCotizacion / StkRubroAncho * 1.02 ) AS CostoCobMC,
            (StkRubroCosto * StkMonedasCotizacion * 0.20 / 11 ) AS CostoRefuerzo
            FROM BaseStock.StkRubro JOIN BaseStock.StkMonedas
            WHERE StkRubro.StkRubroAbr = '${StkRubroAbrP}'
            AND StkRubro.StkRubroTM = idStkMonedas`,

                `SELECT (StkRubroCosto * StkMonedasCotizacion * 1.65) AS CostoMSChicote
            FROM BaseStock.StkRubro JOIN BaseStock.StkMonedas
            WHERE StkRubro.StkRubroAbr = '${sogachicote}'
            AND StkRubro.StkRubroTM = idStkMonedas`,

                ...(tipoconf === "cs"
                    ? [
                        `SELECT (StkRubroCosto * StkMonedasCotizacion) AS CostoMSDobladillo
            FROM BaseStock.StkRubro JOIN BaseStock.StkMonedas
            WHERE StkRubro.StkRubroAbr = '${sogadobladillo}'
            AND StkRubro.StkRubroTM = idStkMonedas`,
                    ]
                    : []),

                `SELECT StkMonedasCotizacion
            FROM BaseStock.StkMonedas
            WHERE idStkMonedas = '${paramResult.codmoneda}'`,

                `SELECT (StkRubroCosto * StkMonedasCotizacion / 144) AS CostoOjalM2
            FROM BaseStock.StkRubro JOIN BaseStock.StkMonedas
            WHERE StkRubro.StkRubroAbr = '${tipoojal}'
            AND StkRubro.StkRubroTM = idStkMonedas`,
            ];
            console.log('queries  ', queries)
            const resultadosParciales = await Promise.all(queries.map(q => queryPromise(q)));
            console.log('resultadosParciales  ', resultadosParciales)
            // los resultados quedan en el mismo orden siempre
            resultados.push(resultadosParciales.map(r => r[0]));
        }
        console.log(resultados);
        /* [
[1]   [
[1]     {
[1]       StkRubroDesc: 'COB. ZONDA 900',
[1]       StkRubroAbr: 'ZD900',
[1]       CostoCobMC: '4298.2800000000',
[1]       CostoRefuerzo: '114.9272727273'
[1]     },
[1]     { CostoMSChicote: '546.315000' },
[1]     { CostoMSDobladillo: '285.9500' },
[1]     { StkMonedasCotizacion: '1505.00' },
[1]     { CostoOjalM2: '239.33680556' }
[1]   ]
[1] ]
*/
        //res.json(resultados);
        let j = 0;
        let costooriginal = 0;

        // la estructura es [ [ {...}, {...}, ... ] ]
        const datosenvio = resultados[0];
        console.log('datosenvio   ', datosenvio)
        console.log('datosenvio.length  ', datosenvio.length)
        const datos = Object.assign({}, ...datosenvio);
        while (j < datos.length) {
            costooriginal =
                parseFloat(datos[j].CostoCobMC) + parseFloat(datos[j].CostoRefuerzo);
            j++;

            costooriginal += parseFloat(datos[j].CostoMSChicote);
            if (tipoconf === "cs") {
                j++;
                costooriginal += parseFloat(datos[j].CostoMSDobladillo);
            }

            j++;
            costooriginal +=
                parseFloat(datos[j].StkMonedasCotizacion) * paramResult.valorflete +
                parseFloat(datos[j].StkMonedasCotizacion) * paramResult.valorMOT;

            j++;
            costooriginal += parseFloat(datos[j].CostoOjalM2);
            j++;
            console.log('ganancia  ', ganancia)
            costooriginal = costooriginal * ganancia * paramResult.coefimpuesto;
            const metroscuad = anchoreal * largoreal;
            costooriginal = costooriginal * metroscuad;

            let ciclo = 0;
            if (metroscuad < 12) ciclo = 3;
            else if (metroscuad < 16) ciclo = 2;
            else if (metroscuad < 22) ciclo = 1;

            let i = 0;
            while (i < ciclo) {
                costooriginal = costooriginal * 1.0325;
                i++;
            }

            costooriginal = Math.fround(costooriginal);

            if (ivasn === "CIVA") {
                costooriginal = Math.ceil(Number(costooriginal).toFixed(2) / 10) * 10;
            } else {
                costooriginal = Math.ceil(Number(costooriginal).toFixed(2) / 1.21 / 10) * 10;
            }

            datosenvio[0]["ImpUnitario"] = costooriginal;
            datosenvio[0]["Detalle"] = detalle;
            datosenvio[0]["Largo"] = (largoreal * 1).toFixed(2);
            datosenvio[0]["Ancho"] = (anchoreal * 1).toFixed(2);
            datosenvio[0]["MDesc"] = "S";

            costooriginal = 0;
        }
        res.json(datosenvio);
        //   datosenvio = [];

    } catch (err) {
        console.error("Error general:", err);
        res.status(500).json({ error: "Error en servidor" });
    }
});

function queryPromise(sql) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

export default router;
