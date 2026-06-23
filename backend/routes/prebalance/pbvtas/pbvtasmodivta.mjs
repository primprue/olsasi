import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.post("/", async function (req, res, next) {
  const fechamod = req.query.id;
  const importemod = req.body.impVentas;

  const mesmod = req.body.mesV;
  const aniomod = req.body.anioV;
  const cierraabre = 'N';

  try {
    const q = `INSERT INTO BasePreBalance.PBVtas(PBMesV, PBAnioV, PBImporteV, PBFechaV, PBMesCerV)
                VALUES(?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                  PBImporteV = VALUES(PBImporteV),
                  PBFechaV = VALUES(PBFechaV),
                  PBMesCerV = VALUES(PBMesCerV);
    `;
    await conexionpool.query(q, [mesmod, aniomod, importemod, fechamod, cierraabre]); // Aquí se pasa el valor de la columna que se quiere actualizar
    return res.status(200).json({
      leyenda: 'Items actualizados correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
  }
});
export default router;