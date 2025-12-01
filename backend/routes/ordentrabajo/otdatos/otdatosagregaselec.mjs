import express from 'express';
var router = express.Router();
import moment from 'moment';
import conexion from '../../conexion.mjs';
moment.locale('es');


router.post('/', function (req, res) {
    const { OTDatosDesc, Vpdef, nroid } = req.body.newDatosSelect;

    const q = 'SELECT OTDatosOpciones FROM BasesOrdenes.OTDatos WHERE idOTDatos = ?';

    conexion.query(q, [nroid], (err, result) => {
        if (err) {
            console.log('Error en SELECT', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        const opcionesStr = result[0].OTDatosOpciones;
        let opcionesObj;

        try {
            opcionesObj = JSON.parse(opcionesStr);
        } catch (e) {
            console.error('Error al parsear JSON', e);
            opcionesObj = {};
        }

        // Agregamos nueva opción
        opcionesObj[OTDatosDesc] = Number(Vpdef);

        const nuevoJSON = JSON.stringify(opcionesObj);
        const qUpdate = 'UPDATE BasesOrdenes.OTDatos SET OTDatosOpciones = ? WHERE idOTDatos = ?';

        conexion.query(qUpdate, [nuevoJSON, nroid], (err2, result2) => {
            if (err2) {
                console.log('Error en UPDATE', err2);
                return res.status(500).json({ error: 'Error al actualizar' });
            }

            return res.json({ success: true, updated: opcionesObj });
        });
    });
});
export default router;

