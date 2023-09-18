var express = require("express");
var router = express.Router();
var moment = require("moment");
const { exec } = require("child_process");
var path = require("path");
var variables = require('../../public/variables');
const { response } = require("express");



router.get("/", function (req, res) {
    // console.log(process.cwd())  ///home/sandra/SistOLSA/OlsaSG/backend
    var nombrepresupeleg = req.query.id;
    // var comando = "cp -R /home/sandra/Documentos/OLSAFrecuentes/PresupSistema/"
    var comando = "cp -R " + variables.dirpresupdocumento
        + nombrepresupeleg +
        variables.caminoynombrearch
    //' /home/sandra/SistOLSA/OlsaSG/src/components/Main/pages/Presupuesto/static/media/basics.pdf'
    exec(comando, (error, stdout, stderr) => {
        console.log(`error aqui: ${error}`);
        console.log(`stdout aqui: ${stdout}`);
        console.log(`stderr aqui: ${stderr
            }`);
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