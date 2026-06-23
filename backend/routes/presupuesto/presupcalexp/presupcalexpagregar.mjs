import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.post('/', async (req, res) => {

  try {
    const registro = {
      PresupExpCalTitulo: req.body.PresupExpCalTitulo,
      PresupExpCalDescripcion: req.body.PresupExpCalDescripcion
    };
    await conexionpool.query(
      'INSERT INTO BasePresup.PresupExpCal SET ?', [registro]);
    return res.status(201).json({
      leyenda: 'Presupuesto Exp Cal creado correctamente',
      insertId: req.body.PresupExpCalTitulo
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
