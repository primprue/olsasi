import express from 'express';
var router = express.Router();

import { execFile } from 'child_process';
import { exec } from 'child_process';


router.get('/', function (req, res, next) {
    execFile('/home/sandra/SistOLSA/olsasi/backend/routes/clientes/cambnom.sh', (error, stdout, stderr) => {
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
})

export default router;