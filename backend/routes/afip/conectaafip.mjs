import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';
// const Afip = require('@afipsdk/afip.js');
import Afip from '@afipsdk/afip.js';
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en conectaafip");
    } else {
        console.log("no se conecto en conectaafip");
    }
});

router.get('/', function (req, res, next) {

    const afip = new Afip({ CUIT: 20409378472 });
    console.log('afi  ', afip)
    const taxId = 33710380649;
    async function datoscliente() {
        const taxpayerDetails = await afip.RegisterScopeThirteen.getTaxpayerDetails(taxId);

        console.log('datos clientes   ', taxpayerDetails)
        res.json(taxpayerDetails)
    }

    async function estadodelservidor() {
        const serverStatus = await afip.RegisterInscriptionProof.getServerStatus();

        console.log('Este es el estado del servidor:');
        console.log(serverStatus);
    }
    datoscliente()
    estadodelservidor()


});
conexion.end;


export default router;