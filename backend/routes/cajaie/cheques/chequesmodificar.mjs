import express from "express";
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';

const formatToMySQL = (dateStr) => {
  if (!dateStr || dateStr.trim() === '') return null;
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
};


router.post("/", async (req, res) => {

  const indice = req.query.id;
  const fechaentrada = req.body.ChequesFechaEntrada.split('T')[0];
  const fechapago = req.body.ChequesFechaPago.split('T')[0];
  const fechasalida = req.body.ChequesFechaSalida
    ? req.body.ChequesFechaSalida.split('T')[0]
    : null;
  const ChequesFechaEntrada = fechaentrada;
  const ChequesLibrador = req.body.ChequesLibrador;
  const ChequesNro = req.body.ChequesNro;
  const ChequesBanco = req.body.ChequesBanco;
  const ChequesFechaPago = fechapago;
  const ChequesImporte = req.body.ChequesImporte;
  const ChequesFechaSalida = fechasalida;
  const ChequesDepBanco = req.body.ChequesDepBanco;
  const ChequesEndosadoA = req.body.ChequesEndosadoA;
  const ChequesOP = req.body.ChequesOP;
  const ChequesObservacion = req.body.ChequesObservacion;
  if (req.body.ChequesDepBanco !== 0 && req.body.ChequesEndosadoA !== 0) {
    return res.status(400).json({
      leyenda: "No puede endosarse un cheque depositado"
    });
  }
  try {
    const q = `UPDATE  BaseCaja.Cheques SET
        ChequesFechaEntrada = ?, ChequesLibrador = ?, ChequesNro = ?,
    ChequesBanco = ?, ChequesFechaPago = ?, ChequesImporte = ?, ChequesFechaSalida = ?,
    ChequesDepBanco = ?, ChequesEndosadoA = ?, ChequesOP = ?, ChequesObservacion = ?
    WHERE idCheques = ?`;

    await conexionpool.query(q, [ChequesFechaEntrada, ChequesLibrador, ChequesNro,
      ChequesBanco, ChequesFechaPago, ChequesImporte, ChequesFechaSalida,
      ChequesDepBanco, ChequesEndosadoA, ChequesOP, ChequesObservacion, indice]);
    return res.status(200).json({
      leyenda: 'Cheques modificado correctamente',
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
