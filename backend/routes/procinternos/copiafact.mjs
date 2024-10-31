import express from 'express';
var router = express.Router();


import { execFile } from 'child_process';
import { exec } from 'child_process';

router.get("/", function (req, res, next) {
    const fechaComoCadena = Date()
    const numeroDia = new Date(fechaComoCadena).getDay();
    const diasemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
    var caminodesde = ' /home/sandra/ResgDiario/*.* '
    var caminohacia = '/media/sandra/KINGSTON/Backdiario/' + diasemana[numeroDia] + '/'
    var caminodesde1 = ' /home/sandra/BackUp/*.* '
    var caminohacia1 = '/home/sandra/pruebaback1/' + diasemana[numeroDia] + '/'
    // exec('cp -r -p ' + caminodesde + caminohacia, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`error: ${error.message}`);
    //         res.json(error.message)
    //         return;
    //     }
    //     if (stderr) {
    //         console.error(`stderr: ${stderr}`);
    //         res.json(stderr)
    //         return;
    //     }
    //     exec('cp -r -p ' + caminodesde1 + caminohacia1, (error, stdout, stderr) => {
    //         if (error) {
    //             console.error(`error: ${error.message}`);
    //             res.json(error.message)
    //             return;
    //         }
    //         if (stderr) {
    //             console.error(`stderr: ${stderr}`);
    //             res.json(stderr)
    //             return;
    //         }
    //         res.json(stdout)
    //     });
    // });
    //execFile(__dirname + '/copBases.sh', (error, stdout, stderr) => {
    execFile('/home/sandra/SIOLSA/copBases.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            res.json(`${error.message}`)
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.json(`${stderr}`)
            return;
        }
    });
    exec('cp -r -p ' + caminodesde + caminohacia, (error, stdout, stderr) => {
        console.log('esta aca  ')
        if (error) {
            console.error(`error: ${error.message}`);
            res.json(error.message)
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.json(stderr)
            return;
        }
        res.json(`${stdout}`)
        console.log(`stdout:\n${stdout}`);
    });
})
export default router;