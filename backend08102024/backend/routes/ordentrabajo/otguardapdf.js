// const express = require('express');
// var router = express.Router();
// // const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// var router = express();
// // Configuración de almacenamiento de multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/'); // Carpeta donde se guardarán los archivos
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Guardar el archivo con su nombre original
//     }
// });

// Crear una instancia de multer con la configuración
// const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para subir archivos

// router.all("/", function (req, res, next) {
// '/otguardapdf', upload.single('file'), (req, res) => {
// if (!req.file) {
//     return res.status(400).send('No se ha enviado ningún archivo.');
// }

// res.status(200).send('Archivo guardado exitosamente.');



// console.log(' otguardapdf ')
// const tempPath = req.file.path;
// const targetPath = path.join(__dirname, 'archivos_guardados/primerpdf.pdf');

// fs.rename(tempPath, targetPath, err => {
//     if (err) {
//         return res.status(500).send('Error al guardar el archivo.');
//     }
//     res.status(200).send('Archivo guardado exitosamente.');
// });

// app.listen(3000, () => {
//     console.log('Servidor corriendo en http://localhost:3000');
// });
// });
const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otdatosleer");
    } else {
        console.log("no se conecto en otdatosleer");
    }
});

var router = express();
router.get('/', async function (req, res) {
    // router.get('/', (req, res, next) => {
    var datosrec = (req.query.datosaleer)
    // indice = req.query.id;
    var q = ['SELECT *  FROM BasesOrdenes.OTDatos where OTDatosTipoConf = "' + datosrec + '" order by OTDatosOrdenAparicion'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno === 1064) {
                    result = 0
                    res.json(result);
                }
                else {
                    console.log('ingreso al error  ', result)
                    console.log(err);
                }
            }
            else {
                res.json(result);

            }
        });
})

conexion.end
module.exports = router;





