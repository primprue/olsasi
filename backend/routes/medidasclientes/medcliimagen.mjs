import express from 'express';
var router = express.Router();
import moment from 'moment';
import { conexion } from '../conexion.mjs';

moment.locale('es');


router.post('/', function (req, res) {

    console.log('req.body medcliimagen  ', req.body)
    /*0] req.body medcliimagen   {
[0]   id: '29537D',
[0]   NroClienteMC: 295,
[0]   NroOrdenTrabajoMC: 37,
[0]   FechaMedidaMC: '2018-04-27T03:00:00.000Z',
[0]   DetalleMC: 'MODIFICACION SOBREBARANDA',
[0]   FrenteDorsoMC: 'D',
[0]   PatenteMC: 'AB 553 TP',
[0]   IdentificacionMC: 'CORMETAL'
[0] }
*/
    let nroclientestring = req.body.NroClienteMC.toString();
    let nroordentrabajostring = req.body.NroOrdenTrabajoMC.toString();
    while (nroclientestring.length < 4) {
        nroclientestring = '0' + nroclientestring;
    }
    while (nroordentrabajostring.length < 4) {
        nroordentrabajostring = '0' + nroordentrabajostring;
    }
    let nombrearchivo = req.body.FrenteDorsoMC + nroclientestring + nroordentrabajostring + '.jpg';

    var registro = {
        id: req.body.id,
        NroClienteMC: req.body.NroClienteMC,
        NroOrdenTrabajoMC: req.body.NroOrdenTrabajoMC,
        FechaMedidaMC: req.body.FechaMedidaMC,
        DetalleMC: req.body.DetalleMC,
        FrenteDorsoMC: req.body.FrenteDorsoMC,
        PatenteMC: req.body.PatenteMC,
        IdentificacionMC: req.body.IdentificacionMC,
        nombrearchivo: nombrearchivo
    }

    var registro = {

    }
    // conexion.query('INSERT INTO BasesGenerales.Clientes SET ?', registro,
    //     function (err, result) {
    //         if (err) {
    //             if (err.errno == 1062) {
    //                 return res.status(409).send({ message: "error clave duplicada" });
    //             }
    //             else {
    //                 console.log('error en alta cliente ', err.errno);
    //             }
    //         }
    //         else {
    //             res.json(result.rows);

    //         }
    //     });

});


export default router;