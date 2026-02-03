import express from 'express';
var router = express.Router();
import moment from 'moment';
import { conexion } from '../conexion.mjs';

moment.locale('es');


router.post('/', function (req, res) {
    var d = new Date();
    let finalDate = d.toISOString().split("T")[0];
    var mes = (finalDate.slice(5, 7))
    var anio = (finalDate.slice(0, 4))
    var dia = (finalDate.slice(8, 10))

    var fechafinal = parseInt(anio + mes + dia)
    var registro = {
        ClientesDesc: req.body.cliendesc,
        ClientesDomicilio: req.body.cliendomicilio,
        ClientesCodPos: req.body.cliencodpostal,
        ClientesLoc: req.body.clienlocalidad,
        ClientesPcia: req.body.clienprovincia,
        ClientesTel: req.body.clientelefono,
        ClientesMail: req.body.clienmail,
        ClientesIVA: parseInt(req.body.clieniva),
        ClientesCUIT: req.body.cliencuit,
        ClientesTipo: parseInt(req.body.clientipo),
        ClientesContacto: req.body.cliencontacto,
        ClientesCategoria: req.body.cliencategoria,
        ClientesObserv1: req.body.clienobserv1,
        ClientesObserv2: req.body.clienobserv2,
        ClientesFecha: fechafinal,
    }
    conexion.query('INSERT INTO BasesGenerales.Clientes SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log('error en alta cliente ', err.errno);
                }
            }
            else {
                res.json(result.rows);

            }
        });

});


export default router;