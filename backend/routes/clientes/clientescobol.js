var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var exec = require('child_process').exec, child;




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientescobol");
    } else {
        console.log("no se conecto en clientescobol");
    }
});




var router = express();

router.get('/', function (req, res, next) {

    console.log('esta en clientescobol  ')

    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    // var comando = "cp -a /media/factura/drive_c/OLS/DATA/clientes.dat " + variables.dirpresupdocumento
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

    var comando = 'cp /home/sandra/.dosemu/drive_c/OLS/DATA/clientes.dat /media/sandra/OLS/clientes.dat'

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

    // var comando = ' /home/sandra/pruebagnu/./pcliseq'
    // console.log('comando  ', comando)
    // exec(comando, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         console.log(`error: ${error.code}`);
    //         res.json([{ error: error.code }])

    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return ('exito');
    //     }
    //     // res.json(stdout)
    // });

    // const q = [
    //     'load data  infile ' + '"' + '/media/sandra/OLS/clientes.csv' + '"  into table BasesGenerales.Clientes  FIELDS TERMINATED BY ' + '";"' + '',
    // ].join(' ');
    // conexion.query(
    //     q,
    //     function (err, result) {
    //         if (err) {
    //             if (err.errno == 1062) {
    //                 console.log('los datos ya fueron tomados');
    //             }
    //             else {
    //                 console.log(err);
    //             }
    //         }
    //         else {
    //             console.log('result de clientes cobol el load  ', result)
    //             res.json(result);

    //         }
    //     });
});

conexion.end;

module.exports = router;