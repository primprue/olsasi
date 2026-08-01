
import express from 'express';
import { conexion } from '../conexion.mjs';

const router = express.Router();

// Función auxiliar simplificada
async function queryAsync(sql, params = []) {
    // Si usas mysql2, .promise() es la forma correcta
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.post('/', async (req, res) => {
    try {
        const { idProveedores, idStkGrupo, StkRubroAbr, importemod, porcentmod } = req.body;
        const finalDate = new Date().toISOString().split("T")[0];
        let column = '';
        let value = '';

        if (idProveedores && idProveedores !== 0) {
            column = 'StkRubroProv';
            value = idProveedores;
        } else if (idStkGrupo && idStkGrupo !== 0) {
            column = 'StkRubroCodGrp';
            value = idStkGrupo;
        } else if (StkRubroAbr) {
            column = 'StkRubroAbr';
            value = StkRubroAbr;
        }

        if (!column) {
            return res.status(400).json({ message: "No se proporcionó un criterio de búsqueda válido" });
        }

        let query = '';
        let params = [];

        // Aseguramos que los valores sean numéricos
        const vImporte = Number(importemod) || 0;
        const vPorcentaje = Number(porcentmod) || 0;

        if (vImporte !== 0) {
            query = `UPDATE StkRubro SET StkRubroFecha = ?, StkRubroCosto = StkRubroCosto + ? WHERE ${column} = ?`;
            params = [finalDate, vImporte, value];
        } else {
            const factor = vPorcentaje / 100;
            query = `UPDATE StkRubro SET StkRubroFecha = ?, StkRubroCosto = StkRubroCosto + (StkRubroCosto * ?) WHERE ${column} = ?`;
            params = [finalDate, factor, value];
        }
        // EJECUCIÓN DIRECTA
        const result = await queryAsync(query, params);


        // Enviamos respuesta al frontend
        res.json({
            success: true,
            message: "Precios actualizados",
            result
        });

    } catch (err) {
        console.error('Error detallado en UPDATE:', err);
        res.status(500).json({
            message: "Error al actualizar la base de datos",
            error: err.message
        });
    }
});

export default router;