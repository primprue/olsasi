import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


router.get('/', function (req, res, next) {
    const q = [
        'load data  infile ' + '"' + '/var/lib/mysql-files/clientes.csv' + '"  into table BasesGenerales.Clientes  FIELDS TERMINATED BY ' + '";"' + '',
    ].join(' ');
    conexion.query(
        q,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    console.log('los datos ya fueron tomados');
                }
                else {
                    console.log(err);
                }
            }
            else {
                res.json(result);

            }
        });
});
conexion.end;

export default router;