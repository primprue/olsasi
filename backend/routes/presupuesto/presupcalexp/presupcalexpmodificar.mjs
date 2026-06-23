import express from "express";
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';


router.post('/', async (req, res) => {
  /*idPresupExpCal, PresupExpCalTitulo, PresupExpCalDescripcion*/
  try {

    // var indice = req.query.id;
    //   var PresupDetPieLeyenda = req.body.PresupDetPieLeyenda
    const q = `UPDATE BasePresup.PresupExpCal SET PresupExpCalTitulo = ?, 
          PresupExpCalDescripcion = ? WHERE idPresupExpCal = ?`;
    await conexionpool.query(q, [req.body.PresupExpCalTitulo, req.body.PresupExpCalDescripcion, req.query.id]);
    return res.status(201).json({
      leyenda: 'Presupuesto Exp Cal modificado correctamente',
      insertId: req.query.id
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



