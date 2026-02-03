import express from "express";
var router = express.Router();
import { conexion } from '../conexion.mjs';



// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get("/", async (req, res) => {
    try {
        const datosrec = JSON.parse(req.query.datoscalculo);
        const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
        const p = parametros[0];
        const resultados = [];

        for (const item of datosrec) {
            const {
                cantidad,
                detallep,
                StkRubroAbr,
                ivasn,
                largo,
                ancho,
                minmay
            } = item;

            let anchopimp = 0;
            let cuadred = "";
            let coeficiente = 0;
            let coefMOT = 0;
            let impunion = 0;
            let impcorte = 0;
            let impsol = 0;
            let importeMOTtotal = 0;
            let ivareal = ivasn;
            if (ancho === 0) {
                anchopimp = Number(largo)
                cuadred = `RED`
            }
            else {
                anchopimp = ancho
                cuadred = "REC"
            }

            if (minmay == 'my') {
                coeficiente = p.coeficientemay
                coefMOT = p.coefMOTmay
                ivareal = 'CIVA'
            }
            else {
                coeficiente = p.coeficientemin
                coefMOT = p.coefMOTmin
            }


            //busco el ancho de la tela para calcular medio paño
            let param = [StkRubroAbr];
            const buscaancho = await queryAsync(`Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = ?`, param);
            const rbuscaancho = buscaancho[0];
            const anchotela = rbuscaancho.AnchoTela;

            //corte de la tela 120 segundos por paño independiente del largo

            //unión de los paños 150 segundos por metro de soldadura
            const numero = Number(largo) / anchotela;
            const enteros = Math.floor(numero);
            const decimales = numero - enteros;

            const cantpa =
                decimales === 0 ? enteros :
                    decimales < 0.5 ? enteros + 0.5 :
                        enteros + 1;



            // costo MOT por segundo
            const costoMOTseg = (p.costoMOT * coefMOT) / 60 / 60;

            const valorMOTmup = costoMOTseg * p.segsolpu;
            const valorMOTcorte = costoMOTseg * p.segpurecorte;


            // Unión y corte según decimales
            if (decimales > 0) {
                impunion = (cantpa * largo + anchotela / 2) * valorMOTmup;
                impcorte = (largo + 1) * valorMOTcorte;
            } else {
                impunion = ((cantpa - 1) * largo) * valorMOTmup;
                impcorte = largo * valorMOTcorte;
            }

            // Soldadura

            if (cuadred === 'REC') {
                // rectangular
                impsol = ((p.costoMOT * coefMOT) / 60 * 5) * (largo * 2 + ancho * 2);
            } else {
                // circular
                impsol = ((p.costoMOT * coefMOT) / 60 * 9) * ancho * Math.PI;
            }

            // Total MOT
            importeMOTtotal = impunion + impcorte + impsol;

            const q = `Select
                StkRubroDesc, StkRubroAbr,
                ((StkRubroCosto * StkMonedasCotizacion * ? * ? * ?) + ?) as ImpUnitario,
                StkRubroAncho as Ancho,
                StkRubroCosto,
                StkMonedasCotizacion
                from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
                where StkRubro.StkRubroAbr = ?
                and StkRubro.StkRubroTM = idStkMonedas`

            let paraimp = [coeficiente, cantpa, anchopimp, importeMOTtotal, StkRubroAbr];
            const datos = await queryAsync(q, paraimp);
            const d = datos[0]
            let costo = 0
            if (ivareal === 'CIVA') {
                costo = Math.ceil(Number(d.ImpUnitario).toFixed(0))
            } else {
                costo = Math.ceil(Number(d.ImpUnitario).toFixed(0) / 1.21)
            }
            var anchomue = Number(ancho).toFixed(2)
            var largomue = Number(largo).toFixed(2)


            let detalle;

            if (detallep === '') {
                if (cuadred === 'RED') {
                    detalle = `Cambio de piso de pileta redonda de ${largomue} de diámetro en : `;
                } else {
                    detalle = `Cambio de piso de pileta de ${largomue} x ${anchomue} en : `;
                }
            } else {
                detalle = `${detallep} `;
            }

            // ------------------------------------------------------------------
            // 5) ARMO RESULTADO DEL ÍTEM
            // ------------------------------------------------------------------
            resultados.push({
                ImpUnitario: costo,
                Detalle: detalle,
                Largo: Number(largo).toFixed(2),
                Ancho: Number(ancho).toFixed(2),
                MDesc: "S",
            });
        }
        res.json(resultados);

    } catch (err) {
        console.log("Error en /presuppisopil", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
