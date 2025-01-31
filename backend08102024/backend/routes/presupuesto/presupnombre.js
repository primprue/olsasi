var express = require("express");
var router = express.Router();
// var moment = require("moment");
const { exec } = require("child_process");
// var path = require("path");
var variables = require('../../public/variables');
// const { response } = require("express");
// const fs = require('fs');
// const Client = require('ssh2').Client;
// tuve que npm install ssh2

// const conn = new Client();

// const remoteFilePath = '/home/sandra/p/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/Presupuesto nro 6925*.pdf';
// const sshConfig = {
//     host: '192.168.2.11',
//     port: 22, // Puerto por defecto de SSH
//     username: 'root',
//     password: '123456', // También podrías usar clave privada si es necesario
// };


router.get("/", function (req, res) {
    // conn.on('ready', function () {
    //     conn.sftp(function (err, sftp) {
    //         if (err) throw err;

    //         sftp.readFile(remoteFilePath, 'utf8', function (err, data) {
    //             if (err) throw err;

    //             console.log('data que vino de gpt ', data);
    //             conn.end();
    //         });
    //     });
    // }).connect(sshConfig);

    var nombrepresupeleg = req.query.id;
    var comando = "cp -a " + variables.dirpresupdocumento
        + nombrepresupeleg + " " +
        variables.caminoynombrearch + 'basics.pdf'

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
        res.json(stdout)
    });
})

module.exports = router;





// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 3000;  // Elige el puerto que desees

// // Define la ruta a tu archivo PDF
// const pdfPath = path.join(__dirname, '/home/sandra/Descargas/21022024_pago.pdf');

// // Configura Express para servir archivos estáticos
// app.use(express.static(path.dirname(pdfPath)));

// // Ruta para servir el archivo PDF
// app.get('/pdf', (req, res) => {
//     res.sendFile(path.basename(pdfPath));
// });

// // Inicia el servidor
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });

