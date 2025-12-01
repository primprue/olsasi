import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';
import { exec } from 'child_process';

router.get('/', function (req, res, next) {

    console.log('esta en clientescobol  ')

    var comando = 'cp /home/sandra/.dosemu/drive_c/OLS/DATA/ultcli.txt /media/sandra/OLS/ultcli.txt'

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            console.log(`error: ${error.code}`);
            res.json([{ error: error.code }])

            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return ('exito');
        }
    })

    comando = 'cp /home/sandra/.dosemu/drive_c/OLS/DATA/clientes.dat /media/sandra/OLS/clientes.dat'

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            console.log(`error: ${error.code}`);
            res.json([{ error: error.code }])

            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return ('exito');
        }
    })

});

conexion.end;

export default router;