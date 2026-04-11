import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.post('/', async (req, res) => {

  try {
    const registro = {
      PresupExpCalTitulo: req.body.PresupExpCalTitulo,
      PresupExpCalDescripcion: req.body.PresupExpCalDescripcion
    };
    const result = await queryAsync(
      'INSERT INTO BasePresup.PresupExpCal SET ?',
      registro
    );
    return res.status(201).json({
      leyenda: 'Presupuesto Exp Cal creado correctamente',
      insertId: result.insertId
    });
  } catch (err) {
    if (err.errno === 1062) {
      return res.status(409).json({ leyenda: 'error clave duplicada' });
    }
    if (err.errno === 1406) {
      return res.status(410).json({ leyenda: 'Excede los dígitos permitidos' });
    }
    console.error('Error en presupcalexp:', err);
    return res.status(500).json({ leyenda: 'Error interno del servidor Presupuesto Exp Cal' });
  }
});
export default router;
