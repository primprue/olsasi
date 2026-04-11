import express from "express";
var router = express.Router();
import { conexionpool } from '../conexion.mjs';

// router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async (req, res) => {
  const indice = req.query.id;

  const transdesc = req.body.TransporteDesc.toUpperCase();
  const transtel1 = req.body.TransporteTel1;
  const transtel2 = req.body.TransporteTel2;
  const transwa = req.body.TransporteWA;
  const transnromail = req.body.TransporteMail;
  const transdom = req.body.TransporteDom;
  const transloc = req.body.TransporteLoc;
  const transdestino = req.body.TransporteDestino.toUpperCase();
  const transobser = req.body.TransporteObser;
  try {
    const q = `UPDATE BasesGenerales.Transporte SET TransporteDesc = ?, TransporteTel1 = ?, TransporteTel2 = ?, TransporteWA = ?, TransporteMail = ?, TransporteDom = ?, TransporteLoc = ?, TransporteDestino = ?, TransporteObser = ? WHERE idTransporte = ?`;
    await conexionpool.query(q, [transdesc, transtel1, transtel2, transwa, transnromail, transdom, transloc, transdestino, transobser, indice]);
    return res.status(200).json({
      leyenda: 'Transporte modificado correctamente',
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
