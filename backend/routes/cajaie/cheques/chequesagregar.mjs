import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';



router.post('/', async (req, res) => {
    console.log(req.body);
    const fechaentrada = req.body.ChequesFechaEntrada.split('T')[0];
    const fechapago = req.body.ChequesFechaPago.split('T')[0];
    const fechasalida = req.body.ChequesFechaSalida
        ? req.body.ChequesFechaSalida.split('T')[0]
        : null;
    if (req.body.ChequesFechaEntrada === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar Fecha de Entrada"
        });
    }
    if (req.body.ChequesFechaPago === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar Fecha de Pago"
        });
    }
    if (req.body.ChequesBanco === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar el banco"
        });
    }
    if (req.body.ChequesNro === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar el numero de cheque"
        });
    }
    if (req.body.ChequesLibrador === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar el nombre del cliente"
        });
    }
    if (req.body.ChequesImporte === '') {
        return res.status(400).json({
            leyenda: "Debe ingresar el importe"
        });
    }
    let bancodepositado = 0;
    req.body.ChequesDepBanco !== '' ? bancodepositado === parseInt(req.body.ChequesDepBanco) : bancodepositado = 0;
    let endosadoa = 0;
    req.body.ChequesEndosadoA !== '' ? endosadoa === parseInt(req.body.ChequesEndosadoA) : endosadoa = 0;
    // if (añoEntrada !== añoSalida || mesEntrada !== mesSalida || diaEntrada !== diaSalida) {
    //     return res.status(400).json({
    //         leyenda: "Fechas de entrada y salida no coinciden"
    //     });
    // }
    const registro = {
        ChequesFechaEntrada: fechaentrada,
        ChequesLibrador: req.body.ChequesLibrador,
        ChequesNro: req.body.ChequesNro,
        ChequesBanco: req.body.ChequesBanco,
        ChequesFechaPago: fechapago,
        ChequesImporte: req.body.ChequesImporte,
        ChequesFechaSalida: fechasalida,
        ChequesDepBanco: bancodepositado,
        ChequesEndosadoA: endosadoa,
        ChequesOP: req.body.ChequesOP,
        ChequesObservacion: req.body.ChequesObservacion
    }
    try {
        const q = `INSERT INTO BaseCaja.Cheques SET ?`;
        await conexionpool.query(q, [registro]);
        return res.status(201).json({
            leyenda: 'Cheques creado correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);
        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return res.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return res.status(410).json({ message: "Dato demasiado largo para una columna" });
        }
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});

export default router;