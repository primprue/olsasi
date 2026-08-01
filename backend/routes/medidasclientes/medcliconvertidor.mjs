import express from 'express';
var router = express.Router();
import { exec } from 'child_process';

/*
sudo apt install imagemagick
mogrify -format jpg F02950025.bmp
 mogrify -format jpg F02950040.pnm
 mogrify -format jpg *.bmp
 mogrify -format jpg *.pnm
 */
import { conexionpool } from '../conexion.mjs';

router.get('/', async function (req, res) {
    const ruta = process.env.RUTA_EXTERNA_MEDCLIACONVERTIR;
    const rutadestino = process.env.RUTA_EXTERNA_MEDCLICONVERTIDOS;
    exec('ls -lh', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout:\n${stdout}`);
    });
    const indice = req.query.id;
    const q = `SELECT  * FROM medidasclientes.datosclientesdc where NroClienteFacDC <> 0 and NumeroOrdenDC > 0`;
    try {
        const [result] = await conexionpool.query(q, [indice]);
        console.log(result);
        ///home/sandra/BackUp/SIOLSA/medclientes/medidas
        //    return res.json(result);
        for (let i = 0; i < result.length; i++) {
            const row = result[i];
            let nroclientestring = row.NumeroClienteDC.toString();
            while (nroclientestring.length < 4) {
                nroclientestring = '0' + nroclientestring;
            }
            const rutaorigen = `${ruta}/F${nroclientestring}*.bmp`;
            const rutaPnm = `${rutadestino}/`
            exec(`mogrify -format jpg -path ${rutaPnm} ${rutaorigen}`, (error, stdout, stderr) => {
                if (error) {
                    const rutaorigen = `${ruta}/F${nroclientestring}*.pnm`;
                    exec(`mogrify -format jpg -path ${rutaPnm} ${rutaorigen}`, (error, stdout, stderr) => {

                        if (error) {
                            console.error(`error: ${error.message}`);
                            return;
                        }
                    });
                    return;
                }

                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }

                console.log(`stdout:\n${stdout}`);
            });

        }
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});

export default router;